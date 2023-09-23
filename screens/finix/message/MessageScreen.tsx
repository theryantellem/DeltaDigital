import React, {useEffect, useState} from 'react';

import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform, Button
} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {SignalStackScreenProps} from "../../../types";
import {Ionicons} from "@expo/vector-icons";
import {Fonts} from "../../../constants/Fonts";
import {fontPixel} from "../../../helpers/normalize";
import Colors from "../../../constants/Colors";
import MessagesList from "../../../components/MessagesList";
import {useAppSelector} from "../../../app/hooks";
import HeaderWithTitle from "../../../components/cyborg/header/HeaderWithTitle";


import * as SecureStore from "expo-secure-store";
import {
    Pusher,
    PusherMember,
    PusherChannel,
    PusherEvent, PusherAuthorizerResult,
} from '@pusher/pusher-websocket-react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";


const pusher = Pusher.getInstance();

const myMessages = [
    {
        text: "Nos vemos en 15 minutos en Streaming",
        user: '3838a510-2b59-417b-92ef-c89ab5a7d79a',
        _id: '3838a510-2b59-417b-92ef-c89ab5a7d09a',
    }, {
        text: "15 minutos en Streaming",
        user: '3838a510-2b59-417b-92ef-c89ab5a7d79a',
        _id: '3838a510-2b59-417b-92ef-c89ab5a7d70a',
    },
    {
        text: "Nos vemos en 15 minutos en Streaming",
        user: '17409',
        _id: '1838a510-2b59-417b-92ef-c89ab5a7d70a',
    }
]

const MessageScreen = ({navigation, route}: SignalStackScreenProps<'MessageScreen'>) => {

    const {educator} = route.params


    let logLines: string[] = [];

    const [token, setToken] = useState('');
    const user = useAppSelector(state => state.user)
    const {User_Details} = user

    const [text, setText] = useState('')




    const [apiKey, onChangeApiKey] = React.useState('2e03de85bbf93cd88884');
    const [cluster, onChangeCluster] = React.useState('eu');
    const [channelName, onChangeChannelName] = React.useState('chat.1');
    const [eventName, onChangeEventName] = React.useState('chat-message');
    const [eventData, onChangeEventData] = React.useState('');
    const [members, onChangeMembers] = React.useState<PusherMember[]>([]);
    const [logText, setLog] = React.useState('');

    const log = async (line: string) => {
        logLines.push(line);
        setLog(logLines.join('\n'));
    };
    /*
        React.useEffect(() => {
            const getFromStorage = async () => {
                onChangeApiKey((await AsyncStorage.getItem('APIKEY')) || '');
                onChangeCluster((await AsyncStorage.getItem('CLUSTER')) || '');
                onChangeChannelName((await AsyncStorage.getItem('CHANNEL')) || '');
                onChangeEventName((await AsyncStorage.getItem('EVENT')) || '');
                onChangeEventData((await AsyncStorage.getItem('DATA')) || '');
            };
            getFromStorage().catch((e) => log('ERROR: ' + e));

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);*/

    const connect = async () => {
        try {
           /* await AsyncStorage.multiSet([
                ['APIKEY', apiKey],
                ['CLUSTER', cluster],
                ['CHANNEL', channelName],
            ]);*/

            await pusher.init({
                apiKey,
                cluster,
                // authEndpoint
                // ============
                // You can let the pusher library call an endpoint URL,
                // Please look here to implement a server side authorizer:
                // https://pusher.com/docs/channels/server_api/authenticating-users/
                //
                // authEndpoint: '<Add your Auth Endpoint URL here>',
                //
                // onAuthorizer
                // ============
                // Or you can implement your own authorizer callback.
                // See https://pusher.com/docs/channels/library_auth_reference/auth-signatures/
                // for the format of this object, you need your key and secret from your Pusher
                // Account.
               // onAuthorizer,
                onConnectionStateChange,
                onError,
                onEvent,
                onSubscriptionSucceeded,
                onSubscriptionError,
                onSubscriptionCount,
                onDecryptionFailure,
                onMemberAdded,
                onMemberRemoved,

            });

            await pusher.connect();
            await pusher.subscribe({channelName:`chat.${educator.id}`,
                onEvent: (event: PusherEvent) => {
                    console.log(`onEvent: ${event}`);
                }
            }).then(res =>{
                console.log({channelName:res.channelName})

            });
        } catch (e) {
            log('ERROR: ' + e);
        }
    };



    const onConnectionStateChange = (
        currentState: string,
        previousState: string
    ) => {
        log(
            `onConnectionStateChange. previousState=${previousState} newState=${currentState}`
        );
    };

    const onError = (message: string, code: Number, error: any) => {
        log(`onError: ${message} code: ${code} exception: ${error}`);
    };

    const onEvent = (event: any) => {
        log(`onEvent: ${event}`);
    };

    const onSubscriptionSucceeded = (channelName: string, data: any) => {
        log(
            `onSubscriptionSucceeded: ${channelName} data: ${JSON.stringify(data)}`
        );
        const channel: PusherChannel | undefined = pusher.getChannel(channelName);

        if (!channel) {
            return;
        }

        const me = channel.me;
        onChangeMembers([...channel.members.values()]);
        log(`Me: ${me}`);
    };

    const onSubscriptionCount = (
        channelName: string,
        subscriptionCount: Number
    ) => {
        log(
            `onSubscriptionCount: ${subscriptionCount}, channelName: ${channelName}`
        );
    };

    const onSubscriptionError = (
        channelName: string,
        message: string,
        e: any
    ) => {
        log(`onSubscriptionError: ${message}, channelName: ${channelName} e: ${e}`);
    };

    const onDecryptionFailure = (eventName: string, reason: string) => {
        log(`onDecryptionFailure: ${eventName} reason: ${reason}`);
    };

    const onMemberAdded = (channelName: string, member: PusherMember) => {
        log(`onMemberAdded: ${channelName} user: ${member}`);
        const channel: PusherChannel | undefined = pusher.getChannel(channelName);

        if (!channel) {
            return;
        }

        onChangeMembers([...channel.members.values()]);
    };

    const onMemberRemoved = (channelName: string, member: PusherMember) => {
        log(`onMemberRemoved: ${channelName} user: ${member}`);
        const channel: PusherChannel | undefined = pusher.getChannel(channelName);

        if (!channel) {
            return;
        }

        onChangeMembers([...channel.members.values()]);
    };

    // See https://pusher.com/docs/channels/library_auth_reference/auth-signatures/ for the format of this object.
    const onAuthorizer = async (channelName: string, socketId: string) => {
        log(
            `calling onAuthorizer. channelName=${channelName}, socketId=${socketId}`
        );

        const response = await fetch('some_url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                socket_id: socketId,
                channel_name: channelName,
            }),
        });

        const body = (await response.json()) as PusherAuthorizerResult;

        log(`response: ${JSON.stringify(body)}`);
        return body;
    };

    const trigger = async () => {
        try {
            await AsyncStorage.multiSet([
                ['EVENT', eventName],
                ['DATA', eventData],
            ]);

            pusher.trigger(
                new PusherEvent({channelName, eventName, data: 'hello Man United!'})
            ).then(res => {
                console.log(res)
            });
        } catch (e) {
            log('ERROR: ' + e);
        }
    };

/*

    useEffect(()=>{
        (async ()=>{
            let myChannel = await pusher.subscribe({
                channelName:'chat.1',


            });

           console.log(myChannel.channelName)
        })()
    },[channelName])
*/






    console.log(pusher.connectionState)
    console.log(members)

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={require('../../../assets/images/signal/streamer_BG.png')}
                             resizeMode={'cover'}
                             style={styles.dashboardImage}>


                <HeaderWithTitle title="Carlos Ardila - Crypto"/>

                <View style={styles.flatList}>


                    <MessagesList _id={User_Details.id} roomID={''} messages={myMessages}/>

                </View>

                <KeyboardAvoidingView

                    style={[styles.root]}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={15}
                >
                    <Button
                        title="Connect"
                        onPress={connect}
                        disabled={!(apiKey && cluster && channelName)}
                    />

                    <Button
                        title="Trigger Event"
                        onPress={trigger}
                        disabled={!eventName}
                    />

                    {/*              <Button title={"SEND MESSAGE"} onPress={sendMessage}/>*/}

                    <View style={styles.innerContainer}>
                        <View style={styles.inputAndMicrophone}>
                            {/*  <TouchableOpacity style={styles.rightIconButtonStyle}>
                            <Icon
                                name="paperclip"
                                size={23}
                                color={Colors.tintText}
                            />
                        </TouchableOpacity>*/}
                            <TextInput


                                placeholder={"Type your message here..."}
                                style={styles.input}
                                value={text}

                                placeholderTextColor={Colors.textDark}
                                onChangeText={(text) => setText(text)}
                            />

                            <TouchableOpacity style={styles.rightIconButtonStyle}>

                                <Ionicons name="paper-plane-outline" size={24} color={Colors.textDark}/>
                            </TouchableOpacity>
                        </View>

                    </View>

                </KeyboardAvoidingView>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#141621",
    },
    background: {
        paddingHorizontal: 20,
        flex: 1,
        width: '100%',
        alignItems: "center"
    },
    dashboardImage: {
        // paddingHorizontal: pixelSizeHorizontal(20),
        resizeMode: 'cover',
        width: '100%',
        flex: 1,
        borderRadius: 30,
        alignItems: 'center',

    },
    flatList: {
        width: '90%',

        flex: 1,


    },
    root: {
        width: '100%',

    },
    innerContainer: {
        paddingHorizontal: 10,
        marginHorizontal: 10,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 10,
    },
    inputAndMicrophone: {
        flexDirection: "row",
        backgroundColor: "#fff",
        flex: 3,
        height: 60,
        marginRight: 10,
        paddingVertical: Platform.OS === "ios" ? 10 : 0,
        borderRadius: 10,
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "space-between",
    },
    input: {
        backgroundColor: "transparent",

        color: Colors.textDark,
        width: "80%",
        fontFamily: Fonts.faktumMedium,
        fontSize: fontPixel(14),
        height: '100%',

        justifyContent: 'center',
        alignSelf: "center",
        alignItems: 'center'
    },
    rightIconButtonStyle: {
        justifyContent: "center",
        alignItems: "center",


    },
})

export default MessageScreen;

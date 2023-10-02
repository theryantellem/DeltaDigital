import React, {useEffect, useState} from 'react';

import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform, Button, ActivityIndicator, Image
} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {SignalStackScreenProps} from "../../../types";
import {Ionicons} from "@expo/vector-icons";
import {Fonts} from "../../../constants/Fonts";
import {fontPixel, heightPixel} from "../../../helpers/normalize";
import Colors from "../../../constants/Colors";
import MessagesList from "../../../components/MessagesList";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import HeaderWithTitle from "../../../components/cyborg/header/HeaderWithTitle";


import {
    Pusher,
    PusherMember,
    PusherChannel,
    PusherEvent, PusherAuthorizerResult,
} from '@pusher/pusher-websocket-react-native';

import {useInfiniteQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {getAlMessage, sendMessage} from "../../../api/finix-api";
import {useRefreshOnFocus} from "../../../helpers";
import {addAllMessages, addSingleMessage} from "../../../app/slices/dataSlice";
import {IF} from "../../../helpers/ConditionJsx";
import NoItem from "../../../components/NoItem";







const MessageScreen = ({navigation, route}: SignalStackScreenProps<'MessageScreen'>) => {

    const pusher = Pusher.getInstance();
    const {educator} = route.params
    const dataSlice = useAppSelector(state => state.data)
    const {myMessages} = dataSlice

    // console.log([...myMessages].reverse())

    let logLines: string[] = [];

    const [token, setToken] = useState('');
    const user = useAppSelector(state => state.user)
    const {User_Details, userData} = user

    const [text, setText] = useState('')

    const dispatch = useAppDispatch()
    const queryClient = useQueryClient()


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

             pusher.connect().then((r: any) => console.log(r));
            await pusher.subscribe({
                channelName: `chat.${educator.id}`,
                onEvent: (event: PusherEvent) => {
                    // console.log(`The New Message: ${event.data.data}`);
                    dispatch(addSingleMessage(event.data.data))
                }
            }).then(res => {
                // console.log({channelName: res.channelName})

            });
        } catch (e) {
            log('ERROR: ' + e);
        }
    };

    const {
        status,
        data,
        error,
        isRefetching,
        isFetching,
        isLoading,
        refetch,
        isFetchingNextPage,
        isFetchingPreviousPage,
        fetchNextPage,

        fetchPreviousPage,
        isError,
        hasNextPage,
        hasPreviousPage,
    } = useInfiniteQuery(
        [`all-messages`,educator.id], async ({pageParam = 1}) => getAlMessage.messages({pageParam, id: educator.id}),
        {
            getNextPageParam: lastPage => {
                if (lastPage.next !== null) {
                    return lastPage.next;
                }

                return lastPage;
            },
            getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,

        },
    )

//console.log(data?.pages[0])

 /*   var pusher = new Pusher('2e03de85bbf93cd88884', {
        cluster: 'eu',
    });*/

 /*   var channel = pusher.subscribe('chat.1');
    channel.bind('chat-message', function(data) {
        //add sound
        // fetch notification details ( both read and unread )
        console.log(data)
        alert(JSON.stringify(data))
    });*/


    let allMessages = []
    useEffect(() => {
        if (!isLoading) {
            if (data !== undefined) {
                if (data?.pages[0]?.data?.length > 0) {
                    allMessages = [...data?.pages[0]?.data]
                    dispatch(addAllMessages(allMessages.reverse()))
                }
            }
        }
    }, [data]);

    // console.log(data?.pages[0].data)
    const loadMore = () => {
        if (hasNextPage) {
            fetchNextPage();
        }

    }


    useEffect(() => {

           connect()
       // connect()
       // console.log(pusher.connectionState)

    }, []);


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
        console.log("Subscription Succeeded")
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

    const {isLoading: isSending, mutate} = useMutation(['sendMessage'], sendMessage, {
        onSuccess: (data) => {

            if (data.success) {
                setText('')
                refetch()
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries(['sendMessage']);
        }

    })

    const handleNewMessage = (message: string) => {
        const body = JSON.stringify({
            message
        })
        mutate({body, id: educator.id})

    }


    useRefreshOnFocus(refetch)
    //console.log(pusher.connectionState)
//console.log(educator.id)

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={require('../../../assets/images/signal/streamer_BG.png')}
                             resizeMode={'cover'}
                             style={styles.dashboardImage}>


                <HeaderWithTitle title={`${educator.first_name} ${educator.last_name} Chanel`}/>

                <View style={styles.flatList}>
                    {
                        isLoading && <ActivityIndicator size='large' color={"#fff"}/>
                    }

                 {
                     !isLoading && data?.pages[0].data.length > 0 &&

                    <MessagesList _id={User_Details.id} roomID={''} messages={myMessages}/>
                    }

                    {!isLoading && data?.pages[0].data.length < 1 &&
                        <View style={styles.messageWrap}>



                            <View style={styles.imageWrap}>

                                <Image source={require('../../../assets/images/EmptyBox/empty_state.png')} style={styles.fileBroken}/>


                            </View>


                            <Text style={styles.message}>
                                No Messages yet!

                            </Text>
                        </View>
                    }


                </View>




                <KeyboardAvoidingView

                    style={[styles.root]}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={50}
                >
                    <IF condition={educator.id === userData.id}>

                    {/*              <Button title={"SEND MESSAGE"} onPress={sendMessage}/>*/}



                        <View style={styles.innerContainer}>
                            <View style={styles.inputAndMicrophone}>

                                <TextInput


                                    placeholder={"Type your message here..."}
                                    style={styles.input}
                                    value={text}

                                    placeholderTextColor={Colors.textDark}
                                    onChangeText={(text) => setText(text)}
                                />

                                {
                                    isSending && <ActivityIndicator size='small' color={Colors.primary}/>
                                }
                                {
                                    !isSending &&

                                    <TouchableOpacity onPress={() => handleNewMessage(text)}
                                                      style={styles.rightIconButtonStyle}>

                                        <Ionicons name="paper-plane-outline" size={24} color={Colors.textDark}/>
                                    </TouchableOpacity>
                                }
                            </View>

                        </View>
                    </IF>
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
    messageWrap: {
        marginTop: 15,
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    message: {
        textAlign: 'center',
        marginLeft: 8,
        lineHeight: heightPixel(25),
        color: "#fff",
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumBold
    },
    imageWrap: {
        maxHeight: heightPixel(140),
        width: heightPixel(100),
        alignItems: 'center',
        justifyContent: 'center',
    },
    fileBroken: {
        height: "80%",
        width: "100%",
        resizeMode: 'contain'
    },

})

export default MessageScreen;

import React, {useState, useRef, useCallback, useId, useEffect, useMemo} from "react";
import {FlatList, ScrollView, Text, StyleSheet, View, RefreshControl, TouchableOpacity} from "react-native";
import Colors from "../constants/Colors";
import {useAppSelector} from "../app/hooks";
import {fontPixel, heightPixel} from "../helpers/normalize";
import {Fonts} from "../constants/Fonts";
import dayjs from "dayjs";
import FastImage from "react-native-fast-image";
import {Entypo} from "@expo/vector-icons";
import Pinchable from "react-native-pinchable";

import Autolink from 'react-native-autolink';

interface props {

    isLeft: boolean,
    copyToClipboard:(text:string)=>void
    item: {
        id: string,
        "group_id": string,
        "message": string,
        "type": string,
        "sender": {
            "id": string,
            "name": string,
            "photo": string
        },
        "created_at": string,
        "formatedDate": string,
        "formatedTime": string
    }
}

const Message = ({item, isLeft,copyToClipboard}: props) => {




    const isOnLeft = (type: string) => {
        if (isLeft && type === "messageContainer") {
            return {
                alignSelf: "flex-start",
                backgroundColor: Colors.primary,

                borderTopLeftRadius: 0,
            };
        } else if (isLeft && type === "message") {
            return {
                color: "#fff",
            };
        } else if (isLeft && type === "time") {
            return {
                color: "#fff",
            };
        } else {
            return {
                color: "#fff",
                borderTopRightRadius: 0,
            };
        }
    };

    return (
        <View style={styles.container}>
            {
                isLeft &&
                <View>

                    <View style={{flexDirection: 'row'}}>

                        <View style={styles.profileImage}>


                            <FastImage
                                style={styles.Avatar}
                                source={{
                                    uri: item?.sender?.photo ? item?.sender?.photo : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
                                    cache: FastImage.cacheControl.web,
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </View>


                        {
                            item?.type == 'media' ?
                                <View
                                    style={[
                                        styles.messageContainer,
                                        styles.messageBox,


                                    ]}
                                >
                                    <Pinchable style={styles.qrBoxWrap}>
                                        <FastImage
                                            style={styles.chart_photo}
                                            source={{
                                                uri: item?.message,
                                                cache: FastImage.cacheControl.web,
                                                priority: FastImage.priority.normal,
                                            }}
                                            resizeMode={FastImage.resizeMode.contain}
                                        />
                                    </Pinchable>

                                </View>
                                :
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onLongPress={() => {
                                        copyToClipboard(item?.message)
                                    }}
                                    style={[
                                        styles.messageContainer,
                                        styles.messageBox,

                                    ]}
                                >
                                    <Text  style={[styles.messageText, {
                                        color: Colors.textDark
                                    }]}>

                                        <Autolink

                                            linkStyle={{
                                                fontFamily:Fonts.faktumMedium,
                                                color:'blue',
                                                textDecorationLine:'underline'
                                            }}
                                            // Required: the text to parse for links
                                            text={item?.message}
                                            // Optional: enable email linking
                                            email
                                            // Optional: enable hashtag linking to instagram
                                            hashtag="instagram"
                                            // Optional: enable @username linking to twitter
                                            mention="twitter"
                                            // Optional: enable phone linking
                                            phone="sms"
                                            // Optional: enable URL linking
                                            url
                                            // Optional: custom linking matchers
                                         //   matchers={[MyCustomTextMatcher]}
                                        />
                                    </Text>
                                </TouchableOpacity>

                        }

                    </View>
                    <View style={[styles.timeView, {
                        paddingLeft: 35,
                    }]}>
                        <Text style={[styles.time, {alignSelf: "flex-start",}]}>
                            {dayjs(item?.created_at).format('hh:mm A')}
                            <Entypo style={{marginHorizontal: 5,}} name="dot-single" size={14} color="#fff"/>
                            <Text style={[styles.time, {
                                fontFamily: Fonts.faktumSemiBold, color: Colors.text
                            }]}>
                                {item?.sender?.name}
                            </Text>
                        </Text>
                    </View>
                </View>
            }
            {
                !isLeft &&
                <View>


                    <View
                        style={[
                            styles.messageContainer,
                            {borderTopRightRadius: 0,}
                        ]}
                    >
                        <Text style={styles.messageText}>
                            {item?.message}
                        </Text>
                    </View>
                    <View style={styles.timeView}>
                        <Text style={[styles.time,]}>
                            {dayjs(item?.created_at).format('hh:mm A')}

                        </Text>

                    </View>
                </View>
            }

        </View>
    )
}

interface MessagesList {
    _id: string,
    roomID: string,
    messages: [],
    refresh: () => void,
    copyToClipboard: (text:string) => void,
    refreshing: boolean
}

const MessagesList = ({_id, roomID, refreshing, messages, refresh,copyToClipboard}: MessagesList) => {



    const user = useAppSelector(state => state.user)
    const {User_Details, userData} = user


    // Create a memoized reversedData array using useMemo
   ; // Only recomputed when data changes

//console.log(messages)
    const scrollView = useRef();

    const renderItem = useCallback(
        ({item}) => (
            <Message
                copyToClipboard={copyToClipboard}
                item={item}
                key={item.id}
                isLeft={item.sender.id !== userData.id}


            />
        ),
        [],
    );

    const keyExtractor = useCallback(
        (item: { id: string; }) => item.id,
        [],
    );


    return (
        /*  <ScrollView style={{backgroundColor: "#EFEBF1", flex: 1}}
                      ref={ref => scrollView.current = ref}
                      onContentChange={() => {
                          scrollView.current.scrollToEnd({animated: true})
                      }}
          >*/

        <View style={{flex: 1, width: '100%'}}>
            <FlatList refreshControl={
                <RefreshControl
                    tintColor={Colors.primary}
                    refreshing={refreshing}
                    onRefresh={refresh}
                />
            } refreshing={refreshing} onRefresh={refresh} showsVerticalScrollIndicator={false} scrollEnabled
                      data={messages} inverted  renderItem={renderItem}
                      keyExtractor={keyExtractor}/>
        </View>


    );
};

const styles = StyleSheet.create({

    container: {
        paddingVertical: 10,
        marginVertical: 5,

    },
    messageContainer: {
        backgroundColor: "#fff",
        maxWidth: "80%",
        alignSelf: "flex-end",
        flexDirection: "row",
        borderRadius: 15,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    messageBox: {
        alignSelf: "flex-start",
        backgroundColor: Colors.text,
        borderColor: Colors.background,
        borderWidth: 0.5,
        borderTopLeftRadius: 0,
    },
    messageText: {
        color: Colors.textDark,
        fontFamily: Fonts.faktumSemiBold,
        fontSize: fontPixel(12)
    },
    timeView: {
        marginTop: 5,
        paddingEnd: 10,
        backgroundColor: "transparent",
        justifyContent: "flex-end",

    },

    time: {

        color: "lightgray",
        alignSelf: "flex-end",

    },
    Avatar: {
        borderRadius: 100,
        resizeMode: 'cover',
        width: '100%',
        height: '100%'
    },
    profileImage: {
        width: 25,
        height: 25,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    qrBoxWrap: {

        width: '100%',
        height: heightPixel(200),
        alignItems: 'center',
        justifyContent: "center",


    },
    chart_photo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',

    },

})

export default MessagesList;
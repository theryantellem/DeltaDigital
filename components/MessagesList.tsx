import React, {useState, useRef, useCallback, useId} from "react";
import {FlatList, ScrollView, Text, StyleSheet, View} from "react-native";
import Colors from "../constants/Colors";
import {useAppSelector} from "../app/hooks";
import {fontPixel} from "../helpers/normalize";
import {Fonts} from "../constants/Fonts";
import dayjs from "dayjs";
import FastImage from "react-native-fast-image";
import {Entypo} from "@expo/vector-icons";


interface props {

    message: string
}

const Message = ({message,time, image,name,isLeft}) => {


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

                <View style={{flexDirection:'row'}}>

                    <View style={styles.profileImage}>


                        <FastImage
                            style={styles.Avatar}
                            source={{
                                uri: image ? image : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
                                cache: FastImage.cacheControl.web,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    </View>

                    <View
                    style={[
                        styles.messageContainer,
                        {

                            alignSelf: "flex-start",
                            backgroundColor: Colors.text,
borderColor:Colors.background,
                            borderWidth:0.5,
                            borderTopLeftRadius: 0,
                        }
                    ]}
                >
                    <Text style={[styles.messageText,{
                        color: Colors.textDark
                    }]}>
                        {message}
                    </Text>
                </View>

                </View>
                    <View style={[styles.timeView,{
                        paddingLeft: 35,
                    }]}>
                        <Text style={[styles.time, {  alignSelf: "flex-start",}]}>
                            {dayjs(time).format('hh:mm A')}
                            <Entypo style={{marginHorizontal:5,}} name="dot-single" size={14} color="#fff" />
                            <Text style={[styles.time,{
fontFamily:Fonts.faktumSemiBold,color: Colors.text
                            }]}>
                                {name}
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
                        {     borderTopRightRadius: 0,}
                    ]}
                >
                    <Text style={styles.messageText}>
                        {message}
                    </Text>
                </View>
                    <View style={styles.timeView}>
                        <Text style={[styles.time,]}>
                            {dayjs(time).format('hh:mm A')}

                        </Text>

                    </View>
                </View>
            }

        </View>
    )
}


const MessagesList = ({_id, roomID, messages}: { _id: string, roomID: string, messages: [] }) => {

    const user = useAppSelector(state => state.user)
    const {User_Details, userData} = user


    const scrollView = useRef();

    const renderItem = useCallback(
        (item: { item: { created_at: any; id: string, sender: { id: string; }; message: any; }; }) => (
            <Message
                key={item.item.id}
                time={item.item.created_at}
                isLeft={item.item.sender.id !== userData.id}
                message={item.item.message}
                image={item.item.sender.photo}
                name={item.item.sender.name}

            />
        ),
        [],
    );

    const keyExtractor = useCallback(
        (item: { _id: any; }) => item._id,
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
            <FlatList scrollEnabled data={messages} inverted={true} renderItem={renderItem}
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
    messageText: {
        color: Colors.textDark,
        fontFamily: Fonts.faktumSemiBold,
        fontSize: fontPixel(12)
    },
    timeView: {
        marginTop:5,
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

})

export default MessagesList;
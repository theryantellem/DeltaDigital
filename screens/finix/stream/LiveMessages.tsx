import React, {useCallback} from 'react';
import {StyleSheet, View, Text, FlatList, RefreshControl} from "react-native";
import {Fonts} from "../../../constants/Fonts";
import Colors from "../../../constants/Colors";
import {fontPixel} from "../../../helpers/normalize";
import {useInfiniteQuery} from "@tanstack/react-query";
import {getAlMessage} from "../../../api/finix-api";


interface props {
    item:{
        "id": string
        "message": string,
        "sender": {"id": string, "name": string, "photo":string},
        "created_at": string,
        "formatedDate": string,
        "formatedTime": string
    }
}
const MessageCard = ({item}:props)=>{
    return(
        <View style={styles.chatUser}>
            <View style={styles.chatBody}>
                <View style={styles.chatBodyLeft}>
                    <View style={styles.chatUserImage}>

                    </View>
                    <Text style={styles.chatUserName}>
                        {item.sender.name}
                    </Text>
                </View>

                <Text>
                    {item.formatedTime}
                </Text>
            </View>

            <View style={styles.chatMessage}>
                <Text style={styles.chatText}>
                    {item.message}
                </Text>
            </View>
        </View>
    )
}

const LiveMessages = ({messages}:{messages:[]}) => {

    const keyExtractor = useCallback(
        (item: { id: string; }) => item.id,
        [],
    );
    const renderItem = useCallback(
        ({item}) => (
            <MessageCard item={item}/>
        ),
        [],
    );




    return (
        <FlatList keyboardDismissMode={"interactive"} showsVerticalScrollIndicator={false} scrollEnabled
                  data={messages} inverted  renderItem={renderItem}
                  keyExtractor={keyExtractor}/>
    );
};

const styles = StyleSheet.create({
    chatUser: {
        width: '100%',

        alignItems: 'center',
        minHeight: 60,
        justifyContent: 'flex-start',
    },
    chatBody: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        justifyContent: 'space-between',
    },
    chatUserName: {
        fontFamily: Fonts.faktumBold,
        color: Colors.textDark,
        fontSize: fontPixel(14),
    },
    chatText: {
        fontFamily: Fonts.faktumRegular,
        color: Colors.textDark,
        fontSize: fontPixel(14),
    },
    chatBodyLeft: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        justifyContent: 'flex-start',
    },
    chatUserImage: {
        marginRight: 8,
        height: 30,
        width: 30,
        backgroundColor: "#eee",
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    chatMessage: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

})

export default LiveMessages;

import React, {useState, useRef, useCallback, useId} from "react";
import {FlatList, ScrollView,Text, StyleSheet, View} from "react-native";
import Colors from "../constants/Colors";
import {useAppSelector} from "../app/hooks";
import {fontPixel} from "../helpers/normalize";
import {Fonts} from "../constants/Fonts";


interface props {

    message:string
}

const Message = ({message,isLeft}) => {


    const isOnLeft = (type: string) => {
        if (isLeft && type === "messageContainer") {
            return {
                alignSelf: "flex-start",
                backgroundColor: "#fff",

                borderTopLeftRadius: 0,
            };
        } else if (isLeft && type === "message") {
            return {
                color:  "#fff",
            };
        } else if (isLeft && type === "time") {
            return {
                color: "#fff",
            };
        } else {
            return {
                borderTopRightRadius: 0,
            };
        }
    };

    return(
        <View style={styles.container}>
            <View
                style={[
                    styles.messageContainer,
                    isOnLeft("messageContainer"),
                ]}
            >
<Text style={styles.messageText}>
    {message}
</Text>
            </View>
        </View>
    )
}


const MessagesList = ({_id,roomID,messages}:{_id:string,roomID:string,messages:[]}) => {

   const user = useAppSelector(state => state.user)
    const {User_Details} = user





    const scrollView = useRef();

    const renderItem = useCallback(
        (item: { item: { created_at: any; id:string,sender: { id: string; }; message: any; }; }) => (
            <Message
                key={item.item.id}
                time={item.item.created_at}
                isLeft={item.item.sender.id !== User_Details.id}
                message={item.item.message}

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

        <View style={{ flex: 1, width:'100%'}}>
            <FlatList  scrollEnabled  data={messages}   inverted={true} renderItem={renderItem} keyExtractor={keyExtractor}/>
        </View>


    );
};

const  styles = StyleSheet.create({

    container: {
        paddingVertical: 10,
        marginVertical: 5,

    },
    messageContainer: {
        backgroundColor:"#fff",
        maxWidth: "80%",
        alignSelf: "flex-end",
        flexDirection: "row",
        borderRadius: 15,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 10,
    },
    messageText:{
        color:Colors.textDark,
        fontFamily:Fonts.faktumMedium,
        fontSize:fontPixel(12)
    }
})

export default MessagesList;
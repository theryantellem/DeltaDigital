import React, {useState, useRef, useCallback, useId} from "react";
import {FlatList, ScrollView,Text, StyleSheet, View} from "react-native";
import Colors from "../constants/Colors";


interface props {

    message:string
}

const Message = ({message,isLeft}) => {


    const isOnLeft = (type: string) => {
        if (isLeft && type === "messageContainer") {
            return {
                alignSelf: "flex-start",
                backgroundColor: "#ccc",

                borderTopLeftRadius: 0,
            };
        } else if (isLeft && type === "message") {
            return {
                color:  "#fff",
            };
        } else if (isLeft && type === "time") {
            return {
                color: "#eee",
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
<Text>
    {message}
</Text>
            </View>
        </View>
    )
}


const MessagesList = ({_id,roomID,messages}:{_id:string,roomID:string,messages:[]}) => {


//console.log("USER:"+_id)

    const user = useRef(0);
    const scrollView = useRef();

    const renderItem = useCallback(
        (item: { item: { updatedAt: any; user: string; text: any; }; }, index: React.Key | null | undefined) => (
            <Message
                key={index}
                time={item.item.updatedAt}
                isLeft={item.item.user !== _id}
                message={item.item.text}

            />
        ),
        [],
    );

    const keyExtractor = useCallback(
        (item) => item._id,
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
            <FlatList scrollEnabled  data={messages}   inverted={true} renderItem={renderItem} keyExtractor={keyExtractor}/>
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
})

export default MessagesList;
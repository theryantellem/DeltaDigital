import React, {useCallback, useState} from 'react';

import {Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl} from 'react-native';
import HeaderWithTitle from "../../../components/cyborg/header/HeaderWithTitle";

import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {useAppSelector} from "../../../app/hooks";
import {useQuery} from "@tanstack/react-query";
import {getFeedback} from "../../../api";
import {MaterialCommunityIcons, Octicons} from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import {Fonts} from "../../../constants/Fonts";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical} from "../../../helpers/normalize";
import {FlashList} from "@shopify/flash-list";
import {useRefreshOnFocus, wait} from "../../../helpers";




interface itemProps {
    item: {
        "id": string,
        "image": string,
        "message": string,
        "status": string,
        "support reply": string,
        "title": string,
    }
}
const ActivityCard = ({item}: itemProps) => {
    const backgroundColor = item.status === "1" ? Colors.tintSuccess :  Colors.tintPending
    const iconColor = item.status === "1" ? Colors.success : Colors.pendingYellow

    return(
        <TouchableOpacity activeOpacity={0.6} style={styles.activityCard}>
            <View style={styles.activityTop}>
                <View style={[styles.activityTopLeft,{

                }]}>
                    <View style={[styles.icon, {
                        backgroundColor
                    }]}>

                        <MaterialCommunityIcons name="comment-processing-outline" size={18} color={iconColor} />

                    </View>
                    <Text style={[styles.activityTitle,{
                        marginLeft:5,
                    }]}>
                        {item.title}
                    </Text>
                </View>


                <Text style={styles.activityTitle}>


                </Text>
            </View>

            <View style={styles.activityBody}>
                <Text style={styles.activityBodyText}>
                    {item.message}
                </Text>
            </View>
            <View style={styles.activityBottom}>
                <View style={styles.activityTopLeft}>

                    <Text style={[styles.activityTitle,{
                        fontFamily: Fonts.faktumRegItalic
                    }]}>
                        Reply
                    </Text>
                </View>

                <View style={styles.bottomStatus}>
                    <Octicons name="dot-fill" size={13} color={"#fff"}/>
                    <Text style={[styles.activityTitle, {
                        marginLeft: 5,
                    }]}>

                        {item['support reply']}
                    </Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}

const FeedbackRecord = () => {


    const [refreshing, setRefreshing] = useState(false);



    const user = useAppSelector(state => state.user)
    const {User_Details} = user

   const {data,isLoading,isRefetching,refetch} = useQuery(['getFeedback',User_Details.id],()=>getFeedback(User_Details.id))



    const keyExtractor = useCallback((item: { id: string }) => item.id, [],);


    const renderItem = useCallback(({item}) => (
        <ActivityCard item={item}/>
    ), [])

    const refresh = () => {
        setRefreshing(true)
        refetch()
        wait(2000).then(() => setRefreshing(false));
    }

    useRefreshOnFocus(refetch)

    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={Colors.primaryGradient}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}

            >


                <HeaderWithTitle title='Feedback Record'/>
                <View style={styles.flatList}>

                    {
                        isLoading && <ActivityIndicator size='small' color={Colors.primary}/>
                    }


                    {
                        !isLoading && data &&
                        <FlashList
                            estimatedItemSize={200}
                            refreshing={isLoading}

                            scrollEnabled
                            showsVerticalScrollIndicator={false}
                            data={data.data.Tickets}
                            renderItem={renderItem}
                            keyExtractor={keyExtractor}
                            onEndReachedThreshold={0.3}
                            refreshControl={
                                <RefreshControl
                                    tintColor={Colors.text}
                                    refreshing={refreshing}
                                    onRefresh={refresh}
                                />
                            }
                            ListFooterComponent={isRefetching ?
                                <ActivityIndicator size="small" color={Colors.primary}/> : null}

                        />
                    }
                </View>
            </LinearGradient>
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

        flex: 1,
        width: '100%',
        alignItems: "center"
    },
    flatList: {
        width: '90%',

        flex: 1,


    },
    scrollView: {
        width: '100%',
        alignItems: "center"
    },
    activityCard: {
        marginVertical: pixelSizeVertical(10),
        width: '100%',
        height: heightPixel(160),
        borderRadius: 15,
        backgroundColor: Colors.secondary,

        alignItems: 'center',

        justifyContent: 'space-between'
    },
    activityTop: {
        height: '30%',
        width: '100%',
        paddingHorizontal: pixelSizeHorizontal(15),
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    activityTopLeft: {
        width: '60%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    icon: {
        width: 25,
        height: 25,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',

        marginRight: 5,
    },
    activityTitle: {
        fontFamily: Fonts.faktumMedium,
        color: Colors.text,
        fontSize: fontPixel(14)
    },
    activityBodyText: {
        width: '100%',
        fontFamily: Fonts.faktumRegular,
        lineHeight: heightPixel(20),
        color:Colors.text,
        fontSize: fontPixel(14)
    }
    ,
    activityBody: {
        height: '40%',
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: Colors.borderColor,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderColor,
        paddingHorizontal: pixelSizeHorizontal(15),
        justifyContent: 'center'
    },
    activityBottom: {
        height: '30%',
        width: '100%',
        paddingHorizontal: pixelSizeHorizontal(15),
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    bottomStatus: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },

})

export default FeedbackRecord;

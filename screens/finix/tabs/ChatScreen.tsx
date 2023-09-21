import React, {useCallback, useState} from 'react';

import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity
} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";

import {useQuery} from "@tanstack/react-query";
import {getEducatorsFollowing} from "../../../api/finix-api";
import Colors from "../../../constants/Colors";
import {FlashList} from "@shopify/flash-list";
import FastImage from "react-native-fast-image";
import {Fonts} from "../../../constants/Fonts";
import {MyButton} from "../../../components/MyButton";
import {wait} from "../../../helpers";
import {SignalRootTabScreenProps} from "../../../types";
import {fontPixel, heightPixel} from "../../../helpers/normalize";
import {Entypo} from "@expo/vector-icons";
import FinixTopBar from "../../../components/signal/FinixTopBar";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";


interface props {
    startMessage: (educator: { "email": string,
        "first_name": string,
        "id": string,
        "last_name": string,
        "photo": string,
        "total_followers": number,}) => void
    item: {
        educator: {
            "email": string,
            "first_name": string,
            "id": string,
            "last_name": string,
            "photo": string,
            "total_followers": number,
        }
    }

}

const EducatorItem = ({item, startMessage}: props) => {

    return (
        <TouchableOpacity onPress={() => startMessage(item.educator)} style={styles.favList}>
            <View style={[styles.listIcon, {
                //  backgroundColor: Colors.secondary,
            }]}>


                <FastImage
                    style={styles.tAvatar}
                    source={{
                        cache: FastImage.cacheControl.web,
                        uri: item.educator.photo,
                        priority: FastImage.priority.normal,
                    }}

                    resizeMode={FastImage.resizeMode.cover}
                />


            </View>
            <View
                style={styles.listBody}>
                <Text style={styles.bodyTitle}>
                    {item.educator.first_name} {item.educator.last_name}
                </Text>
                <View style={styles.listBottom}>


                    <Text style={styles.bodySubText}>
                        Hi i'm new here
                    </Text>

                </View>

            </View>


            <Entypo name="chevron-right" size={14} color="#fff"/>


        </TouchableOpacity>
    )
}


const ChatScreen = ({navigation}: SignalRootTabScreenProps<'SignalChat'>) => {

    const [refreshing, setRefreshing] = useState(false);

    const {data, isLoading, refetch} = useQuery([`get-Educators-Following`], getEducatorsFollowing)

    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user)
    const {User_Details} = user


    const keyExtractor = useCallback((item: { id: any; }) => item.id, [],);

    const startMessage = (educator: {
        "email": string,
        "first_name": string,
        "id": string,
        "last_name": string,
        "photo": string,
        "total_followers": number,
    }) => {
        navigation.navigate('MainSignalNav', {
            screen: 'MessageScreen', params: {educator}
        })
    }

    const renderItem = useCallback(
        ({item}) => <EducatorItem startMessage={startMessage} item={item}/>,
        [],
    );

    const refresh = () => {
        setRefreshing(true)
        refetch()
        wait(2000).then(() => setRefreshing(false));
    }


    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={require('../../../assets/images/signal/streamer_BG.png')}
                             resizeMode={'cover'}
                             style={styles.dashboardImage}>


                <View style={styles.flatList}>

                    <FinixTopBar
                        color={"#fff"}
                        profilePhoto={User_Details.image ? User_Details.image : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}
                        userName={User_Details.username}/>
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
                            data={data?.data}
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


                        />
                    }
                </View>


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
    favList: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: heightPixel(90),

    },

    listIcon: {
        width: 55,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tAvatar: {

        borderRadius: 10,
        resizeMode: 'cover',
        width: '100%',
        height: '100%'
    },
    listBody: {
        width: '70%',
        height: '50%',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },

    followText: {
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumBold,
        color: Colors.text
    },
    bodyTitle: {
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumBold,
        color: Colors.text
    },
    listBottom: {
        width: '100%',
        height: '40%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    bodySubText: {

        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumRegItalic,
        color: Colors.tintText
    },

})

export default ChatScreen;

import React, {useCallback} from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Pressable,
    ImageBackground,
    FlatList,
    ActivityIndicator, Image
} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {Entypo, Ionicons} from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import {fontPixel, heightPixel, pixelSizeHorizontal, widthPixel} from "../../../helpers/normalize";
import {SafeAreaView} from "react-native-safe-area-context";
import {Fonts} from "../../../constants/Fonts";
import {useQuery} from "@tanstack/react-query";
import {educatorsLive} from "../../../api/finix-api";
import {SignalStackScreenProps} from "../../../types";
import FastImage from "react-native-fast-image";



interface streamProps {
    joinLiveStream: (educatorId:string,last_name:string,stream_url:string,photo: string,first_name:string) => void,
    item: {
        "id": string,
        "first_name": string,
        "last_name": string,
        "photo": string
        "is_live": number,
        "stream_url": string
        "thumbnail": string
    }
}

const ItemStreams = ({joinLiveStream,item}: streamProps) => {


    return (

        <TouchableOpacity onPress={()=>joinLiveStream(item.id,item.last_name,item.stream_url, item.photo,item.first_name)} activeOpacity={0.8} style={styles.streamCard}>
            <View style={styles.streamLiveTag}>
                <Entypo name="dot-single" size={24} color={"#fff"}/>
                {
                    item.is_live == 1 &&

                    <Text style={[styles.liveText, {}]}>
                        Live
                    </Text>
                }
            </View>


            <FastImage

                style={styles.streamImage}
                source={{
                    uri: item.thumbnail,

                    cache: FastImage.cacheControl.web,
                    priority: FastImage.priority.normal,

                }}
                resizeMode={FastImage.resizeMode.cover}
            />

        </TouchableOpacity>
    )
}



const AllStreams = ({navigation}: SignalStackScreenProps<'AllStreams'>) => {


    const {
        data: liveEducators,
        isLoading: loadingLive,
        refetch: fetchLive
    } = useQuery([`educators-Live`], educatorsLive)
    const keyExtractor = useCallback((item: { id: any; }) => item.id, [],)


    const joinLiveStream = (educatorId: string, last_name: string, stream_url: string, photo: string, first_name: string) => {
        navigation.navigate('LiveStream',

            {
                last_name, stream_url, photo, first_name, educatorId

            })
    }



    const renderItemStreams = useCallback(
        ({item}) => <ItemStreams item={item} joinLiveStream={joinLiveStream}/>,
        [],
    );

    const goBack = () => {
navigation.goBack()
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={require('../../../assets/images/signal/signal_BG.png')}
                             resizeMode={'cover'}
                             style={styles.dashboardImage}>
                <StatusBar style="dark"/>
                <View style={styles.topBar}>
                    <TouchableOpacity style={[styles.backBtn, {}]} onPress={goBack}>
                        <Ionicons name="md-chevron-back" color={Colors.textDark} size={heightPixel(24)}/>

                    </TouchableOpacity>

                    <Pressable style={[styles.titleWrap, {}]}>


                        <Text style={styles.title}>
                            Streams
                        </Text>

                    </Pressable>
                    <TouchableOpacity style={styles.rightBtn}>


                    </TouchableOpacity>

                </View>

                <View style={{

                flex:1,
                    width:'100%',
                    alignItems:'center',

                }}>



                    {!loadingLive && liveEducators && liveEducators?.data?.length < 1 &&
                        <View style={styles.messageWrap}>


                            <View style={styles.imageWrap}>

                                <Image source={require('../../../assets/images/EmptyBox/empty_state.png')}
                                       style={styles.fileBroken}/>


                            </View>


                            <Text style={[styles.message,{
                                color: Colors.textDark
                            }]}>
                                No Streamer is live now

                            </Text>
                        </View>
                    }

                    {
                        loadingLive && <ActivityIndicator color={Colors.primary} size='small'/>
                    }

                    {
                    !loadingLive && liveEducators &&

                    <FlatList
                        data={liveEducators?.data}

                        keyExtractor={keyExtractor}
                        horizontal
                        pagingEnabled
                        scrollEnabled
                        snapToAlignment="center"
                        scrollEventThrottle={16}
                        decelerationRate={"fast"}
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderItemStreams}
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
        backgroundColor: "#fff",
    },
    dashboardImage: {
        // paddingHorizontal: pixelSizeHorizontal(20),
        resizeMode: 'cover',
        width: '100%',
        flex: 1,
        borderRadius: 30,
        alignItems: 'center',

    },
    topBar: {
        height: heightPixel(80),
        width: '100%',
        paddingHorizontal: pixelSizeHorizontal(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: "#E5E7EB",
        // borderBottomWidth: 1,
    },
    title: {
        textAlign: 'center',
        color: Colors.textDark,
        textTransform: 'capitalize',
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumSemiBold
    },
    titleWrap: {
        width: '52%',

        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },

    rightBtn: {
        width: '20%',
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    backBtn: {
        width: '20%',
        height: 40,
        borderRadius: 40,
        alignItems: 'flex-start',
        justifyContent: 'center',
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
    streamCard: {
        marginHorizontal: 10,
        width: widthPixel(300),
        height: heightPixel(180),
        borderRadius: 14,
        alignItems: "center",
        justifyContent: 'center',
        overflow: 'hidden'
    },
    liveText: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(12),
        color: Colors.text
    },
    streamLiveTag: {
        zIndex: 1,
        position: 'absolute',
        left: 15,
        top: 5,
        flexDirection: 'row',

        paddingHorizontal: pixelSizeHorizontal(5),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        minHeight: 20,
        backgroundColor: Colors.errorRed
    },
    streamImage: {
        height: '100%',
        width: '100%',
        borderRadius: 14,

        resizeMode: 'cover'
    },

})

export default AllStreams;

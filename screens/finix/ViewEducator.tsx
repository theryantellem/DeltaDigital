import React, {useCallback} from 'react';

import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Pressable,
    ActivityIndicator, FlatList, Image, Dimensions
} from 'react-native';
import FastImage from "react-native-fast-image";
import {SafeAreaView} from "react-native-safe-area-context";
import {FontAwesome, Ionicons, SimpleLineIcons} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import {LinearGradient} from 'expo-linear-gradient';
import {fontPixel, heightPixel, pixelSizeHorizontal, widthPixel} from "../../helpers/normalize";
import {Fonts} from "../../constants/Fonts";
import {SignalRootTabScreenProps, SignalStackScreenProps} from "../../types";
import {MyButton} from "../../components/MyButton";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getSignals, unFollowEducator} from "../../api/finix-api";
import {addNotificationItem} from "../../app/slices/dataSlice";
import {useAppDispatch} from "../../app/hooks";


const Courses = []


const width = Dimensions.get('window').width

interface Props {

    viewSignal: (signal: {
        "id": string,
        "educator": {
            "id": string,
            "first_name": string,
            last_name: string,
            "email": string,
            "photo": string,
            "total_followers": number
        },
        "asset": {
            "id": number,
            "image": string,
            "name": string,
            "symbol": string
        },
        "order_type": string,
        "entry_price": number,
        "stop_loss": number,
        "target_price": number,
        "comment": string,
        "photo": string,
        "chart_photo": string,
        "market_status": string,
        "status": string
    }) => void

    item: {
        "id": string,
        "educator": {
            "id": string,
            "first_name": string,
            "last_name": string,
            "email": string,
            "photo": string,
            "total_followers": number
        },
        "asset": {
            "id": number,
            "image": string,
            "name": string,
            "symbol": string
        },
        "order_type": string,
        "entry_price": number,
        "stop_loss": number,
        "target_price": number,
        "comment": string,
        "photo": string,
        "chart_photo": string,
        "market_status": string,
        "status": string
    }
}


const ItemSignal = ({item, viewSignal}: Props) => {

    return (

        <TouchableOpacity onPress={() => viewSignal(item)} activeOpacity={0.8} style={styles.loanAppCard}>


            <View style={styles.topCard}>
                <View style={styles.IconImageWrap}>
                    <Image style={styles.IconImage}
                           source={{uri: item.asset.image }}/>


                </View>

                <View>
                    <Text style={styles.assetText}>
                        {item.asset.name}
                    </Text>
                    <Text style={[styles.assetText, {
                        fontFamily: Fonts.faktumRegular
                    }]}>
                        Crypto
                    </Text>
                </View>

            </View>

            <View style={styles.bottomCard}>

                <View style={styles.bottomCardRow}>
                    <Text style={styles.bottomCardText}>
                        Order type
                    </Text>
                    <Text style={styles.bottomCardSubText}>
                        {item.order_type}
                    </Text>

                </View>
                <View style={styles.bottomCardRow}>
                    <Text style={styles.bottomCardText}>
                        Status
                    </Text>
                    <Text style={styles.bottomCardSubText}>
                        {item.status}
                    </Text>

                </View>
                <View style={styles.bottomCardRow}>
                    <Text style={styles.bottomCardText}>
                        Target price
                    </Text>
                    <Text style={styles.bottomCardSubText}>
                        {item.target_price}
                    </Text>

                </View>
                <Text style={styles.educatorName}>
                    Carlos Osorio
                </Text>


            </View>


        </TouchableOpacity>
    )
}

const ViewEducator = ({navigation, route}: SignalStackScreenProps<'ViewEducator'>) => {

    const {educator} = route.params

    const dispatch = useAppDispatch()
    const queryClient = useQueryClient()

    const viewSignal = (details: {
        "id": string,
        "educator": {
            "id": string,
            "first_name": string,
            last_name: string,
            "email": string,
            "photo": string,
            "total_followers": number
        },
        "asset": string,
        "order_type": string,
        "entry_price": number,
        "stop_loss": number,
        "target_price": number,
        "comment": string,
        "photo": string,
        "chart_photo": string,
        "market_status": string,
        "status": string
    }) => {

        navigation.navigate('SignalDetails', {
            details: details

        })
    }

    const {mutate: unFollowNow, isLoading: unFollowing} = useMutation(['unFollowEducator'], unFollowEducator, {
        onSuccess: (data) => {

            if (data.success) {
                // fetchEducators()
                //refetch()

                dispatch(addNotificationItem({
                    id: Math.random(),
                    type: 'success',
                    body: data.message,
                }))

                //  refetchFavs()
            } else {

            }

        },
        onSettled: () => {
            queryClient.invalidateQueries(['unFollowEducator']);
        }
    })

    const {data: signals, isLoading: loadingSignals, refetch: refetchSignals} = useQuery(['getSignals'], getSignals)

    const keyExtractor = useCallback((item: { id: any; }) => item.id, [],)

    const renderItemSignal = useCallback(
        ({item}) => <ItemSignal item={item} viewSignal={viewSignal}/>,
        [],
    );

    const seeSignalSummary = () => {
        navigation.navigate('SignalSummary')
    }
    const goBackNow = () => {
        navigation.goBack()
    }
    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={require('../../assets/images/signal/signal_BG.png')}
                             resizeMode={'cover'}
                             style={styles.dashboardImage}>
                <ScrollView style={{
                    width: '100%'
                }} contentContainerStyle={styles.scrollView} scrollEnabled
                            showsVerticalScrollIndicator={false}
                >

                    <ImageBackground style={styles.bannerTop}
                                     source={require('../../assets/images/signal/finix_banner_BG.png')}>


                        <View style={styles.topBar}>
                            <TouchableOpacity onPress={goBackNow} style={[styles.backBtn, {}]}>
                                <Ionicons name="md-chevron-back" color={Colors.text} size={heightPixel(24)}/>
                            </TouchableOpacity>

                            <View>
                                {/* <Text style={styles.title}>
                        Edit profile
                    </Text>*/}

                            </View>

                            <View style={styles.backBtn}>


                            </View>
                        </View>


                        <View style={styles.favList}>
                            <View style={[styles.listIcon, {
                                //  backgroundColor: Colors.secondary,
                            }]}>


                                <FastImage
                                    style={styles.tAvatar}
                                    source={{
                                        cache: FastImage.cacheControl.web,
                                        uri: educator.photo,
                                        priority: FastImage.priority.normal,
                                    }}

                                    resizeMode={FastImage.resizeMode.cover}
                                />


                            </View>
                            <View
                                style={styles.listBody}>
                                <Text style={styles.bodyTitle}>
                                    {educator.first_name} {educator.last_name}
                                </Text>
                                <View style={styles.listBottom}>


                                    <Text style={styles.bodySubText}>
                                        {educator.total_followers} <Text
                                        style={{fontFamily: Fonts.faktumRegular}}>followers </Text>
                                    </Text>

                                </View>

                            </View>


                            <MyButton style={[styles.listBodyRight, {
                                // backgroundColor: !isValid ? Colors.border : Colors.primary
                            }]}>
                                <LinearGradient style={styles.createBtnGradient}
                                                colors={['#8D34F1', '#0075FF']}

                                                start={{x: 0.3, y: 1}}
                                                end={{x: 1, y: 3.3,}}

                                    // locations={[0.1, 0.7,]}
                                >
                                    <Text style={styles.buttonTxt}>
                                        Following
                                    </Text>

                                </LinearGradient>
                            </MyButton>


                        </View>
                    </ImageBackground>


                    <View style={styles.fakeTabWrapper}>

                        <Pressable style={styles.tabButton}>
                            <Text style={[styles.tabButtonText, {
                                color: "#8E32C5"
                            }]}>
                                Crypto
                            </Text>
                        </Pressable>

                        <Pressable style={styles.tabButton}>
                            <Text style={styles.tabButtonText}>
                                Forex
                            </Text>
                        </Pressable>

                        <Pressable style={styles.tabButton}>
                            <Text style={styles.tabButtonText}>
                                Stocks
                            </Text>
                        </Pressable>
                    </View>


                    <ImageBackground resizeMethod={"scale"}
                                     source={require('../../assets/images/signal/educator_BG.png')}
                                     style={[styles.segmentBody, {
                                         height: 250,
                                         marginTop: 20,
                                     }]}>

                        <View style={styles.ActivityCardTop}>
                            <Text style={[styles.listTitle, {}]}>
                                Signals
                            </Text>
                            <TouchableOpacity onPress={seeSignalSummary} activeOpacity={0.7} style={styles.seeAll}>
                                <FontAwesome name="plus-circle" size={24} color="#fff"/>

                            </TouchableOpacity>
                        </View>
                        {
                            loadingSignals && <ActivityIndicator color={Colors.primary} size='small'/>
                        }
                        {
                            !loadingSignals && signals && signals?.data?.length > 0 &&
                            <FlatList
                                data={signals?.data}
                                keyExtractor={keyExtractor}
                                horizontal
                                pagingEnabled
                                scrollEnabled
                                snapToAlignment="center"
                                scrollEventThrottle={16}
                                decelerationRate={"fast"}
                                showsHorizontalScrollIndicator={false}
                                renderItem={renderItemSignal}
                            />
                        }
                    </ImageBackground>


                    <ImageBackground resizeMethod={"scale"}
                                     source={require('../../assets/images/signal/educator_BG.png')}
                                     style={[styles.segmentBody, {
                                         height: 150,
                                         marginTop: 20,
                                     }]}>

                        <View style={styles.ActivityCardTop}>
                            <Text style={[styles.listTitle, {
                                fontFamily: Fonts.faktumBold
                            }]}>
                                Courses
                            </Text>

                        </View>

                        <View style={{
                            width:'100%',
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-evenly'
                        }}>

                            <Image source={require('../../assets/images/signal/cours_img.png')} style={{
                                width:120,
                                height:70,
                                resizeMode:"contain"
                            }}/>
 <Image source={require('../../assets/images/signal/cours_img.png')} style={{
                                width:120,
                                height:70,
                                resizeMode:"contain"
                            }}/>

                        </View>


                    </ImageBackground>


                    <ImageBackground resizeMethod={"scale"}
                                     source={require('../../assets/images/signal/educator_BG.png')}
                                     style={[styles.segmentBody, {
                                         height: 150,
                                         marginTop: 20,
                                     }]}>

                        <View style={styles.ActivityCardTop}>
                            <Text style={[styles.listTitle, {
                                fontFamily: Fonts.faktumBold
                            }]}>
                                Streaming
                            </Text>

                        </View>


                    </ImageBackground>


                </ScrollView>
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
    scrollView: {
        width: '100%',
        alignItems: 'center',

    },
    dashboardImage: {
        // paddingHorizontal: pixelSizeHorizontal(20),
        resizeMode: 'cover',
        width: '100%',
        flex: 1,
        borderRadius: 30,
        alignItems: 'center',

    },
    background: {

        flex: 1,
        width: '100%',
        alignItems: "center"
    },
    topBar: {
        height: heightPixel(80),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: pixelSizeHorizontal(15)
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 40,


        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: Colors.textDark,
        fontSize: fontPixel(18),
        fontFamily: Fonts.faktumBold
    },
    bannerTop: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: heightPixel(200),
    },
    favList: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
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
        width: '50%',
        height: '50%',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },


    createBtnGradient: {
        width: '100%',
        height: '65%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTxt: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(12),
        color: "#fff"
    },
    listBodyRight: {
        borderRadius: 10,
        width: 100,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center'
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
    bodySubText: {
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumMedium,
        color: Colors.tintText
    },
    listBottom: {
        width: '100%',
        height: '40%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    fakeTabWrapper: {
        flexDirection: 'row',
        marginTop: 15,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 40,
    },
    tabButton: {
        width: widthPixel(70),
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabButtonText: {
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumBold,
        color: "#9D9D9D"
    },
    loanAppCard: {
        marginHorizontal: pixelSizeHorizontal(12),
        width: widthPixel(170),
        height: heightPixel(180),
        borderRadius: 18,
        backgroundColor: "rgba(255,255,255,0.16)",
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: pixelSizeHorizontal(15),

    },
    topCard: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '100%',

    },

    IconImageWrap: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    IconImage: {
        height: '100%',
        width: '100%',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },

    assetText: {
        color: Colors.text,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumBold
    },
    bottomCard: {
        height: 90,

        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',

    },
    bottomCardRow: {
        width: '100%',
        height: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bottomCardText: {
        color: Colors.text,
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumSemiBold
    },
    bottomCardSubText: {
        textTransform: 'capitalize',
        color: Colors.success,
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumBold
    },
    educatorName: {
        marginTop: 8,
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(12),
        textAlign: 'center',
        color: Colors.text
    },
    segmentBody: {

        width: width - 40,
        alignItems: 'flex-start',
        height: 150,
        resizeMode: 'cover',
        overflow: 'hidden',
        borderRadius: 30,
        justifyContent: 'flex-start',
        paddingVertical: pixelSizeHorizontal(10),
        // marginBottom: 20
    },
    ActivityCardTop: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        height: heightPixel(40),
    },
    listTitle: {
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumRegular,
        color: Colors.text
    },
    tintText: {
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumRegular,
        color: Colors.tintText
    },
    seeAll: {
        flexDirection: 'row',
        alignItems: 'center'
    },


})

export default ViewEducator;

import React, {SetStateAction, useCallback, useState} from 'react';

import {
    Text,
    View,
    StyleSheet,
    RefreshControl,
    ScrollView,
    Platform,
    ActivityIndicator,
    FlatList,
    Dimensions, TouchableOpacity, Image, ImageBackground
} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import FinixTopBar from "../../../components/signal/FinixTopBar";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import Colors from "../../../constants/Colors";
import GradientSegmentControl from "../../../components/segment-control/GradientSegmentControl";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from "../../../helpers/normalize";
import SegmentedControl from "../../../components/segment-control/SegmentContol";
import HomeSegmentedTabs from "../../../components/signal/HomeSegmentTabs";
import {useQuery} from "@tanstack/react-query";
import {getEducators, getEducatorsFollowing, getSignals} from "../../../api/finix-api";
import {useRefreshOnFocus} from "../../../helpers";
import {Fonts} from "../../../constants/Fonts";
import {IF} from "../../../helpers/ConditionJsx";
import {Entypo, FontAwesome, Ionicons} from "@expo/vector-icons";
import HorizontalLine from "../../../components/HorizontalLine";
import {SignalRootTabScreenProps} from "../../../types";


const width = Dimensions.get('window').width

interface props {
    viewEducator: (details: {}) => void,
    item: {

        "created_at": string,
        "educator": {
            "email": string,
            "first_name": string,
            "id": string,
            "last_name": string,
            "photo": string,
            "total_followers": number,
        },
        "id": string,
    }
}


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
        category:{
            name:string
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
                           source={{uri: item.asset.image}}/>


                </View>

                <View>
                    <Text style={styles.assetText}>
                            {item.asset.name}
                    </Text>
                    <Text style={[styles.assetText, {
                        fontFamily: Fonts.faktumRegular
                    }]}>
                        {item.category.name}
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
                    <Text style={[styles.bottomCardSubText,{
                        color: Colors.pendingYellow
                    }]}>
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
                    {item.educator.last_name} {item.educator.first_name}
                </Text>


            </View>


        </TouchableOpacity>
    )
}


const EducatorItem = ({item, viewEducator}: props) => {

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => viewEducator(item)} style={styles.educatorSmallCard}>
            <View style={styles.liveTag}>

                <Text style={[styles.liveText, {}]}>
                    1
                </Text>
            </View>
            <View style={styles.educatorSmallCardImage}>
                <Image style={styles.tAvatar}
                       source={{uri: item.educator.photo}}/>
            </View>

            <View style={styles.educatorNameWrap}>
                <Text style={styles.educatorName}>
                    {item.educator.last_name} {item.educator.first_name}
                </Text>
            </View>

        </TouchableOpacity>

    )
}
const HomeSignal = ({navigation}: SignalRootTabScreenProps<'SignalHome'>) => {

    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user)
    const {User_Details} = user


    const [tabIndex, setTabIndex] = useState(0);
    const handleTabsChange = (index: SetStateAction<number>) => {
        setTabIndex(index);
        //  setScreen(index === 0 ? 'Banks' : 'Wallets')
    };

    const {data, isLoading, refetch} = useQuery([`get-educators`], getEducators)
    const {data: myEducators, isLoading: loading} = useQuery([`getEducatorsFollowing`], getEducatorsFollowing)


    const {data: signals, isLoading: loadingSignals, refetch: refetchSignals} = useQuery(['getSignals'], getSignals)


    const viewEducator = (details: {}) => {
        navigation.navigate('MainSignalNav', {
            screen: 'ViewEducator', params: details
        })

    }


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
    }) => {

        navigation.navigate('MainSignalNav', {
            screen: 'SignalDetails', params: {details: details}

        })
    }


    const keyExtractor = useCallback((item: { id: any; }) => item.id, [],)

    const renderItem = useCallback(
        ({item}) => <EducatorItem item={item} viewEducator={viewEducator}/>,
        [],
    );

    const renderItemSignal = useCallback(
        ({item}) => <ItemSignal item={item} viewSignal={viewSignal}/>,
        [],
    );


    const seeSignalSummary = () => {
        navigation.navigate('MainSignalNav', {
            screen: 'SignalSummary'
        })
    }

    const addFollowing = () => {

        navigation.navigate('MainSignalNav', {
            screen: 'StreamersList'
        })
    }

    useRefreshOnFocus(refetch)


    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={require('../../../assets/images/signal/signal_BG.png')}
                             resizeMode={'cover'}
                             style={styles.dashboardImage}>
                <ScrollView style={{width: '100%',}} contentContainerStyle={styles.scrollView} scrollEnabled
                            showsVerticalScrollIndicator={false}>


                    <FinixTopBar
                        profilePhoto={User_Details.image ? User_Details.image : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}
                        userName={User_Details.username}/>


                    {/*   <View style={styles.topTabButtons}>
                        <HomeSegmentedTabs tabs={["Signals", "Categories"]}
                                           currentIndex={tabIndex}
                                           onChange={handleTabsChange}
                                           segmentedControlBackgroundColor={Colors.tintPrimary}
                                           activeSegmentBackgroundColor={"#EAF6EB"}
                                           activeTextColor={Colors.text}
                                           textColor={Colors.text}
                                           paddingVertical={pixelSizeVertical(8)}
                        />
                    </View>*/}


                    <IF condition={tabIndex == 0}>


                        <ImageBackground source={require('../../../assets/images/signal/educator_BG.png')}
                                         style={styles.segmentBody}>

                            <View style={styles.ActivityCardTop}>
                                <Text style={[styles.listTitle, {}]}>
                                    Following
                                </Text>
                                <TouchableOpacity onPress={addFollowing} activeOpacity={0.7} style={styles.seeAll}>
                                    <FontAwesome name="plus-circle" size={24} color="#fff"/>

                                </TouchableOpacity>
                            </View>

                            {
                                isLoading && <ActivityIndicator color={Colors.primary} size='small'/>
                            }
                            {
                                !isLoading && myEducators && myEducators?.data?.length > 0 &&
                                <FlatList
                                    data={myEducators?.data}
                                    keyExtractor={keyExtractor}
                                    horizontal
                                    pagingEnabled
                                    scrollEnabled
                                    snapToAlignment="center"
                                    scrollEventThrottle={16}
                                    decelerationRate={"fast"}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={renderItem}
                                />
                            }
                        </ImageBackground>


                        <ImageBackground resizeMethod={"scale"}
                                         source={require('../../../assets/images/signal/educator_BG.png')}
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
                    </IF>


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
    background: {
        paddingHorizontal: 20,
        flex: 1,
        width: '100%',
        alignItems: "center"
    },
    scrollView: {
        width: '100%',
        alignItems: "center",
        paddingHorizontal: 20,
    },

    topTabButtons: {
        width: '90%',
        height: heightPixel(60),
        justifyContent: 'flex-start'

    },
    educatorSmallCard: {
        width: 85,
        minHeight: 100,

        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    educatorSmallCardImage: {
        width: 45,
        height: 45,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff"
    },
    tAvatar: {
        resizeMode: 'cover',
        height: '100%',
        width: '100%',
        borderRadius: 100,
    },
    liveTag: {
        right: 10,
        top: 0,
        zIndex: 1,
        height: 18,
        width: 18,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        position: "absolute",

        borderRadius: 10,
        backgroundColor: Colors.primary
    },
    liveText: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(12),
        color: Colors.text
    },
    educatorNameWrap: {
        width: '90%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'flex-start',
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
    listIcon: {
        height: 25,
        width: 25,
        alignItems: 'center',
        justifyContent: 'center'
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
    dashboardImage: {
        // paddingHorizontal: pixelSizeHorizontal(20),
        resizeMode: 'cover',
        width: '100%',
        flex: 1,
        borderRadius: 30,
        alignItems: 'center',

    },

})

export default HomeSignal;

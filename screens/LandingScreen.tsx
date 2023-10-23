import React, {useCallback, useEffect, useRef, useState} from 'react';

import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Dimensions,
    Platform, ImageBackground, Pressable, RefreshControl
} from 'react-native';
import {RootStackScreenProps} from "../types";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";

import {fontPixel, heightPixel, pixelSizeHorizontal, widthPixel} from "../helpers/normalize";
import {Fonts} from "../constants/Fonts";
import Colors from "../constants/Colors";
import {useFocusEffect} from "@react-navigation/native";
import Animated, {Easing, FadeInDown, FadeOutDown, Layout} from 'react-native-reanimated';

import {useAppDispatch, useAppSelector} from "../app/hooks";
import FastImage from "react-native-fast-image";
import {useQuery} from "@tanstack/react-query";
import {activeStrategy, binanceTicker, checkUserPlan, getAsset, getUser, quantitativeStrategies} from "../api";
import {currencyFormatter, invertNumber, useRefreshOnFocus, wait} from "../helpers";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {addNotificationItem} from "../app/slices/dataSlice";
import ToastAnimated from "../components/toast";
import {getSignals, getSignalsTest, getUserInfo} from "../api/finix-api";
import {updateUserInfo} from "../app/slices/userSlice";


const {width} = Dimensions.get('screen');
const CARD_WIDTH = Dimensions.get('window').width * 0.8
const CARD_HEIGHT = Dimensions.get('window').height * 0.7
const SPACING_FOR_CARD_INSET = Dimensions.get('window').width * 0.1 - 20

type CardType = {
    name: string,
    balance: string | number,
    bg: string,
    id: string,
    action: () => void,
    btnBg: string,
    description: string,
    icon: string
}


interface itemProps {
    tickers: [],
    item: {
        [x: string]: any;
        id: React.Key | null | undefined;
        Market: string,
        Avg_Price: string;
        Quantity: string
    }
}

const Item = ({item, tickers}: itemProps) => {

    const tickerRes = tickers?.find((ticker: { symbol: string; }) => ticker.symbol == item.Market.replace('/', ''))


    let p2 = parseFloat(item?.Quantity) * parseFloat(tickerRes?.lastPrice);
    let val = item['Positionamount'] > 0 ? (Number(item['Positionamount']) - (p2)) / Number(item['Positionamount']) : 0;
    let finalvalue = val * 100;
    return (
        <View style={styles.assetCardDetails}>
            <View style={styles.assetCardIcon}>
                <Image
                    source={{uri: `https://backend.deltacyborg.pro/Upload/coin/${item['coin image']}`}}
                    style={styles.logo}/>
            </View>
            <Text style={{
                color: finalvalue ? invertNumber(parseFloat(finalvalue)) < 0 ? Colors.errorRed : Colors.successChart : Colors.successChart,
                fontSize: fontPixel(14),
                marginLeft: 5,
                fontFamily: Fonts.faktumMedium
            }}>
                {finalvalue ? invertNumber(parseFloat(finalvalue)) : '0.00'}%
            </Text>
        </View>
    )
}

const LandingScreen = ({navigation}: RootStackScreenProps<'LandingScreen'>) => {
    const user = useAppSelector(state => state.user)
    const {User_Details,userData} = user

    const {
        data: signals,
        isLoading: loadingSignals,
        refetch: refetchSignals
    } = useQuery(['user-Signals'], getSignals)


    const [refreshing, setRefreshing] = useState(false);

    const [greeting, setGreeting] = useState('');
    const {data:userInfoData, refetch:refetchUserInfo,isLoading} = useQuery(['user-info-data'], getUserInfo,)
const dispatch = useAppDispatch()
    const {
        data: Asset,
        refetch: fetchAsset,
        isLoading: loading
    } = useQuery(['user-Asset'], () => getAsset(User_Details.id))

    //const {} =  useQuery(['checkUserPlan',User_Details.id],()=>checkUserPlan(User_Details.id))


    const {
        data: tickers,
        refetch: fetchTickers,
        isLoading: fetchingTickers
    } = useQuery(['binanceTicker'], binanceTicker)


    useFocusEffect(
        useCallback(() => {
            // Do something when the screen is focused
            const hour = new Date().getHours();
            const welcomeTypes = ["Morning",
                "Good Day",
                "Hi",];
            let welcomeText = "";

            if (hour <= 12) welcomeText = welcomeTypes[0];
            else if (hour < 10) welcomeText = welcomeTypes[3];
            else if (hour < 18) welcomeText = welcomeTypes[1];
            else welcomeText = welcomeTypes[2]

            setGreeting(welcomeText)
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [])
    );


    const StarfoxHome = () => {

    }
    const FinixHome = () => {

            navigation.navigate('MainSignalNav')


    }

    useEffect(() => {
if(!isLoading && userInfoData) {


    dispatch((updateUserInfo({...userInfoData?.data})))
}

    }, [userInfoData]);


    const CyborgHome = () => {
        if(userData?.cyborg) {
            navigation.navigate('CyborgBottomTab')
        }else {
            dispatch(addNotificationItem({
                id: Math.random(),
                type: 'error',
                body: "You cannot access Delta Cyborg with your current plan. Please upgrade your plan to be able to access Delta Cyborg",
            }))
        }
    }

    const cards = [
        {
            name: 'Finix',
            balance: 0,
            bg: "#090A1C",
            id: "2",
            action: FinixHome,
            btnBg: "#fff",
            description: "Learn",
            image: <Image source={require('../assets/images/robots/Finix.png')} style={styles.imageRobot}/>,
            icon: <Image source={require('../assets/images/logos/finixLogo.png')} style={{
                width: 50,
                height: '100%',
                resizeMode: 'cover'
            }}/>,

        },

        {
            name: 'Cyborg',
            bg: "#090A1C",
            id: "1",
            action: CyborgHome,
            btnBg: "#fff",
            balance: Asset?.data?.total_assets,
            description: " Spot/Future",
            image: <Image source={require('../assets/images/robots/cyborg.png')} style={[styles.imageRobot, {
                resizeMode: Platform.OS == 'android' ? 'cover' : 'cover'
            }]}/>,
            icon: <Image source={require('../assets/images/logos/cyborlogo.png')} style={styles.imageLogo}/>,

        },
        /* {
             name: 'Starfox',
             balance: 0,
             bg: "#090A1C",
             id: "3",
             action: StarfoxHome,
             btnBg: "#fff",
             description: "Forex",
             image: <Image source={require('../assets/images/robots/cyborg.png')} style={styles.imageRobot}/>,
             icon: <Image source={require('../assets/images/signal.jpeg')} style={{
                 width: 65,
                 height: '100%',
                 resizeMode: 'cover'
             }}/>,

         },*/
    ]

    const {
        data: strategy,
        refetch: fetchStrategy,
        isLoading: loadingStrategy
    } = useQuery(['activeStrategy'], () => activeStrategy(User_Details.id))




    const {
        data: strategies,
        isLoading: loadingStrategies,
        refetch: fetchStrategies
    } = useQuery(['quantitativeStrategies', User_Details.id], () => quantitativeStrategies(User_Details.id))


    const TotalBal = parseInt(strategies?.data?.binance_balance) + parseInt(strategies?.data?.futures_binance_balance)

    const _renderViews = (views: CardType[]): JSX.Element[] => {
        return views.map(card => {


            /*      let old_price = parseInt(card?.Quantity) * parseInt(card?.Avg_Price);
                  let new_value = parseInt(card?.Quantity) * tickerRes?.lastPrice;
                  let finalvalue = new_value - old_price;*/
            return (
                <TouchableOpacity
                    key={card.id}
                    onPress={card.action}
                    activeOpacity={0.8} style={[styles.plan,
                    {backgroundColor: '#000000', width: CARD_WIDTH,},
             card.id == '2' && {
                        marginRight: 20
                    },
                    /*
                    card.id !== '2' &&{
                        marginLeft: 30
                    }*/]}>
                    <View style={styles.planLeft}>
                        <View style={styles.imageCover}>

                            <Text style={styles.brandName}>
                                {card.name}
                            </Text>
                            {card.icon}

                        </View>

                        {
                            card.id == '1' &&
                            <>

                                <View style={styles.planBottomLeft}>
                                    <Text style={styles.balText}>
                                        Balance
                                    </Text>
                                    <Text
                                        style={styles.balance}>

                                        { TotalBal ? currencyFormatter('en-US', 'USD').format(TotalBal)  :"0.00"}

                                    </Text>

                                </View>

                                <View style={styles.planBottomLeft}>
                                    <Text style={styles.balText}>
                                        Active trades
                                    </Text>

                                    {
                                        !loadingStrategy &&
                                        strategy && strategy?.data &&
                                        strategy?.data['Operation Strategy']?.slice(0, 2).map((item: {
                                            [x: string]: any;
                                            id: React.Key | null | undefined;
                                            Market: string,
                                            Avg_Price: number | bigint;
                                            Quantity: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
                                        }, index: any) => (
                                            <Item key={item.id} tickers={tickers} item={item}/>
                                        ))}


                                </View>
                            </>

                        }


                        {
                            card.id == '2' &&
                            <>

                               {/* <View style={styles.planBottomLeft}>
                                   <Text style={styles.balText}>
                                        Live Sessions
                                    </Text>
                               <Text
                                        style={styles.balance}>

                                        {currencyFormatter('en-US', 'USD').format(TotalBal)}

                                    </Text>

                                </View>*/}

                                <View style={styles.planBottomLeft}>
                                    <Text style={styles.balText}>
                                        New Signals
                                    </Text>


                                    {
                                        !loadingSignals &&
                                        signals &&  signals?.data &&
                                        signals?.data.filter(sigs => sigs.category.type == 'trade').slice(0,3).map((item, index: any) => (
                                            <View style={styles.assetCardDetails} key={item.id}>
                                                <View style={styles.assetCardIcon}>
                                                    <Image
                                                        source={{uri: item.asset.image}}
                                                        style={styles.logo}/>
                                                </View>
                                                <Text style={{
                                                    color:Colors.text,
                                                    fontSize: fontPixel(14),
                                                    marginLeft: 5,
                                                    fontFamily: Fonts.faktumMedium
                                                }}>

                                                    {item.asset.name}
                                                </Text>
                                            </View>
                                        ))}



                                </View>
                            </>

                        }
                    </View>


                    <View style={styles.planRight}>
                        <View style={styles.imageRobotWrap}>
                            {card.image}
                        </View>


                    </View>
                </TouchableOpacity>
            )
        })
    }

    useRefreshOnFocus(fetchStrategies)
    useRefreshOnFocus(fetchAsset)
    useRefreshOnFocus(refetchSignals)
    useRefreshOnFocus(refetchUserInfo)


    const refresh = () => {
        setRefreshing(true)
        fetchStrategies()
        refetchUserInfo()
        fetchAsset()
        wait(2000).then(() => setRefreshing(false));
    }

    const scrollViewRef = useRef(null);

    const handleScroll = (x) => {
        if (scrollViewRef.current) {
            scrollViewRef?.current?.scrollTo({x, animated: true});
        }
    };

    const viewProfile = () => {
      navigation.navigate('EditProfile')
    }

    useEffect(()=>{
        let x = 1
        if (scrollViewRef.current) {
            scrollViewRef?.current?.scrollTo({x, animated: true});
        }
    },[scrollViewRef])

    return (
        <SafeAreaView style={styles.safeArea}>
        {/*    {

                loading &&
                <View style={styles.loading}>
                    <ActivityIndicator size='large' color={Colors.primary}/>
                </View>

            }*/}

            {/*    <LinearGradient style={styles.background}
                            colors={['#4E044B', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}


            >*/}
            <ImageBackground source={require('../assets/images/Blackbackground.jpg')} style={styles.background}>


                <View style={styles.topBar}>
                    <View style={styles.leftButton}>
                        <Pressable onPress={viewProfile} style={styles.userImageWrap}>


                            <FastImage
                                style={styles.tAvatar}
                                source={{
                                    uri: User_Details.image ? User_Details.image : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
                                    cache: FastImage.cacheControl.web,
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />


                        </Pressable>
                        <View style={styles.userDetails}>
                            <Text style={styles.greeting}>
                                Hello, {userData.name}
                            </Text>
                            <Text style={styles.tag}>
                                Welcome back
                            </Text>
                        </View>
                    </View>


                </View>


                <ScrollView style={{width: '100%',}} contentContainerStyle={styles.scrollView} scrollEnabled
                            showsVerticalScrollIndicator={false}


                            refreshControl={<RefreshControl tintColor={Colors.primary} refreshing={refreshing}
                                                            onRefresh={refresh}/>}>
                    <View style={styles.introTextWrap}>
                        <Image source={require('../assets/images/logos/deltadigitallogo2.png')}
                               style={styles.deltadigitallogo2}/>


                    </View>


                    <View style={styles.buttonWRap}>

                        <Pressable onPress={viewProfile} style={styles.controlIconWrap}>
                            <MaterialCommunityIcons name="sort-variant" size={32} color="#fff"/>
                        </Pressable>

                        <Pressable onPress={() => handleScroll(1)} style={styles.controlLogoWrap}>
                            <Image source={require('../assets/images/logos/finixLogo.png')} style={styles.controlLogo}/>
                        </Pressable>

                        <Pressable onPress={() => handleScroll(400)} style={styles.controlLogoWrap}>
                            <Image source={require('../assets/images/logos/cyborlogo.png')} style={styles.controlLogo}/>
                        </Pressable>
                    </View>


                    {


                        <Animated.ScrollView
                            ref={scrollViewRef}
                            layout={Layout.easing(Easing.bounce).delay(100)} entering={FadeInDown.springify()}
                            exiting={FadeOutDown}
                            showsHorizontalScrollIndicator={false}
                            horizontal // Change the direction to horizontal
                            pagingEnabled // Enable paging
                            decelerationRate={0} // Disable deceleration
                            snapToInterval={CARD_WIDTH + 10} // Calculate the size for a card including marginLeft and marginRight
                            snapToAlignment='center' // Snap to the center
                            contentInset={{ // iOS ONLY
                                top: 0,
                               // left: SPACING_FOR_CARD_INSET, // Left spacing for the very first card
                                bottom: 0,
                                right: SPACING_FOR_CARD_INSET // Right spacing for the very last card
                            }}

                            contentContainerStyle={{ // contentInset alternative for Android
                            // paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 15// Horizontal spacing before and after the ScrollView
                                paddingHorizontal:SPACING_FOR_CARD_INSET,
                            }}
                        >
                            {_renderViews(cards)}
                        </Animated.ScrollView>
                    }
                </ScrollView>

                <View style={styles.ownYourFutureWrap}>
                    <Text style={styles.ownYourFuture}>
                        #OwnTheFuture
                    </Text>
                </View>
                <ToastAnimated/>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        width: '100%',
        backgroundColor: "#141621",
        alignItems: 'center',

    },
    background: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover',
        alignItems: 'center'
        // paddingHorizontal: pixelSizeHorizontal(20),
    },
    scrollView: {
        //  backgroundColor: Colors.background,

        width: '100%',
        alignItems: 'center'
    },
    topBar: {
        width: '90%',
        height: heightPixel(90),

        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    topTabButtons: {
        width: '90%',
        height: heightPixel(60),
        justifyContent: 'flex-start'

    },
    leftButton: {
        width: '100%',
        height: '90%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    userDetails: {
        width: '82%',
        height: '50%',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        marginHorizontal: pixelSizeHorizontal(10)
    },
    greeting: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(16),
        color: "#fff",
    },
    tag: {
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(14),
        color: "#D9D9D9",
    },

    userImageWrap: {
        width: 42,
        height: 42,
        alignItems: 'center',
        borderRadius: 45,
        overflow: 'hidden'
    },
    userImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'

    },

    tAvatar: {
        borderRadius: 100,
        resizeMode: 'cover',
        width: '100%',
        height: '100%'
    },
    planContainer: {
        width: '100%',
        alignItems: 'center',

        justifyContent: 'space-between',
        height: heightPixel(630)
    },

    planLeft: {

        width: '50%',
        height: '90%',
        alignItems: 'flex-start'
    },
    planRight: {
        width: '45%',
        height: '100%',

    },
    imageRobotWrap: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageRobot: {
        height: '90%',
        width: '90%',

    },
    plan: {
        flexDirection: 'row',

     //  marginRight: 15,
        height: heightPixel(400),
        width: '100%',
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    planBottom: {
        width: '100%',
        alignItems: 'center',
        height: heightPixel(120),
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    planBottomLeft: {
        width: '100%',
        alignItems: 'flex-start',
        height: 80,
        justifyContent: 'flex-start'
    },
    balText: {
        fontFamily: Fonts.faktumRegular,
        color: "#d9d9d9",
        fontSize: fontPixel(14),
        marginRight: 5,
    },
    planTitle: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(40),
        color: Colors.text
    },
    planDescription: {
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(14),
        color: "#EAF6EB",
        lineHeight: heightPixel(22)
    },
    planDescriptionWrap: {
        width: '60%'
    },
    planTop: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        height: heightPixel(120),
        justifyContent: 'space-between'
    },
    APYPill: {
        paddingHorizontal: pixelSizeHorizontal(15),
        backgroundColor: Colors.secondary,
        minWidth: widthPixel(100),
        borderRadius: 20,
        height: heightPixel(35),
        alignItems: 'center',
        justifyContent: 'center'
    },
    apyText: {
        fontFamily: Fonts.faktumMedium,
        fontSize: fontPixel(14),
        color: "#fff"
    },
    introTextWrap: {
        height: heightPixel(100),
        width: '90%',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
    },
    titleText: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(24),
        color: "#fff"
    },
    textSub: {
        textAlign: 'center',
        fontFamily: Fonts.faktumMedium,
        fontSize: fontPixel(18),
        color: "#d9d9d9"
    },
    imageCover: {
        marginBottom: 15,
        height: 65,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',

    },
    brandName: {
        marginRight: 5,
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(26),
        color: "#fff"
    },

    imageLogo: {
        width: 60,
        height: '70%',
        resizeMode: 'contain'
    },

    loading: {
        flex: 1,
        width: '100%',
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 1,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    balanceGraph: {
        backgroundColor: 'red',
        width: '100%',
        alignItems: 'center',
        height: heightPixel(55),
        flexDirection: 'row',
        justifyContent: 'space-between',

    }, balance: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(28),
        color: "#fff",
    },
    assetCardDetails: {

        flexDirection: 'row',
        width: '100%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'flex-start'

    },
    assetCardIcon: {
        borderRadius: 40,
        width: 25,
        height: 25,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    logo: {
        borderRadius: 20,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',

    },
    deltadigitallogo2: {
        width: widthPixel(200),
        height: 50,
        resizeMode: 'cover'
    },
    ownYourFuture: {
        fontFamily: Fonts.faktumRegular,
        fontSize: fontPixel(16),
        color: "#fff",
    },
    ownYourFutureWrap: {
        width: '80%',
        height: 50,

    },
    buttonWRap: {
        height: 80,
        width: '90%',

        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    controlIconWrap: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: "#FFFFFF33"
    },
    controlLogoWrap: {
        marginLeft: 15,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: "#FFFFFF"
    },
    controlLogo: {
        resizeMode: 'contain',
        width: 45,
        height: 45,
    }

})

export default LandingScreen;

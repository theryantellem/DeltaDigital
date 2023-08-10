import React, {useCallback, useState} from 'react';

import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Dimensions,
    Platform
} from 'react-native';
import {RootStackScreenProps} from "../types";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {AntDesign, Entypo, FontAwesome, MaterialIcons, Octicons} from "@expo/vector-icons";
import {fontPixel, heightPixel, pixelSizeHorizontal, widthPixel} from "../helpers/normalize";
import {Fonts} from "../constants/Fonts";
import Colors from "../constants/Colors";
import {useFocusEffect} from "@react-navigation/native";
import Animated, {Easing, FadeInDown, FadeOutDown, Layout} from 'react-native-reanimated';
import {CyborgBottomTab} from "../navigation/cyborg";
import {useAppSelector} from "../app/hooks";
import FastImage from "react-native-fast-image";
import {useQuery} from "@tanstack/react-query";
import {checkUserPlan, getAsset, getUser} from "../api";
import {currencyFormatter, useRefreshOnFocus} from "../helpers";





const {width} = Dimensions.get('screen');
const CARD_WIDTH = Dimensions.get('window').width * 0.8
const CARD_HEIGHT = Dimensions.get('window').height * 0.7
const SPACING_FOR_CARD_INSET = Dimensions.get('window').width * 0.1 - 10

type CardType = {
    name: string,
    balance: string|number,
    bg: string,
    id: string,
    action: ()=>void,
    btnBg: string,
    description:string,
    icon:string
}

const LandingScreen = ({navigation}: RootStackScreenProps<'LandingScreen'>) => {
    const user = useAppSelector(state => state.user)
    const {User_Details} = user

    const [greeting, setGreeting] = useState('');


    const {data: Asset, refetch: fetchAsset} = useQuery(['user-Asset'], () => getAsset(User_Details.id))

    //const {} =  useQuery(['checkUserPlan',User_Details.id],()=>checkUserPlan(User_Details.id))

    const {data, refetch,isLoading} = useQuery(['user-data'],()=> getUser(User_Details.id))



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

    const CyborgHome = () => {
        navigation.navigate('CyborgBottomTab')
    }


    const cards = [
        {
            name: 'Cyborg',
            bg: "#090A1C",
            id: "1",
            action: CyborgHome,
            btnBg: "#fff",
            balance: Asset?.data?.total_assets,
            description: " Spot/Future",
            icon:   <Image source={require('../assets/images/cyborg-logo.png')} style={styles.imageLogo}/>,

        },
        {
            name: 'Finix',
            balance:0,
            bg: "#090A1C",
            id: "2",
            action: CyborgHome,
            btnBg: "#fff",
            description: "Learn",
            icon:   <Image source={require('../assets/images/cyborg-logo.png')} style={styles.imageLogo}/>,

        },
        {
            name: 'Starfox',
            balance:0,
            bg: "#090A1C",
            id: "3",
            action: CyborgHome,
            btnBg: "#fff",
            description: "Forex",
            icon:   <Image source={require('../assets/images/signal.jpeg')} style={styles.imageLogo}/>,

        },
    ]

    const _renderViews = (views: CardType[]): JSX.Element[] => {
        return views.map(card => {
            return (
                <TouchableOpacity
                    key={card.id}
                    onPress={CyborgHome}
                    activeOpacity={0.8} style={[styles.plan,
                    {backgroundColor: '#090A1C',   width: CARD_WIDTH,}]}>
                    <View style={styles.planTop}>
                        <View style={styles.imageCover}>
                            {card.icon}

                        </View>



                        <View style={styles.APYPill}>
                            <Text style={styles.apyText}>
                                {card.description}
                            </Text>
                        </View>
                    </View>


                    <View style={styles.planBottom}>
                        <View style={styles.planBottomLeft}>
                            <Text style={styles.planTitle}>
                                {card.name}
                            </Text>
                            <View style={styles.planDescriptionWrap}>
                                <Text style={styles.planDescription}>
                                    {currencyFormatter('en-US', 'USD').format(card.balance)}
                                </Text>
                            </View>

                        </View>

                        <Entypo name="chevron-right" size={20} color="#60687E"/>

                    </View>
                </TouchableOpacity>
            )
        })
    }


    useRefreshOnFocus(refetch)

    return (
        <SafeAreaView style={styles.safeArea}>
            {

                isLoading &&
                <View style={styles.loading}>
                    <ActivityIndicator size='large' color={Colors.primary}/>
                </View>

            }

            <LinearGradient style={styles.background}
                            colors={['#4E044B', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}


            >
                <View style={styles.topBar}>
                    <View style={styles.leftButton}>
                        <View style={styles.userImageWrap}>






                                <FastImage
                                style={styles.tAvatar}
                            source={{
                                uri: User_Details.image ? User_Details.image : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
                                cache: FastImage.cacheControl.web,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />


                        </View>
                        <View style={styles.userDetails}>
                            <Text style={styles.greeting}>
                                {greeting}, {User_Details.username}
                            </Text>
                            <Text style={styles.tag}>
                                Welcome back
                            </Text>
                        </View>
                    </View>


                </View>


                <ScrollView style={{width: '100%',}} contentContainerStyle={styles.scrollView} scrollEnabled
                            showsVerticalScrollIndicator={false}>
                    <View style={styles.introTextWrap}>
                        <Text style={styles.titleText}>
                            Delta Signal
                        </Text>

                        <Text style={styles.textSub}>
                            Safe & secure way to send and
                            spend on what you want
                        </Text>
                    </View>




                    {
                        !isLoading &&

                    <Animated.ScrollView
                        layout={Layout.easing(Easing.bounce).delay(100)} entering={FadeInDown.springify()} exiting={FadeOutDown}
                        showsHorizontalScrollIndicator={false}
                        horizontal // Change the direction to horizontal
                        pagingEnabled // Enable paging
                        decelerationRate={0} // Disable deceleration
                        snapToInterval={CARD_WIDTH + 10} // Calculate the size for a card including marginLeft and marginRight
                        snapToAlignment='center' // Snap to the center
                        contentInset={{ // iOS ONLY
                            top: 0,
                            left: SPACING_FOR_CARD_INSET, // Left spacing for the very first card
                            bottom: 0,
                            right: SPACING_FOR_CARD_INSET // Right spacing for the very last card
                        }}
                        contentContainerStyle={{ // contentInset alternative for Android
                            paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0// Horizontal spacing before and after the ScrollView
                        }}
                    >
                        {_renderViews(cards)}
                    </Animated.ScrollView>
                    }
                </ScrollView>
            </LinearGradient>
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
        paddingHorizontal: pixelSizeHorizontal(20),
    },
    scrollView: {
        //  backgroundColor: Colors.background,

        width: '100%',
        alignItems: 'center'
    },
    topBar: {
        width: '100%',
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
    plan: {
        marginRight: 15,
        height: heightPixel(400),
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    planBottom: {
        width: '100%',
        alignItems: 'center',
        height: heightPixel(120),
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    planBottomLeft: {
        width: '80%',
        alignItems: 'flex-start',
        height: '100%',
        justifyContent: 'space-evenly'
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
        height: heightPixel(140),
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
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
    imageCover:{

        height:65,
        width:65,
        alignItems:'center',
        justifyContent:'center',

    },
    imageLogo:{
        width:'100%',
        height:'100%',
        resizeMode:'cover',
    },
    loading: {
        flex:1,
        width:'100%',
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex:1,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'rgba(0,0,0,0.3)'
    }

})

export default LandingScreen;

import React, {useCallback} from 'react';

import {
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import FinixTopBar from "../../../components/signal/FinixTopBar";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useQuery} from "@tanstack/react-query";
import {getSignals} from "../../../api/finix-api";
import {fontPixel, heightPixel, pixelSizeHorizontal, widthPixel} from "../../../helpers/normalize";
import Colors from "../../../constants/Colors";
import {Fonts} from "../../../constants/Fonts";
import Animated, {Easing, FadeInRight, FadeOutLeft, Layout} from 'react-native-reanimated';
import {Ionicons} from "@expo/vector-icons";


const width = Dimensions.get('window').width

interface Props {

    viewSignal: (signal:{}) => void

    item: {
        "id":string,
        "educator": {
            "id": string,
            "first_name":string,
            "last_name": string,
            "email":string,
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
    }
}


const ItemSignal = ({item}:Props) =>{
    return(
      /*  <Animated.View   layout={Layout.easing(Easing.bounce).delay(50)}
                         entering={FadeInRight.springify()} exiting={FadeOutLeft}>
*/
<TouchableOpacity activeOpacity={0.8}  style={styles.loanAppCard}>


            <View style={styles.topCard}>
                <View style={styles.listIcon}>
                    {/*         <Image style={styles.tAvatar}
                                   source={{uri: item.asset.image}}/>*/}


                </View>

                <Text style={styles.assetText}>
                    EURUSD
                </Text>
            </View>

            <View style={styles.bottomCard}>

                <Text style={styles.bottomCardText}>
                    1.300
                </Text>
                <Text style={styles.bottomCardSubText}>
                    Active
                </Text>
            </View>

</TouchableOpacity>
    )
}



const SignalScreen = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user)
    const {User_Details} = user


    const {data,isLoading,refetch} = useQuery(['getSignals'],getSignals)

    const viewSignal = () =>{

    }


    const keyExtractor = useCallback((item: { id: any; }) => item.id, [],)

    const renderItem = useCallback(
        ({item}) => <ItemSignal item={item} viewSignal={viewSignal}/>,
        [],
    );



    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#0a0d5d', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}

            >
               {/* <ScrollView style={{width: '100%',}} contentContainerStyle={styles.scrollView} scrollEnabled
                            showsVerticalScrollIndicator={false}

                >*/}


                    <FinixTopBar
                        profilePhoto={User_Details.image ? User_Details.image : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}
                        userName={User_Details.username}/>




                <View style={styles.ActivityCardTop}>
                    <Text style={[styles.listTitle, {
                        color: Colors.text
                    }]}>
                  Signals
                    </Text>
                    <TouchableOpacity  activeOpacity={0.7} style={styles.seeAll}>
                        <Text style={[styles.tintText, {
                            color: Colors.tintText
                        }]}>See all</Text>
                        <Ionicons name="md-chevron-forward" color={Colors.tintText} size={heightPixel(12)}/>
                    </TouchableOpacity>
                </View>



                <View style={styles.segmentBody}>


                    {
                        isLoading && <ActivityIndicator color={Colors.primary} size='small'/>
                    }
                    {
                        !isLoading && data && data?.data?.length > 0 &&
                        <FlatList
                            data={data?.data}
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
        paddingHorizontal:20,
        flex: 1,
        width: '100%',
        alignItems: "center"
    },
    scrollView: {
        width: '100%',
        alignItems: "center"
    },
    segmentBody: {
        width: width - 40,
        alignItems: 'center',
        height: 140,
//backgroundColor:'red',
        justifyContent: 'space-between',
        //   paddingHorizontal: pixelSizeHorizontal(20),
        // marginBottom: 20
    },
    ActivityCardTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: heightPixel(70),
    },
    listTitle: {
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumBold,
        color: Colors.text
    },
    tintText: {
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumRegular,
        color: Colors.tintText
    },
    seeAll: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    loanAppCard: {
        marginHorizontal: pixelSizeHorizontal(12),
        width: widthPixel(180),
        height: heightPixel(130),
        borderRadius: 8,
        backgroundColor: Colors.secondary,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: pixelSizeHorizontal(15),
        shadowColor: "#212121",
        shadowOffset: {
            width: 0,
            height: 5,

        },

        shadowOpacity: 0.11,
        shadowRadius: 8.22,
        elevation: 5,
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
    tAvatar: {
        resizeMode: 'cover',
        height: '90%',
        width: '90%',
    },
    assetText: {
        color: Colors.text,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumMedium
    },
    bottomCard: {
        height: 50,

        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        width: '100%',

    },
    bottomCardText: {
        color: Colors.text,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumSemiBold
    },
    bottomCardSubText: {
        color: Colors.success,
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumRegular
    },

})

export default SignalScreen;

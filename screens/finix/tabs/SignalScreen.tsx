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
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from "../../../helpers/normalize";
import Colors from "../../../constants/Colors";
import {Fonts} from "../../../constants/Fonts";
import Animated, {Easing, FadeInRight, FadeOutLeft, Layout} from 'react-native-reanimated';
import {Feather, Ionicons} from "@expo/vector-icons";
import {useRefreshOnFocus} from "../../../helpers";
import {SignalRootTabScreenProps} from "../../../types";
import HorizontalLine from "../../../components/HorizontalLine";


const width = Dimensions.get('window').width

interface Props {

    viewSignal: (signal: {}) => void

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


const ItemSignal = ({item, viewSignal}: Props) => {
    return (
        /*  <Animated.View   layout={Layout.easing(Easing.bounce).delay(50)}
                           entering={FadeInRight.springify()} exiting={FadeOutLeft}>
  */
        <TouchableOpacity onPress={() => viewSignal(item)} activeOpacity={0.8} style={styles.loanAppCard}>


            <View style={styles.topCard}>
                <View style={styles.listIcon}>
                    <Image style={styles.tAvatar}
                           source={{uri: item.photo}}/>


                </View>

                <Text style={styles.assetText}>
                    {item.asset}
                </Text>
            </View>

            <View style={styles.bottomCard}>
                <View style={styles.bottomCardInfo}>


                    <Text style={styles.bottomCardText}>
                        {item.entry_price}
                    </Text>
                    <Text style={styles.bottomCardSubText}>
                        {item.order_type}
                    </Text>
                </View>
                <Feather name="chevron-right" size={16} color={Colors.border}/>
            </View>

        </TouchableOpacity>
    )
}


const SignalScreen = ({navigation}: SignalRootTabScreenProps<'Signals'>) => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user)
    const {User_Details} = user


    const {data, isLoading, refetch} = useQuery(['getSignals'], getSignals)


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
        category: {
            name: string,
            type: string
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
        ({item}) => <ItemSignal item={item} viewSignal={viewSignal}/>,
        [],
    );


    useRefreshOnFocus(refetch)

    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#0a0d5d', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}

            >
          <ScrollView style={{width: '100%',}} contentContainerStyle={styles.scrollView} scrollEnabled
                            showsVerticalScrollIndicator={false}

                >


                <FinixTopBar
                    profilePhoto={User_Details.image ? User_Details.image : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}
                    userName={User_Details.username}/>


                <View style={styles.ActivityCardTop}>
                    <Text style={[styles.listTitle, {
                        color: Colors.text
                    }]}>
                        Signals
                    </Text>
                    <TouchableOpacity activeOpacity={0.7} style={styles.seeAll}>
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

                <HorizontalLine margin={20}/>
                <View style={styles.ActivityCardTop}>
                    <Text style={[styles.listTitle, {
                        color: Colors.text
                    }]}>
                        Market status (Pending)
                    </Text>

                </View>

              {
                  data && data?.data.map(((item)=>(
                      <View key={item.id} style={styles.signalHorizontalCard}>

                          <View style={styles.signalImage}>
                              <Image style={styles.itemPhoto}
                                     source={{uri: item.photo}}/>
                          </View>

                          <View style={styles.signalCardBody}>

                              <View style={styles.signalCardBodyInfo}>
                                  <Text style={[styles.signalCardBodyInfoText,{
                                      textTransform: 'uppercase',
                                  }]}>
                                      {item.asset}
                                  </Text>
                                  <Text style={styles.signalCardBodyInfoTextSmall}>
                                      {item.comment}
                                  </Text>
                              </View>

                              <View style={[styles.signalCardBodyInfo, {
                                  alignItems: 'flex-end'
                              }]}>
                                  <Text style={styles.signalCardBodyInfoText}>
                                      {item.entry_price}
                                  </Text>
                                  <Text style={[styles.signalCardBodyInfoTextSmall,{
                                      color: Colors.pendingYellow
                                  }]}>
                                      {item.market_status}
                                  </Text>
                              </View>


                          </View>
                      </View>
                  )))
              }

          </ScrollView>
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
        paddingHorizontal: 20,
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
        borderRadius: 100,
    },
    assetText: {
        color: Colors.text,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumBold
    },
    bottomCard: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
        width: '100%',

    },
    bottomCardInfo: {
        height: 50,

        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        width: '90%',

    },
    bottomCardText: {
        color: Colors.text,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumMedium
    },
    bottomCardSubText: {
        textTransform: 'capitalize',
        color: Colors.success,
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumRegular
    },

    signalHorizontalCard: {
        marginVertical:pixelSizeVertical(12),
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',

        justifyContent: 'space-between'
    },
    signalImage: {
        width: 60,
        borderRadius: 10,
        backgroundColor: Colors.borderColor,
        height: '80%',
    },
    itemPhoto:{
        width: '100%',
        resizeMode:"cover",
        borderRadius: 10,
        height:  '100%',
    },
    signalCardBody: {
        width: '80%',
        height: '90%',
        flexDirection: 'row',
        alignItems: 'center',


        justifyContent: 'space-between'
    },
    signalCardBodyInfo: {
        width: '40%',
        height: '60%',

        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    signalCardBodyInfoText: {
        textTransform: 'capitalize',
        color: Colors.text,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumBold
    },
    signalCardBodyInfoTextSmall: {
        textTransform: 'capitalize',
        color: Colors.tintText,
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumRegular
    }

})

export default SignalScreen;

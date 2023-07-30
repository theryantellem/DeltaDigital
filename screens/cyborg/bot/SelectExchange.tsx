import React, {useCallback} from 'react';

import {Text, View, StyleSheet, ScrollView, FlatList, Pressable, Image} from 'react-native';
import HeaderWithTitle from "../../../components/header/HeaderWithTitle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {RootStackScreenProps} from "../../../types";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from "../../../helpers/normalize";
import {Fonts} from "../../../constants/Fonts";
import Animated, {Easing, FadeInDown, FadeOutDown, Layout} from "react-native-reanimated";
import Colors from "../../../constants/Colors";


const Exchanges = [
    {
        id: '1',
        logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
        status: 'Active',
        rank: "3",
        exchange:'3',
        exchangeName: 'Coinbase'
    }, {
        id: '2',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/1200px-Binance_Logo.svg.png',
        status: 'Active',
        rank: "1",
        exchange:'1',
        exchangeName: 'Binance'
    },{
        id: '3',
        logo: 'https://static-00.iconduck.com/assets.00/kraken-icon-512x512-icmwhmh8.png',
        status: 'Inactive',
        rank: "1",
        exchange:'4',
        exchangeName: 'Kraken'
    },{
        id: '4',
        logo: 'https://assets.staticimg.com/cms/media/3gfl2DgVUqjJ8FnkC7QxhvPmXmPgpt42FrAqklVMr.png',
        status: 'Inactive',
        rank: "1",
        exchange:'2',
        exchangeName: 'Kucoin'
    }
]


interface prop {
    continueAsset:(exchange:string)=>void,
    item: {
        id: string,
        exchangeName: string,
        logo: string,
        status: string,
        exchange: string,
        rank: string,
    }
}

const ExchangeCard = ({item,continueAsset}: prop) => {
    return (
        <Animated.View key={item.id} layout={Layout.easing(Easing.bounce).delay(100)}
                       entering={FadeInDown.springify()} exiting={FadeOutDown}>
            <Pressable onPress={()=>continueAsset(item.exchange)} style={styles.exchangeCard}>
                <View style={styles.exchangeCardTop}>


                    <View style={styles.logoWrap}>
                        <Image source={{uri: item.logo}} style={styles.logo}/>
                    </View>

                    <Text style={[styles.status,{
                        color: item.status == 'Active' ? Colors.success : Colors.textDisable
                    }]}>
                        {item.status}
                    </Text>

                </View>

                <View style={styles.exchangeCardBottom}>
                    <Text style={[styles.exchangeName,{

                    }]}>
                        {item.exchangeName}
                    </Text>

                    <Text style={[styles.rank,{

                    }]}>
                        #{item.exchange}
                    </Text>
                </View>

            </Pressable>
        </Animated.View>
    )
}

const SelectExchange = ({navigation}: RootStackScreenProps<'SelectExchange'>) => {



    const continueAsset = (exchange:string) =>{
        navigation.navigate('SelectAsset',{
            exchange
        })
    }
    const renderItem = useCallback(
        ({item}: any) => <ExchangeCard continueAsset={continueAsset} item={item}/>,
        [],
    );


    const keyExtractor = useCallback((item: { id: string; }) => item.id, [],);


    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#4E044B', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}

            >


                <HeaderWithTitle title='Exchange'/>
                <View style={styles.planInfo}>
                    <Text style={styles.planTitle}>
                        Select exchange to trade on
                    </Text>

                </View>

                <View style={styles.scrollView}>
                    <FlatList
                        scrollEnabled
                        showsVerticalScrollIndicator={false}
                        data={Exchanges}
                        numColumns={2}
                        renderItem={renderItem} keyExtractor={keyExtractor}/>

                    {/*       <Animated.View layout={Layout.easing(Easing.bounce).delay(100)}
                                   entering={FadeInDown.springify()} exiting={FadeOutDown}
                                   style={styles.choiceBoxContainer}>





                    </Animated.View>*/}


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

    },
    scrollView: {
        flex: 1,
        width: '100%',
        alignItems: "center"
    },
    planInfo: {
        width: '100%',
        paddingHorizontal: pixelSizeHorizontal(20),
        height: heightPixel(80),
        alignItems: 'flex-start',
        justifyContent: 'flex-start',

    },
    planTitle: {
        color: "#fff",
        fontSize: fontPixel(24),
        fontFamily: Fonts.faktumBold
    },
    choiceBoxContainer: {
        width: '90%',
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: heightPixel(450),
    },
    exchangeCard: {
        marginHorizontal: pixelSizeHorizontal(12),
        marginVertical: pixelSizeVertical(12),
        borderRadius: 10,
        width: widthPixel(175),
        height: 148,
        justifyContent:'space-between',
        backgroundColor: Colors.secondary,
        paddingHorizontal: 15,
        paddingVertical: 10,

    },
    exchangeCardTop: {
        flexDirection: 'row',
        height: 30,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logoWrap: {
        width: 20,
        height: 20,
        borderRadius:20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        borderRadius:20,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',

    },
    status:{
        fontFamily:Fonts.faktumMedium,
        fontSize:fontPixel(12),

    },
    exchangeCardBottom: {
        height: 50,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly'
    },
    exchangeName:{
        fontFamily:Fonts.faktumBold,
        fontSize:fontPixel(14),
        color:`#fff`,
    } ,
    rank:{
        fontFamily:Fonts.faktumRegular,
        fontSize:fontPixel(14),
        color:Colors.disabled,
    }
})

export default SelectExchange;

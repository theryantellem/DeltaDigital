import React, {useCallback} from 'react';
import {ActivityIndicator, Image, Pressable, RefreshControl, StyleSheet, Text, View} from 'react-native';
import HeaderWithTitle from "../../../components/cyborg/header/HeaderWithTitle";
import {Ionicons} from "@expo/vector-icons";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {Fonts} from "../../../constants/Fonts";
import {currencyFormatter} from "../../../helpers";
import Colors from "../../../constants/Colors";
import {CyborgStackScreenProps, RootStackScreenProps} from "../../../types";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical} from "../../../helpers/normalize";
import {FlashList} from "@shopify/flash-list";
import  dayjs from "dayjs";




interface props {
    item:{
        "Avg entryprice":string,
        "Date": string,
        "Profit": string,
        "Type": string,
        "market": string,

    }
}


const RecordItem = ({item}:props) => {



    return(
        <View  style={styles.quantitativeCard}>

            <View style={styles.leftInfo}>



                <View style={styles.assetName}>


                    <Text style={styles.assetNameText}>
                        {item.market}
                    </Text>
                    <Text style={[styles.assetInfo]}>
                   Avg Price: <Text style={{color: '#fff', fontFamily: Fonts.faktumBold}}>{currencyFormatter('en-US','USD').format(item["Avg entryprice"])} </Text>

                    </Text>

                </View>

            </View>

            <View style={styles.centerInfo}>

                <View style={styles.tagWrap}>
                    <Text style={[styles.tagText,{
                        color: item?.Type == '1' ? Colors.success : Colors.errorRed
                    }]}>

                        {item?.Type == '1' && 'Buy'}
                        {item.Type == '2' && 'Sell'}
                    </Text>
                </View>
            </View>

            <View style={styles.rightInfo}>
                <Text style={styles.cardValue}>

               Profit {parseInt(item.Profit).toFixed(4)}
                </Text>
                <Text style={[styles.cardValue,{
                    color:Colors.text
                }]}>
              {dayjs.unix(item.Date).format('DD-MM-YYYY')}
                </Text>

            </View>
        </View>
    )
}






const TransactionRecords = ({route}:CyborgStackScreenProps<'TransactionRecords'>) => {

    const {records} = route.params




    const keyExtractor = useCallback((item: { Date: string }) => item.Date, [],);



    const renderItem = useCallback(({item}) => (
        <RecordItem  item={item}/>
    ), [])



    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#04074E', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}

            >


                <HeaderWithTitle title='Transaction Records'/>

            <View style={styles.flatList}>



                        <FlashList
                            estimatedItemSize={200}


                            scrollEnabled
                            showsVerticalScrollIndicator={false}
                            data={records}
                            renderItem={renderItem}
                            keyExtractor={keyExtractor}
                            onEndReachedThreshold={0.3}


                        />







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


    quantitativeCard: {
        borderRadius:8,
        paddingHorizontal:pixelSizeHorizontal(15),
        paddingVertical:15,
        paddingRight:10,
        backgroundColor:"#000",
        marginVertical:pixelSizeVertical(8),
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width:'100%',
        height: heightPixel(100),
    },
    leftInfo: {
        width: '42%',

        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    assetIcon: {

        width: 45,
        height: '100%',

        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    assetCardIcon: {
        borderRadius: 40,
        width: 20,
        height: 20,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    logo: {
        borderRadius: 20,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',

    },

    assetName: {

        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        height: '100%'
    },
    centerInfo: {
        width: '15%',

        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%'
    },
    rightInfo: {
        width: '35%',
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    assetInfo: {
        color: '#ccc',
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumRegular
    },
    assetNameText: {
        color: Colors.text,
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(14),
    },
    cardValue: {
        color: Colors.text,
        fontFamily: Fonts.faktumMedium,
        fontSize: fontPixel(12),
    },
    tagWrap: {
        backgroundColor: Colors.textDark,
        paddingHorizontal: 10,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    tagText: {
        color: Colors.pendingYellow,
        fontFamily: Fonts.faktumSemiBold,
        fontSize: fontPixel(12),
    },


    selectBtn: {
        borderRadius: 5,
        marginVertical: pixelSizeVertical(10),
        width: '100%',
        height: heightPixel(50),
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,

    },
    itemText: {
        marginLeft: 8,
        fontSize: fontPixel(16),
        textTransform: 'capitalize',
        color: Colors.text,
        fontFamily: Fonts.faktumMedium,
    },
    item: {
        flexDirection: 'row',
        width: '90%',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    flatListSheet: {
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    flatList: {
        width: '90%',

        flex: 1,


    },

})
export default TransactionRecords;

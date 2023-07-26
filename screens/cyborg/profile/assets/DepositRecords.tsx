import React, {useCallback, useState} from 'react';

import {Text, View, StyleSheet, Image, RefreshControl, ActivityIndicator} from 'react-native';
import {MaterialCommunityIcons, Octicons} from "@expo/vector-icons";
import Colors from "../../../../constants/Colors";
import dayjs from "dayjs";
import {
    fontPixel,
    heightPixel,
    pixelSizeHorizontal,
    pixelSizeVertical,
    widthPixel
} from "../../../../helpers/normalize";
import {Fonts} from "../../../../constants/Fonts";
import {useQuery} from "@tanstack/react-query";
import {getAsset} from "../../../../api";
import {useRefreshOnFocus, wait} from "../../../../helpers";
import {useAppSelector} from "../../../../app/hooks";
import {FlashList} from "@shopify/flash-list";



interface props {
    item: {
        "Date": number,
        "address":string,
        "Asset": string,
        "TX": string,
        "amount":string
    }
}





const DepositRecordItem =({item}:props) =>{
    return(
        <View style={styles.transactionCard}>


            <View style={styles.circleTop}>

                <MaterialCommunityIcons name="arrow-bottom-right" size={20} color={Colors.successChart} />


            </View>

            <View style={styles.bodyLeft}>
                <Text style={styles.transactionTitle}>
                    {item.address}
                </Text>
                <Text style={styles.transactionDate}>

                    {dayjs.unix(item.Date).format('ddd, DD MMM YYYY')}
                </Text>
            </View>

            <View style={styles.bodyRight}>
                <Text style={styles.transactionTitle}>
                    {item.amount}
                </Text>
                <Text style={styles.transactionDate}>

                    {item.Asset}
                </Text>
            </View>

        </View>
    )
}


const DepositRecords = () => {

    const user = useAppSelector(state => state.user)
    const {userData, User_Details} = user

    const [refreshing, setRefreshing] = useState(false);

    const {data:Asset,refetch:fetchAsset,isLoading,isRefetching} = useQuery(['user-Asset'],()=> getAsset(User_Details.id))
    const keyExtractor = useCallback((item: { id: string }) => item.id, [],);


    useRefreshOnFocus(fetchAsset)


    const renderItem = useCallback(({item}) => (
        <DepositRecordItem item={item}/>
    ), [])


    const refresh = () => {
        setRefreshing(true)
        fetchAsset()
        wait(2000).then(() => setRefreshing(false));
    }
    return (
        <>
            {
                !isLoading && Asset &&
                <FlashList
                    estimatedItemSize={200}
                    refreshing={isLoading}
                    scrollEnabled
                    showsVerticalScrollIndicator={false}
                    data={Asset.data['Deposit Records']}
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
                    ListFooterComponent={isRefetching ?
                        <ActivityIndicator size="small" color={Colors.primary}/> : null}

                />
            }
        </>
    );
};

const styles = StyleSheet.create({

    transactionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical:pixelSizeVertical(10),
        paddingHorizontal: pixelSizeHorizontal(15),
        height: heightPixel(70),

    },
    circleTop: {

        height: '50%',
        width: widthPixel(15),
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    bodyLeft: {
        width: '60%',
        height: '80%',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
    },
    bodyRight: {
        width: '30%',
        height: '80%',

        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
    },
    transactionTitle: {
        height: heightPixel(25),
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumSemiBold,
        color: Colors.text
    },
    transactionDate: {
        height: heightPixel(20),
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumRegular,
        color: Colors.tintText
    },
})

export default DepositRecords;

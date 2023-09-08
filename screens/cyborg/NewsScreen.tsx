import React, {useCallback, useState} from 'react';

import {Text, View, StyleSheet, Platform, RefreshControl, ActivityIndicator, Image, Dimensions} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {fontPixel, heightPixel, pixelSizeHorizontal} from "../../helpers/normalize";
import {CyborgStackScreenProps, RootStackScreenProps} from "../../types";
import HeaderWithTitle from "../../components/cyborg/header/HeaderWithTitle";
import Colors from "../../constants/Colors";
import {Fonts} from "../../constants/Fonts";
import {Ionicons} from "@expo/vector-icons";
import {useQuery} from "@tanstack/react-query";
import {getBanner, getUser, getUserNews} from "../../api";
import {useAppSelector} from "../../app/hooks";
import {FlashList} from "@shopify/flash-list";
import {removeHTMLTags, wait} from "../../helpers";
import Animated, {Easing, FadeInDown, FadeOutDown, Layout} from "react-native-reanimated";
import Carousel from 'react-native-reanimated-carousel';


interface props {
    item: {
        details: string,
        id: string,
        image: string,
        title: string,
    }
}

const NewsCard = ({item}: props) => {

    return (
        <Animated.View layout={Layout.easing(Easing.bounce).delay(100)}
                       entering={FadeInDown.springify()} exiting={FadeOutDown} style={styles.newsCard}>
            <View style={styles.newsCardIcon}>
                <Image source={{uri: item.image}} style={styles.image}/>
            </View>
            <View style={styles.newsCardBody}>
                <View style={styles.cardTop}>
                    <Text style={styles.newsCardTitle}>
                        {item.title}
                    </Text>
                    {/*  <Text style={styles.dateText}>
                        Wed, 04 Jan 2023
                    </Text>*/}
                </View>

                <Text style={styles.bodyText}>
                    {removeHTMLTags(item.details, true)}
                </Text>

            </View>
        </Animated.View>
    )
}


const width = Dimensions.get('window').width;

const NewsScreen = ({navigation}: CyborgStackScreenProps<'NewsScreen'>) => {


    const user = useAppSelector(state => state.user)
    const {User_Details} = user

    const [refreshing, setRefreshing] = useState(false);

    const {data, refetch, isLoading, isRefetching} = useQuery(['user-news'], () => getUserNews(User_Details.id))
    const {
        data: banner,
        refetch: fetchBanner,
        isLoading: loadingBanner
    } = useQuery(['get-Banners'], () => getBanner(User_Details.id))

    // console.log(banner.data.Banners)
    const keyExtractor = useCallback((item: { id: string }) => item.id, [],);


    const renderItem = useCallback(({item}) => (
        <NewsCard item={item}/>
    ), [])


    const refresh = () => {
        setRefreshing(true)
        refetch()
        wait(2000).then(() => setRefreshing(false));
    }


    const renderHeader = useCallback(() => (

        <View style={styles.bannerWrap}>
            <Carousel
                modeConfig={{stackInterval: 19}}
                loop
                width={width - 40}
                height={180}
                autoPlay={true}
                pagingEnabled
                mode={"vertical-stack"}
                data={banner?.data?.Banners}
                scrollAnimationDuration={2000}
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({index, item}: { index: string, item: { image: string, id: string } }) => (
                    <View
                        key={item.id}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            borderRadius: 20,
                        }}
                    >
                        <Image source={{uri: item.image}}
                               style={styles.itemImage}/>
                    </View>
                )}
            />

        </View>

    ), [banner]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}


                            colors={['#4E044B', '#141621',]}

                            start={{x: 3.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}

            >

                <HeaderWithTitle title={"News"}/>


                <View style={styles.flatList}>

                    {
                        isLoading && <ActivityIndicator size='small' color={Colors.primary}/>
                    }


                    {
                        !isLoading && data && data?.data?.News !== null &&
                        <FlashList
                            estimatedItemSize={200}
                            refreshing={isLoading}
                            ListHeaderComponent={renderHeader}
                            scrollEnabled
                            showsVerticalScrollIndicator={false}
                            data={data.data.News}
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
                </View>
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

    flatList: {
        width: '90%',

        flex: 1,


    },
    background: {
        alignItems: 'center',
        flex: 1,
        width: '100%',

    },
    newsCard: {
        width: '100%',
        height: heightPixel(150),
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    newsCardIcon: {
        borderRadius: 40,
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        borderRadius: 40,
        width: '100%',
        height: 35,
        resizeMode: 'cover',

    },
    newsCardBody: {
        paddingHorizontal: pixelSizeHorizontal(10),
        height: '90%',
        width: '90%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    cardTop: {
        minHeight: 20,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    dateText: {
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumMedium,
        color: Colors.greyText
    },
    newsCardTitle: {
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumBold,
        color: Colors.text
    },
    bodyText: {
        marginTop: 10,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumRegular,
        color: Colors.text
    },
    bannerWrap: {
        width: '90%',
        height: heightPixel(200),
        marginBottom: 14,
    },
    itemImage: {
        height: '100%', width: '100%', borderRadius: 20, resizeMode: 'cover'
    }
})

export default NewsScreen;

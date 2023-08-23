import React, {useCallback, useRef, useState} from 'react';

import {
    Text,
    View,
    Image as DisplayImage,
    Dimensions,
    StyleSheet,
    FlatList,
    ImageProps,
    Platform,
    Animated
} from 'react-native';
import Colors from "../../constants/Colors";
import {fontPixel, heightPixel, pixelSizeHorizontal, widthPixel} from "../../helpers/normalize";
import {Fonts} from "../../constants/Fonts";

import LottieView from 'lottie-react-native';
import Paginator from "./Paginator";



const {width} = Dimensions.get('window');
const slides = [
    {
        id: '1',
       // lottiePath:require('../../assets/gifs/walkthrough-gifs/lottie/lf20_iftkuuwh.json'),
        title: 'Send',
        message: 'Send and receive crypto.',
    },
    {
        id: '2',
        //lottiePath:require('../../assets/gifs/walkthrough-gifs/lottie/lf20_lkfovt2k.json'),
        title: 'Trade Spot',
        message: 'Trading smart with ease.',
    },
    {
        id: '3',
        //lottiePath:require('../../assets/gifs/walkthrough-gifs/lottie/lf20_cjpxgxe7.json'),
        title: 'Trade Futures',
        message: 'Trading Futures using smart trading bot',
    },


];

interface itemProps {
    item: {
        message: string,
        imagePath: string,
        title: string,
        lottiePath:string,
        image: ImageProps
    }
}




//const directoryPath = Platform.OS === 'android' ? RNFS.PicturesDirectoryPath : RNFS.DocumentDirectoryPath;

const Slide = ({item}: itemProps) => {
    const {image, title, lottiePath,message,imagePath} = item

    const animation = useRef(null);

//const imageGif = compressImage()

   // let showImage = require(imagePath)
    return (
        <View style={{alignItems: 'center',width,flex:0.5, justifyContent: 'flex-start'}}>

            <View style={styles.textWrap}>
                <Text style={styles.message}>{message}</Text>

            </View>

            <View style={[styles.imageWrap,{
                width
            }]}>


                    <LottieView
                        autoPlay
                        loop
                        ref={animation}
                        style={{height: '100%', width: '100%',}}
                        // Find more Lottie files at https://lottiefiles.com/featured
                        source={{uri:"https://assets2.lottiefiles.com/packages/lf20_pZNC76QS3J.json"}}
                    />


            </View>


        </View>
    );
};

const OnboardScreen = () => {

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const ref = useRef(null);
    const updateCurrentSlideIndex = (e: { nativeEvent: { contentOffset: { x: any; }; }; }) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentSlideIndex(currentIndex);
    };
    const scrollX = useRef(new Animated.Value(0)).current;

    const keyExtractor = useCallback(
        (item) => item.id,
        [],
    );

    return (
        <View style={styles.container}>
            <View style={styles.slideContainer}>
                {/* Render indicator */}
                <Paginator data={slides} scrollX={scrollX}/>
              <Text style={styles.appName}>
                  Delta Digital
              </Text>
            </View>

            <FlatList
                ref={ref}
                onMomentumScrollEnd={updateCurrentSlideIndex}
                //style={{height: '90%'}}
                showsHorizontalScrollIndicator={false}
                horizontal
                viewabilityConfig={viewConfig}
                scrollEventThrottle={32}
                onScroll={Animated.event([
                    {nativeEvent: {contentOffset: {x: scrollX}}}
                ], {
                    useNativeDriver: false
                })}
                keyExtractor={keyExtractor}
                data={slides}
                pagingEnabled
                renderItem={({item}) => <Slide item={item}/>}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    textWrap: {
        width: '85%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',

    },
    title: {
        color: Colors.textPrimary,
        fontSize: fontPixel(28),
        fontFamily:Fonts.faktumBold
    },
    message: {
        color: "#fff",
        textAlign: 'left',

        fontSize: fontPixel(28),
        fontFamily:Fonts.faktumBold
    },

    subtitle: {

    },
    slideContainer: {
        height: '15%',

        justifyContent: 'space-evenly',
        alignItems: 'flex-start'
    },
    appName:{
        marginLeft:5,
        color: "#fff",
        textAlign: 'left',

        fontSize: fontPixel(14),
        fontFamily:Fonts.faktumBold
    },
    indicator: {
        height: 5,
        width: widthPixel(120),
        backgroundColor: '#E5E7EB',
        marginHorizontal: pixelSizeHorizontal(3),
        borderRadius: 10,
    },
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageWrap:{
        alignItems:'center',
        justifyContent:'center',
        height:heightPixel(500),
    }
})

export default OnboardScreen;

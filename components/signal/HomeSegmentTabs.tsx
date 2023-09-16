import React, {useEffect} from 'react';
import {Animated, Platform, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {fontPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from "../../helpers/normalize";
import Layout from "../../constants/Layout";
import {Fonts} from "../../constants/Fonts";
import {LinearGradient} from "expo-linear-gradient";


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
}

interface segmentControl {
    tabs: string[],
    onChange: (arg0: any) => void,
    currentIndex: number,
    segmentedControlBackgroundColor: string,
    activeSegmentBackgroundColor: string,
    textColor: string,
    activeTextColor: string,
    paddingVertical: number

}

const defaultProps: segmentControl = {
    tabs: [],
    onChange: () => {
    },
    currentIndex: 0,
    segmentedControlBackgroundColor: '#E5E5EA',
    activeSegmentBackgroundColor: 'white',
    textColor: '#333',
    activeTextColor: '#fff',
    paddingVertical: 12
}


// So that it stretches in landscape mode.
const width = widthPixel(200);

const HomeSegmentedTabs = ({
                               tabs,
                               onChange,
                               currentIndex,
                               segmentedControlBackgroundColor,
                               paddingVertical,
                               activeSegmentBackgroundColor,
                               textColor,
                               activeTextColor
                           }: segmentControl) => {
    const translateValue = ((200) / tabs?.length);
    const [tabTranslate, setTabTranslate] = React.useState(new Animated.Value(0));

    // useCallBack with an empty array as input, which will call inner lambda only once and memoize the reference for future calls
    const memoizedTabPressCallback = React.useCallback(
        (index: any) => {
            onChange(index);
        },
        []
    );

    useEffect(() => {
        // Animating the active index based current index
        Animated.spring(tabTranslate, {
            toValue: currentIndex * translateValue,
            stiffness: 180,
            damping: 20,
            mass: 1,
            useNativeDriver: true
        }).start()
    }, [currentIndex])

    return (
        <Animated.View style={[
            styles.segmentedControlWrapper,
            {
                // borderBottomColor:textColor,
                //  borderBottomWidth:0.5,
                paddingVertical: paddingVertical,
            }

        ]}>
            <Animated.View
                style={[StyleSheet.absoluteFill, {

                    position: "absolute",
                    width: (200) / tabs?.length,
                    top: 0,

                    // marginHorizontal: 12,
                }, {
                    borderRadius: 16,
                    backgroundColor: activeSegmentBackgroundColor,
                    //  borderBottomWidth:2,
                    //   borderBottomColor: activeSegmentBackgroundColor,
                    // ...shadow,
                },
                    {
                        transform: [
                            {
                                translateX: tabTranslate
                            }
                        ]
                    }]}
            >
                <LinearGradient style={styles.createBtnGradient}
                                colors={[ '#e602df',  '#4406b0']}

                                start={{x: 1, y: 0}}
                                end={{x: 0.1, y: 0.3,}}

                    // locations={[0.1, 0.7,]}
                />
            </Animated.View>
            {
                tabs.map((tab, index) => {
                    const isCurrentIndex = currentIndex === index;
                    return (
                        <TouchableOpacity
                            key={index}
                            style={[styles.textWrapper,{

                            }]}
                            onPress={() => memoizedTabPressCallback(index)}
                            activeOpacity={0.7}>
                            <Text numberOfLines={1}
                                  style={[styles.textStyles, {

                                      color: isCurrentIndex ? activeTextColor : textColor,
                                      fontFamily: isCurrentIndex ? Fonts.faktumBold : Fonts.faktumMedium
                                  }]}>{tab}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </Animated.View>
    )
}


const styles = StyleSheet.create({
    segmentedControlWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        width: 200,
        //  backgroundColor:'red',
        justifyContent: 'center',
        marginVertical: pixelSizeVertical(10)
    },
    textWrapper: {
        marginHorizontal:2,
        elevation: 9,
        paddingHorizontal: 5,
        width:widthPixel(80),
        flex:1,
    },
    textStyles: {
        fontSize: fontPixel(14),
        textAlign: 'center',
        textTransform: 'capitalize',

    },
    createBtnGradient: {
        flex: 1,
        paddingHorizontal: pixelSizeHorizontal(5),
        borderRadius: 10,
        width:'100%'
    },
})


HomeSegmentedTabs.defaultProps = defaultProps


export default HomeSegmentedTabs;

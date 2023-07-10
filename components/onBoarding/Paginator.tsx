import React from 'react';

import {Text, View, StyleSheet, useWindowDimensions, Animated} from 'react-native';
import Colors from "../../constants/Colors";

const Paginator = ({data, scrollX}) => {


    const {width} = useWindowDimensions()

    return (
        <View style={{flexDirection: 'row',}}>
            {data.map((_: any, i: React.Key | null | undefined) => {
                const inputRange = [(i-1) * width, i * width, (i + 1) * width]

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange:[100,110,100],
                    extrapolate:'clamp'
                })
                const backgroundColor = scrollX.interpolate({
                    inputRange,
                    outputRange: [Colors.primaryLight,'#fff',Colors.primaryLight], // Replace with desired RGBA values
                    extrapolate: 'clamp',
                });
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange:[0.3,1,0.3],
                    //extrapolate:'clamp'
                })

                return (<Animated.View key={i.toString()} style={[styles.dot,{width:dotWidth,backgroundColor}]}/>)
            })

            }

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dot: {
        height:3,
        borderRadius:5,
        marginHorizontal:8,
        backgroundColor:Colors.primary
    }
})

export default Paginator;

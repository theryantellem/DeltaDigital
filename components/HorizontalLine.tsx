import React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import Colors from "../constants/Colors";
import {pixelSizeVertical} from "../helpers/normalize";

const HorizontalLine = ({margin, color,width,borderBottomWidth}:{margin?:number, color?:string, width?:string,borderBottomWidth?:number}) => {
    return (
        <View style={[styles.line,{
            width: width ? width :'100%',
            borderBottomColor:color ? color : Colors.borderColor,
            marginVertical:margin ? pixelSizeVertical(margin ? margin : 30) : 0,
            borderBottomWidth: borderBottomWidth ? borderBottomWidth : 1,
        }]}/>


    );
};

const styles = StyleSheet.create({
        line: {




        }
    }
)

export default HorizontalLine;

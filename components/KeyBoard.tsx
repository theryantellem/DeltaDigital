import React, {useCallback, useEffect, useState} from 'react';

import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Ionicons, Octicons} from "@expo/vector-icons";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical} from "../helpers/normalize";
import Colors from "../constants/Colors";
import {Fonts} from "../constants/Fonts";

interface keyboardProps {
    pinNumber:string[]|number[],
    addInputs:(number:string) => void
    backSpace:() => void,
    transaction?:boolean,
    codeLength?:number,
}


const Keyboard = ({pinNumber,addInputs,backSpace, transaction,codeLength}:keyboardProps) => {

    const  checkDot = /\./.test(pinNumber.join(''))


    const [twoDecimal, setTwoDecimal] = useState<boolean|null>(false);
    const test = (x: string) => !isNaN(+x) && Boolean(x.match(/\...$/));


    useEffect(() => {

        if(pinNumber.length > 1){
           //  setTwoDecimal(/^(\d+(\.\d{0,2})?|\.?\d{1,2})$/.test(pinNumber.join('')))
       //pinNumber.join('').match(/^(\d+(\.\d{0,2})?|\.?\d{1,2})$/)[0]
            setTwoDecimal(test(pinNumber.join('')))
        }


    }, [pinNumber,twoDecimal]);



    const  cellNumber  = codeLength ? codeLength : 4
let keyActive = transaction ? false : pinNumber.length === cellNumber
let dotKeyActive = transaction ? pinNumber.length === 0 || checkDot : false
let   zeroKeyActive  =transaction ? pinNumber.length === 0 : false


    const renderNumber = useCallback(
        ({item}) => (
            <TouchableOpacity activeOpacity={0.8} disabled={keyActive ||twoDecimal} style={[{
                backgroundColor: Colors.secondary,
            }, styles.keys]} onPress={() => addInputs(item.value)}>
                <Text style={[{
                    color: '#fff'
                },
                    styles.keyText]}>
                    {item.value}
                </Text>
            </TouchableOpacity>
        ), [pinNumber])
    return (
        <>
            <FlatList scrollEnabled={false} contentContainerStyle={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between'
            }} data={KeyboardNumber} renderItem={renderNumber}
                      keyExtractor={item => item.id}
                      numColumns={3}
            />
            <View style={styles.bottomKeyboard}>

                <TouchableOpacity disabled={dotKeyActive} style={[{

                }, styles.keys]} onPress={() => addInputs(transaction ? '.' : '00')}>
                    <Text style={[{
                        color: '#fff'
                    },
                        styles.keyText]}>
                        {
                            transaction ? '.' : '00'
                        }


                    </Text>
                </TouchableOpacity>

                <TouchableOpacity disabled={keyActive ||twoDecimal} style={[{
                    backgroundColor: Colors.secondary,
                }, styles.keys]} onPress={() => addInputs('0')}>
                    <Text style={[{
                        color: '#fff'
                    },
                        styles.keyText]}>

                        0
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[{

                }, styles.keys]} onPress={backSpace}>
                    <Octicons name="chevron-left" size={24} color="#fff" />

                </TouchableOpacity>


            </View>
        </>
    );
};



const KeyboardNumber = [
    {
        id: '1',
        value: '1'
    }, {
        id: '2',
        value: '2'
    }, {
        id: '3',
        value: '3'
    }, {
        id: '4',
        value: '4'
    }, {
        id: '5',
        value: '5'
    }, {
        id: '6',
        value: '6'
    }, {
        id: '7',
        value: '7'
    }, {
        id: '8',
        value: '8'
    }, {
        id: '9',
        value: '9'
    },
]


const styles = StyleSheet.create({
    VirtualKeyboard: {
        marginVertical: pixelSizeVertical(10),
        width: '100%',
        bottom:0,
        //minHeight: heightPixel(320),
        alignItems: 'center',
        justifyContent: 'center'
    },
    keys: {
        borderRadius: 65,
        width: 65,
        height: 65,
        marginVertical: 10,
        marginHorizontal: pixelSizeHorizontal(20),
        alignItems: 'center',
        justifyContent: 'center',

    },
    bottomKeyboard: {
        width: '100%',
        height: heightPixel(80),
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: "center"
    },
    keyText: {
        fontFamily: Fonts.faktumSemiBold,
        fontSize: fontPixel(20),
    },
});

export default Keyboard;

import {ButtonProps, TouchableOpacity} from "../Themed";
import {heightPixel} from "../../helpers/normalize";
import {Platform, Pressable} from "react-native";

export function MyButton(props: ButtonProps) {
    return  Platform.OS === 'android' ?  <TouchableOpacity activeOpacity={0.6} {...props} style={[props.style, {

            height: heightPixel(55),
            alignItems: 'center',


            borderRadius:8,

        }]}/> :
        <Pressable {...props} style={[props.style, {
            height: heightPixel(55),
            alignItems: 'center',
            paddingVertical: 16,

            borderRadius:8,

        }]}/>
        ;
}

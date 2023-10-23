import React, {useCallback} from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Pressable,
    ActivityIndicator,
    FlatList,
    Image,
    ImageBackground
} from 'react-native';
import {SignalStackScreenProps} from "../../../types";
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import {Ionicons} from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from "../../../helpers/normalize";
import {Fonts} from "../../../constants/Fonts";
import {useQuery} from "@tanstack/react-query";
import {listAcademy} from "../../../api/finix-api";
import {truncate, useRefreshOnFocus} from "../../../helpers";


interface prosAcademy {
    item: {
        "id": string,
        "name": string,
        "thumbnail": string,
        "description": string,
        "caption": string,
        "completed": string,
        "educator": {
            "id": string,
            "first_name": string,
            "last_name": string,
            "email": string,
            "photo": string,
            "total_followers": number,
            "categories": []
        }
    }
    viewAcademy: (id: string) => void
}
const AcademyItem = ({item,viewAcademy}:prosAcademy) =>{
    return(
        <TouchableOpacity onPress={() => viewAcademy(item.id)} activeOpacity={0.8} style={styles.academyCard}>

            <View style={styles.academyCardImageWrap}>
                <Image style={styles.academyCardImage}
                       source={{uri: item.thumbnail}}/>
            </View>
            <View style={styles.academyCardBody}>
                <Text style={styles.academyTitle}>
                    {item.name}
                </Text>
                <View style={styles.description}>
                    <Text style={styles.descriptionText}>
                        {truncate(item.description,80)}
                    </Text>
                </View>

                <Text style={styles.statusText}>
                    Course Status - {item.completed} completed
                </Text>
            </View>


        </TouchableOpacity>
    )
}

const AllAcademy = ({navigation}:SignalStackScreenProps<'AllAcademy'>) => {

    const {
        data: academy,
        isLoading: loadingAcademy,
        refetch: refetchAcademy
    } = useQuery(['list-Academy'], listAcademy)


    const keyExtractor = useCallback((item: { id: any; }) => item.id, [],)
    const viewAcademy = (id: string) => {
        navigation.navigate('ViewAcademy', {
            id
        })
    }

    const renderItem = useCallback(
        ({item}) => <AcademyItem item={item} viewAcademy={viewAcademy}/>,
        [],
    );

    useRefreshOnFocus(refetchAcademy)
    const goBack = () => {
      navigation.goBack()
    }
    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={require('../../../assets/images/signal/signal_BG.png')}
                             resizeMode={'cover'}
                             style={styles.dashboardImage}>
            <StatusBar style="dark"/>
            <View style={styles.topBar}>
                <TouchableOpacity style={[styles.backBtn, {}]} onPress={goBack}>
                    <Ionicons name="md-chevron-back" color={Colors.textDark} size={heightPixel(24)}/>

                </TouchableOpacity>

                <Pressable style={[styles.titleWrap, {}]}>


                    <Text style={styles.title}>
                        Academy
                    </Text>

                </Pressable>
                <TouchableOpacity style={styles.rightBtn}>


                </TouchableOpacity>

            </View>

                <View style={{
                    width:'100%',
                    alignItems:'center',

                }}>



            {
                loadingAcademy && <ActivityIndicator color={Colors.primary} size='small'/>
            }
            {
                !loadingAcademy && academy &&

                <FlatList
                    data={academy?.data}
                    keyExtractor={keyExtractor}
                    numColumns={2}

                    pagingEnabled
                    scrollEnabled

                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                />
            }
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#fff",
    },
    dashboardImage: {
        // paddingHorizontal: pixelSizeHorizontal(20),
        resizeMode: 'cover',
        width: '100%',
        flex: 1,
        borderRadius: 30,
        alignItems: 'center',

    },
    topBar: {
        height: heightPixel(80),
        width: '100%',
        paddingHorizontal: pixelSizeHorizontal(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: "#E5E7EB",
        // borderBottomWidth: 1,
    },
    title: {
        textAlign: 'center',
        color: Colors.textDark,
        textTransform: 'capitalize',
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumSemiBold
    },
    titleWrap: {
        width: '52%',

        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },

    rightBtn: {
        width: '20%',
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    backBtn: {
        width: '20%',
        height: 40,
        borderRadius: 40,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    academyCard: {
        marginVertical: pixelSizeVertical(10),
        marginHorizontal: pixelSizeHorizontal(5),
        width: widthPixel(180),
        height: heightPixel(300),
        borderRadius: 14,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 14,
    },
    academyCardImageWrap: {
        width: '100%',
        height: heightPixel(135),
        borderRadius: 14,

        resizeMode: 'cover'
    },
    academyCardImage: {
        height: '100%',
        width: '100%',
        borderRadius: 14,

        resizeMode: 'cover'
    },
    academyCardBody: {
        marginTop: 8,
        alignItems: 'flex-start',
        width: '100%'
    },
    description: {
        marginTop: 8,
        alignItems: 'flex-start',
        width: '100%',
        minHeight: 60,
    },
    descriptionText: {
        color: Colors.textDark,
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumRegular
    },
    statusText: {
        color: Colors.lightColor,
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumRegular
    },
    academyTitle: {
        color: Colors.textDark,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumBold
    }
})

export default AllAcademy;

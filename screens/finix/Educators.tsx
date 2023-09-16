import React, {SetStateAction, useCallback, useEffect, useState} from 'react';

import {
    Text,
    View,
    StyleSheet,
    Platform,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from "../../helpers/normalize";
import Colors from "../../constants/Colors";
import {Fonts} from "../../constants/Fonts";
import {AntDesign, Ionicons, Octicons, SimpleLineIcons} from "@expo/vector-icons";
import {RootStackScreenProps, SignalStackScreenProps} from "../../types";
import * as yup from "yup";
import {useFormik} from "formik";
import TextInput from "../../components/inputs/TextInput";



import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useAppSelector} from "../../app/hooks";
import {currencyFormatter, useRefreshOnFocus, wait} from "../../helpers";

import {IF} from "../../helpers/ConditionJsx";
import FastImage from "react-native-fast-image";
import Constants from "expo-constants";
import {followEducator, getEducators, getEducatorsFollowing} from "../../api/finix-api";
import IOSSegmentedControl from "../../components/segment-control/IOSSegmentContol";
import SegmentedControl from "../../components/segment-control/SegmentContol";
import { LinearGradient } from 'expo-linear-gradient';
import HeaderWithTitle from "../../components/cyborg/header/HeaderWithTitle";
import SearchInput from "../../components/inputs/SearchInput";
import {FlashList} from "@shopify/flash-list";


const formSchema = yup.object().shape({

    /*  braceTag: yup.string().required("Please receiver's Brace tag").min(4, 'Must be at least 4 characters').matches(
          /^[a-zA-Z0-9\$\)\(_]{4,}$/g,
          "Must Contain only Letters, Numbers and underscore"
      ),*/

})



const isRunningInExpoGo = Constants.appOwnership === 'expo'

interface props {
    viewUser:(educator:{})=>void
    item:{
        "email": string,
        "first_name": string,
        "id": "bd70e1e4-ac85-4bc2-83c1-7efbae139e14",
        "last_name": string,
        "photo": "https://deltacyborg.pro/images/educator/1693012826.webp",
        "total_followers": 0,

    }

}


interface itemsProps {
    viewUser:(educator:{})=>void,
    item:{
        educator: {
            "email": string,
            "first_name": string,
            "id": "bd70e1e4-ac85-4bc2-83c1-7efbae139e14",
            "last_name": string,
            "photo": "https://deltacyborg.pro/images/educator/1693012826.webp",
            "total_followers": 0,
        }
    }

}
const EducatorItem = ({item,viewUser}:props) =>{
    return(
        <TouchableOpacity  onPress={()=>viewUser(item)} style={styles.favList}>
            <View style={[styles.listIcon, {
                //  backgroundColor: Colors.secondary,
            }]}>
                {
                    isRunningInExpoGo ?
                        <Image
                            style={styles.tAvatar}
                            source={{
                                uri: item.photo,

                            }}

                        />
                        :

                        <FastImage
                            style={styles.tAvatar}
                            source={{
                                cache: FastImage.cacheControl.web,
                                uri: item.photo,
                                priority: FastImage.priority.normal,
                            }}

                            resizeMode={FastImage.resizeMode.cover}
                        />


                }
            </View>
            <View
                              style={styles.listBody}>
                <Text style={styles.bodyTitle}>
                    {item.first_name} {item.last_name}
                </Text>
                <View style={styles.listBottom}>
               {/*     <View style={styles.flagIcon}>
                  <Image
                            source={{uri: Countries.find(c => c.iso2 ==code.toUpperCase())?.href?.flag}}
                            style={styles.flag}
                        />


                    </View>*/}
                    <Text style={styles.bodySubText}>
                        {item.total_followers} <Text style={{fontFamily:Fonts.faktumRegular}}>followers </Text>
                    </Text>
                   {/* <Octicons name="dot-fill" size={14} color="#D1D5DB"/>
                    <Text style={styles.bodySubText}>
                        $zainab
                    </Text>*/}
                </View>

            </View>
            <TouchableOpacity activeOpacity={0.8} style={styles.listBodyRight}>
                <SimpleLineIcons name="user-follow"  size={18} color={Colors.pendingYellow} />
            {/*    <SimpleLineIcons name="user-following" size={18} color={Colors.successChart} />*/}
            </TouchableOpacity>
        </TouchableOpacity>
    )
}


const FollowingEducatorItem = ({item,viewUser}:itemsProps) =>{
    return(
        <TouchableOpacity onPress={()=>viewUser(item.educator)}  style={styles.favList}>
            <View style={[styles.listIcon, {
                //  backgroundColor: Colors.secondary,
            }]}>
                {
                    isRunningInExpoGo ?
                        <Image
                            style={styles.tAvatar}
                            source={{
                                uri: item.educator.photo,

                            }}

                        />
                        :

                        <FastImage
                            style={styles.tAvatar}
                            source={{
                                cache: FastImage.cacheControl.web,
                                uri: item.educator.photo,
                                priority: FastImage.priority.normal,
                            }}

                            resizeMode={FastImage.resizeMode.cover}
                        />


                }
            </View>
            <View
                              style={styles.listBody}>
                <Text style={styles.bodyTitle}>
                    {item.educator.first_name} {item.educator.last_name}
                </Text>
                <View style={styles.listBottom}>
               {/*     <View style={styles.flagIcon}>
                  <Image
                            source={{uri: Countries.find(c => c.iso2 ==code.toUpperCase())?.href?.flag}}
                            style={styles.flag}
                        />


                    </View>*/}
                    <Text style={styles.bodySubText}>
                        {item.educator.total_followers} <Text style={{fontFamily:Fonts.faktumRegular}}>followers </Text>
                    </Text>
                   {/* <Octicons name="dot-fill" size={14} color="#D1D5DB"/>
                    <Text style={styles.bodySubText}>
                        $zainab
                    </Text>*/}
                </View>

            </View>
            <TouchableOpacity activeOpacity={0.8} style={styles.listBodyRight}>

          <SimpleLineIcons name="user-following" size={18} color={Colors.successChart} />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
const EducatorsScreen = ({navigation}: SignalStackScreenProps<'EducatorsScreen'>) => {


    const  queryClient = useQueryClient()
    const [myFavourites, setMyFavourites] = useState([]);
    const [contentBraceTag, setContentBraceTag] = useState('');
    const [focusBraceTag, setFocusBraceTag] = useState(false);


    const [tabIndex, setTabIndex] = useState(0);
    const goBack = () => {
        navigation.goBack()
    }
    const [refreshing, setRefreshing] = useState(false);

    const handleTabsChange = (index: SetStateAction<number>) => {
        setTabIndex(index);
        //  setScreen(index === 0 ? 'Banks' : 'Wallets')
    };

    const dataSlice = useAppSelector(state => state.data)

    const {amountToSend} = dataSlice

    const user = useAppSelector(state => state.user)
    const {
        userData: {
            id,
        },

    } = user

    const {
        handleChange, handleBlur,
        setFieldValue,
        values,
        errors,
        touched,
    } = useFormik({
        validationSchema: formSchema,
        initialValues: {
            braceTag: '',

        },
        onSubmit: (values) => {


        }
    });



    const viewUser = async (educator:{}) => {
        // await setContentBraceTag(userId)
        //  await setFieldValue('braceTag', userId)
       navigation.navigate('ViewEducator',{
      educator
       })
    }


    const {data:dataFollowing, isLoading:loadingEducators, refetch:fetchEducators} = useQuery([`get-Educators-Following`], getEducatorsFollowing)
    const {data, isLoading, refetch} = useQuery([`get-educators`], getEducators)



    const {mutate:followNow, isLoading: following} = useMutation(['followEducator'], followEducator, {
        onSuccess: (data) => {
            if(data.status){
              //  refetchFavs()
            }

        },
            onSettled: () => {
                queryClient.invalidateQueries(['followEducator']);
            }
    })




    let filteredEducators: any[] = []
    let myFollowing: any[] = []





     if ( !loadingEducators && dataFollowing && dataFollowing?.data) {
         myFollowing = dataFollowing.data.filter((following: {educator :{ first_name: string }}) =>
             following.educator.first_name.includes(contentBraceTag)
         );
     }
     if ( !isLoading && data && data?.data) {
         filteredEducators = data?.data.filter((userContact: { first_name: string }) =>
             userContact.first_name.includes(contentBraceTag)
         );
     }






const renderItem = useCallback(
    ({item}) => <EducatorItem item={item} viewUser={viewUser}/>,
    [],
);

     const renderItemFollowing = useCallback(
    ({item}) => <FollowingEducatorItem item={item} viewUser={viewUser}/>,
    [],
);

const keyExtractor = useCallback((item: { id: any; }) => item.id, [],);




    const followUser = (userId: string) => {
       // mutate(userId)
    }

    const refresh = () => {
        setRefreshing(true)
        refetch()
        wait(2000).then(() => setRefreshing(false));
    }

    useRefreshOnFocus(fetchEducators)
    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient style={styles.background}
                            colors={['#04074E', '#141621',]}

                            start={{x: 2.5, y: 0}}
                            end={{x: 1.5, y: 0.8,}}
                // locations={[0.1, 0.7,]}

            >



                <HeaderWithTitle title="Educators"/>

                {
                    Platform.OS === 'ios' ?

                        <IOSSegmentedControl tabs={["Following", "Educators"]}
                                          currentIndex={tabIndex}
                                          onChange={handleTabsChange}
                                          segmentedControlBackgroundColor={'#7676801F'}
                                          activeSegmentBackgroundColor={"#fff"}
                                          activeTextColor={Colors.textDark}
                                          textColor={"#fff"}
                                          paddingVertical={pixelSizeVertical(12)}/>
                        :

                        <SegmentedControl tabs={["Following", "Educators"]}
                                          currentIndex={tabIndex}
                                          onChange={handleTabsChange}
                                          segmentedControlBackgroundColor={Colors.tintPrimary}
                                          activeSegmentBackgroundColor={Colors.primary}
                                          activeTextColor={Colors.textDark}
                                          textColor={"#Fff"}
                                          paddingVertical={pixelSizeVertical(16)}/>
                }




                {
                    <IF condition={tabIndex === 0}>





                        <View style={styles.authContainer}>
                            <SearchInput
                                inputWrapHeight={75}
                                borderRadius={8}
                                icon={<Octicons name="search" size={20} color={Colors.text}/>}
                                placeholder="Enter educator name "
                                keyboardType={"default"}
                                returnKeyType='done'
                                touched={touched.braceTag}
                                error={errors.braceTag}
                                onFocus={() => setFocusBraceTag(true)}
                                onChangeText={(e) => {
                                    handleChange('braceTag')(e);
                                    setContentBraceTag(e);
                                }}
                                onBlur={(e) => {
                                    handleBlur('braceTag')(e);
                                    setFocusBraceTag(false);
                                }}
                                defaultValue={contentBraceTag}
                                focus={focusBraceTag}
                                value={values.braceTag}
                            />
                        </View>







                        <View style={styles.flatList}>

                                    {
                                        isLoading && <ActivityIndicator size='small' color={Colors.primary}/>
                                    }

                                    {
                                        !isLoading && dataFollowing &&
                                        <FlashList
                                            estimatedItemSize={200}
                                            refreshing={isLoading}


                                            scrollEnabled
                                            showsVerticalScrollIndicator={false}
                                            data={myFollowing}
                                            renderItem={renderItemFollowing}
                                            keyExtractor={keyExtractor}
                                            onEndReachedThreshold={0.3}
                                            refreshControl={
                                                <RefreshControl
                                                    tintColor={Colors.text}
                                                    refreshing={refreshing}
                                                    onRefresh={refresh}
                                                />
                                            }


                                        />
                                    }
                                </View>






                    </IF>
                }

                <IF condition={tabIndex == 1}>
                    <View style={styles.flatList}>
                    {
                        isLoading && <ActivityIndicator size='small' color={Colors.primary}/>
                    }

                    {
                        !isLoading && data &&
                        <FlashList
                            estimatedItemSize={200}
                            refreshing={isLoading}


                            scrollEnabled
                            showsVerticalScrollIndicator={false}
                            data={data?.data}
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


                        />
                    }
                    </View>
                </IF>


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

    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: Colors.lightGrey,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: Colors.textDark,
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumBold
    },
    authContainer: {

        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    selectSendType: {
        marginTop:20,
        height: heightPixel(170),
        width: '90%',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',

    },
    horizontalLine: {
        width: '100%',
        borderBottomColor: "#F3F4F6",
        borderBottomWidth: 0.6,
        marginVertical: 10,
    },
    selectBtn: {

        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: heightPixel(65)
    },
    btnText: {
        marginLeft: 10,
        fontFamily: Fonts.faktumSemiBold,
        fontSize: fontPixel(16)
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 45,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollView: {

        width: '100%',
        alignItems: "center"
    },
    favourite: {

        width: '90%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    favouriteTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: heightPixel(60),
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    listTitle: {
        fontSize: fontPixel(18),
        fontFamily: Fonts.faktumBold,
        color: "#4F5661"
    },
    tintText: {
        fontSize: fontPixel(14),
        color: Colors.primary,
        fontFamily: Fonts.faktumBold,
    },
    seeAll: {
        width: '20%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    favList: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: heightPixel(90),
        borderBottomColor: Colors.borderColor,
        borderBottomWidth: 1
    },

    listIcon: {
        width: 35,
        height: 35,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tAvatar: {

        borderRadius: 100,
        resizeMode: 'cover',
        width: '100%',
        height: '100%'
    },
    listBody: {
        width: '55%',
        height: '50%',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    listBodyRight: {
        width: '30%',
        height: '50%',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    bodyTitle: {
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumBold,
        color: Colors.text
    },
    bodySubText: {
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumMedium,
        color:Colors.tintText
    },
    flagIcon: {
        width: widthPixel(15),
        height: heightPixel(10),
        borderRadius: 2,
        alignItems: 'center',
    },
    flag: {
        borderRadius: 2,
        resizeMode: 'cover',
        width: '100%',
        height: '100%'
    },
    listBottom: {
        width: '100%',
        height: '40%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    friendsOnBrace: {
        marginVertical: pixelSizeVertical(10),
        width: '90%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    noItem: {
        width: '100%',
        alignItems: 'center',
        height: heightPixel(300),
        justifyContent: 'center',
    },
    fileBroken: {
        height: 80,
        width: 100,
        resizeMode: 'cover'
    },
    messageWrap: {
        marginTop: 15,
        width: '60%',
        alignItems: 'center'
    },
    message: {
        textAlign: 'center',
        lineHeight: heightPixel(25),
        color: "#6B7280",
        fontSize: fontPixel(18),
        fontFamily: Fonts.faktumRegular
    },
    flatList: {
        width: '90%',

        flex: 1,


    },

});

export default EducatorsScreen;

import React, {SetStateAction, useCallback, useMemo, useRef, useState} from 'react';

import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator, RefreshControl, Platform, Pressable
} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import HeaderWithTitle from "../../components/cyborg/header/HeaderWithTitle";
import FastImage from "react-native-fast-image";
import {Fonts} from "../../constants/Fonts";
import {Entypo, Ionicons, MaterialIcons, Octicons, SimpleLineIcons} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from "../../helpers/normalize";
import {IF} from "../../helpers/ConditionJsx";
import {FlashList} from "@shopify/flash-list";
import {wait} from "../../helpers";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {followEducator, getEducators, getEducatorsFollowing, unFollowEducator} from "../../api/finix-api";
import {SignalStackScreenProps} from "../../types";
import {MyButton} from "../../components/MyButton";
import {LinearGradient} from "expo-linear-gradient";
import {addNotificationItem} from "../../app/slices/dataSlice";
import {useDispatch} from "react-redux";
import {useAppDispatch} from "../../app/hooks";
import ToastAnimated from "../../components/toast";
import SearchInput from "../../components/inputs/SearchInput";
import GradientSegmentControl from "../../components/segment-control/GradientSegmentControl";
import SegmentedControl from "../../components/segment-control/SegmentContol";
import BottomSheet, {BottomSheetBackdrop, BottomSheetFlatList} from "@gorhom/bottom-sheet";
import {
    BottomSheetDefaultBackdropProps
} from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";


interface itemProps {
    selected: string,
    item: { "category": {
        "id": number,
            "name": string,
            "photo": null, "type": string }, "id": number }

}

const SelectValue = ({selected, item,}: itemProps) => {


    return (

        <TouchableOpacity
            style={[styles.selectBtn, {
                borderBottomColor: Colors.borderColor,
            }]}>

            <View style={styles.item}>
                <Ionicons name="ios-checkbox" size={14} color={Colors.primary}/>


                <Text style={styles.itemText}>
                    {item.category.name}
                </Text>


            </View>
        </TouchableOpacity>
    )
}

interface props {

    followEducator: (educatorId: string) => void
    setStreamerCat: (categories: []) => void
    unFollowEducator: (educatorId: string) => void
    unFollowing: boolean,
    following: boolean,
    selected: string,

    item: {
        "email": string,
        "first_name": string,
        "id": string,
        "last_name": string,
        "photo": string,
        "total_followers": number,
        "following": boolean,
        categories: []
    }

}

const EducatorItem = ({
                          setStreamerCat,
                          item,
                          selected,
                          followEducator,
                          unFollowEducator,
                          following,
                          unFollowing
                      }: props) => {

    return (
        <View style={styles.favList}>
            <View style={[styles.listIcon, {
                //  backgroundColor: Colors.secondary,
            }]}>


                <FastImage
                    style={styles.tAvatar}
                    source={{
                        cache: FastImage.cacheControl.web,
                        uri: item?.photo,
                        priority: FastImage.priority.normal,
                    }}

                    resizeMode={FastImage.resizeMode.cover}
                />


            </View>
            <View
                style={styles.listBody}>
                <Text style={styles.bodyTitle}>
                    {item?.first_name} {item?.last_name}
                </Text>
                <View style={styles.listBottom}>


                    <Text style={styles.bodySubText}>
                        {item?.total_followers} <Text style={{fontFamily: Fonts.faktumRegular}}>followers </Text>
                    </Text>
                    <Octicons name="dot-fill" size={12} color={"#737373"}/>
                    <Pressable onPress={() => setStreamerCat(item.categories)} style={styles.seeCategories}>
                        <Text style={[styles.bodySubText, {
                            fontFamily: Fonts.faktumMedium
                        }]}>
                            Categories
                        </Text>
                        <Entypo name="chevron-right" size={14} color="#fff"/>
                    </Pressable>


                </View>

            </View>

            {
                item?.following &&


                <MyButton onPress={() => unFollowEducator(item.id)} style={[styles.listBodyRight, {
                    // backgroundColor: !isValid ? Colors.border : Colors.primary
                }]}>
                    <LinearGradient style={styles.createBtnGradient}
                                    colors={['#8D34F1', '#0075FF']}

                                    start={{x: 0.3, y: 1}}
                                    end={{x: 1, y: 3.3,}}

                        // locations={[0.1, 0.7,]}
                    >
                        {
                            item.id == selected && unFollowing
                                ? <ActivityIndicator size='small' color={"#fff"}/>
                                :
                                <Text style={styles.buttonTxt}>
                                    Following
                                </Text>
                        }
                    </LinearGradient>
                </MyButton>
            }
            {
                !item?.following &&


                <TouchableOpacity onPress={() => followEducator(item?.id)} activeOpacity={0.8}
                                  style={[styles.listBodyRight, {
                                      backgroundColor: Colors.border
                                  }]}>

                    {
                        item.id == selected && following ? <ActivityIndicator size='small' color={Colors.primary}/>
                            :
                            <Text style={[styles.buttonTxt, {
                                color: Colors.primary,
                                fontFamily: Fonts.faktumMedium
                            }]}>
                                Follow
                            </Text>
                    }

                </TouchableOpacity>
            }


        </View>
    )
}


const StreamersList = ({navigation}: SignalStackScreenProps<'StreamersList'>) => {


    const [tabIndex, setTabIndex] = useState(0);
    const handleTabsChange = (index: SetStateAction<number>) => {
        setTabIndex(index);
        //  setScreen(index === 0 ? 'Banks' : 'Wallets')
    };

    const [streamerCategories, setStreamerCategories] = useState([]);

    const [searchValue, setSearchValue] = useState('');
    const queryClient = useQueryClient()
    const dispatch = useAppDispatch()
    const [refreshing, setRefreshing] = useState(false);


    const snapPoints = useMemo(() => ["1%", "65%", "70%"], []);
    const catSheetRef = useRef<BottomSheet>(null);

    const handleSnapPress = useCallback((index: number) => {
        catSheetRef.current?.snapToIndex(index);
    }, []);
    const handleClose = useCallback(() => {
        catSheetRef.current?.close();
    }, []);


    const renderBackdrop = useCallback(
        (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
            <BottomSheetBackdrop
                style={{
                    backgroundColor: 'rgba(25,25,25,0.34)'
                }}
                {...props}
                disappearsOnIndex={0}
                appearsOnIndex={1}
            />
        ),
        []
    );

    const {
        data: dataFollowing,
        isLoading: loadingEducators,
        refetch: fetchEducators
    } = useQuery([`get-Educators-Following`], getEducatorsFollowing)

    const {data, isLoading, refetch} = useQuery([`get-educators`], getEducators)

    const [selected, setSelected] = useState('');

// Create a new array with the following information
    const newArray = data?.data?.map((obj2: { id: any; }) => ({
        ...obj2,
        following: dataFollowing?.data?.some((obj1: { educator: { id: any; }; }) => obj1?.educator?.id === obj2?.id),
    }));

    // console.log(newArray);

    // dataFollowing.data.filter


    const {mutate: followNow, isLoading: following} = useMutation(['followEducator'], followEducator, {
        onSuccess: (data) => {

            if (data.success) {
                fetchEducators()
                refetch()
                //  refetchFavs()

                dispatch(addNotificationItem({
                    id: Math.random(),
                    type: 'success',
                    body: data.message,
                }))
            }

        },
        onError: (error, variables, context) => {
            //  console.log(error)
        },
        onSettled: () => {
            queryClient.invalidateQueries(['followEducator']);
        }
    })

    const {mutate: unFollowNow, isLoading: unFollowing} = useMutation(['unFollowEducator'], unFollowEducator, {
        onSuccess: (data) => {

            if (data.success) {
                fetchEducators()
                refetch()

                dispatch(addNotificationItem({
                    id: Math.random(),
                    type: 'success',
                    body: data.message,
                }))

                //  refetchFavs()
            } else {

            }

        },
        onError: (error, variables, context) => {
            console.log(error)
        },
        onSettled: () => {
            queryClient.invalidateQueries(['unFollowEducator']);
        }
    })

    const followEducatorNow = (educator: string) => {
        setSelected(educator)
        const body = JSON.stringify({
            educator
        })
        followNow(body)
    }

    const unFollowEducatorNow = (educator: string) => {
        setSelected(educator)
        const body = JSON.stringify({
            educator
        })
        unFollowNow(body)
    }
    const viewUser = async (educator: {}) => {
        // await setContentBraceTag(userId)
        //  await setFieldValue('braceTag', userId)
        navigation.navigate('ViewEducator', {
            educator
        })
    }

    const streamerCat = (Categories) => {
        handleSnapPress(1)
        setStreamerCategories(Categories)
    }

    const renderItem = useCallback(
        ({item}) => <EducatorItem setStreamerCat={streamerCat} selected={selected} unFollowing={unFollowing}
                                  following={following} item={item}
                                  followEducator={followEducatorNow} unFollowEducator={unFollowEducatorNow}/>,
        [following, unFollowing, selected],
    );


    const renderItemCat = useCallback(({item}: any) => (
        <SelectValue selected={selected} item={item}/>
    ), [selected]);

    const keyExtractor = useCallback((item: { id: any; }) => item.id, [],);


    const refresh = () => {
        setRefreshing(true)
        refetch()
        wait(2000).then(() => setRefreshing(false));
    }


    let filterUsers: readonly any[] | null | undefined = []
    if (!isLoading && data && data?.data) {
        filterUsers = newArray?.filter((educators: { first_name: string }) =>
            educators.first_name.includes(searchValue.trim())
        )
    }

    //  console.log(filterUsers[0].categories)

    return (
        <>

            <SafeAreaView style={styles.safeArea}>
                <ImageBackground source={require('../../assets/images/signal/streamer_BG.png')}
                                 resizeMode={'cover'}
                                 style={styles.dashboardImage}>
                    <HeaderWithTitle title="Streamers List"/>


                    <View style={styles.flatList}>
                        {
                            isLoading && <ActivityIndicator size='small' color={Colors.primary}/>
                        }

                        {
                            Platform.OS === 'ios' ?

                                <GradientSegmentControl tabs={["Streamers", "Following"]}
                                                        currentIndex={tabIndex}
                                                        onChange={handleTabsChange}
                                                        segmentedControlBackgroundColor={'#7676801F'}
                                                        activeSegmentBackgroundColor={"#fff"}

                                                        textColor={"#fff"}
                                                        paddingVertical={pixelSizeVertical(12)}/>
                                :

                                <SegmentedControl tabs={["Streamers", "Following"]}
                                                  currentIndex={tabIndex}
                                                  onChange={handleTabsChange}
                                                  segmentedControlBackgroundColor={Colors.tintPrimary}
                                                  activeSegmentBackgroundColor={Colors.primary}
                                                  activeTextColor={Colors.text}
                                                  textColor={"#CDD4D7"}
                                                  paddingVertical={pixelSizeVertical(16)}/>
                        }

                        <SearchInput

                            placeholder="Search streamer"
                            keyboardType={"default"}

                            onChangeText={(e) => {
                                setSearchValue(e);

                            }}
                            value={searchValue}
                        />

                        {
                            !isLoading && data &&

                            <IF condition={tabIndex === 0}>


                                <FlashList
                                    estimatedItemSize={200}
                                    refreshing={isLoading}
                                    //ListHeaderComponent={renderHeader}

                                    scrollEnabled
                                    showsVerticalScrollIndicator={false}
                                    data={filterUsers}
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
                            </IF>
                        }


                        {
                            !isLoading && data &&

                            <IF condition={tabIndex === 1}>


                                <FlashList
                                    estimatedItemSize={200}
                                    refreshing={isLoading}

                                    // ListHeaderComponent={renderHeader}
                                    scrollEnabled
                                    showsVerticalScrollIndicator={false}
                                    data={filterUsers?.filter(users => users.following == true)}
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
                            </IF>
                        }

                    </View>


                    <ToastAnimated/>


                </ImageBackground>
            </SafeAreaView>
            <BottomSheet

                index={0}
                ref={catSheetRef}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                backgroundStyle={{
                    backgroundColor: Colors.dark.background,
                }}
                handleIndicatorStyle={{backgroundColor: "#fff"}}
            >
                <View style={styles.sheetHead}>

                    <View style={{
                        width: '5%'
                    }}/>

                    <Text style={styles.sheetTitle}>
                        Streamer category
                    </Text>

                    <TouchableOpacity onPress={handleClose} style={[styles.dismiss, {
                        backgroundColor: Colors.textDark,


                    }]}>
                        <Ionicons name="close-sharp" size={20} color={Colors.text}/>
                    </TouchableOpacity>

                </View>


                <BottomSheetFlatList data={streamerCategories}
                                     renderItem={renderItemCat}
                                     keyExtractor={keyExtractor}
                                     contentContainerStyle={styles.flatListCat}
                                     showsVerticalScrollIndicator={false}/>

            </BottomSheet>
        </>
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
        paddingHorizontal: 20,
        flex: 1,
        width: '100%',
        alignItems: "center"
    },
    scrollView: {
        width: '100%',
        alignItems: "center",
        paddingHorizontal: 20,
    },
    flatList: {
        width: '90%',

        flex: 1,


    },
    dashboardImage: {
        // paddingHorizontal: pixelSizeHorizontal(20),
        resizeMode: 'cover',
        width: '100%',
        flex: 1,
        borderRadius: 30,
        alignItems: 'center',

    },
    streamerCard: {},
    favList: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: heightPixel(90),

    },

    listIcon: {
        width: 55,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tAvatar: {

        borderRadius: 10,
        resizeMode: 'cover',
        width: '100%',
        height: '100%'
    },
    listBody: {
        width: '50%',
        height: '50%',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },


    createBtnGradient: {
        width: '100%',
        height: '65%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTxt: {
        fontFamily: Fonts.faktumBold,
        fontSize: fontPixel(12),
        color: "#fff"
    },


    listBodyRight: {
        borderRadius: 20,
        width: 100,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    followText: {
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumBold,
        color: Colors.text
    },
    bodyTitle: {
        fontSize: fontPixel(16),
        fontFamily: Fonts.faktumBold,
        color: Colors.text
    },
    bodySubText: {
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumRegular,
        color: Colors.tintText
    },
    seeCategories: {
        marginLeft: 5,
        flexDirection: 'row',
        alignItems: 'center',
        height: 20,
        width: widthPixel(140),

    },
    flagIcon: {
        width: widthPixel(15),
        height: heightPixel(10),
        borderRadius: 2,
        alignItems: 'center',
    },
    listBottom: {
        width: '100%',
        height: '40%',
        flexDirection: 'row',
        alignItems: 'center',
    },

    flatListCat: {
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    sheetHead: {
        paddingHorizontal: pixelSizeHorizontal(20),

        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    sheetTitle: {
        width: '70%',
        textAlign: 'center',
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumMedium,
        color: Colors.tintText
    },
    dismiss: {

        borderRadius: 30,
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.10,
        shadowRadius: 7.22,

        elevation: 3,
    },
    selectBtn: {
        borderRadius: 5,
        marginVertical: pixelSizeVertical(10),
        width: '100%',
        height: heightPixel(50),
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,

    },
    itemText: {
        marginLeft: 8,
        fontSize: fontPixel(14),
        textTransform: 'capitalize',
        color: Colors.text,
        fontFamily: Fonts.faktumMedium,
    },
    item: {
        flexDirection: 'row',
        width: '90%',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },


})

export default StreamersList;

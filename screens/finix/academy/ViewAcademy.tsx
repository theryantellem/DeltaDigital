import React, {Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {
    Text,
    View,
    StyleSheet,
    Platform,
    UIManager,
    TouchableOpacity,
    Pressable, ActivityIndicator, ScrollView
} from 'react-native';

import {SafeAreaView} from "react-native-safe-area-context";
import {fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel} from "../../../helpers/normalize";
import {Fonts} from "../../../constants/Fonts";
import {AccordionList} from 'react-native-accordion-list-view';
import Colors from "../../../constants/Colors";
import {Entypo, Ionicons, Octicons} from "@expo/vector-icons";
import {SignalStackScreenProps} from "../../../types";
import {StatusBar} from "expo-status-bar";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {enrollModule, listAcademyDetails, listAcademyModules, listAcademyRating} from "../../../api/finix-api";
import FastImage from "react-native-fast-image";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetScrollView
} from "@gorhom/bottom-sheet";
import {
    BottomSheetDefaultBackdropProps
} from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import Animated, {Easing, FadeInDown, FadeInLeft, FadeOutDown, FadeOutLeft, Layout} from "react-native-reanimated";
import dayjs from "dayjs";
import {isWhatPercentOf, truncate, useRefreshOnFocus} from "../../../helpers";
import {addNotificationItem} from "../../../app/slices/dataSlice";
import {useAppDispatch} from "../../../app/hooks";
import ToastAnimated from "../../../components/toast";


interface Interface {
    enrollUser: (uuid: string) => void,
    completed: string,
    viewVideoScreen: (id: string, videoUrl: string,
                      videoTitle: string, description: string, caption: string, vid_length: string, completed: string) => void
    index: number | null,
    item: {
        name: string,
        id: string,
        description: string,
        caption: string,
        videos: [],
    },
    setCurrentIndex: Dispatch<SetStateAction<null>>,
    currentIndex: number | string | null
}


const RenderComponent = ({
                             viewVideoScreen,
                             enrollUser,
                             index,
                             item,
                             setCurrentIndex,
                             currentIndex,
                             completed
                         }: Interface) => {

    return (
        <TouchableOpacity

            key={item.id}
            onPress={() => {
                enrollUser(item.id)
                setCurrentIndex(index === currentIndex ? null : index);
            }}
            style={styles.cardContainer}
            activeOpacity={0.9}
        >
            <Animated.View style={styles.card}>
                <>

                    <View style={styles.accordionHead}>
                        <View style={styles.headLeft}>
                            <Text style={styles.accordionTitle}>{item.name}: {item.caption}</Text>
                            <Text style={styles.accordionSubTitle}>{
                                item.description ?
                                truncate(item.description,140) :   item.description
                            }</Text>



                            <View style={styles.progressBar}>
                                <View style={[styles.bar, {
                                    width: completed,
                                }]}>

                                </View>
                            </View>
                            <Text style={styles.completedText}>
                                {completed} completed
                            </Text>

                        </View>

                        <View>

                            {index === currentIndex && <Entypo name="chevron-down" size={24} color="#00B2FF"/>}
                            {index !== currentIndex && <Entypo name="chevron-up" size={24} color="#00B2FF"/>}
                        </View>


                    </View>
                    {index === currentIndex && (
                        <Animated.View layout={Layout.easing(Easing.bounce).delay(50)}
                                       entering={FadeInDown} exiting={FadeOutDown} style={styles.accordionBody}>
                            {item.videos.map((details: {
                                "id": string,
                                "name": string,
                                "description": string,
                                "caption": string,
                                "video_file": string,
                                "length": string
                            }) => (
                                <TouchableOpacity key={details.id + details.name}
                                                  onPress={() => viewVideoScreen(item.id, details.video_file, details.name, details.description,
                                                      details.caption, details.length, completed)}
                                                  activeOpacity={0.7}
                                                  style={[styles.accordionBodyButton, {}]}>
                                    <View style={styles.playIcon}>
                                        <Ionicons name="play" size={18} color="black"/>
                                    </View>
                                    <View style={styles.accordionBodyVideo}>
                                        <Text style={styles.accordionVideoTitle}>{details.name}</Text>
                                        <Text>{details.description}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}

                        </Animated.View>
                    )}
                </>
            </Animated.View>
        </TouchableOpacity>


    );
}


interface reviewProps {
    comment: string,
    reviewer_info: {
        id: string,
        name: string,
    }
    rating: number,
    userName?: string,
    name: string,
    updatedAt?: string,
}

const ReviewCard = ({comment, reviewer_info, userName, name, updatedAt, rating}: reviewProps) => {
    const arr = new Array(rating).fill(rating)

    return (
        <Animated.View key={reviewer_info.id} entering={FadeInLeft} exiting={FadeOutLeft}
                       layout={Layout.easing(Easing.bounce).delay(20)} style={styles.reviewCard}>

            <View style={styles.reviewCardLeftBody}>
                <Text style={styles.reviewTitle}>
                    {reviewer_info.name}
                </Text>
                <Text style={styles.reviewBodyText}>
                    {comment}
                </Text>
            </View>

            <View style={styles.stars}>
                {
                    arr.map((value, index, array) => (
                        <Octicons key={index} name="star-fill" size={14} color={"#EDBA13"}/>
                    ))
                }

                {/* <Octicons name="star-fill" size={14} color={"#fff"}/>
                    <Octicons name="star-fill" size={14} color={"#fff"}/>*/}
            </View>

            <View style={styles.reviewCardRightBody}>
                <Text style={styles.reviewDateText}>
                    {dayjs(updatedAt).format('DD MMM, YYYY')}

                </Text>
            </View>

        </Animated.View>
    )

}


const ViewAcademy = ({navigation, route}: SignalStackScreenProps<'ViewAcademy'>) => {


    const {id} = route.params
    const dispatch = useAppDispatch()
    const queryClient = useQueryClient()
    const {data, isLoading, refetch} = useQuery(['listAcademyDetails', id], () => listAcademyDetails(id))
    const {
        data: ratings,
        isLoading: loadingRating,
        refetch: fetchReviews
    } = useQuery(['listAcademyRating', id], () => listAcademyRating(id))


    const [currentIndex, setCurrentIndex] = useState(null);
    // variables
    const snapPoints = useMemo(() => ["1%", "65%"], []);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const bottomSheetModalDescriptionRef = useRef<BottomSheetModal>(null);

    // variables


    // callbacks
    const handlePresentModalDescriptionPress = useCallback(() => {
        bottomSheetModalDescriptionRef.current?.present(1);
    }, []);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present(1);
    }, []);

    const handleCloseDescription = useCallback(() => {
        bottomSheetModalDescriptionRef.current?.close();
    }, []);

    const handleClose = useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, []);

    const renderBackdrop = useCallback(
        (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={0}
                appearsOnIndex={1}
            />
        ),
        []
    );

    const {mutate, isLoading: enrolling} = useMutation(['enrollModule'], enrollModule, {
        onSuccess: (data) => {

            if (data.success) {
                // fetchEducators()
                //refetch()

                dispatch(addNotificationItem({
                    id: Math.random(),
                    type: 'success',
                    body: data.message,
                }))

                //  refetchFavs()
            } else {

            }

        },
        onSettled: () => {
            queryClient.invalidateQueries(['enrollModule']);
        }
    })
    useEffect(() => {
        if (Platform.OS === 'android') {
            if (UIManager.setLayoutAnimationEnabledExperimental) {
                UIManager.setLayoutAnimationEnabledExperimental(true);
            }
        }
    }, []);


    const viewVideoScreen = (id: string, videoUrl: string,
                             videoTitle: string, description: string, caption: string, vid_length: string, completed: string) => {
        navigation.navigate('VideoScreen', {
            id,
            videoUrl,
            videoTitle,
            description,
            caption,
            completed,
            length: vid_length,
            posterImage: data?.data[0]?.thumbnail,
        })
    }


    const goBack = () => {
        navigation.goBack()
    }

    const giveReview = () => {
        navigation.navigate('LeaveReview', {
            academy_uuid: id
        })
    }

    useRefreshOnFocus(refetch)
    useRefreshOnFocus(fetchReviews)

    const enrollUser = (module_uuid: string) => {
        const body = JSON.stringify({
            module_uuid
        })
        console.log(module_uuid)
        mutate(body)
    }



    return (
        <>

            <SafeAreaView style={styles.safeArea}>
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

                {
                    isLoading &&

                    <View style={styles.scrollView}>
                        <ActivityIndicator color={Colors.primary} size={'large'}/>
                    </View>
                }
                {
                    !isLoading && data &&

                    <ScrollView style={{
                        width: '100%',
                        marginBottom: 50,
                    }} contentContainerStyle={styles.scrollView} scrollEnabled
                                showsVerticalScrollIndicator={false}>


                        <View style={styles.frameImageWrap}>

                            <FastImage

                                style={styles.frameImage}
                                source={{
                                    uri: data?.data[0]?.thumbnail,

                                    cache: FastImage.cacheControl.web,
                                    priority: FastImage.priority.normal,

                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />


                        </View>


                        <View style={[styles.chatHeader]}>


                            <View style={styles.chatBarInfo}>
                                <View style={styles.chatBarInfoImageWrap}>
                                    <FastImage

                                        style={styles.educatorImage}
                                        source={{
                                            uri: data?.data[0]?.educator.photo,
                                            cache: FastImage.cacheControl.web,
                                            priority: FastImage.priority.normal,

                                        }}
                                        resizeMode={FastImage.resizeMode.cover}
                                    />
                                </View>

                                <View style={styles.chatBarBody}>
                                    <Text style={styles.chatBarUsername}>


                                        {data?.data[0].name}

                                    </Text>
                                    <Text style={styles.chatBarText}>
                                        {data?.data[0].educator.first_name} {data?.data[0].educator.last_name}
                                    </Text>
                                    <Text style={styles.chatBarText}>

                                        {data?.data[0].caption}
                                    </Text>
                                </View>
                            </View>


                        </View>

                        {
                            !isLoading && data &&
                            <View style={styles.CategoriesContainer}>

                                {data?.data[0]?.modules.map((item: any, index: number) => (

                                    <RenderComponent enrollUser={enrollUser} viewVideoScreen={viewVideoScreen}
                                                     index={index}
                                                     currentIndex={currentIndex}
                                                     setCurrentIndex={setCurrentIndex}
                                                     key={item.id} item={item} completed={item.completed}/>
                                ))}

                            </View>
                        }


                        {/*

                     ACCORDION HERE

                     */}

                    </ScrollView>


                }
                <View style={styles.bottomOptions}>
                    <TouchableOpacity onPress={handlePresentModalDescriptionPress} activeOpacity={0.7}
                                      style={styles.bottomButton}>
                        <Text style={styles.bottomButtonText}>
                            Description
                        </Text>
                    </TouchableOpacity>

                    {/*    <TouchableOpacity activeOpacity={0.7} style={styles.bottomButton}>
                        <Text style={styles.bottomButtonText}>
                            Course Info
                        </Text>
                    </TouchableOpacity>*/}

                    <TouchableOpacity onPress={handlePresentModalPress} activeOpacity={0.7} style={styles.bottomButton}>
                        <Text style={styles.bottomButtonText}>
                            Reviews
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={giveReview} activeOpacity={0.7} style={[styles.bottomButton, {
                        backgroundColor: "#00C2FF"
                    }]}>
                        <Text style={[styles.bottomButtonText, {
                            color: "#fff"
                        }]}>
                            Make a Review
                        </Text>
                    </TouchableOpacity>
                </View>

                <ToastAnimated/>
            </SafeAreaView>


            <BottomSheetModalProvider>


                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    animateOnMount
                    index={1}
                    snapPoints={snapPoints}
                    backdropComponent={renderBackdrop}
                    style={{
                        paddingHorizontal: pixelSizeHorizontal(20)
                    }}
                    backgroundStyle={{
                        backgroundColor: "#fff"
                    }}
                    handleIndicatorStyle={{backgroundColor: Colors.textDark}}

                >
                    <BottomSheetScrollView style={styles.sheetScrollView} contentContainerStyle={{
                        width: '100%',
                        alignItems: 'center',
                    }}>
                        <View style={[styles.sheetHead, {
                            height: 40,
                        }]}>


                            <Text style={[styles.sheetTitle, {
                                fontSize: fontPixel(14),
                                color: Colors.textDark
                            }]}>
                                Reviews
                            </Text>
                            <TouchableOpacity onPress={handleClose}
                                              style={[styles.dismiss, {
                                                  backgroundColor: "#11192E"
                                              }]}>
                                <Ionicons name="close-sharp" size={20} color={"#fff"}/>
                            </TouchableOpacity>
                        </View>

                        {loadingRating && <ActivityIndicator size='small' color={Colors.purplePrimary}/>}

                        {
                            !loadingRating && ratings && ratings?.data.map((({
                                                                                 comment,
                                                                                 reviewer_info,
                                                                                 rating,
                                                                                 created_at
                                                                             }) => (
                                <ReviewCard reviewer_info={reviewer_info} comment={comment} key={created_at}
                                            rating={rating} name={reviewer_info.name}/>
                            )))
                        }


                    </BottomSheetScrollView>
                </BottomSheetModal>
            </BottomSheetModalProvider>


            <BottomSheetModalProvider>


                <BottomSheetModal
                    ref={bottomSheetModalDescriptionRef}
                    animateOnMount
                    index={1}
                    snapPoints={snapPoints}
                    backdropComponent={renderBackdrop}
                    style={{
                        paddingHorizontal: pixelSizeHorizontal(20)
                    }}
                    backgroundStyle={{
                        backgroundColor: "#fff"
                    }}
                    handleIndicatorStyle={{backgroundColor: Colors.textDark}}

                >

                    <BottomSheetScrollView style={styles.sheetScrollView} contentContainerStyle={{
                        width: '100%',
                        alignItems: 'center',
                    }}>
                        <View style={[styles.sheetHead, {
                            height: 40,
                        }]}>


                            <Text style={[styles.sheetTitle, {
                                fontSize: fontPixel(14),
                                color: Colors.textDark
                            }]}>
                                Description
                            </Text>
                            <TouchableOpacity onPress={handleCloseDescription}
                                              style={[styles.dismiss, {
                                                  backgroundColor: "#11192E"
                                              }]}>
                                <Ionicons name="close-sharp" size={20} color={"#fff"}/>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.descriptionBox}>
                            <Text style={styles.descriptionText}>

                                {data?.data[0]?.description}
                            </Text>
                        </View>


                    </BottomSheetScrollView>

                </BottomSheetModal>
            </BottomSheetModalProvider>

        </>
    );
};

const styles = StyleSheet.create({

    safeArea: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#D9D9D9",
    },
    scrollView: {

        width: '100%',
        alignItems: "center",
        // paddingHorizontal: 20,
    },
    topBar: {
        height: heightPixel(80),
        width: '100%',
        paddingHorizontal: pixelSizeHorizontal(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#fff",
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
    frameImageWrap: {
        width: '100%',
        height: heightPixel(230),
        alignItems: 'center',
        justifyContent: 'center'
    },

    frameImage: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },

    chatHeader: {
        backgroundColor: "#fff",
        width: '100%',
        minHeight: heightPixel(120),
        borderBottomWidth: 0.5,
        borderBottomColor: "#606060",
        justifyContent: 'center',
        alignItems: 'center',
    },

    chatBar: {
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',

        flexDirection: 'row'
    },
    chatBarInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',

    },
    chatBarInfoImageWrap: {
        width: 50,
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#eee",
        marginHorizontal: pixelSizeHorizontal(12),
    },
    educatorImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 50,


    },
    chatBarBody: {
        width: '80%',
        // height: '100%',
        justifyContent: 'center',

    },
    chatBarUsername: {
        fontFamily: Fonts.faktumBold,
        color: '#131313',
        marginVertical: pixelSizeVertical(2),
        fontSize: fontPixel(16),
    },
    chatBarText: {
        marginVertical: pixelSizeVertical(2),
        fontFamily: Fonts.faktumRegular,
        color: '#000',
        fontSize: fontPixel(14),
    },
    chatBarInfoImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        alignItems: 'center',

    },
    barTitle: {
        fontFamily: Fonts.faktumBold,
        color: '#131313',
        fontSize: fontPixel(16),
    },
    accordionHead: {
        backgroundColor: '#fff',
        width: '100%',
        paddingHorizontal: pixelSizeHorizontal(20),
        height: heightPixel(120),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'

    },
    headLeft: {
        width: '90%',


        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',

    },
    progressBar: {
        width: '100%',
        backgroundColor: '#F4F5F7',
        height: 5,
        borderRadius: 5,
    },
    bar: {

        backgroundColor: Colors.success,

        position: 'relative',
        height: 5,
        borderRadius: 5,
    },
    completedText:{
        fontFamily: Fonts.faktumRegular,
        color: Colors.textDark,
        fontSize: fontPixel(12),
    },

    accordionTitle: {
        fontFamily: Fonts.faktumBold,
        color: Colors.textDark,
        fontSize: fontPixel(14),
    },
    accordionSubTitle: {
        fontFamily: Fonts.faktumRegular,
        color: Colors.textDark,
        fontSize: fontPixel(12),
    },
    accordionBody: {

        width: '100%',
        backgroundColor: "#EBEBEB",
        alignItems: 'center',
        paddingHorizontal: pixelSizeHorizontal(10),
    },
    accordionBodyButton: {
        height: 70,
        borderBottomColor: "#9B9B9B",
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    playIcon: {
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.border,
        borderWidth: 3,
        borderRadius: 40,
    },
    accordionBodyVideo: {
        marginLeft: 10,
        justifyContent: 'space-evenly',
        height: 50,
    },
    accordionVideoTitle: {
        fontFamily: Fonts.faktumBold,
        color: "#6C6C6C",
        fontSize: fontPixel(14),
    },
    bottomOptions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: pixelSizeHorizontal(15),
        width: '100%',
        height: 75,
        backgroundColor: "#fff",
        bottom: 0,
        position: 'absolute'
    },
    bottomButton: {
        minWidth: widthPixel(90),
        paddingHorizontal: 5,
        height: 35,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',

    },
    bottomButtonText: {
        fontFamily: Fonts.faktumMedium,
        color: "#6C6C6C",
        fontSize: fontPixel(14),
    },
    sheetScrollView: {
        width: '100%',
        marginTop: 10,
        backgroundColor: "#fff"
    },
    sheetHead: {
        // paddingHorizontal: pixelSizeHorizontal(20),
        height: 60,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
    ,
    sheetTitle: {
        fontSize: fontPixel(18),
        fontFamily: Fonts.faktumBold,

    },
    dismiss: {
        position: 'absolute',
        right: 10,
        borderRadius: 30,
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',

    },
    reviewCard: {
        marginVertical: pixelSizeVertical(5),
        width: '100%',
        height: heightPixel(50),
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',

    },
    reviewTitle: {
        textTransform: 'capitalize',
        color: Colors.textDark,
        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumMedium
    },

    reviewCardLeftBody: {
        width: '35%',
        height: '100%',

        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    reviewCardRightBody: {
        width: '30%',
        height: '100%',

        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    stars: {
        width: '20%',
        marginLeft: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    reviewBodyText: {
        marginTop: 5,
        color: Colors.textDark,
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumRegular
    }, reviewDateText: {
        marginTop: 5,
        color: Colors.textDark,
        fontSize: fontPixel(12),
        fontFamily: Fonts.faktumRegular
    },

    cardContainer: {
        width: '100%',

    },
    card: {
        width: '100%',

        borderBottomColor: "#EBEBEB",
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    CategoriesContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: "#fff",
    },
    descriptionBox: {
        width: '100%',
        marginTop: 30,
    },
    descriptionText: {
        color: Colors.textDark,

        fontSize: fontPixel(14),
        fontFamily: Fonts.faktumRegular
    },
})

export default ViewAcademy;

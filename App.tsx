import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import {enableScreens} from "react-native-screens";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import {SafeAreaProvider} from "react-native-safe-area-context";
import 'react-native-gesture-handler';
import {PersistQueryClientProvider} from "@tanstack/react-query-persist-client";
import {createSyncStoragePersister} from "@tanstack/query-sync-storage-persister";
import {focusManager, MutationCache, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {persistor, store} from "./app/store";
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from "react-redux";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import ToastAnimated from "./components/toast";
import React, {useEffect, useRef, useState} from "react";
import {Portal, PortalProvider} from "@gorhom/portal";
import {logoutUser, setLockUser, setUserLastSession} from "./app/slices/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnBoardingScreen from "./screens/onboarding";
import * as Notifications from 'expo-notifications';
import * as SecureStore from "expo-secure-store";
import {getFcmToken, getFcmTokenFromLocalStorage, requestUserPermission,    notificationListener} from "./notificationConfig";
import inAppMessaging from '@react-native-firebase/in-app-messaging';
import {BASE_ULR_AUTH, LIVE_PROD_URL,BASE_ULR_NEW} from "@env";

enableScreens()


const persister = createSyncStoragePersister({
    storage: window.localStorage,
});


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            networkMode: 'online',
            cacheTime: 1000 * 60 * 60 * 24, // 24 hours
            staleTime: 2000,
            retry: 0,
        },
    },
    // configure global cache callbacks to show toast notifications
    mutationCache: new MutationCache({
        onSuccess: (data) => {
            //  toast.success(data.message);
        },
        onError: (error) => {
            // toast.error(error.message);
        },
    }),
});


export default function App() {
    const [firstLaunch, setFirstLaunch] = useState(true);

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    //const notificationListener = useRef();
    const responseListener = useRef();
    const fcmToken = SecureStore.getItemAsync('app_fcmtoken');
    const [generatedToken, setGeneratedToken] = useState('');
    const [upUser, setUpUser] = useState('');
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    async function bootstrap() {
        await inAppMessaging()
            .setMessagesDisplaySuppressed(true)
            .then(response => {
               // console.log(response);
            });
    }

    useEffect(() => {
        AsyncStorage.getItem("Delta_Digital_user_first_time")
            .then((value) => {
                if (value === null) {
                    setFirstLaunch(true);
                } else if (value == 'false') {

                    setFirstLaunch(false);
                }
            })
            .catch((err) => {
                //   console.log("Error @brace_user_first_time: ", err);
            });
    }, []);
    const logout = () => {
        store.dispatch(logoutUser())
    }
    const skip = async () => {
        await AsyncStorage.setItem('Delta_Digital_user_first_time', 'false');
        setFirstLaunch(false)
    }
    useEffect(() => {
        if (focusManager.isFocused()) {
            (async () => {


                let Token = await SecureStore.getItemAsync('delta-signal-token');
                let ID = await SecureStore.getItemAsync('delta-signal-ID');
                const myHeaders = {
                    'Content-Type': 'application/json',
                    "TOKEN": Token,
                    "ID": ID
                }
                //  "TOKEN", "2|KOg6Xv9IHSqMTPoZyyXKyTd7R99QAwKcthWTf5pl"
                let timeoutId: NodeJS.Timeout

                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders

                };

                const promise = Promise.race([
                    fetch(`${LIVE_PROD_URL}/profile?userId=${ID}`, requestOptions)
                        .then(response => response.json()),
                    new Promise((resolve, reject) => {
                        timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

                        //  clearTimeout(timeoutId)
                    }).then(() => {
                        clearTimeout(timeoutId)
                    })


                ])

                promise.then(res =>{

                    if(res.data =='Please sign in') {
                        logout()
                        store.dispatch(setLockUser({
                            lockUser: false
                        }))
                        store.dispatch(setUserLastSession({
                            cleanLastActive: ''
                        }))
                    }
                })

            })()



                }



    });


    useEffect(() => {
        const fetchToken = async () => {
            const token = await getFcmToken();

            let BearerToken = await SecureStore.getItemAsync('delta-signal-token');
            if (token) {

                setGeneratedToken(token);
                       let timeoutId: NodeJS.Timeout
                const body = JSON.stringify({
                    token,
                })
                const myHeaders = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${BearerToken}`
                }
                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: body,
                };
               const promise = Promise.race([
                    fetch(`${BASE_ULR_NEW}/profile/update-push-token`, requestOptions)
                        .then(response => response.json()),
                    new Promise((resolve, reject) => {
                        //  clearTimeout(timeoutId)
                        timeoutId = setTimeout(() => reject(new Error('Timeout')), 20000)
                    }).then(() => {
                        clearTimeout(timeoutId)
                    })

                ])


            }
        };

        const fetchTokenByLocal = async () => {
            await getFcmTokenFromLocalStorage();
        };
        void fetchToken();
        void fetchTokenByLocal();
        void requestUserPermission();
        void notificationListener();


    }, []);

    if (!isLoadingComplete) {
        return null;
    } else {

        return (
            <GestureHandlerRootView style={{flex: 1}}>

                <PersistQueryClientProvider
                    client={queryClient}
                    persistOptions={{persister}}
                    onSuccess={() => {
                        // resume mutations after initial restore from localStorage was successful
                        queryClient.resumePausedMutations().then(() => {
                            queryClient.invalidateQueries();
                        });
                    }}
                >
                    <QueryClientProvider client={queryClient}>
                        <Provider store={store}>
                            {/*@ts-ignore*/}

                            <PersistGate loading={null} persistor={persistor}>
                                <SafeAreaProvider>
                                    <StatusBar style="light"/>
                                    <PortalProvider>

                                        {/*    <OnBoardingScreen skip={skip}/>*/}

                                        <Navigation colorScheme={colorScheme}/>


                                    </PortalProvider>
                                </SafeAreaProvider>

                            </PersistGate>
                        </Provider>
                    </QueryClientProvider>
                </PersistQueryClientProvider>
            </GestureHandlerRootView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

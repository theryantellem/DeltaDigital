import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import {enableScreens} from "react-native-screens";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import {SafeAreaProvider} from "react-native-safe-area-context";
import 'react-native-gesture-handler';
import {PersistQueryClientProvider} from "@tanstack/react-query-persist-client";
import {createSyncStoragePersister} from "@tanstack/query-sync-storage-persister";
import {MutationCache, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {persistor, store} from "./app/store";
import { PersistGate } from 'redux-persist/integration/react';
import {Provider} from "react-redux";
import {GestureHandlerRootView} from "react-native-gesture-handler";
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

    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();
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
            <Navigation colorScheme={colorScheme}/>
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

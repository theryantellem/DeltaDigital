import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import {enableScreens} from "react-native-screens";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import {SafeAreaProvider} from "react-native-safe-area-context";
import 'react-native-gesture-handler';


enableScreens()


export default function App() {

    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();
    if (!isLoadingComplete) {
        return null;
    } else {

        return (
            <SafeAreaProvider>
                <StatusBar style="light"/>
            <Navigation colorScheme={colorScheme}/>
            </SafeAreaProvider>
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

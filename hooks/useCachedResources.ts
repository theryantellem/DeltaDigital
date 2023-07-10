import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'faktum-bold': require('../assets/fonts/Faktum-Bold.otf'),
          'faktum-light': require('../assets/fonts/Faktum-Light.otf'),
          'faktum-regular': require('../assets/fonts/Faktum-Regular.otf'),
          'faktum-medium': require('../assets/fonts/Faktum-Medium.otf'),
          'faktum-semi-bold': require('../assets/fonts/Faktum-SemiBold.otf'),
          'faktum-extra-bold': require('../assets/fonts/Faktum-ExtraBold.otf'),
          'faktum-regular-italics': require('../assets/fonts/Faktum-RegularItalic.otf'),
          'faktum-med-italics': require('../assets/fonts/Faktum-MediumItalic.otf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}

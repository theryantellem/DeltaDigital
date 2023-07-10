/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
     /* Cyborg: {
        screens: {
          Home:'Home',
          More: 'Wallets',
          Account: 'Account',

        },
      },*/
      Auth: {
        screens: {
          Login: 'Login',
          ForgotPasswordScreen: 'ForgotPasswordScreen',
          ResetPasswordAuth: 'ResetPasswordAuth',
        },
      },
      OnBoardingScreen: 'OnBoardingScreen',

      NotFound: '*',
    },
  },
};

export default linking;

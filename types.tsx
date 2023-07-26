/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps, NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SignInScreen from "./screens/auth/SignIn";
import {CyborgBottomTab} from "./navigation/cyborg";
import NewsScreen from "./screens/cyborg/NewsScreen";
import SelectType from "./screens/cyborg/bot/SelectType";
import SelectAsset from "./screens/cyborg/bot/SelectAsset";
import TradeSetting from "./screens/cyborg/bot/TradeSetting";
import ReviewScreen from "./screens/cyborg/bot/ReviewScreen";
import OverView from "./screens/cyborg/OverView";
import BotSuccess from "./screens/cyborg/bot/BotSuccess";
import UserAccount from "./screens/cyborg/UserAccount";
import Assets from "./screens/cyborg/profile/Assets";
import DepositScreen from "./screens/cyborg/profile/DepositScreen";
import Withdrawal from "./screens/cyborg/profile/WIthdrawalAmount";
import WithdrawalAmount from "./screens/cyborg/profile/WIthdrawalAmount";
import SettingsScreen from "./screens/cyborg/profile/SettingsScreen";
import ApiBinding from "./screens/cyborg/profile/ApiBinding";
import LeaderBoard from "./screens/cyborg/more/LeaderBoard";



declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {
        }
    }
}

export type RootStackParamList = {

    Auth: NavigatorScreenParams<AuthStackParamList> | undefined;

    //START CYBORG

    CyborgBottomTab: NavigatorScreenParams<RootTabParamList> | undefined;
    NewsScreen: undefined;
    SelectType: undefined;
    SelectExchange: undefined;
    SelectAsset: undefined;
    TradeSetting: undefined;
    ReviewScreen: undefined;
    OverView: undefined;
    BotSuccess: undefined;
    UserAccount: undefined;
    DepositScreen: undefined;
    Withdrawal: {
        amount:string
    };
    WithdrawalAmount: undefined;
    RewardDetails: undefined;
    SettingsScreen: undefined;
    Earnings: undefined;
    ApiBinding: undefined;
    TransferScreen: undefined;
    Assets: undefined;
    LeaderBoard: undefined;
    SuccessScreen: {
        title:string,
        message:string,
        type?:'error'|'success'
    };


    //END CYBORG



    OnBoardingScreen: undefined;
    LandingScreen: undefined;

    NotFound: undefined;
};


export type AuthStackParamList = {

    SignInScreen: undefined;

    ForgotPasswordScreen: undefined;
    ResetPasswordAuth: {
        email: string
    };

    ConfirmAccountEmail: {
        email: string
    };
    ConfirmAccountTwoFA:undefined

    CreateAccountScreen: undefined;


};


export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
    RootStackParamList,
    Screen
>;

export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> = NativeStackScreenProps<
    AuthStackParamList, Screen
>;

export type RootTabParamList = {
    CyborgHome: undefined;
    Create: undefined;
    MoreScreen: undefined

};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
>;

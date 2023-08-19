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
import EditProfile from "./screens/cyborg/profile/EditProfile";
import CouncellerScreen from "./screens/cyborg/profile/CouncellerScreen";
import ViewAPIBinding from "./screens/cyborg/profile/ViewAPIBinding";
import LogScreen from "./screens/cyborg/strategy/LogScreen";
import ContactUs from "./screens/cyborg/profile/ContactUs";
import Quantitative from "./screens/cyborg/Quantitative";
import AllStrategy from "./screens/cyborg/bot/strategy/AllStrategy";
import ViewStrategy from "./screens/cyborg/bot/strategy/ViewStrategy";
import BotDirection from "./screens/cyborg/bot/FeaturesBot/BotDirection";
import AutoConfig from "./screens/cyborg/bot/FeaturesBot/AutoConfig";
import SetAmount from "./screens/cyborg/bot/FeaturesBot/manual_config/SetAmount";
import CustomizeEntries from "./screens/cyborg/bot/FeaturesBot/manual_config/CustomizeEntries";
import AdditionalSettings from "./screens/cyborg/bot/FeaturesBot/manual_config/AdditionalSettings";
import FinalPreview from "./screens/cyborg/bot/FeaturesBot/FinalPreview";



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
    SelectExchange: {
        type:'spot'|'futures'
    };
    SelectAsset: {

        exchange:string
    };
    TradeSetting: undefined;
    ReviewScreen: undefined;
    OverView: undefined;
    BotSuccess: {
        amount:string,
        market:string
    };
    UserAccount: undefined;
    DepositScreen: undefined;
    Withdrawal: {
        amount:string
    };
    WithdrawalAmount: undefined;
    EditProfile: undefined;
    RewardDetails: undefined;
    SettingsScreen: undefined;
    Earnings: undefined;
    ApiBinding: undefined;
    TransferScreen: undefined;
    Assets: undefined;
    LeaderBoard: undefined;
    CouncellerScreen: undefined;
    SyncStrategy: undefined;
    LogScreen: {
        market:string,
        exchange:string
    };
    SuccessScreen: {
        title:string,
        message:string,
        type?:'error'|'success'
    };
    ViewAPIBinding: {
        exchange:string,
        apiKey:string,
        apiSecrete:string,
        isBound:'0'|'1',
    };
    AllStrategy:undefined
    ViewStrategy: {
        id:string
    }
    FeaturesSelectAsset:undefined
    SelectConfig:undefined
    FeaturesSelectExchange:undefined
    AutoConfig:undefined
    SetAmount:undefined
    EntriesScreen:undefined
    CustomizeEntries:undefined
    AdditionalSettings:undefined
    FinalPreview:undefined
    BotDirection:undefined
    ContactUs:undefined
    FeedbackRecord:undefined
    Quantitative:undefined

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

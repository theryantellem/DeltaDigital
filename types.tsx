/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps, NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RevenueScreen from "./screens/cyborg/profile/RevenueScreen";


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
        type: 'spot' | 'futures'
    };
    SelectAsset: {

        exchange: string
    };
    TradeSetting: undefined;
    TradeSettingStrategy: {
        id: string,
        dataLogs: {
            trade_type:string,

            price_above:string,
            "price_below": string,
            "re_capital": string,
            stop_loss:string,
            closing_price:string
            entry_call:string,
            "Avg_Price": string,
            "FloatingLoss": string,
            "Log": string,
            "Market": string,
            "Martingale ratio": [],
            "Numbercallmargin": string,
            "One-shot": string,
            "Positionamount": string,
            "Price drop": [],
            "Quantity": string,
            "Strategy mode": null,
            "Strategy ratio": string,
            "auto compounding": string,
            "bot_on": string,
            "buyin_callback": string,
            "coin image":string,
            "current_price": string,
            "cycle": string,
            "exchange": string,
            "firstbuy": string,
            "firstbuyinamount": string,
            "id": string,
            "margin_call_limit": string,
            "open double": string,
            "rp": string,
            "stopprice": string,
            "sync": string,
            "take_profit_ratio": string,
            "whole position take profit": string
        }
    };
    ReviewScreen: undefined;
    LogsMarginConfiguration: {
        numrows:number,
        m_ratio:string
        price_drop:string
    };
    OverView: undefined;
    BotSuccess: {
        amount: string,
        market: string,
        id: string,
        trade_type: string,
        exchange: string,
        origin:'Bot'|'Other'
    };
    UserAccount: undefined;
    DepositScreen: undefined;
    Withdrawal: {
        amount: string
    };
    WithdrawalAmount: undefined;
    EditProfile: undefined;
    RewardDetails: undefined;
    SettingsScreen: undefined;
    Earnings: undefined;
    TransactionRecords: {
        records: []
    };
    ApiBinding: undefined;
    MarginConfiguration: {
        numrows: number
    };
    TransferScreen: undefined;
    Assets: undefined;
    LeaderBoard: undefined;
    CreateTicket: undefined;
    CouncellerScreen: undefined;
    SyncStrategy: undefined;
    LogScreen: {
        id: string,
        trade_type: string,
        market: string,
        exchange: string,
        screenFrom:string
    };
    SuccessScreen: {
        title: string,
        message: string,
        type?: 'error' | 'success'
    };
    ViewAPIBinding: {
        exchange: string,
        apiKey: string,
        apiSecrete: string,
        isBound: '0' | '1',
        exchangeName: string,
    };
    AllStrategy: undefined
    ViewStrategy: {
        id: string
    }
    FeaturesSelectAsset: undefined
    SelectConfig: undefined
    FeaturesSelectExchange: undefined
    AutoConfig: undefined
    SetAmount: undefined
    EntriesScreen: undefined
    CustomizeEntries: undefined
    AdditionalSettings: undefined
    FinalPreview: undefined
    BotDirection: undefined
    ContactUs: undefined
    RevenueScreen: undefined
    AllRevenue: undefined
    TwoFactorAuth: undefined
    FeedbackRecord: undefined
    Quantitative: undefined
    ActiveTrades: undefined

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
    ConfirmAccountTwoFA: undefined

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

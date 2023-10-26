/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps, NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AllStreams from "./screens/finix/stream/AllStreams";



declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {
        }
    }
}

export type RootStackParamList = {

    Auth: NavigatorScreenParams<AuthStackParamList> | undefined;

    //START CYBORG

    CyborgBottomTab: NavigatorScreenParams<CyborgStackParamList> | undefined;
    MainSignalNav: NavigatorScreenParams<SignalStackParamList> | undefined;

    OnBoardingScreen: undefined;
    EditProfile: undefined;
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

export type CyborgStackParamList = {
    BottomTab: undefined;
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
            trade_type: string,
            direction: string,

            price_above: string,
            "price_below": string,
            "re_capital": string,
            stop_loss: string,
            closing_price: string
            entry_call: string,
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
            "coin image": string,
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
        numrows: number,
        m_ratio: string
        price_drop: string
    };
    OverView: undefined;
    BotSuccess: {
        amount: string,
        message: string,
        market: string,
        id: string,
        trade_type: string,
        exchange: string,
        origin: 'Bot' | 'Other',
    };
    UserAccount: undefined;
    DepositScreen: undefined;
    Withdrawal: {
        amount: string
    };
    WithdrawalAmount: undefined;
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
        screenFrom: string,
        finalvalue?: number,
        profit?: number,
    };
    SuccessScreen: {
        title: string,
        message: string,
        type?: 'error' | 'success',
        market: string,
        id: string,
        trade_type: string,
        exchange: string,
        origin: 'TradeSetting' | 'BotToggle',
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


};


export type SignalStackParamList = {
    SignalBottomTab: undefined;
    SignalImageDetails: {details: {
        "id": string,
        "educator": {
            "id": string,
            "first_name": string,
            last_name: string,
            "email": string,
            "photo": string,
            "total_followers": number
        },
            "asset": null,
            "category": {
                "id": 4,
                "name": string,
                "photo": null,
                "type": string
            },
        "order_type": string,
        "entry_price": number,
        "stop_loss": number,
        "target_price": number,
        "comment": string,
        "photo": string,
        "chart_photo": string,
        "market_status": string,
        "status": string
    }
};
    SignalDetails: {
        details: {
            "id": string,
            "educator": {
                "id": string,
                "first_name": string,
                last_name: string,
                "email": string,
                "photo": string,
                "total_followers": number
            },
            "asset": {
                "id": number,
                "image": string,
                "name": string,
                "symbol": string
            },
            "order_type": string,
            "entry_price": number,
            "stop_loss": number,
            "target_price": number,
            "comment": string,
            "photo": string,
            "chart_photo": string,
            "market_status": string,
            "status": string
        }
    };
    EducatorsScreen: undefined;

    ViewEducator: {
        educator: {
            "email": string,
            "first_name": string,
            "id": string,
            "last_name": string,
            "photo": string,
            "total_followers": number,

        }
    };

    StreamersList: undefined;
    EducatorSignalSummary: {
        educator:string,
        educatorName:string,
    };
    MessageScreen: {
        educator: {
            "email": string,
            "first_name": string,
            "id": string,
            "last_name": string,
            "photo": string,
        }
    };
    SignalSummary: undefined;
    LiveStream: {
        "stream_url": string,
        "last_name": string,
        first_name: string,
        "photo": string,
        educatorId: string,
    };
    ViewAcademy: {
        id:string
    };
    ViewVideo: {
        file:string
    };
    VideoScreen: {
        id:string,
        videoUrl:string,
        videoTitle:string,
        description:string,
        completed:string,
        length:string,
        caption:string,
        posterImage:string,
    };
    AcademyVideo: {
        id:string,
        videoUrl:string,
        videoTitle:string
    };
    AllAcademy:undefined;
    AllStreams:undefined;
    AllPastStreams: {
        educatorId:string
    };
    LeaveReview: {
        academy_uuid:string
    };
    //END CYBORG


};

export type RootTabParamList = {
    CyborgHome: undefined;
    Create: undefined;
    MoreScreen: undefined

};

export type SignalTabParamList = {
    SignalHome: undefined;
    SignalChat: {
        educator: {
            "email":string,
            "first_name": string,
            "id": string,
            "last_name": string,
            "photo": string,
            "total_followers": number
        }
    };
    Signals: undefined
    SignalSettings: undefined

};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
    RootStackParamList,
    Screen
>;
export type SignalStackScreenProps<Screen extends keyof SignalStackParamList> = NativeStackScreenProps<
    SignalStackParamList,
    Screen
>;

export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> = NativeStackScreenProps<
    AuthStackParamList, Screen
>;
export type CyborgStackScreenProps<Screen extends keyof CyborgStackParamList> = NativeStackScreenProps<
    CyborgStackParamList, Screen
>;


export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
>;


export type SignalRootTabScreenProps<Screen extends keyof SignalTabParamList> = CompositeScreenProps<BottomTabScreenProps<SignalTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>>;

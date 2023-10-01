

import * as React from "react";

import SignInScreen from "../../screens/auth/SignIn";
import ForgotPasswordScreen from "../../screens/auth/ForgotPassword";
import {CyborgBottomTab} from "./index";
import NewsScreen from "../../screens/cyborg/NewsScreen";
import SelectExchange from "../../screens/cyborg/bot/SelectExchange";
import SelectAsset from "../../screens/cyborg/bot/SelectAsset";
import TradeSetting from "../../screens/cyborg/bot/TradeSetting";
import TradeSettingStrategy from "../../screens/cyborg/strategy/TradeSettingStrategy";
import LogsMarginConfiguration from "../../screens/cyborg/strategy/LogsMarginConfiguration";
import RevenueScreen from "../../screens/cyborg/profile/RevenueScreen";
import AllRevenue from "../../screens/cyborg/profile/pages/AllRevenue";
import MarginConfiguration from "../../screens/cyborg/bot/MarginConfiguration";
import ReviewScreen from "../../screens/cyborg/bot/ReviewScreen";
import OverView from "../../screens/cyborg/OverView";
import UserAccount from "../../screens/cyborg/UserAccount";
import Assets from "../../screens/cyborg/profile/Assets";
import DepositScreen from "../../screens/cyborg/profile/DepositScreen";
import Withdrawal from "../../screens/cyborg/profile/Withdrawal";
import TransferScreen from "../../screens/cyborg/profile/TransferScreen";
import RewardDetails from "../../screens/cyborg/profile/RewardDetails";
import ApiBinding from "../../screens/cyborg/profile/ApiBinding";
import Earnings from "../../screens/cyborg/profile/Earning";
import SettingsScreen from "../../screens/cyborg/profile/SettingsScreen";
import WithdrawalAmount from "../../screens/cyborg/profile/WIthdrawalAmount";
import TwoFactorAuth from "../../screens/cyborg/profile/pages/TwoFactorAuth";
import BotSuccess from "../../screens/cyborg/bot/BotSuccess";
import SuccessScreen from "../../screens/cyborg/SuccessScreen";
import SelectType from "../../screens/cyborg/bot/SelectType";
import EditProfile from "../../screens/EditProfile";
import CouncellerScreen from "../../screens/cyborg/profile/CouncellerScreen";
import ViewAPIBinding from "../../screens/cyborg/profile/ViewAPIBinding";
import SyncStrategy from "../../screens/cyborg/profile/SyncStrategy";
import LogScreen from "../../screens/cyborg/strategy/LogScreen";
import TransactionRecords from "../../screens/cyborg/strategy/TransactionRecords";
import ContactUs from "../../screens/cyborg/profile/ContactUs";
import CreateTicket from "../../screens/cyborg/profile/pages/CreateTicket";
import FeedbackRecord from "../../screens/cyborg/profile/FeedbackRecord";
import ActiveTrades from "../../screens/cyborg/active_trades/ActiveTrades";
import Quantitative from "../../screens/cyborg/profile/quantitative/Quantitative";
import AllStrategy from "../../screens/cyborg/bot/strategy/AllStrategy";
import ViewStrategy from "../../screens/cyborg/bot/strategy/ViewStrategy";
import FeaturesSelectAsset from "../../screens/cyborg/bot/FeaturesBot/SelectAsset";
import BotDirection from "../../screens/cyborg/bot/FeaturesBot/BotDirection";
import SelectConfig from "../../screens/cyborg/bot/FeaturesBot/SelectConfig";
import FeaturesSelectExchange from "../../screens/cyborg/bot/FeaturesBot/FeaturesSelectExchange";
import AutoConfig from "../../screens/cyborg/bot/FeaturesBot/AutoConfig";
import SetAmount from "../../screens/cyborg/bot/FeaturesBot/manual_config/SetAmount";
import EntriesScreen from "../../screens/cyborg/bot/FeaturesBot/manual_config/EntriesScreen";
import CustomizeEntries from "../../screens/cyborg/bot/FeaturesBot/manual_config/CustomizeEntries";
import AdditionalSettings from "../../screens/cyborg/bot/FeaturesBot/manual_config/AdditionalSettings";
import FinalPreview from "../../screens/cyborg/bot/FeaturesBot/FinalPreview";
import LeaderBoard from "../../screens/cyborg/more/LeaderBoard";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {CyborgStackParamList, RootStackParamList} from "../../types";


const StackNav = createNativeStackNavigator<CyborgStackParamList>();

export function CyborgMainNavigator() {
    return(
        <StackNav.Navigator initialRouteName='BottomTab'  screenOptions={{
            headerShown: false,
            gestureEnabled:true,
            animation:'slide_from_left',

        }}>

            <StackNav.Screen name={"BottomTab"} options={{headerShown: false}} component={CyborgBottomTab}/>

            <StackNav.Screen name={"NewsScreen"} options={{
                animation: 'slide_from_bottom'
            }} component={NewsScreen}/>

            <StackNav.Screen name={"SelectExchange"} component={SelectExchange}/>
            <StackNav.Screen name={"SelectAsset"} component={SelectAsset}/>
            <StackNav.Screen name={"TradeSetting"} component={TradeSetting}/>
            <StackNav.Screen name={"TradeSettingStrategy"} component={TradeSettingStrategy}/>
            <StackNav.Screen name={"LogsMarginConfiguration"} component={LogsMarginConfiguration}/>
            <StackNav.Screen name={"RevenueScreen"} component={RevenueScreen}/>
            <StackNav.Screen name={"AllRevenue"} component={AllRevenue}/>
            <StackNav.Screen name={"MarginConfiguration"} component={MarginConfiguration}/>
            <StackNav.Screen name={"ReviewScreen"} component={ReviewScreen}/>
            <StackNav.Screen name={"OverView"} component={OverView}/>
            <StackNav.Screen name={"UserAccount"} component={UserAccount}/>
            <StackNav.Screen name={"Assets"} component={Assets}/>
            <StackNav.Screen name={"DepositScreen"} component={DepositScreen}/>
            <StackNav.Screen name={"Withdrawal"} component={Withdrawal}/>
            <StackNav.Screen name={"TransferScreen"} component={TransferScreen}/>
            <StackNav.Screen name={"RewardDetails"} component={RewardDetails}/>
            <StackNav.Screen name={"ApiBinding"} component={ApiBinding}/>
            <StackNav.Screen name={"Earnings"} component={Earnings}/>
            <StackNav.Screen name={"SettingsScreen"} component={SettingsScreen}/>
            <StackNav.Screen name={"WithdrawalAmount"} component={WithdrawalAmount}/>
            <StackNav.Screen name={"TwoFactorAuth"} component={TwoFactorAuth}/>

            <StackNav.Screen name={"BotSuccess"} options={{animation: 'slide_from_bottom'}} component={BotSuccess}/>
            <StackNav.Screen name={"SuccessScreen"} options={{animation: 'slide_from_bottom'}} component={SuccessScreen}/>

            <StackNav.Screen name={"SelectType"} component={SelectType}/>

            <StackNav.Screen name={"CouncellerScreen"} component={CouncellerScreen}/>
            <StackNav.Screen name={"ViewAPIBinding"} component={ViewAPIBinding}/>
            <StackNav.Screen name={"SyncStrategy"} component={SyncStrategy}/>
            <StackNav.Screen name={"LogScreen"} component={LogScreen}/>
            <StackNav.Screen name={"TransactionRecords"} component={TransactionRecords}/>
            <StackNav.Screen name={"ContactUs"} component={ContactUs}/>
            <StackNav.Screen name={"CreateTicket"} component={CreateTicket}/>
            <StackNav.Screen name={"FeedbackRecord"} component={FeedbackRecord}/>
            <StackNav.Screen name={"ActiveTrades"} component={ActiveTrades}/>
            <StackNav.Screen name={"Quantitative"} component={Quantitative}/>
            <StackNav.Screen name={"AllStrategy"} component={AllStrategy}/>
            <StackNav.Screen name={"ViewStrategy"} component={ViewStrategy}/>
            <StackNav.Screen name={"FeaturesSelectAsset"} component={FeaturesSelectAsset}/>


            <StackNav.Screen name={"BotDirection"} component={BotDirection}/>
            <StackNav.Screen name={"SelectConfig"} component={SelectConfig}/>
            <StackNav.Screen name={"FeaturesSelectExchange"} component={FeaturesSelectExchange}/>
            <StackNav.Screen name={"AutoConfig"} component={AutoConfig}/>
            <StackNav.Screen name={"SetAmount"} component={SetAmount}/>
            <StackNav.Screen name={"EntriesScreen"} component={EntriesScreen}/>
            <StackNav.Screen name={"CustomizeEntries"} component={CustomizeEntries}/>
            <StackNav.Screen name={"AdditionalSettings"} component={AdditionalSettings}/>
            <StackNav.Screen name={"FinalPreview"} component={FinalPreview}/>
            <StackNav.Screen name={"LeaderBoard"} component={LeaderBoard}/>


        </StackNav.Navigator>
    )

}

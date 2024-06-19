import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './AuthStackNavigator';
import GuestStackNavigator from './GuestStackNavigator';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../auth/Login';
import SplashScreen from '../auth/SplashScreen';
import Home from '../screens/Home';
import Details from '../screens/Details';
import Profile from '../screens/Profile';
import BillDetails from '../screens/BillDetails';
import PIMyInvoice from '../screens/PIMyInvoice';
import DispatchOrder from '../screens/DispatchOrder';
import SalesmanReport from '../screens/SalesmanReport';
import PartyReport from '../screens/PartyReport';
import Sales from '../screens/Sales';
import Invoice from '../screens/Invoice';
import FillUpDetails from '../screens/FillUpDetails';
import OrderDetails from '../screens/OrderDetails';

axios.defaults.baseURL = 'https://colortuff.webinfoghy.co.in/public/api/';

const StackNavigation = () => {

    const loginDetails = useSelector(state => state.login);

    console.log("userDetailsStack: ", loginDetails);

    // const Stack = createNativeStackNavigator();
    {/* {loginDetails[0]?.access_token ? <GuestStackNavigator /> : <AuthStackNavigator />} */ }
    {/* console.log("pllllll", item) */ }

    return (
        <NavigationContainer>
            {loginDetails.map((item) => {
                return (
                    item?.accessToken !== null ? <GuestStackNavigator /> : <AuthStackNavigator />
                )
            })}
        </NavigationContainer>
    )
}

export default StackNavigation;

const styles = StyleSheet.create({});
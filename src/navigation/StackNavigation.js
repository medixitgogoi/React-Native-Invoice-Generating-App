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

    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SplashScreen">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Details" component={Details} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="BillDetails" component={BillDetails} />
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="PIMyInvoice" component={PIMyInvoice} />
                <Stack.Screen name="DispatchOrder" component={DispatchOrder} />
                <Stack.Screen name="SalesmanReport" component={SalesmanReport} />
                <Stack.Screen name="PartyReport" component={PartyReport} />
                <Stack.Screen name="Sales" component={Sales} />
                <Stack.Screen name="FillUpDetails" component={FillUpDetails} />
                <Stack.Screen name="Invoice" component={Invoice} />
                <Stack.Screen name="OrderDetails" component={OrderDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigation;

const styles = StyleSheet.create({});

{/* <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SplashScreen">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="BillDetails" component={BillDetails} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="PIMyInvoice" component={PIMyInvoice} />
        <Stack.Screen name="DispatchOrder" component={DispatchOrder} />
        <Stack.Screen name="SalesmanReport" component={SalesmanReport} />
        <Stack.Screen name="PartyReport" component={PartyReport} />
        <Stack.Screen name="Sales" component={Sales} />
        <Stack.Screen name="FillUpDetails" component={FillUpDetails} />
        <Stack.Screen name="Invoice" component={Invoice} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
    </Stack.Navigator>
</NavigationContainer> */}

{/* <NavigationContainer>
    {loginDetails[0]?.access_token ? <GuestStackNavigator /> : <AuthStackNavigator />}
</NavigationContainer> */}
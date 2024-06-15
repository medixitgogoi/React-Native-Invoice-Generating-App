import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../auth/Login';
import Home from '../screens/Home';
import Details from '../screens/Details';
import Profile from '../screens/Profile';
import BillDetails from '../screens/BillDetails';
import SplashScreen from '../auth/SplashScreen';
import BillView from '../screens/BillView';
import PIMyInvoice from '../screens/PIMyInvoice';
import DispatchOrder from '../screens/DispatchOrder';
import SalesmanReport from '../screens/SalesmanReport';
import PartyReport from '../screens/PartyReport';
import Sales from '../screens/Sales';
import FillUpDetails from '../screens/FillUpDetails';
import Invoice from '../screens/Invoice';
import OrderDetails from '../screens/OrderDetails';

const StackNavigation = () => {

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

export default StackNavigation

const styles = StyleSheet.create({})
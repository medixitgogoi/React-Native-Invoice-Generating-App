import { StyleSheet } from 'react-native';
import Home from '../screens/Home';
import Details from '../screens/Details';
import Profile from '../screens/Profile';
import BillDetails from '../screens/BillDetails';
import BillView from '../screens/BillView';
import PIMyInvoice from '../screens/PIMyInvoice';
import PartyReport from '../screens/PartyReport';
import FillUpDetails from '../screens/FillUpDetails';
import OrderDetails from '../screens/OrderDetails';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DispatchedOrders from '../screens/DispatchedOrders';
import Sales from '../screens/Sales';

const GuestStackNavigator = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="BillDetails" component={BillDetails} />
            <Stack.Screen name="BillView" component={BillView} />
            <Stack.Screen name="PIMyInvoice" component={PIMyInvoice} />
            <Stack.Screen name="PartyReport" component={PartyReport} />
            <Stack.Screen name="FillUpDetails" component={FillUpDetails} />
            <Stack.Screen name="DispatchedOrders" component={DispatchedOrders} />
            <Stack.Screen name="Sales" component={Sales} />
            <Stack.Screen name="OrderDetails" component={OrderDetails} />
        </Stack.Navigator>
    )
}

export default GuestStackNavigator;

const styles = StyleSheet.create({})
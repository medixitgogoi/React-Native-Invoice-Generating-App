import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './AuthStackNavigator';
import GuestStackNavigator from './GuestStackNavigator';
import { useSelector } from 'react-redux';
import axios from 'axios';

axios.defaults.baseURL = 'https://colortuff.webinfoghy.co.in/public/api/';

const StackNavigation = () => {

    const userDetails = useSelector(state => state.user);

    // console.log(userDetails?.access_token);

    return (
        <NavigationContainer>
            {userDetails?.access_token ? <GuestStackNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>
    )
}

export default StackNavigation

const styles = StyleSheet.create({})

{/* <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SplashScreen">
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
            </Stack.Navigator> */}
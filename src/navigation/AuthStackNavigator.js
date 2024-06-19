import { StyleSheet } from 'react-native';
import Login from '../auth/Login';
import SplashScreen from '../auth/SplashScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const AuthStackNavigator = ({ initialRoute }) => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
        </Stack.Navigator>
    )
}

export default AuthStackNavigator

const styles = StyleSheet.create({})
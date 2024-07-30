import { useState, useEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './AuthStackNavigator';
import GuestStackNavigator from './GuestStackNavigator';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addLoginUser } from '../redux/LoginSlice';
import axios from 'axios';

axios.defaults.baseURL = 'https://colortuff.biswainterior.com/public/api/';

const StackNavigation = () => {

    const dispatch = useDispatch();

    const loginDetails = useSelector(state => state.login);

    const [isAppLoading, setIsAppLoading] = useState(true);

    const isUserLoggedIn = loginDetails.length > 0 && loginDetails.some(item => item.accessToken);

    useEffect(() => {
        const loadLoginDetails = async () => {
            try {
                const storedLoginDetails = await AsyncStorage.getItem('loginDetails');
                if (storedLoginDetails) {
                    dispatch(addLoginUser(JSON.parse(storedLoginDetails)));
                }
            } catch (error) {
                Alert.alert(error.message)
            } finally {
                setIsAppLoading(false);
            }
        };

        loadLoginDetails();
    }, [dispatch]);

    useEffect(() => {

        const timer = setTimeout(() => {
            setIsAppLoading(false);
        }, 1500);

        return () => clearTimeout(timer);

    }, []);

    if (isAppLoading) {
        return (
            <NavigationContainer>
                <AuthStackNavigator initialRoute="SplashScreen" />
            </NavigationContainer>
        );
    }

    return (
        <NavigationContainer>
            {isUserLoggedIn ? <GuestStackNavigator /> : <AuthStackNavigator initialRoute="Login" />}
        </NavigationContainer>
    );
}

export default StackNavigation;

const styles = StyleSheet.create({});
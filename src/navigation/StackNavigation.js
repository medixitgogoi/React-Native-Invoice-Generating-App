import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './AuthStackNavigator';
import GuestStackNavigator from './GuestStackNavigator';
import { useSelector } from 'react-redux';
import axios from 'axios';

axios.defaults.baseURL = 'https://colortuff.webinfoghy.co.in/public/api/';

const StackNavigation = () => {

    const loginDetails = useSelector(state => state.login);

    const [isAppLoading, setIsAppLoading] = useState(true);

    const isUserLoggedIn = loginDetails.length > 0 && loginDetails.some(item => item.accessToken);

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

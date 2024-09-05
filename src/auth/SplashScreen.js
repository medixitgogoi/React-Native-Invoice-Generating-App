import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, Image, Animated } from 'react-native';
import { zomatoRed } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = () => {

    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            }
        ).start(() => {
            setTimeout(() => {
                navigation.navigate("Login")
            }, 0); // additional delay of 1 second before navigating
        });
    }, [fadeAnim]);

    return (
        <SafeAreaView style={{ height: '100%', backgroundColor: zomatoRed }}>
            <StatusBar
                animated={true}
                backgroundColor={'#3b090d'}
                barStyle="light-content"
            />

            <LinearGradient
                colors={[
                    '#3b090d',
                    '#5e0f15',
                    '#7f141c',
                    '#a01924',
                ]}
                style={{ height: '100%', alignItems: 'center', justifyContent: "center", flexDirection: "column" }}
            >

                <View style={{ height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Animated.Image
                        source={require("../assets/bill.png")}
                        style={{
                            width: 180,
                            height: 180,
                            resizeMode: 'contain',
                            opacity: fadeAnim
                        }}
                    />
                </View>

            </LinearGradient>

        </SafeAreaView>
    )
}

export default SplashScreen;

const styles = StyleSheet.create({})
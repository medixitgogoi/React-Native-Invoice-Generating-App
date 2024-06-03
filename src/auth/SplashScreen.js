import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image } from 'react-native';
import { zomatoRed } from '../utils/colors';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = () => {

    const navigation = useNavigation();

    // useEffect(() => {
    //     setTimeout(() => {
    //         navigation.navigate("Login")
    //     }, 1200);
    // }, []);

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
                    <Image
                        source={require("../assets/bill.png")}
                        style={{
                            width: 180,
                            height: 180,
                            resizeMode: 'contain',
                            color: '#000'
                        }}
                    />
                </View>

            </LinearGradient>

        </SafeAreaView>
    )
}

export default SplashScreen;

const styles = StyleSheet.create({})
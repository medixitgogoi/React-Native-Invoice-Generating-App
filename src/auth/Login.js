import { StyleSheet, Text, View, StatusBar, SafeAreaView, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { lightZomatoRed, zomatoRed } from '../utils/colors';
import { useState } from 'react';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon2 from 'react-native-vector-icons/Feather';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { addLoginUser } from '../redux/LoginSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from '@react-native-community/blur';

const Login = () => {

    const dispatch = useDispatch();
    const loginDetails = useSelector(state => state.login);

    const [email, setEmail] = useState("");
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [password, setPassword] = useState("");
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [show, setShow] = useState(true);

    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({});

    const extractName = (message) => {
        // Find the index of the comma
        const commaIndex = message.indexOf(',');

        // Extract the substring from the 4th character to the character before the comma
        const name = message.substring(3, commaIndex).trim();

        return name;
    };

    const loginHandler = async () => {

        if (validate()) {

            setLoading(true);

            try {
                const response = await axios.post(`employee/login`,
                    {
                        email: email,
                        password: password,
                    }
                );

                console.log("loginResponse: ", response?.data);

                if (response.data.status) {

                    const userInfo = {
                        name: extractName(response?.data?.message),
                        email: email,
                        password: password,
                        accessToken: response?.data?.access_token,
                    };

                    dispatch(addLoginUser(userInfo));
                    console.log("userDetailsLogin: ", loginDetails);

                    await AsyncStorage.setItem('loginDetails', JSON.stringify(userInfo));

                    Toast.show({
                        type: 'success',
                        text1: 'Logged in successfully',
                        position: 'top',
                        topOffset: 50,
                        onPress: () => Toast.hide(),
                    });

                    setEmail('');
                    setPassword('');

                } else {
                    setErrors({ api: response.data.message });
                }
            } catch (error) {
                if (error.response && error.response.status === 500) {
                    // Display a user-friendly error message
                    alert('An unexpected error occurred. Please try again later.');
                    console.error('Error fetching data:', error.message);
                } else {
                    console.error('Error fetching data:', error.message);
                }
            }
        }

        setLoading(false);
    }

    const validate = () => {

        const newErrors = {};

        if (!email) {
            newErrors.email = '*Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = '*Invalid email address';
        }

        if (!password) {
            newErrors.password = '*Password is required';
        } else if (password.length < 8) {
            newErrors.password = '*Password must be at least 8 characters long';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f1f3f6", flexDirection: "column", }}>
            <StatusBar
                animated={true}
                backgroundColor={loading ? '#959595' : "#f1f3f6"}
                barStyle="dark-content"
            />

            <View style={{ height: "100%" }}>

                {/* Image */}
                <View style={{ height: "55%", flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <Image source={require("../assets/logo.png")} style={{ width: 220, height: 220, marginTop: '8%' }} resizeMode='contain' />
                </View>

                {/* Content */}
                <View style={{ height: "45%", paddingVertical: 5, flexDirection: 'column', gap: 25 }}>

                    <Text style={{ color: "#000", textAlign: "center", color: zomatoRed, fontSize: responsiveFontSize(3.2), fontWeight: "700", textTransform: "uppercase", }}>Welcome Back!</Text>

                    {/* Email */}
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '13%', paddingVertical: 2, position: 'absolute', zIndex: 10, top: -10, left: 50, backgroundColor: '#f1f3f6', display: loading ? 'none' : "flex" }}>
                            <Text style={{ color: '#abb0ba', fontWeight: '600', fontSize: responsiveFontSize(2.2) }}>Email</Text>
                        </View>
                        <View style={{ alignSelf: "center", width: "80%", paddingHorizontal: 14, backgroundColor: "#f1f3f6", elevation: 8, borderRadius: 8, borderColor: isEmailFocused ? zomatoRed : "", borderWidth: isEmailFocused ? 1.5 : 0, marginVertical: 2 }}>
                            <TextInput
                                style={{ paddingVertical: 8, fontSize: responsiveFontSize(2.1), fontWeight: "500", color: "#000", }}
                                onChangeText={setEmail}
                                value={email}
                                placeholderTextColor="#abb0ba"
                                keyboardType='email-address'
                                onFocus={() => setIsEmailFocused(true)}
                                onBlur={() => setIsEmailFocused(false)}
                            />
                        </View>
                        {errors.email && <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(1.6), paddingLeft: 35, marginTop: 4 }}>{errors.email}</Text>}
                    </View>

                    {/* Password */}
                    <View style={{ marginBottom: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '21%', paddingVertical: 2, position: 'absolute', zIndex: 10, top: -10, left: 50, backgroundColor: '#f1f3f6', display: loading ? 'none' : "flex" }}>
                            <Text style={{ color: '#abb0ba', fontWeight: '600', fontSize: responsiveFontSize(2.2) }}>Password</Text>
                        </View>

                        <View style={{ alignSelf: "center", width: "80%", paddingHorizontal: 15, backgroundColor: "#f1f3f6", elevation: 8, borderRadius: 8, borderColor: isPasswordFocused ? zomatoRed : "", borderWidth: isPasswordFocused ? 1.5 : 0, marginTop: 2 }}>
                            <TextInput
                                style={{ paddingVertical: 8, fontSize: responsiveFontSize(2.1), fontWeight: "500", color: "#000" }}
                                onChangeText={setPassword}
                                value={password}
                                placeholderTextColor="#abb0ba"
                                onFocus={() => setIsPasswordFocused(true)}
                                onBlur={() => setIsPasswordFocused(false)}
                                secureTextEntry={show}
                            />
                            <View style={{ position: 'absolute', right: 7, bottom: 1 }}>
                                <Icon2
                                    name={show ? 'eye-off' : 'eye'}
                                    onPress={() => setShow(!show)}
                                    style={{
                                        color: zomatoRed,
                                        fontSize: responsiveFontSize(2.2),
                                        width: 30,
                                        height: 30,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                />
                            </View>
                        </View>

                        {errors.password && <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(1.6), paddingLeft: 35 }}>{errors.password}</Text>}
                    </View>

                    {/* Log in button */}
                    <TouchableOpacity style={{ alignSelf: "center", width: "80%", backgroundColor: zomatoRed, height: 55, justifyContent: 'center', alignItems: "center", borderRadius: 10, elevation: 10, marginBottom: 20, marginTop: errors.password ? 0 : 20 }} onPress={loginHandler}>
                        <Text style={{ color: "#fff", fontWeight: "700", fontSize: responsiveFontSize(2.5) }}>LOGIN</Text>
                    </TouchableOpacity>

                </View>

                {/* Loading Spinner */}
                {loading && (
                    <View style={styles.loadingOverlay}>
                        <BlurView
                            style={styles.absolute}
                            blurType="light"
                            blurAmount={10}
                            reducedTransparencyFallbackColor="#818181"
                        />
                        <View style={styles.loadingContainer}>
                            <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(2.4), fontWeight: '500' }}>Logging you in ...</Text>
                            <ActivityIndicator size="large" color={zomatoRed} />
                        </View>
                    </View>
                )}

            </View>

        </SafeAreaView>
    )
}

export default Login;

const styles = StyleSheet.create({
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    absolute: {
        ...StyleSheet.absoluteFillObject,
    },
    loadingContainer: {
        backgroundColor: "#fff",
        paddingVertical: 8,
        borderRadius: 3,
        elevation: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingHorizontal: 15,
    },
});
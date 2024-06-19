import { StyleSheet, Text, View, StatusBar, SafeAreaView, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { zomatoRed } from '../utils/colors';
import { useState } from 'react';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon2 from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { addLoginUser } from '../redux/LoginSlice';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {

    const dispatch = useDispatch();
    const loginDetails = useSelector(state => state.login);

    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [password, setPassword] = useState("");
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [show, setShow] = useState(true);

    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({});

    const loginHandler = async () => {

        setLoading(true);

        if (validate()) {

            try {
                const response = await axios.post(`employee/login`,
                    {
                        email: email,
                        password: password,
                    }
                );

                console.log("response: ", response);

                if (response.data.status) {

                    const userInfo = {
                        email: email,
                        password: password,
                        accessToken: response.data.access_token,
                    };

                    dispatch(addLoginUser(userInfo));
                    console.log("userDetailsLogin: ", loginDetails);

                    // await AsyncStorage.setItem('loginDetails', JSON.stringify(userInfo));

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
                console.log(error);
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
                backgroundColor="#f1f3f6"
                barStyle="dark-content"
            />

            <View style={{ height: "100%" }}>

                {/* Image */}
                <View style={{ height: "50%", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require("../assets/logo.png")} style={{ width: 220, height: 220 }} resizeMode='contain' />
                </View>

                {/* Loading spinner */}
                <View style={{ height: '5%' }}>
                    {loading && (
                        <ActivityIndicator size="large" color={"#66ac53"} />
                    )}
                </View>

                <View style={{ height: "40%", paddingVertical: 5, flexDirection: 'column', gap: 25 }}>

                    <Text style={{ color: "#000", textAlign: "center", color: zomatoRed, fontSize: responsiveFontSize(3.2), fontWeight: "700", textTransform: "uppercase", }}>Welcome Back!</Text>

                    {/* Email */}
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '13%', paddingVertical: 2, position: 'absolute', zIndex: 10, top: -10, left: 50, backgroundColor: '#f1f3f6' }}>
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
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '21%', paddingVertical: 2, position: 'absolute', zIndex: 10, top: -10, left: 50, backgroundColor: '#f1f3f6' }}>
                            <Text style={{ color: '#abb0ba', fontWeight: '600', fontSize: responsiveFontSize(2.2) }}>Password</Text>
                        </View>
                        <View style={{ flexDirection: 'column', gap: 7, }}>
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

                            <TouchableOpacity style={{ marginRight: 35, }}>
                                <Text style={{ color: "#b4b7bf", textAlign: "right", fontSize: responsiveFontSize(1.8), fontWeight: "500" }}>Forgot password?</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                    {/* Log in button */}
                    <TouchableOpacity style={{ alignSelf: "center", width: "80%", backgroundColor: zomatoRed, height: 55, justifyContent: 'center', alignItems: "center", borderRadius: 10, elevation: 10, marginBottom: 20, marginTop: errors.password ? 0 : 20 }} onPress={loginHandler}>
                        <Text style={{ color: "#fff", fontWeight: "700", fontSize: responsiveFontSize(2.5) }}>LOGIN</Text>
                    </TouchableOpacity>

                </View>

            </View>

        </SafeAreaView>
    )
}

export default Login;

const styles = StyleSheet.create({});
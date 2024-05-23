import { StyleSheet, Text, View, StatusBar, SafeAreaView, TextInput, TouchableOpacity, Image } from 'react-native';
import { lightBlack, offWhite, zomatoRed } from '../utils/colors';
import { useState } from 'react';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon2 from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const Login = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [show, setShow] = useState(true);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f1f3f6", flexDirection: "column", }}>
            <StatusBar
                animated={true}
                backgroundColor="#f1f3f6"
                barStyle="dark-content"
            />

            <View style={{ height: "100%" }}>

                {/* Image */}
                <View style={{ height: "55%", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require("../assets/logo.png")} style={{ width: 220, height: 220 }} resizeMode='contain' />
                </View>

                <View style={{ height: "45%", paddingVertical: 5, flexDirection: 'column', gap: 25 }}>

                    <Text style={{ color: "#000", textAlign: "center", color: zomatoRed, fontSize: responsiveFontSize(3.2), fontWeight: "700", textTransform: "uppercase", }}>Welcome Back!</Text>

                    {/* Email */}
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '13%', paddingVertical: 2, position: 'absolute', zIndex: 10, top: -10, left: 50, backgroundColor: '#f1f3f6' }}>
                            <Text style={{ color: '#abb0ba', fontWeight: '600', fontSize: responsiveFontSize(2.2) }}>Email</Text>
                        </View>
                        <View style={{ alignSelf: "center", width: "80%", paddingHorizontal: 14, backgroundColor: "#f1f3f6", elevation: 10, borderRadius: 8, borderColor: isEmailFocused ? zomatoRed : "", borderWidth: isEmailFocused ? 1.5 : 0, marginVertical: 2 }}>
                            <TextInput
                                style={{ paddingVertical: 8, fontSize: responsiveFontSize(2.1), fontWeight: "500", color: "#000", }}
                                onChangeText={setEmail}
                                value={email}
                                placeholderTextColor="#abb0ba"
                                onFocus={() => setIsEmailFocused(true)}
                                onBlur={() => setIsEmailFocused(false)}
                            />
                        </View>
                    </View>

                    {/* Password */}
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '21%', paddingVertical: 2, position: 'absolute', zIndex: 10, top: -10, left: 50, backgroundColor: '#f1f3f6' }}>
                            <Text style={{ color: '#abb0ba', fontWeight: '600', fontSize: responsiveFontSize(2.2) }}>Password</Text>
                        </View>
                        <View style={{ flexDirection: 'column', gap: 7 }}>
                            <View style={{ alignSelf: "center", width: "80%", paddingHorizontal: 15, backgroundColor: "#f1f3f6", elevation: 10, borderRadius: 8, borderColor: isPasswordFocused ? zomatoRed : "", borderWidth: isPasswordFocused ? 1.5 : 0, marginVertical: 2 }}>
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
                            <TouchableOpacity style={{ marginRight: 35, }}>
                                <Text style={{ color: "#b4b7bf", textAlign: "right", fontSize: responsiveFontSize(1.8), fontWeight: "500" }}>Forgot password?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Log in button */}
                    <TouchableOpacity style={{ alignSelf: "center", width: "80%", backgroundColor: zomatoRed, height: 55, justifyContent: 'center', alignItems: "center", borderRadius: 10, elevation: 10, marginVertical: 20 }} onPress={() => navigation.navigate("Home")}>
                        <Text style={{ color: "#fff", fontWeight: "700", fontSize: responsiveFontSize(2.4) }}>LOGIN</Text>
                    </TouchableOpacity>

                </View>

            </View>

        </SafeAreaView>
    )
}

export default Login;

const styles = StyleSheet.create({})
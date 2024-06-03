import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, } from 'react-native';
import { lightZomatoRed, zomatoRed } from '../utils/colors';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/Feather';
import Icon3 from 'react-native-vector-icons/dist/Octicons';
import Icon4 from 'react-native-vector-icons/dist/Ionicons';
import Icon5 from 'react-native-vector-icons/dist/Entypo';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const Profile = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1 }}>

            {/* header */}
            <View style={{ flexDirection: "row", backgroundColor: "#fff", alignItems: "center", justifyContent: "space-between", elevation: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", }}>
                    <View style={{ paddingVertical: 8, flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10, }}>
                        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                            <Icon name="keyboard-arrow-left" size={27} color={zomatoRed} />
                        </TouchableOpacity>
                        <Text style={{ color: "#000", fontWeight: "600", fontSize: responsiveFontSize(2.5) }}>Profile</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: lightZomatoRed, borderRadius: 50, width: 30, height: 30, justifyContent: 'center', marginRight: 12, elevation: 1 }}>
                        <TouchableOpacity style={{}} onPress={() => navigation.navigate('Home')}>
                            <Icon2 name="home" size={18} color={zomatoRed} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={{ flexDirection: 'column', alignItems: 'center', paddingVertical: 10, }}>

                {/* Image */}
                <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 30, marginVertical: 10 }}>
                    {/* <Image source={require("../assets/login.png")} style={{ width: 200, height: 200 }} /> */}
                    <View style={{ height: 130, width: 130, backgroundColor: '#000', borderRadius: 100, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(8) }}>A</Text>
                    </View>
                </View>

                {/* Name and Email */}
                <View style={{ flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                    <Text style={{ fontSize: responsiveFontSize(2.8), fontWeight: '600', textAlign: 'center', color: '#000', }}>Ashok Kejriwal</Text>
                    <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '400', textAlign: 'center', color: '#093d43' }}>ashokkejriwal123@gmail.com</Text>
                </View>

                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', flexWrap: 'wrap', gap: 5, marginTop: 40 }}>

                    {/* Add customer */}
                    <TouchableOpacity style={{ backgroundColor: '#fff', width: '45%', height: 60, marginBottom: 10, borderRadius: 12, elevation: 2, borderColor: zomatoRed, borderWidth: 0.8, flexDirection: 'row', alignItems: 'center', padding: 10 }} onPress={() => navigation.navigate('Details')}>
                        <View style={{ backgroundColor: lightZomatoRed, borderRadius: 8, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 1 }}>
                            <Icon3 name="person-add" size={18} style={{ width: 20, height: 20, color: zomatoRed }} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#000', fontWeight: '600', paddingLeft: 10 }}>Add customer</Text>
                        </View>
                    </TouchableOpacity>

                    {/* My Sales */}
                    <TouchableOpacity style={{ backgroundColor: '#fff', width: '45%', height: 60, marginBottom: 10, borderRadius: 12, elevation: 2, borderColor: '#7e3aaf', borderWidth: 0.8, flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                        <View style={{ backgroundColor: '#eaddf4', borderRadius: 8, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 1 }}>
                            <Icon4 name="newspaper-sharp" size={18} style={{ width: 20, height: 20, color: '#7e3aaf' }} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#000', fontWeight: '600', paddingLeft: 10 }}>My Sales</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Share App */}
                    <TouchableOpacity style={{ backgroundColor: '#fff', width: '45%', height: 60, marginBottom: 10, borderRadius: 12, elevation: 2, borderColor: '#e3e31d', borderWidth: 0.8, flexDirection: 'row', alignItems: 'center', padding: 10 }} onPress={() => navigation.navigate('Details')}>
                        <View style={{ backgroundColor: '#f9f9cd', borderRadius: 8, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 1 }}>
                            <Icon name="offline-share" size={18} style={{ width: 20, height: 20, color: '#c8c819' }} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#000', fontWeight: '600', paddingLeft: 10 }}>Share App</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Log out */}
                    <TouchableOpacity style={{ backgroundColor: '#fff', width: '45%', height: 60, marginBottom: 10, borderRadius: 12, elevation: 2, borderColor: '#47c724', borderWidth: 0.8, flexDirection: 'row', alignItems: 'center', padding: 10 }} onPress={() => navigation.navigate('Details')}>
                        <View style={{ backgroundColor: '#d3f5ca', borderRadius: 8, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 1 }}>
                            <Icon5 name="log-out" size={18} style={{ width: 20, height: 20, color: '#47c724' }} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#000', fontWeight: '600', paddingLeft: 10 }}>Log out</Text>
                        </View>
                    </TouchableOpacity>

                </View>

            </View>

            <View style={{ alignSelf: 'center', flexDirection: 'row', alignItems: 'flex-end', height: '37%' }}>
                <Text style={{ color: '#678e8c', fontWeight: '400', fontSize: responsiveFontSize(1.6) }}>© 2024 ColorTuff. All rights reserved.</Text>
            </View>

        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({})
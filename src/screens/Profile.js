import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, } from 'react-native';
import { lightZomatoRed, zomatoRed } from '../utils/colors';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/Feather';
import Icon3 from 'react-native-vector-icons/dist/Octicons';
import Icon4 from 'react-native-vector-icons/dist/Ionicons';
import Icon5 from 'react-native-vector-icons/dist/Entypo';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/LoginSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteUser } from '../redux/UserSlice';
import Toast from 'react-native-toast-message';

const Profile = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const loginDetails = useSelector(state => state.login);

    const logoutHandler = async () => {
        Toast.show({
            type: 'error',
            text1: "Failed to log out. Please try again later.",
            text2: `Error message: ${error?.message}`,
            position: 'top',
            topOffset: 50,
            onPress: () => Toast.hide(),
        });
        // try {
        //     dispatch(logoutUser());
        //     await AsyncStorage.removeItem('loginDetails');
        // } catch (error) {
        //     Toast.show({
        //         type: 'error',
        //         text1: "Failed to log out. Please try again later.",
        //         text2: `Error message: ${error?.message}`,
        //         position: 'top',
        //         topOffset: 50,
        //         onPress: () => Toast.hide(),
        //     });
        //     console.error('Failed to logout: ', error);
        // }
    }

    const pressHandler = () => {
        navigation.navigate('Details');
        dispatch(deleteUser())
    }

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
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: zomatoRed, borderRadius: 50, width: 26, height: 26, justifyContent: 'center', marginRight: 12, borderColor: zomatoRed, borderWidth: 0.8, elevation: 1, }}>
                        <TouchableOpacity style={{}} onPress={() => navigation.navigate('Home')}>
                            <Icon2 name="home" size={15} color={lightZomatoRed} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={{ flexDirection: 'column', alignItems: 'center', paddingVertical: 10, }}>

                {/* Image */}
                <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 30, marginVertical: 10 }}>
                    {/* <Image source={require("../assets/login.png")} style={{ width: 200, height: 200 }} /> */}
                    <View style={{ height: 130, width: 130, backgroundColor: '#000', borderRadius: 100, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(8), textTransform: 'uppercase' }}>{loginDetails[0]?.name.slice(0, 1)}</Text>
                    </View>
                </View>

                {/* Name and Email */}
                <View style={{ flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                    <Text style={{ fontSize: responsiveFontSize(2.6), fontWeight: '600', textAlign: 'center', color: '#000', textTransform: 'uppercase' }}>{loginDetails[0]?.name}</Text>
                    <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '500', textAlign: 'center', color: '#656565' }}>{loginDetails[0]?.email}</Text>
                </View>

                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', flexWrap: 'wrap', gap: 5, marginTop: 40 }}>

                    {/* Add customer */}
                    <TouchableOpacity style={{ backgroundColor: '#fff', width: '45%', height: 60, marginBottom: 10, borderRadius: 12, elevation: 2, borderColor: zomatoRed, borderWidth: 0.8, flexDirection: 'row', alignItems: 'center', padding: 10 }} onPress={pressHandler}>
                        <View style={{ backgroundColor: lightZomatoRed, borderRadius: 8, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 1 }}>
                            <Icon3 name="person-add" size={18} style={{ width: 20, height: 20, color: zomatoRed }} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#000', fontWeight: '600', paddingLeft: 10 }}>Add customer</Text>
                        </View>
                    </TouchableOpacity>

                    {/* My Sales */}
                    <TouchableOpacity style={{ backgroundColor: '#fff', width: '45%', height: 60, marginBottom: 10, borderRadius: 12, elevation: 2, borderColor: '#7e3aaf', borderWidth: 0.8, flexDirection: 'row', alignItems: 'center', padding: 10 }} onPress={() => navigation.navigate('Sales')} >
                        <View style={{ backgroundColor: '#eaddf4', borderRadius: 8, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 1 }}>
                            <Icon4 name="newspaper-sharp" size={18} style={{ width: 20, height: 20, color: '#7e3aaf' }} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#000', fontWeight: '600', paddingLeft: 10 }}>My Sales</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Share App */}
                    {/* <TouchableOpacity style={{ backgroundColor: '#fff', width: '45%', height: 60, marginBottom: 10, borderRadius: 12, elevation: 2, borderColor: '#e3e31d', borderWidth: 0.8, flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                        <View style={{ backgroundColor: '#f9f9cd', borderRadius: 8, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 1 }}>
                            <Icon name="offline-share" size={18} style={{ width: 20, height: 20, color: '#c8c819' }} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#000', fontWeight: '600', paddingLeft: 10 }}>Share App</Text>
                        </View>
                    </TouchableOpacity> */}

                    {/* Log out */}
                    <TouchableOpacity style={{ backgroundColor: '#fff', width: '45%', height: 60, marginBottom: 10, borderRadius: 12, elevation: 2, borderColor: '#47c724', borderWidth: 0.8, flexDirection: 'row', alignItems: 'center', padding: 10 }} onPress={logoutHandler}>
                        <View style={{ backgroundColor: '#d3f5ca', borderRadius: 8, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 1 }}>
                            <Icon5 name="log-out" size={18} style={{ width: 20, height: 20, color: '#47c724' }} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#000', fontWeight: '600', paddingLeft: 10 }}>Log out</Text>
                        </View>
                    </TouchableOpacity>

                </View>

            </View>

        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({})
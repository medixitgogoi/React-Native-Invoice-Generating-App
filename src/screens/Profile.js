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
        try {
            dispatch(logoutUser());
            await AsyncStorage.removeItem('loginDetails');
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: "Failed to log out. Please try again later.",
                text2: `Error message: ${error?.message}`,
                position: 'top',
                topOffset: 50,
                onPress: () => Toast.hide(),
            });
            console.error('Failed to logout: ', error);
        }
    };

    const pressHandler = () => {;
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

                {/* Details */}
                <View style={{ backgroundColor: '#fff', width: '95%', borderRadius: 15, elevation: 1, padding: 20, flexDirection: 'row', alignItems: 'center', gap: 10 }}>

                    {/* Image */}
                    <View style={{ flexDirection: 'column', alignItems: 'center', }}>
                        <View style={{ height: 100, width: 100, backgroundColor: '#c2d9f2', borderRadius: 100, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#235c9e', fontSize: responsiveFontSize(7), textTransform: 'uppercase' }}>{loginDetails[0]?.name.slice(0, 1)}</Text>
                        </View>
                    </View>

                    {/* Name and Email */}
                    <View style={{ flexDirection: 'column', }}>
                        <Text style={{ fontSize: responsiveFontSize(2.8), fontWeight: '600', color: '#000', textTransform: 'uppercase' }}>{loginDetails[0]?.name}</Text>
                        <Text style={{ fontSize: responsiveFontSize(2), color: '#656565' }}>{loginDetails[0]?.email}</Text>
                    </View>

                </View>

                <View style={{ width: '95%', flexDirection: 'column', alignItems: 'center', gap: 5, marginTop: 20, backgroundColor: '#fff', borderRadius: 15, elevation: 1, paddingVertical: 15, }}>

                    {/* Add customer */}
                    <TouchableOpacity style={{ width: '95%', borderRadius: 12, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5 }} onPress={pressHandler}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <View style={{ backgroundColor: lightZomatoRed, borderRadius: 8, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 2 }}>
                                <Icon3 name="person-add" size={18} style={{ width: 20, height: 20, color: zomatoRed }} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: '#000', fontWeight: '600', paddingLeft: 10, fontSize: responsiveFontSize(2.2), }}>Add customer</Text>
                            </View>
                        </View>
                        <View>
                            <Icon name="keyboard-arrow-right" size={27} color={'#a4a4a4'} />
                        </View>
                    </TouchableOpacity>

                    {/* Divider */}
                    <View style={{ width: '82%', height: 1, backgroundColor: '#000', opacity: 0.1, marginBottom: 6, alignSelf: 'flex-end', marginTop: 6 }}></View>

                    {/* My Sales */}
                    <TouchableOpacity style={{ width: '95%', borderRadius: 12, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5 }} onPress={() => navigation.navigate('Sales')} >
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <View style={{ backgroundColor: lightZomatoRed, borderRadius: 8, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 1 }}>
                                <Icon4 name="newspaper-sharp" size={18} style={{ width: 20, height: 20, color: zomatoRed }} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: '#000', fontWeight: '600', paddingLeft: 10 }}>My Sales</Text>
                            </View>
                        </View>
                        <View>
                            <Icon name="keyboard-arrow-right" size={27} color={'#a4a4a4'} />
                        </View>
                    </TouchableOpacity>

                    {/* divider */}
                    <View style={{ width: '82%', height: 1, backgroundColor: '#000', opacity: 0.1, marginBottom: 6, alignSelf: 'flex-end', marginTop: 6 }}></View>

                    {/* Log out */}
                    <TouchableOpacity style={{ width: '95%', borderRadius: 12, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5 }} onPress={logoutHandler}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <View style={{ backgroundColor: lightZomatoRed, borderRadius: 8, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 1 }}>
                                <Icon5 name="log-out" size={18} style={{ width: 20, height: 20, color: zomatoRed }} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: '#000', fontWeight: '600', paddingLeft: 10 }}>Log out</Text>
                            </View>
                        </View>
                        <View>
                            <Icon name="keyboard-arrow-right" size={27} color={'#a4a4a4'} />
                        </View>
                    </TouchableOpacity>

                </View>

            </View>

        </SafeAreaView>
    )
}

export default Profile;

const styles = StyleSheet.create({})
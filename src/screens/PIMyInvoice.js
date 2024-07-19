import { useState, useCallback } from 'react';
import { View, Text, StatusBar, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView, FlatList } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/Octicons';
import Icon4 from 'react-native-vector-icons/dist/Octicons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser } from '../redux/UserSlice';
import { emptyBill } from '../redux/BillDetailsSlice';
import { lightZomatoRed, zomatoRed } from '../utils/colors';

const PIMyInvoice = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const loginDetails = useSelector(state => state.login);

    const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

    const [search, setSearch] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [filteredNames, setFilteredNames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [customerData, setCustomerData] = useState([]);

    const pressHandler = (item) => {
        navigation.navigate('Details');
        dispatch(deleteUser());
        dispatch(addUser({
            id: item.id,
            name: item.name,
            site: item.site_name,
            pan: item.pan,
            contact: item.mobile,
            gstin: item.gst,
        }));
        dispatch(emptyBill());
    };

    const addCustomerHandler = () => {
        navigation.navigate('Details');
        dispatch(deleteUser());
    };

    const searchHandler = (text) => {
        setSearch(text);
        const filteredData = customerData.filter(word => word.name.toLowerCase().includes(text.toLowerCase()));
        setFilteredNames(filteredData);
    };

    const getHighlightedText = (text, highlight) => {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <Text>
                {parts.map((part, index) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <Text key={index} style={{ backgroundColor: 'yellow' }}>{part}</Text>
                    ) : (
                        <Text key={index}>{part}</Text>
                    )
                )}
            </Text>
        );
    };

    useFocusEffect(
        useCallback(() => {
            const getCustomerDetails = async () => {
                setLoading(true);
                try {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${loginDetails[0]?.accessToken}`;
                    const response = await axios.get('/employee/client/list');
                    setCustomerData(response?.data?.data);
                    setFilteredNames(response?.data?.data);
                } catch (error) {
                    Toast.show({
                        type: 'error',
                        text1: 'Error fetching data',
                        text2: error.message,
                        position: 'top',
                        topOffset: 50,
                        onPress: () => Toast.hide(),
                    });
                } finally {
                    setLoading(false);
                }
            };

            getCustomerDetails();

        }, [loginDetails])
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f3f6' }}>
            <StatusBar
                animated={true}
                backgroundColor="#fff"
                barStyle="dark-content"
            />

            {/* header */}
            <View style={{ flexDirection: "row", backgroundColor: "#fff", alignItems: "center", justifyContent: "space-between", elevation: 2 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%" }}>
                    <View style={{ paddingVertical: 8, flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="keyboard-arrow-left" size={27} color={zomatoRed} />
                        </TouchableOpacity>
                        <Text style={{ color: "#000", fontWeight: "600", fontSize: responsiveFontSize(2.5) }}>PI My Invoice</Text>
                    </View>
                </View>
            </View>

            {/* Add customer button */}
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                <TouchableOpacity onPress={addCustomerHandler} style={{ backgroundColor: zomatoRed, width: '60%', paddingVertical: 10, borderRadius: 10, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginBottom: 10, elevation: 5 }}>
                    <View style={{ width: 22, height: 22, backgroundColor: lightZomatoRed, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                        <Icon4 name="person-add" size={14} style={{ color: zomatoRed }} />
                    </View>
                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.3), fontWeight: '500', textAlign: 'center', marginLeft: 6 }}>Add a new customer</Text>
                </TouchableOpacity>
            </View>

            {/* Searchbar */}
            <View style={{ backgroundColor: '#f1f3f6', width: '100%', paddingHorizontal: 5, paddingBottom: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 8, marginTop: 15, elevation: 3, width: '98%', alignSelf: 'center', borderColor: isSearchFocused ? zomatoRed : '', borderWidth: isSearchFocused ? 0.7 : 0 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ borderRadius: 10, alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                            <Icon2 name="search" size={18} color={zomatoRed} />
                        </View>
                        <TextInput
                            placeholder="Search for a client name"
                            placeholderTextColor="#a1a1a1"
                            onChangeText={searchHandler}
                            value={search}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            style={{ flex: 1, fontSize: responsiveFontSize(2.1), color: '#000', paddingVertical: 5 }}
                        />
                    </View>
                </View>
            </View>

            {/* Customer Names */}
            <ScrollView style={{ flex: 1, paddingHorizontal: 5 }}>
                <View style={{ marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10, marginTop: 8 }}>
                        <Text style={{ color: '#c9c9c9' }}>____________</Text>
                        <Text style={{ color: '#888888', fontSize: responsiveFontSize(1.5), fontWeight: '500', textTransform: 'uppercase' }}> All customers registered under you </Text>
                        <Text style={{ color: '#c9c9c9' }}>____________</Text>
                    </View>
                    <View style={{ paddingHorizontal: 3, flexDirection: 'column', gap: 10 }}>
                        {loading ? (
                            <FlatList
                                data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
                                renderItem={() => (
                                    <ShimmerPlaceHolder style={{ width: '100%', height: 39, backgroundColor: '#8e9999', marginTop: 2, opacity: 0.2, marginBottom: 8, borderRadius: 7 }} />
                                )}
                            />
                        ) : filteredNames.length === 0 ? (
                            <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 0 }}>
                                <Image
                                    source={require("../assets/no-results.png")}
                                    style={{
                                        width: 230,
                                        height: 230,
                                        resizeMode: 'contain',
                                    }}
                                />
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                    <Text style={{ color: '#4d4d4d', fontSize: responsiveFontSize(2.1), }}>No results found for</Text>
                                    <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(2.4), fontWeight: '500', textDecorationLine: 'underline' }}>'{search}'</Text>
                                </View>
                            </View>
                        ) : (
                            filteredNames.map(item => (
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fceced', paddingVertical: 8, borderColor: zomatoRed, borderWidth: 0.7, paddingHorizontal: 10, borderRadius: 8, elevation: 2 }} onPress={() => pressHandler(item)} key={item.id}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 5 }}>
                                        <Text style={{ color: zomatoRed, fontWeight: '600', fontSize: responsiveFontSize(2.1) }}>{getHighlightedText(item.name, search)}</Text>
                                        <Text style={{ color: '#000' }}>•</Text>
                                        <Text style={{ color: '#000', fontSize: responsiveFontSize(1.7) }}>{item.site_name}</Text>
                                    </View>
                                    <Icon name="keyboard-arrow-right" size={20} color={zomatoRed} />
                                </TouchableOpacity>
                            ))
                        )}
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    );
};

export default PIMyInvoice;
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { lightZomatoRed, zomatoRed } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import Icon3 from 'react-native-vector-icons/dist/Entypo';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Toast from 'react-native-toast-message';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const Sales = () => {

    const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

    const navigation = useNavigation();

    const loginDetails = useSelector(state => state.login);

    const [dispatchedOrders, setDispatchedOrders] = useState([]);
    const [toBeDispatchedOrders, setToBeDispatchedOrders] = useState([]);
    const [allOrders, setAllOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [filteredNames, setFilteredNames] = useState([]);

    const searchHandler = (text) => {

        console.log('allOrdrs', allOrders);

        setSearch(text);

        const filteredData = allOrders?.filter(order => order?.client_name?.toLowerCase().includes(text.toLowerCase()));

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

    function indianNumberFormat(number) {
        // Split the number into an array of digits.
        const digits = number.toString().split('');

        // Reverse the array of digits.
        digits.reverse();

        // Add a comma after every three digits, starting from the right.
        for (let i = 3; i < digits.length; i += 3) {
            digits.splice(i, 0, ',');
        }

        // Join the array of digits back into a string.
        const formattedNumber = digits.join('');

        // Reverse the formatted number back to its original order.
        return formattedNumber.split('').reverse().join('');
    };

    const getDispatchedOrderDetails = async () => {
        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${loginDetails[0]?.accessToken}`;

            const response = await axios.post(
                '/employee/order/list',
                {
                    order_status: '2',
                }
            );

            const data = response?.data?.data;
            setDispatchedOrders(data);

            console.log("getDispatchedOrderDetails", data);

            setAllOrders([...data]);
            setFilteredNames([...data]);

        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error fetching data',
                text2: error.message,
                topOffset: 50,
                onPress: () => Toast.hide(),
            });

        }
    };

    const getToBeDispatchedOrderDetails = async () => {
        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${loginDetails[0]?.accessToken}`;

            const response = await axios.post(
                '/employee/order/list',
                {
                    order_status: '1',
                }
            );

            const data = response?.data?.data;
            setToBeDispatchedOrders(data);

            console.log("getToBeDispatchedOrderDetails", data);

            setAllOrders(prevOrders => [...prevOrders, ...data]);
            console.log('filteredNames', filteredNames);

            setFilteredNames(prevOrders => [...prevOrders, ...data]);

        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error fetching data',
                text2: error.message,
                topOffset: 50,
                onPress: () => Toast.hide(),
            });

        }
    };

    useFocusEffect(
        useCallback(() => {

            setLoading(true);

            getDispatchedOrderDetails();
            getToBeDispatchedOrderDetails();

            setFilteredNames(allOrders);

            setLoading(false);

        }, [])
    );

    const convertedDate = (timestamp) => {
        const date = new Date(timestamp);

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        return `${day} ${month}, ${year}`;
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>

            {/* header */}
            <View style={{ flexDirection: "row", backgroundColor: "#fff", alignItems: "center", justifyContent: "space-between", elevation: 2 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", }}>
                    <View style={{ paddingVertical: 8, flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10, }}>
                        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                            <Icon name="keyboard-arrow-left" size={27} color={zomatoRed} />
                        </TouchableOpacity>
                        <Text style={{ color: "#000", fontWeight: "600", fontSize: responsiveFontSize(2.5) }}>My Sales</Text>
                    </View>
                    {/* <TouchableOpacity style={{ backgroundColor: lightZomatoRed, borderRadius: 5, marginRight: 10, marginBottom: 4, elevation: 2, paddingHorizontal: 4, borderColor: zomatoRed, borderWidth: 0.5 }} onPress={() => navigation.navigate('DispatchedOrders')}>
                        <Text style={{ color: zomatoRed, padding: 6, fontWeight: '500', fontSize: responsiveFontSize(1.8) }}>View Dispatched Orders</Text>
                    </TouchableOpacity> */}
                </View>
            </View>

            {/* Searchbar */}
            <View style={{ backgroundColor: "#f1f3f6", width: "100%", paddingHorizontal: 5, paddingBottom: 10, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: "#fff", borderRadius: 12, paddingHorizontal: 8, marginTop: 15, elevation: 3, width: "98%", alignSelf: "center", borderColor: isSearchFocused ? zomatoRed : "", borderWidth: isSearchFocused ? 0.7 : 0, }}>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', }}>
                        <View style={{ borderRadius: 10, alignItems: "center", justifyContent: "center", padding: 5, marginRight: 3, }}>
                            <Icon2 name="search" size={18} color={zomatoRed} />
                        </View>
                        <TextInput
                            placeholder="Search for a customer name"
                            placeholderTextColor="#a1a1a1"
                            onChangeText={searchHandler}
                            value={search}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            style={{ flex: 1, fontSize: responsiveFontSize(2.1), color: "#000", paddingVertical: 5, fontWeight: "500", }}
                        />

                    </View>
                </View>
            </View>

            <ScrollView style={{ flex: 1 }}>

                {/* loading */}
                {loading && (
                    <FlatList
                        data={[1, 1, 1]}
                        renderItem={() => (
                            <View style={{ flexDirection: 'column', width: '100%', height: 200, backgroundColor: '#d8dbdb', padding: 10, marginTop: 2, marginBottom: 8, borderRadius: 7, gap: 8 }}>
                                <ShimmerPlaceHolder style={{ width: '100%', height: 50, backgroundColor: '#f2f3f3', borderRadius: 7, }}>
                                </ShimmerPlaceHolder>
                                <ShimmerPlaceHolder style={{ width: '100%', height: 120, backgroundColor: '#f2f3f3', borderRadius: 7, }}>
                                </ShimmerPlaceHolder>
                            </View>
                        )}
                    />
                )}

                {/* Orders */}
                <View style={{ paddingHorizontal: 8, paddingVertical: 12, flexDirection: 'column', gap: 8, }}>

                    {filteredNames?.map((item) => (
                        <View style={{ width: '100%', borderRadius: 6, flexDirection: 'column', borderColor: '#6f8990', borderWidth: 0.5, overflow: 'hidden', backgroundColor: '#fff' }} key={item.id}>

                            {/* Top */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#edf5fa', padding: 12, borderBottomColor: '#6f8990', borderBottomWidth: 0.5, }}>
                                <View style={{ flexDirection: 'column', }}>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '600', textTransform: 'uppercase' }}>{getHighlightedText(item?.client_name, search)}</Text>
                                    <Text style={{ color: '#6f8990', fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>Ganeshguri, Guwahati</Text>
                                </View>
                                {
                                    item?.order_status === '1' ? (
                                        <View style={{ backgroundColor: lightZomatoRed, padding: 5, borderRadius: 5, elevation: 1, borderColor: zomatoRed, borderWidth: 0.6 }}>
                                            <Text style={{ color: zomatoRed, fontWeight: '500', fontSize: responsiveFontSize(1.7) }}>To be dispatched</Text>
                                        </View>
                                    ) : (
                                        <View style={{ backgroundColor: '#c5f8a4', borderRadius: 5, elevation: 1, borderColor: '#3f910b', borderWidth: 0.6, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 5, gap: 2 }}>
                                            <Text style={{ color: "#3f910b", fontWeight: '500', fontSize: responsiveFontSize(1.7) }}>Dispatched</Text>
                                            <Icon3 name="check" style={{ width: 15, height: 15, color: '#3f910b', paddingTop: 2 }} />
                                        </View>
                                    )
                                }
                            </View>

                            {/* Bottom */}
                            <View style={{ padding: 12 }}>

                                {/* Details */}
                                <View style={{ flexDirection: 'column', gap: 5, borderBottomColor: '#6f8990', borderBottomWidth: 0.5, borderStyle: 'dashed', paddingBottom: 10 }}>
                                    {item.orderDetails.map(item => {

                                        const totalPieces = item.orderData.reduce((pi, item) => {
                                            return pi + parseInt(item.quantity);
                                        }, 0);

                                        return (
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                                <Text style={{ color: '#6f8990', fontWeight: '600' }}>{totalPieces} x</Text>
                                                <Text style={{ color: '#000', fontWeight: '500' }}>{item.product_type}</Text>
                                                <Text style={{ color: '#000', fontWeight: '500', marginHorizontal: 3 }}>•</Text>
                                                <Text style={{ color: '#000', fontWeight: '500' }}>{item.color}</Text>
                                            </View>
                                        )
                                    })}
                                </View>

                                {/* Date and Amount */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10 }}>
                                    <Text style={{ color: '#6f8990', fontSize: responsiveFontSize(1.7) }}>{convertedDate(item?.order_date)}</Text>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>₹{indianNumberFormat(item?.payble_amount)}</Text>
                                </View>

                                {/* View Order Button */}
                                <TouchableOpacity
                                    style={{ backgroundColor: zomatoRed, borderRadius: 6, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10, marginTop: 8, gap: 5 }}
                                    onPress={() => {
                                        navigation.navigate('OrderDetails', { data: item })
                                        setSearch('');
                                    }}>
                                    <View style={{ backgroundColor: lightZomatoRed, borderRadius: 5, width: 22, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon2 name="receipt-outline" size={14} color={zomatoRed} />
                                    </View>
                                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(2), color: '#fff', fontWeight: '500', textTransform: 'uppercase' }}>View Order</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    ))}

                </View>

            </ScrollView>

        </SafeAreaView>
    )
}

export default Sales

const styles = StyleSheet.create({})

import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, StatusBar, TextInput, Image, FlatList } from 'react-native';
import { lightZomatoRed, zomatoRed } from '../utils/colors'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { useState, useEffect, useMemo, useCallback } from 'react'
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Icon3 from 'react-native-vector-icons/dist/Entypo';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const DispatchedOrders = () => {

    const navigation = useNavigation();

    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredNames, setFilteredNames] = useState([]);

    const debouncedSearch = useMemo(() => debounce((text) => {
        setFilteredNames(details.filter(order => order.client_name.toLowerCase().includes(text.toLowerCase())));
    }, 300), [details]);

    const handleSearch = (text) => {
        setSearch(text);
        debouncedSearch(text);
    };

    const loginDetails = useSelector(state => state.login);

    const convertedDate = (timestamp) => {
        const date = new Date(timestamp);

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        return `${day} ${month}, ${year}`;
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

    useEffect(() => {
        const getOrderDetails = async () => {
            setLoading(true);
            try {

                axios.defaults.headers.common['Authorization'] = `Bearer ${loginDetails[0]?.accessToken}`;

                const response = await axios.post('/employee/order/list', { order_status: '2', });

                const data = response.data.data;

                setDetails(data);
                setFilteredNames(data);

                console.log("Detailssss", data);

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getOrderDetails();

    }, []);

    const handleViewOrder = useCallback((item) => {
        navigation.navigate('OrderDetails', { data: item });
        setSearch('');
    }, [navigation]);

    const renderOrder = useCallback(({ item }) => (
        <OrderItem item={item} search={search} handleViewOrder={handleViewOrder} />
    ), [search, handleViewOrder]);

    const OrderItem = ({ item, search, handleViewOrder }) => {

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

        return (
            <View style={{ width: '95%', alignSelf: 'center', marginBottom: 10, borderRadius: 8, flexDirection: 'column', borderColor: '#6f8990', borderWidth: 0.5, overflow: 'hidden', backgroundColor: '#fff', elevation: 1, }}>

                {/* Top */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#edf5fa', padding: 12, borderBottomColor: '#6f8990', borderBottomWidth: 0.5, }}>
                    <View style={{ flexDirection: 'column', }}>
                        <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '600', textTransform: 'uppercase' }}>{getHighlightedText(item.client_name, search)}</Text>
                        <Text style={{ color: '#6f8990', fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>Ganeshguri, Guwahati</Text>
                    </View>
                    <View style={{ backgroundColor: '#c5f8a4', borderRadius: 5, elevation: 1, borderColor: '#3f910b', borderWidth: 0.6, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 5, gap: 2 }}>
                        <Text style={{ color: "#3f910b", fontWeight: '500', fontSize: responsiveFontSize(1.7) }}>Dispatched</Text>
                        <Icon3 name="check" style={{ width: 15, height: 15, color: '#3f910b', paddingTop: 2 }} />
                    </View>
                </View>

                {/* Bottom */}
                <View style={{ padding: 12 }}>
                    <View style={{ flexDirection: 'column', gap: 5, borderBottomColor: '#6f8990', borderBottomWidth: 0.5, borderStyle: 'dashed', paddingBottom: 10 }}>
                        {item?.orderDetails?.map(itemDetail => {
                            const totalPieces = itemDetail.orderData.reduce((pi, item) => pi + parseInt(item.quantity), 0);
                            return (
                                <View key={itemDetail.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                    <Text style={{ color: '#6f8990', fontWeight: '600' }}>{totalPieces} x</Text>
                                    <Text style={{ color: '#000', fontWeight: '500' }}>{itemDetail.product_type}</Text>
                                    <Text style={{ color: '#000', fontWeight: '500', marginHorizontal: 3 }}>•</Text>
                                    <Text style={{ color: '#000', fontWeight: '500' }}>{itemDetail.color}</Text>
                                </View>
                            );
                        })}
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10 }}>
                        <Text style={{ color: '#6f8990', fontSize: responsiveFontSize(1.7) }}>{convertedDate(item?.order_date)}</Text>
                        <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>₹{indianNumberFormat(item?.payble_amount)}</Text>
                    </View>
                    <TouchableOpacity
                        style={{ backgroundColor: zomatoRed, borderRadius: 6, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10, marginTop: 8, gap: 5 }}
                        onPress={() => handleViewOrder(item)}>
                        <View style={{ backgroundColor: lightZomatoRed, borderRadius: 5, width: 22, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon2 name="receipt-outline" size={14} color={zomatoRed} />
                        </View>
                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(2), color: '#fff', fontWeight: '600', textTransform: 'uppercase' }}>View Order</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                animated={true}
                backgroundColor={'#fff'}
                barStyle="dark-content"
            />

            {/* header */}
            <View style={{ flexDirection: "row", backgroundColor: "#fff", alignItems: "center", justifyContent: "space-between", elevation: 2 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", }}>
                    <View style={{ paddingVertical: 8, flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10, }}>
                        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                            <Icon name="keyboard-arrow-left" size={27} color={zomatoRed} />
                        </TouchableOpacity>
                        <Text style={{ color: "#000", fontWeight: "600", fontSize: responsiveFontSize(2.5) }}>Dispatched Orders</Text>
                    </View>
                </View>
            </View>

            {/* Searchbar */}
            <View style={{ backgroundColor: "#f1f3f6", width: "100%", paddingHorizontal: 5, paddingBottom: 10, marginBottom: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: "#fff", borderRadius: 12, paddingHorizontal: 8, marginTop: 15, elevation: 3, width: "98%", alignSelf: "center", borderColor: isSearchFocused ? zomatoRed : "", borderWidth: isSearchFocused ? 0.7 : 0 }}>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ borderRadius: 10, alignItems: "center", justifyContent: "center", padding: 5, marginRight: 3 }}>
                            <Icon2 name="search" size={18} color={zomatoRed} />
                        </View>
                        <TextInput
                            placeholder="Search for a customer name"
                            placeholderTextColor="#838383"
                            onChangeText={handleSearch}
                            value={search}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            style={{ flex: 1, fontSize: responsiveFontSize(2.1), color: "#000", paddingVertical: 5, fontWeight: "400" }}
                        />
                    </View>
                </View>
            </View>

            {loading ? (
                <ScrollView contentContainerStyle={{ paddingHorizontal: 10 }}>
                    {Array(6).fill(null).map((_, index) => (
                        <View key={index} style={{ width: '100%', borderRadius: 8, flexDirection: 'column', borderColor: '#6f8990', borderWidth: 0.5, overflow: 'hidden', backgroundColor: '#fff', marginBottom: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#edf5fa', padding: 12, borderBottomColor: '#6f8990', borderBottomWidth: 0.5, }}>
                                <View style={{ flexDirection: 'column', }}>
                                    <ShimmerPlaceHolder autoRun style={{ width: responsiveFontSize(18), height: responsiveFontSize(1.8), marginBottom: 5 }} />
                                    <ShimmerPlaceHolder autoRun style={{ width: responsiveFontSize(15), height: responsiveFontSize(1.3) }} />
                                </View>
                                <ShimmerPlaceHolder autoRun style={{ width: responsiveFontSize(10), height: responsiveFontSize(1.7) }} />
                            </View>
                            <View style={{ padding: 12 }}>
                                <View style={{ flexDirection: 'column', gap: 5, borderBottomColor: '#6f8990', borderBottomWidth: 0.5, borderStyle: 'dashed', paddingBottom: 10 }}>
                                    {Array(3).fill(null).map((_, index) => (
                                        <ShimmerPlaceHolder key={index} autoRun style={{ width: responsiveFontSize(20), height: responsiveFontSize(1.3), marginBottom: 5 }} />
                                    ))}
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10 }}>
                                    <ShimmerPlaceHolder autoRun style={{ width: responsiveFontSize(10), height: responsiveFontSize(1.5) }} />
                                    <ShimmerPlaceHolder autoRun style={{ width: responsiveFontSize(10), height: responsiveFontSize(1.8) }} />
                                </View>
                                <ShimmerPlaceHolder autoRun style={{ width: responsiveFontSize(25), height: responsiveFontSize(2), borderRadius: 6, marginTop: 8 }} />
                            </View>
                        </View>
                    ))}
                </ScrollView>
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
                <FlatList
                    data={filteredNames}
                    renderItem={renderOrder}
                    keyExtractor={item => item.id.toString()}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    windowSize={5}
                />
            )}

        </SafeAreaView>
    )
}

export default DispatchedOrders;

const styles = StyleSheet.create({});
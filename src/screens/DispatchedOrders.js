import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ActivityIndicator, ScrollView, StatusBar } from 'react-native'
import { lightZomatoRed, zomatoRed } from '../utils/colors'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Icon3 from 'react-native-vector-icons/dist/Entypo';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { useSelector } from 'react-redux';

const DispatchedOrders = () => {

    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);

    const loginDetails = useSelector(state => state.login);

    const convertedDate = (timestamp) => {
        const date = new Date(timestamp);

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        return `${day} ${month}, ${year}`;
    }

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

    const getOrderDetails = async () => {
        setLoading(true);
        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${loginDetails[0]?.accessToken}`;

            const response = await axios.post(
                '/employee/order/list',
                {
                    order_status: '2',
                }
            );

            const data = response?.data?.data;
            setDetails(data);

            console.log("Detailssss", data);

        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error fetching data',
                text2: error.message,
                topOffset: 50,
                onPress: () => Toast.hide(),
            });

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getOrderDetails();
    }, []);

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

            {loading && (
                <View style={{ height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color={zomatoRed} />
                </View>
            )}

            <ScrollView style={{ flex: 1 }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, marginTop: 8, justifyContent: 'center' }}>
                    <Text style={{ color: '#5f5f5f', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Orders that are dispatched</Text>
                </View>

                <View style={{ paddingHorizontal: 8, paddingVertical: 12, flexDirection: 'column', gap: 8, }}>

                    {details?.map((item, index) => (
                        <View style={{ width: '100%', borderRadius: 6, flexDirection: 'column', borderColor: '#6f8990', borderWidth: 0.5, overflow: 'hidden', backgroundColor: '#fff' }} key={index}>

                            {/* Top */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#edf5fa', padding: 12, borderBottomColor: '#6f8990', borderBottomWidth: 0.5, }}>
                                <View style={{ flexDirection: 'column', }}>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '600', textTransform: 'uppercase' }}>{item?.client_name}</Text>
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
                                <TouchableOpacity style={{ backgroundColor: zomatoRed, borderRadius: 6, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10, marginTop: 8, gap: 5 }} onPress={() => navigation.navigate('DispatchOrderDetails', { data: item })}>
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

export default DispatchedOrders

const styles = StyleSheet.create({})

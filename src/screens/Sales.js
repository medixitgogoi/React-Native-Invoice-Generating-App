import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import { lightZomatoRed, zomatoRed } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Sales = () => {

    const loginDetails = useSelector(state => state.login);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

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

    const viewOrderHandler = () => {
        navigation.navigate('OrderDetails');
    }

    const getOrderDetails = async () => {
        setLoading(true);
        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${loginDetails[0]?.accessToken}`;

            const response = await axios.post(
                '/employee/order/list',
                {
                    order_status: '2'
                }
            );

            console.log("Detailssss", response?.data?.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getOrderDetails();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>

            {/* header */}
            <View style={{ flexDirection: "row", backgroundColor: "#fff", alignItems: "center", justifyContent: "space-between", elevation: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", }}>
                    <View style={{ paddingVertical: 8, flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10, }}>
                        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                            <Icon name="keyboard-arrow-left" size={27} color={zomatoRed} />
                        </TouchableOpacity>
                        <Text style={{ color: "#000", fontWeight: "600", fontSize: responsiveFontSize(2.5) }}>My Sales</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={{ flex: 1 }}>
                <View style={{ paddingHorizontal: 8, paddingVertical: 12, flexDirection: 'column', gap: 8, }}>
                    {loading ? (
                        <View>
                            <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(2.5), textAlign: 'center' }}>Loading</Text>
                        </View>
                    ) : (
                        <View style={{ width: '100%', borderRadius: 6, flexDirection: 'column', borderColor: '#6f8990', borderWidth: 0.5, overflow: 'hidden', backgroundColor: '#fff' }}>

                            {/* Top */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#edf5fa', padding: 12, borderBottomColor: '#6f8990', borderBottomWidth: 0.5, }}>
                                <View style={{ flexDirection: 'column', }}>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '600', textTransform: 'uppercase' }}>Dixit Gogoi</Text>
                                    <Text style={{ color: '#6f8990', fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>Ganeshguri, Guwahati</Text>
                                </View>
                                <View>
                                    <View style={{ backgroundColor: lightZomatoRed, padding: 5, borderRadius: 5, elevation: 1, borderColor: zomatoRed, borderWidth: 0.6 }}>
                                        <Text style={{ color: zomatoRed, fontWeight: '500', fontSize: responsiveFontSize(1.7) }}>To be dispatched</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Bottom */}
                            <View style={{ padding: 12 }}>

                                {/* Products */}
                                <View style={{ flexDirection: 'column', gap: 5, borderBottomColor: '#6f8990', borderBottomWidth: 0.5, borderStyle: 'dashed', paddingBottom: 10 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                        <Text style={{ color: '#6f8990', fontWeight: '600' }}>125 x</Text>
                                        <Text style={{ color: '#000', fontWeight: '500' }}>Ridges</Text>
                                        <Text style={{ color: '#000', fontWeight: '500', marginHorizontal: 3 }}>•</Text>
                                        <Text style={{ color: '#000', fontWeight: '500' }}>Green</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                        <Text style={{ color: '#6f8990', fontWeight: '600' }}>450 x</Text>
                                        <Text style={{ color: '#000', fontWeight: '500' }}>Tiles Profile Sheet</Text>
                                        <Text style={{ color: '#000', fontWeight: '500', marginHorizontal: 3 }}>•</Text>
                                        <Text style={{ color: '#000', fontWeight: '500' }}>Red</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                        <Text style={{ color: '#6f8990', fontWeight: '600' }}>260 x</Text>
                                        <Text style={{ color: '#000', fontWeight: '500' }}>Profile Sheet</Text>
                                        <Text style={{ color: '#000', fontWeight: '500', marginHorizontal: 3 }}>•</Text>
                                        <Text style={{ color: '#000', fontWeight: '500' }}>Blue</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                        <Text style={{ color: '#6f8990', fontWeight: '600' }}>380 x</Text>
                                        <Text style={{ color: '#000', fontWeight: '500' }}>Tiles Profile Sheet</Text>
                                        <Text style={{ color: '#000', fontWeight: '500', marginHorizontal: 3 }}>•</Text>
                                        <Text style={{ color: '#000', fontWeight: '500' }}>Green</Text>
                                    </View>
                                </View>

                                {/* Date and Amount */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10 }}>
                                    <Text style={{ color: '#6f8990', fontSize: responsiveFontSize(1.7) }}>03 June 2024</Text>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>₹{indianNumberFormat(78000)}</Text>
                                </View>

                                {/* View Order Button */}
                                <TouchableOpacity style={{ backgroundColor: zomatoRed, borderRadius: 6, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10, marginTop: 8, gap: 5 }} onPress={viewOrderHandler}>
                                    <View style={{ backgroundColor: lightZomatoRed, borderRadius: 5, width: 22, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon2 name="receipt-outline" size={14} color={zomatoRed} />
                                    </View>
                                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(2), color: '#fff', fontWeight: '500', textTransform: 'uppercase' }}>View Order</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    )}

                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default Sales;

const styles = StyleSheet.create({});
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { lightZomatoRed, zomatoRed } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

const Sales = () => {

    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);

    const [dispatchedOrders, setDispatchedOrders] = useState([]);
    const [toBeDispatchedOrders, setToBeDispatchedOrders] = useState([]);

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
            setDispatchedOrders(data);

            console.log("getDispatchedOrderDetails", data);

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

    const getToBeDispatchedOrderDetails = async () => {
        setLoading(true);
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
        getDispatchedOrderDetails();
        getToBeDispatchedOrderDetails();
    }, []);

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

            {loading && (
                <View style={{ height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color={zomatoRed} />
                </View>
            )}

            <View>

            </View>

        </SafeAreaView>
    )
}

export default Sales

const styles = StyleSheet.create({})

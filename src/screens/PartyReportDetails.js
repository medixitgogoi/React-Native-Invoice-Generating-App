import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { zomatoRed, lightZomatoRed } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Icon3 from 'react-native-vector-icons/dist/Entypo';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const PartyReportDetails = ({ route }) => {

    const navigation = useNavigation();

    const { orders, clientName } = route.params;

    // console.log('orders', orders);
    // console.log('name', clientName);

    const [loading, setLoading] = useState(true);
    const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
        const filtered = orders.filter(order => order.client_name === clientName);
        setFilteredOrders(filtered);
        setLoading(false);
    }, [orders, clientName]);

    const indianNumberFormat = (number) => {
        const digits = number.toString().split('');
        digits.reverse();
        for (let i = 3; i < digits.length; i += 3) {
            digits.splice(i, 0, ',');
        }
        return digits.reverse().join('');
    };

    const convertedDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${day} ${month}, ${year}`;
    };

    const handleViewOrder = useCallback((item) => {
        navigation.navigate('OrderDetails', { data: item });
        // setSearch('');
    }, [navigation]);

    const renderOrder = useCallback(({ item }) => (
        <OrderItem item={item} handleViewOrder={handleViewOrder} />
    ), [handleViewOrder]);

    const OrderItem = ({ item, search, handleViewOrder }) => {

        // search text
        // const getHighlightedText = (text, highlight) => {
        //     const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        //     return (
        //         <Text>
        //             {parts.map((part, index) =>
        //                 part.toLowerCase() === highlight.toLowerCase() ? (
        //                     <Text key={index} style={{ backgroundColor: 'yellow' }}>{part}</Text>
        //                 ) : (
        //                     <Text key={index}>{part}</Text>
        //                 )
        //             )}
        //         </Text>
        //     );
        // };

        return (
            <View style={{ width: '95%', alignSelf: 'center', marginBottom: 10, borderRadius: 8, flexDirection: 'column', borderColor: '#6f8990', borderWidth: 0.5, overflow: 'hidden', backgroundColor: '#fff', elevation: 1, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#edf5fa', padding: 12, borderBottomColor: '#6f8990', borderBottomWidth: 0.5, }}>
                    <View style={{ flexDirection: 'column', }}>
                        <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '600', textTransform: 'uppercase' }}>{item?.client_name}</Text>
                        <Text style={{ color: '#6f8990', fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>Ganeshguri, Guwahati</Text>
                    </View>
                    {item.order_status === '1' ? (
                        <View style={{ backgroundColor: lightZomatoRed, padding: 5, borderRadius: 5, elevation: 1, borderColor: zomatoRed, borderWidth: 0.6 }}>
                            <Text style={{ color: zomatoRed, fontWeight: '500', fontSize: responsiveFontSize(1.7) }}>To be dispatched</Text>
                        </View>
                    ) : (
                        <View style={{ backgroundColor: '#c5f8a4', borderRadius: 5, elevation: 1, borderColor: '#3f910b', borderWidth: 0.6, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 5, gap: 2 }}>
                            <Text style={{ color: "#3f910b", fontWeight: '500', fontSize: responsiveFontSize(1.7) }}>Dispatched</Text>
                            <Icon3 name="check" style={{ width: 15, height: 15, color: '#3f910b', paddingTop: 2 }} />
                        </View>
                    )}
                    {/* <View style={{ backgroundColor: lightZomatoRed, padding: 5, borderRadius: 5, elevation: 1, borderColor: zomatoRed, borderWidth: 0.6 }}>
                        <Text style={{ color: zomatoRed, fontWeight: '500', fontSize: responsiveFontSize(1.7) }}>To be dispatched</Text>
                    </View> */}
                </View>
                <View style={{ padding: 12 }}>
                    <View style={{ flexDirection: 'column', gap: 5, borderBottomColor: '#6f8990', borderBottomWidth: 0.5, borderStyle: 'dashed', paddingBottom: 10 }}>
                        {item.orderDetails.map(itemDetail => {
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
                        <Text style={{ color: '#6f8990', fontSize: responsiveFontSize(1.7) }}>{convertedDate(item.order_date)}</Text>
                        <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>₹{indianNumberFormat(item.payble_amount)}</Text>
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

    // console.log('filteredOrders', filteredOrders);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f1f3f6", flexDirection: "column", }}>
            <StatusBar
                animated={true}
                backgroundColor='#fff'
                barStyle="dark-content"
            />

            {/* header */}
            <View style={{ flexDirection: "row", backgroundColor: "#fff", alignItems: "center", justifyContent: "space-between", elevation: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", }}>
                    <View style={{ paddingVertical: 8, flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10 }}>
                        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                            <Icon name="keyboard-arrow-left" size={27} color={zomatoRed} />
                        </TouchableOpacity>
                        <Text style={{ color: "#000", fontWeight: "600", fontSize: responsiveFontSize(2.5) }}>Party Order Details</Text>
                    </View>
                </View>
            </View>

            <View style={{ marginVertical: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
                <Text style={{ color: '#000', textAlign: 'center', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>All orders from</Text>
                <Text style={{ color: zomatoRed, textAlign: 'center', fontSize: responsiveFontSize(2.2), fontWeight: '600', textDecorationLine: 'underline' }}>'{clientName}'</Text>
            </View>

            <View style={{ flex: 1, paddingVertical: 10 }}>

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
                ) : (
                    <FlatList
                        data={filteredOrders}
                        renderItem={renderOrder}
                        keyExtractor={item => item.id.toString()}
                    />
                )}

            </View>
        </SafeAreaView>
    )
}

export default PartyReportDetails;

const styles = StyleSheet.create({
    orderCard: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        elevation: 2,
    },
    orderText: {
        fontSize: responsiveFontSize(2),
        color: '#000',
    },
});
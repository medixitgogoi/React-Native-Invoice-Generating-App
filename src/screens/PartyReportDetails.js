import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, FlatList } from 'react-native';
import { zomatoRed } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { useEffect, useState } from 'react';

const PartyReportDetails = ({ route }) => {

    const navigation = useNavigation();

    const { orders, clientName } = route.params;

    console.log('orders', orders);
    console.log('name', clientName);

    const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
        const filtered = orders.filter(order => order.client_name === clientName);
        setFilteredOrders(filtered);
    }, [orders, clientName]);

    const renderOrder = ({ item }) => (
        <View style={styles.orderCard}>
            <Text style={styles.orderText}>ID: {item.id}</Text>
            <Text style={styles.orderText}>Client Name: {item.client_name}</Text>
            <Text style={styles.orderText}>Employee Name: {item.employee_name}</Text>
        </View>
    );

    console.log('filteredOrders', filteredOrders);

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

            <View style={{ flex: 1, padding: 10 }}>
                <FlatList
                    data={filteredOrders}
                    renderItem={renderOrder}
                    keyExtractor={item => item.id.toString()}
                />
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

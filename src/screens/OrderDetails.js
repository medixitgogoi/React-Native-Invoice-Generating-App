import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { zomatoRed } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import InvoiceView from '../components/InvoiceView';
import DispatchOrderView from '../components/DispatchOrderView';

const OrderDetails = ({ route }) => {

    const { data: detail } = route.params;

    const navigation = useNavigation();

    const [tab, setTab] = useState(1);

    const tabChangeHandler = () => {
        setTab(tab === 1 ? 2 : 1);
    };

    return (
        <SafeAreaView style={styles.container}>

            {/* header */}
            <View style={{ flexDirection: "column", backgroundColor: "#fff", alignItems: "center", justifyContent: "space-between", elevation: 2 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", }}>
                    <View style={{ paddingVertical: 8, flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10, }}>
                        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                            <Icon name="keyboard-arrow-left" size={27} color={zomatoRed} />
                        </TouchableOpacity>
                        <Text style={{ color: "#000", fontWeight: "600", fontSize: responsiveFontSize(2.5) }}>Order Details</Text>
                    </View>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity style={{ width: '50%', borderBottomColor: tab === 1 ? zomatoRed : '', borderBottomWidth: tab === 1 ? 1.5 : 0, paddingVertical: 10 }} onPress={tabChangeHandler}>
                        <Text style={{ color: tab === 1 ? zomatoRed : '#585858', textAlign: 'center', fontWeight: '500', fontSize: responsiveFontSize(2.2) }}>View Invoice</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '50%', borderBottomColor: tab === 2 ? zomatoRed : '', borderBottomWidth: tab === 2 ? 1.5 : 0, paddingVertical: 10 }} onPress={tabChangeHandler}>
                        <Text style={{ color: tab === 2 ? zomatoRed : '#585858', textAlign: 'center', fontWeight: '500', fontSize: responsiveFontSize(2.2) }}>View Dispatch Order</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Content */}
            <View style={styles.content}>
                {tab === 1 ? <MemoizedInvoiceView detail={detail} /> : <MemoizedDispatchOrderView detail={detail} />}
            </View>

        </SafeAreaView>
    );
};

const MemoizedInvoiceView = React.memo(InvoiceView);
const MemoizedDispatchOrderView = React.memo(DispatchOrderView);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 2,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    headerTitle: {
        color: '#000',
        fontWeight: '600',
        fontSize: responsiveFontSize(2.5),
    },
    tabContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabItem: {
        width: '50%',
        borderBottomColor: 'transparent',
        borderBottomWidth: 0,
        paddingVertical: 10,
    },
    activeTab: {
        borderBottomColor: zomatoRed,
        borderBottomWidth: 1.5,
    },
    tabText: {
        color: '#585858',
        textAlign: 'center',
        fontWeight: '500',
        fontSize: responsiveFontSize(2.2),
    },
    activeTabText: {
        color: zomatoRed,
    },
    content: {
        margin: 10,
        marginTop: 0,
    },
});

export default OrderDetails;
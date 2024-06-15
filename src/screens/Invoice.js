import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { lightZomatoRed, zomatoRed } from '../utils/colors';
import { useState } from 'react';
import InvoiceView from '../components/InvoiceView';
import DispatchOrderView from '../components/DispatchOrderView';

const Invoice = ({ route }) => {

    const bendCharge = route.params.bend;
    const loadingCharge = route.params.loading;
    const transportCharge = route.params.transport;

    const navigation = useNavigation();

    const [tab, setTab] = useState(1);

    const tabChangeHandler = () => {
        setTab(tab === 1 ? 2 : 1);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f6f6", flexDirection: "column", }}>
            <StatusBar
                animated={true}
                backgroundColor={'#fff'}
                barStyle="dark-content"
            />

            {/* header */}
            <View style={{ flexDirection: "row", backgroundColor: "#fff", alignItems: "center", justifyContent: "space-between", elevation: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", }}>
                    <View style={{ paddingVertical: 8, flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10, }}>
                        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                            <Icon name="keyboard-arrow-left" size={27} color={zomatoRed} />
                        </TouchableOpacity>
                        <Text style={{ color: "#000", fontWeight: "600", fontSize: responsiveFontSize(2.5) }}>Preview</Text>
                    </View>
                </View>
            </View>

            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>

                <TouchableOpacity style={{ backgroundColor: tab === 1 ? zomatoRed : '#fff', padding: 8, borderTopLeftRadius: 7, borderBottomLeftRadius: 7, borderColor: zomatoRed, borderWidth: 1, borderRightWidth: 0.5 }} onPress={() => tabChangeHandler()}>
                    <Text style={{ color: tab === 1 ? '#fff' : zomatoRed, textAlign: 'center', fontWeight: '600', fontSize: responsiveFontSize(1.7), textTransform: 'uppercase' }}>View Invoice</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ backgroundColor: tab === 2 ? zomatoRed : '#fff', padding: 8, borderColor: zomatoRed, borderWidth: 1, borderTopRightRadius: 7, borderBottomRightRadius: 7, borderLeftWidth: 0.5 }} onPress={() => tabChangeHandler()}>
                    <Text style={{ color: tab === 2 ? '#fff' : zomatoRed, textAlign: 'center', fontWeight: '600', fontSize: responsiveFontSize(1.7), textTransform: 'uppercase' }}>View Dispatch Order</Text>
                </TouchableOpacity>

            </View>

            <View style={{ margin: 10, }}>
                {tab === 1 ? (
                    <InvoiceView bendCharge={bendCharge} loadingCharge={loadingCharge} transportCharge={transportCharge} />
                ) : (
                    <DispatchOrderView />
                )}
            </View>

        </SafeAreaView>
    )
}

export default Invoice;

const styles = StyleSheet.create({});
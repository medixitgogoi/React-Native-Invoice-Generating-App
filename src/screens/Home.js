import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/FontAwesome6';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome5';
import { lightZomatoRed, zomatoRed } from '../utils/colors';

const Home = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f1f3f6", flexDirection: "column", }}>
            <StatusBar
                animated={true}
                backgroundColor="#fff"
                barStyle="dark-content"
            />
            {/* header */}
            <View style={{ flexDirection: "row", backgroundColor: "#fff", alignItems: "center", justifyContent: "space-between", elevation: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", }}>
                    <View style={{ paddingVertical: 8, flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10 }}>
                        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                            <Icon name="keyboard-arrow-left" size={27} color={zomatoRed} />
                        </TouchableOpacity>
                        <Text style={{ color: "#000", fontWeight: "600", fontSize: responsiveFontSize(2.5) }}>Home</Text>
                    </View>
                    <TouchableOpacity style={{ marginRight: 8 }} onPress={() => navigation.navigate("Profile")}>
                        <Image source={require("../assets/login.png")} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Content */}
            <View style={{ padding: 12, width: '100%', flexDirection: 'column', alignItems: 'center' }}>
                {/* PI My Invoice */}
                <TouchableOpacity style={{ width: '100%', backgroundColor: zomatoRed, borderRadius: 10, height: 100, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }} onPress={() => navigation.navigate("PIMyInvoice")}>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 15, width: '88%', paddingLeft: 20, gap: 3 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <View style={{ width: 20 }}>
                                <Icon2 name="file-invoice" color={'#fff'} size={16} />
                            </View>
                            <Text style={{ color: '#fff', fontWeight: '600', fontSize: responsiveFontSize(2.5), textTransform: 'uppercase' }}>PI My Invoice</Text>
                        </View>
                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.8), opacity: 0.9, paddingLeft: 20 }}>Effortlessly create and share your invoices</Text>
                    </View>
                    <View style={{ backgroundColor: '#fff', height: '100%', borderColor: zomatoRed, borderWidth: 1, borderTopRightRadius: 10, borderBottomRightRadius: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '12%' }}>
                        <Icon name="keyboard-arrow-right" size={27} color={zomatoRed} />
                    </View>
                </TouchableOpacity>

                {/* Sales */}
                <TouchableOpacity style={{ width: '100%', backgroundColor: zomatoRed, borderRadius: 10, height: 100, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }} onPress={() => navigation.navigate("Sales")}>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 15, width: '88%', paddingLeft: 20, gap: 3 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <View style={{ width: 20 }}>
                                <Icon2 name="chart-line" color={'#fff'} size={15} />
                            </View>
                            <Text style={{ color: '#fff', fontWeight: '600', fontSize: responsiveFontSize(2.5), textTransform: 'uppercase' }}>Salesman report</Text>
                        </View>
                        <Text style={{ color: lightZomatoRed, fontSize: responsiveFontSize(1.8), opacity: 0.9, paddingLeft: 20 }}>Track and analyze sales performance</Text>
                    </View>
                    <View style={{ backgroundColor: '#fff', height: '100%', borderColor: zomatoRed, borderWidth: 1, borderTopRightRadius: 10, borderBottomRightRadius: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '12%' }}>
                        <Icon name="keyboard-arrow-right" size={27} color={zomatoRed} />
                    </View>
                </TouchableOpacity>

                {/* Dispatch */}
                <TouchableOpacity style={{ width: '100%', backgroundColor: zomatoRed, borderRadius: 10, height: 100, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }} onPress={() => navigation.navigate("DispatchedOrders")}>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 15, width: '88%', paddingLeft: 20, gap: 3 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <View style={{ width: 20 }}>
                                <Icon2 name="truck-fast" color={'#fff'} size={14} />
                            </View>
                            <Text style={{ color: '#fff', fontWeight: '600', fontSize: responsiveFontSize(2.5), textTransform: 'uppercase' }}>dispatched orders</Text>
                        </View>
                        <Text style={{ color: lightZomatoRed, fontSize: responsiveFontSize(1.8), opacity: 0.9, paddingLeft: 20 }}>Monitor and manage outgoing shipments</Text>
                    </View>
                    <View style={{ backgroundColor: '#fff', height: '100%', borderColor: zomatoRed, borderWidth: 1, borderTopRightRadius: 10, borderBottomRightRadius: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '12%' }}>
                        <Icon name="keyboard-arrow-right" size={27} color={zomatoRed} />
                    </View>
                </TouchableOpacity>

                {/* Party */}
                <TouchableOpacity style={{ width: '100%', backgroundColor: zomatoRed, borderRadius: 10, height: 100, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }} onPress={() => navigation.navigate("PartyReport")}>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 15, width: '88%', paddingLeft: 20, gap: 3 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <View style={{ width: 20 }}>
                                <Icon3 name="chart-line" color={'#fff'} size={17} />
                            </View>
                            <Text style={{ color: '#fff', fontWeight: '600', fontSize: responsiveFontSize(2.5), textTransform: 'uppercase' }}>party report</Text>
                        </View>
                        <Text style={{ color: lightZomatoRed, fontSize: responsiveFontSize(1.8), opacity: 0.9, paddingLeft: 20 }}>Comprehensive reports on party transactions</Text>
                    </View>
                    <View style={{ backgroundColor: '#fff', height: '100%', borderColor: zomatoRed, borderWidth: 1, borderTopRightRadius: 10, borderBottomRightRadius: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '12%' }}>
                        <Icon name="keyboard-arrow-right" size={27} color={zomatoRed} />
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Home;

const styles = StyleSheet.create({});

{/*
    <TouchableOpacity style={{ width: '100%', backgroundColor: lightZomatoRed, height: 40, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, justifyContent: 'space-between', elevation: 2, borderRadius: 5, borderColor: zomatoRed, borderWidth: 1 }} onPress={() => navigation.navigate("PIMyInvoice")}>
                <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(2.2), fontWeight: '600' }}>PI My Invoice</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: zomatoRed, borderRadius: 100 }}>
                    <Icon name="keyboard-arrow-right" size={20} color={lightZomatoRed} />
                </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ width: '100%', backgroundColor: lightZomatoRed, height: 40, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, justifyContent: 'space-between', elevation: 2, borderRadius: 5, borderColor: zomatoRed, borderWidth: 1 }} onPress={() => navigation.navigate("Sales")}>
                    <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(2.2), fontWeight: '600' }}>Salesman Report</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: zomatoRed, borderRadius: 100 }}>
                        <Icon name="keyboard-arrow-right" size={20} color={lightZomatoRed} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ width: '100%', backgroundColor: lightZomatoRed, height: 40, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, justifyContent: 'space-between', elevation: 2, borderRadius: 5, borderColor: zomatoRed, borderWidth: 1 }} onPress={() => navigation.navigate("PartyReport")}>
                    <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(2.2), fontWeight: '600' }}>Party Report</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: zomatoRed, borderRadius: 100 }}>
                        <Icon name="keyboard-arrow-right" size={20} color={lightZomatoRed} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ width: '100%', backgroundColor: lightZomatoRed, height: 40, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, justifyContent: 'space-between', elevation: 2, borderRadius: 5, borderColor: zomatoRed, borderWidth: 1 }} onPress={() => navigation.navigate("PartyReport")}>
                    <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(2.2), fontWeight: '600' }}>Dispatch order</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: zomatoRed, borderRadius: 100 }}>
                        <Icon name="keyboard-arrow-right" size={20} color={lightZomatoRed} />
                    </View>
                </TouchableOpacity> 
*/}
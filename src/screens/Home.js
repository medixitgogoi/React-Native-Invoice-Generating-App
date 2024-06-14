import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { zomatoRed, lightZomatoRed } from '../utils/colors';
import { useSelector } from 'react-redux';

const Home = () => {

    const navigation = useNavigation();

    const billDetails = useSelector(state => state.bill);

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
            <View style={{ padding: 10, width: '100%', flexDirection: 'column', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>

                <TouchableOpacity style={{ width: '100%', backgroundColor: lightZomatoRed, height: 40, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, justifyContent: 'space-between', elevation: 2, borderRadius: 5, borderColor: zomatoRed, borderWidth: 1 }} onPress={() => navigation.navigate("PIMyInvoice")}>
                    <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(2.2), fontWeight: '600' }}>PI My Invoice</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: zomatoRed, borderRadius: 100 }}>
                        <Icon name="keyboard-arrow-right" size={20} color={lightZomatoRed} />
                    </View>
                </TouchableOpacity>

                {/* <TouchableOpacity style={{ width: '48%', backgroundColor: zomatoRed, height: 50, flexDirection: 'row', alignItems: 'center', padding: 8, justifyContent: 'space-between', elevation: 2, borderRadius: 5 }} onPress={() => navigation.navigate("DispatchOrder")}>
                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.2), fontWeight: '600' }}>Dispatch Order</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: lightZomatoRed, borderRadius: 100 }}>
                        <Icon name="keyboard-arrow-right" size={20} color={zomatoRed} />
                    </View>
                </TouchableOpacity> */}

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

            </View>

        </SafeAreaView>
    )
}

export default Home;

const styles = StyleSheet.create({})
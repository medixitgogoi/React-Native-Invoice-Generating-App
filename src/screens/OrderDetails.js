import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { zomatoRed } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

const OrderDetails = (route) => {

    const navigation = useNavigation();
    const details = route?.route?.params?.data;

    console.log("details", details);

    return (
        <SafeAreaView style={{ flex: 1 }}>
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
                        <Text style={{ color: "#000", fontWeight: "600", fontSize: responsiveFontSize(2.5) }}>View Order Details</Text>
                    </View>
                </View>
            </View>

            <View>

            </View>

        </SafeAreaView>
    )
}

export default OrderDetails;

const styles = StyleSheet.create({})
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { lightZomatoRed, zomatoRed } from '../utils/colors';

const Invoice = ({ route }) => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", flexDirection: "column", }}>
            <StatusBar
                animated={true}
                backgroundColor={'#fff'}
                barStyle="dark-content"
            />

            {/* header */}
            <View style={{ flexDirection: "row", backgroundColor: "#fff", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", }}>
                    <View style={{ paddingVertical: 8, flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10 }}>

                        <TouchableOpacity style={{ backgroundColor: zomatoRed, borderRadius: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 27, height: 27 }} onPress={() => navigation.goBack()}>
                            <Icon name="keyboard-arrow-left" size={24} color={lightZomatoRed} />
                        </TouchableOpacity>

                        <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            <View style={{ backgroundColor: lightZomatoRed, padding: 8, borderTopLeftRadius: 7, borderBottomLeftRadius: 7, borderColor: zomatoRed, borderWidth: 1, borderRightWidth: 0.5 }}>
                                <Text style={{ color: zomatoRed }}>View Invoice</Text>
                            </View>
                            <View style={{ backgroundColor: lightZomatoRed, padding: 8, borderColor: zomatoRed, borderWidth: 1, borderTopRightRadius: 7, borderBottomRightRadius: 7, borderLeftWidth: 0.5 }}>
                                <Text style={{ color: zomatoRed }}>View Dispatch Order</Text>
                            </View>
                        </View>

                    </View>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default Invoice

const styles = StyleSheet.create({})
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native'
import { zomatoRed } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

const EditOrder = (route) => {

    console.log('route', route.route.params.data);

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f1f3f6", flexDirection: "column", paddingBottom: 8, }}>
            <StatusBar
                animated={true}
                backgroundColor={'#fff'}
                barStyle="dark-content"
            />

            {/* header */}
            <View style={{ flexDirection: "row", backgroundColor: "#fff", alignItems: "center", justifyContent: "space-between", elevation: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", }}>
                    <View style={{ paddingVertical: 8, flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10 }}>
                        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                            <Icon name="keyboard-arrow-left" size={27} color={zomatoRed} />
                        </TouchableOpacity>
                        <Text style={{ color: "#000", fontWeight: "600", fontSize: responsiveFontSize(2.5) }}>Edit Order</Text>
                    </View>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default EditOrder

const styles = StyleSheet.create({})

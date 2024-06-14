import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { zomatoRed } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const OrderDetails = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1 }}>

            {/* header */}
            <View style={{ flexDirection: "row", backgroundColor: "#fff", alignItems: "center", justifyContent: "space-between", elevation: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", }}>
                    <View style={{ paddingVertical: 8, flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10, }}>
                        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                            <Icon name="keyboard-arrow-left" size={27} color={zomatoRed} />
                        </TouchableOpacity>
                        <Text style={{ color: "#000", fontWeight: "600", fontSize: responsiveFontSize(2.5) }}>My Sales</Text>
                    </View>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default OrderDetails

const styles = StyleSheet.create({})

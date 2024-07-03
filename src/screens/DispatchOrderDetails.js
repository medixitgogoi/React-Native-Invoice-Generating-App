import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { modalBackColor, zomatoRed } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const DispatchOrderDetails = (route) => {

    const navigation = useNavigation();

    const details = route;
    console.log('details', details);

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
                    <TouchableOpacity style={{ paddingHorizontal: 5, backgroundColor: modalBackColor, paddingVertical: 5, borderRadius: 50, elevation: 1, marginRight: 15 }} onPress={generateInvoice}>
                        <Icon3 name="share-social" size={20} color={zomatoRed} />
                    </TouchableOpacity>
                </View>
            </View>


            
        </SafeAreaView>
    )
}

export default DispatchOrderDetails

const styles = StyleSheet.create({})

import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { zomatoRed } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

const Sales = () => {

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

            <ScrollView style={{ flex: 1 }}>
                <View style={{ paddingHorizontal: 8, paddingVertical: 12 }}>

                    {/* Flatlist Card */}
                    <View style={{ width: '100%', borderRadius: 6, flexDirection: 'column', borderColor: '#6f8990', borderWidth: 0.5, overflow: 'hidden', backgroundColor: '#fff' }}>

                        {/* Top */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#edf5fa', padding: 12, borderBottomColor: '#6f8990', borderBottomWidth: 0.5, }}>
                            <View style={{ flexDirection: 'column', }}>
                                <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Ridges</Text>
                                <Text style={{ color: '#6f8990', fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>Ganeshguri, Guwahati</Text>
                            </View>
                            <View>
                                <View style={{ backgroundColor: '#dde2e5', padding: 5, borderRadius: 5, elevation: 1, }}>
                                    <Text style={{ color: '#6f8990', fontWeight: '500', fontSize: responsiveFontSize(1.7) }}>Delivered</Text>
                                </View>
                            </View>
                        </View>

                        {/* Bottom */}
                        <View style={{ padding: 12 }}>

                            {/* Products */}
                            <View style={{ flexDirection: 'column', gap: 5, borderBottomColor: '#6f8990', borderBottomWidth: 0.5, borderStyle: 'dashed', paddingBottom: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                    <Text style={{ color: '#6f8990', fontWeight: '600' }}>1 x</Text>
                                    <Text style={{ color: '#000', fontWeight: '500' }}>Ridges</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                    <Text style={{ color: '#6f8990', fontWeight: '600' }}>1 x</Text>
                                    <Text style={{ color: '#000', fontWeight: '500' }}>Profile Sheet</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                    <Text style={{ color: '#6f8990', fontWeight: '600' }}>1 x</Text>
                                    <Text style={{ color: '#000', fontWeight: '500' }}>Tiles Profile Sheet</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, borderBottomColor: '#9fb0b5', borderBottomWidth: 0.5, }}>
                                <Text style={{ color: '#6f8990', fontSize: responsiveFontSize(1.7), fontWeight: '500' }}>03 June 2024 at 12:40PM</Text>
                                <Text style={{ color: '#000', fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>₹78,000</Text>
                            </View>

                            <View>

                            </View>

                        </View>

                    </View>

                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default Sales

const styles = StyleSheet.create({})
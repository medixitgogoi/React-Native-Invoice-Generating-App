import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/Octicons';
import Icon4 from 'react-native-vector-icons/dist/Octicons';
import { zomatoRed } from '../utils/colors';
import names from '../data/names';
import { useState } from 'react';
import { addUser } from '../redux/UserSlice';
import { useDispatch } from 'react-redux';
import { emptyBill } from '../redux/BillDetailsSlice';

const PIMyInvoice = () => {

    const navigation = useNavigation();

    const dispatch = useDispatch();

    const [search, setSearch] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const pressHandler = (item) => {

        dispatch(addUser({
            name: item.name,
            site: item.site,
            pan: item.pan,
            contact: item.contact,
            gstin: item.gstin,
        }))

        dispatch(emptyBill());

        navigation.navigate("BillDetails");
    }

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
                        <Text style={{ color: "#000", fontWeight: "600", fontSize: responsiveFontSize(2.5) }}>PI my invoice</Text>
                    </View>
                    <TouchableOpacity style={{ marginRight: 8 }} onPress={() => navigation.navigate("Profile")}>
                        <Image source={require("../assets/login.png")} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Searchbar */}
            <View View style={{ backgroundColor: "#f1f3f6", width: "100%", paddingHorizontal: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: "#fff", borderRadius: 12, paddingHorizontal: 8, marginTop: 15, elevation: 3, width: "98%", alignSelf: "center", borderColor: isSearchFocused ? zomatoRed : "", borderWidth: isSearchFocused ? 1 : 0, }}>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', }}>
                        <View style={{ borderRadius: 10, alignItems: "center", justifyContent: "center", padding: 5, marginRight: 3, }}>
                            <Icon2 name="search" size={20} color={zomatoRed} style={{}} />
                        </View>
                        <TextInput
                            placeholder="Customer names"
                            placeholderTextColor="#a1a1a1"
                            onChangeText={setSearch}
                            value={search}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            style={{ flex: 1, fontSize: responsiveFontSize(2.2), color: "#000", paddingVertical: 8, fontWeight: "500", }}
                        />

                    </View>
                </View>
            </View>

            {/* Add customer button */}
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity style={{ backgroundColor: zomatoRed, width: '60%', paddingVertical: 10, borderRadius: 10, marginHorizontal: 2, elevation: 3, marginTop: 15, marginBottom: 20, justifyContent: 'center', flexDirection: 'row', alignItems: "center", gap: 6 }} onPress={() => navigation.navigate("Details")}>
                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.3), fontWeight: '500', textAlign: 'center' }}>Add a new customer</Text>
                    <Icon4 name="person-add" size={18} style={{ width: 20, height: 20, color: '#fff' }} />
                </TouchableOpacity>
            </View>

            {/* Customer names */}
            <ScrollView>
                <View style={{ marginBottom: 20, marginTop: 10, paddingHorizontal: 5 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                        <Text style={{ color: '#c9c9c9' }}>__________</Text>
                        <Text style={{ color: '#888888', fontSize: responsiveFontSize(1.7), fontWeight: '500', textTransform: 'uppercase' }}>All previously bought customers</Text>
                        <Text style={{ color: '#c9c9c9' }}>__________</Text>
                    </View>
                    <View style={{ paddingHorizontal: 3, flexDirection: 'column', gap: 10 }}>
                        {names.map(item => (
                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: "#fceced", paddingVertical: 8, borderColor: zomatoRed, borderWidth: 0.7, paddingHorizontal: 10, borderRadius: 8, elevation: 2 }} onPress={() => pressHandler(item)} key={item.id}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                                    <Text style={{ color: zomatoRed, fontWeight: '600', fontSize: responsiveFontSize(2.2) }}>{item.name}</Text>
                                    <Text style={{ color: "#000" }}>•</Text>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(1.8) }}>{item.site}</Text>
                                </View>
                                <View>
                                    <Icon name="keyboard-arrow-right" size={20} color={"#000"} />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default PIMyInvoice;

const styles = StyleSheet.create({})
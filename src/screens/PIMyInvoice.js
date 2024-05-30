import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView, FlatList } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/Octicons';
import Icon4 from 'react-native-vector-icons/dist/Octicons';
import { zomatoRed } from '../utils/colors';
import names from '../data/names';
import { useEffect, useState } from 'react';
import { addUser, logoutUser } from '../redux/UserSlice';
import { useDispatch } from 'react-redux';
import { emptyBill } from '../redux/BillDetailsSlice';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const PIMyInvoice = () => {

    const navigation = useNavigation();

    const dispatch = useDispatch();

    const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

    const [search, setSearch] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [filteredNames, setFilteredNames] = useState(names);
    const [loading, setLoading] = useState(false);

    const pressHandler = (item) => {
        navigation.navigate("Details");

        dispatch(logoutUser());

        dispatch(addUser({
            name: item.name,
            site: item.site,
            pan: item.pan,
            contact: item.contact,
            gstin: item.gstin,
        }))

        dispatch(emptyBill());

    };

    const addCustomerHandler = () => {
        navigation.navigate("Details");
        dispatch(logoutUser());
    }

    const searchHandler = (text) => {
        setSearch(text);

        const filteredData = names?.filter(word => word.name.toLowerCase().includes(text.toLowerCase()));

        setFilteredNames(filteredData);
    };

    const getHighlightedText = (text, highlight) => {
        // Split the text by the highlight term and include the term itself in the resulting array
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <Text>
                {parts.map((part, index) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <Text key={index} style={{ backgroundColor: 'yellow' }}>{part}</Text>
                    ) : (
                        <Text key={index}>{part}</Text>
                    )
                )}
            </Text>
        );
    };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500)
    }, []);

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

            {/* Add customer button */}
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity style={{ backgroundColor: zomatoRed, width: '60%', paddingVertical: 10, borderRadius: 10, marginHorizontal: 2, elevation: 5, marginTop: 15, marginBottom: 10, justifyContent: 'center', flexDirection: 'row', alignItems: "center", gap: 6 }} onPress={addCustomerHandler}>
                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.3), fontWeight: '500', textAlign: 'center' }}>Add a new customer</Text>
                    <Icon4 name="person-add" size={18} style={{ width: 20, height: 20, color: '#fff' }} />
                </TouchableOpacity>
            </View>

            {/* Searchbar */}
            <View View style={{ backgroundColor: "#f1f3f6", width: "100%", paddingHorizontal: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: "#fff", borderRadius: 12, paddingHorizontal: 8, marginTop: 15, elevation: 3, width: "98%", alignSelf: "center", borderColor: isSearchFocused ? zomatoRed : "", borderWidth: isSearchFocused ? 0.7 : 0, }}>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', }}>
                        <View style={{ borderRadius: 10, alignItems: "center", justifyContent: "center", padding: 5, marginRight: 3, }}>
                            <Icon2 name="search" size={18} color={zomatoRed} />
                        </View>
                        <TextInput
                            placeholder="Search for a customer name"
                            placeholderTextColor="#a1a1a1"
                            onChangeText={searchHandler}
                            value={search}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            style={{ flex: 1, fontSize: responsiveFontSize(2.1), color: "#000", paddingVertical: 5, fontWeight: "500", }}
                        />

                    </View>
                </View>
            </View>

            {/* Customer names */}
            <ScrollView>
                <View style={{ marginBottom: 20, marginTop: 10, paddingHorizontal: 5 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10, marginTop: 8, }}>
                        <Text style={{ color: '#c9c9c9' }}>_____________</Text>
                        <Text style={{ color: '#888888', fontSize: responsiveFontSize(1.5), fontWeight: '500', textTransform: 'uppercase' }}>All previously bought customers</Text>
                        <Text style={{ color: '#c9c9c9' }}>_____________</Text>
                    </View>
                    <View style={{ paddingHorizontal: 3, flexDirection: 'column', gap: 10 }}>

                        {loading && (
                            <FlatList
                                data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1]}
                                renderItem={() => (
                                    <ShimmerPlaceHolder style={{ width: '100%', height: 39, backgroundColor: '#a0a9a9', marginTop: 2, opacity: 0.5, marginBottom: 8, borderRadius: 7, }}>
                                    </ShimmerPlaceHolder>
                                )}
                            />
                        )}

                        {!loading && (
                            filteredNames?.map(item => (
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: "#fceced", paddingVertical: 8, borderColor: zomatoRed, borderWidth: 0.7, paddingHorizontal: 10, borderRadius: 8, elevation: 2 }} onPress={() => pressHandler(item)} key={item.id}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                                        <Text style={{ color: zomatoRed, fontWeight: '600', fontSize: responsiveFontSize(2.2) }}>{getHighlightedText(item.name, search)}</Text>
                                        <Text style={{ color: "#000" }}>•</Text>
                                        <Text style={{ color: '#000', fontSize: responsiveFontSize(1.8) }}>{item.site}</Text>
                                    </View>
                                    <View>
                                        <Icon name="keyboard-arrow-right" size={20} color={zomatoRed} />
                                    </View>
                                </TouchableOpacity>
                            ))
                        )}

                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default PIMyInvoice;

const styles = StyleSheet.create({});
import { StyleSheet, Text, View, StatusBar, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { lightZomatoRed, modalBackColor, zomatoRed } from '../utils/colors';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome6';
import Icon4 from 'react-native-vector-icons/dist/Feather';
import Icon5 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Modal from "react-native-modal";
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import { addUser } from '../redux/UserSlice';
import { emptyBill } from '../redux/BillDetailsSlice';

const CustomerDetails = () => {

    const navigation = useNavigation();

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.user);

    const [customerModal, setCustomerModal] = useState(false);

    const [error, setError] = useState(false);

    const [partyName, setPartyName] = useState('');
    const [isPartyNameFocused, setIsPartyNameFocused] = useState(false);

    const [siteName, setSiteName] = useState('');
    const [isSiteNameFocused, setIsSiteNameFocused] = useState(false);

    const [panNo, setPanNo] = useState('');
    const [isPanNoFocused, setIsPanNoFocused] = useState(false);

    const [contact, setContact] = useState('');
    const [isContactFocused, setIsContactFocused] = useState(false);

    const [gstin, setGstin] = useState('');
    const [isGstinFocused, setIsGstinFocused] = useState(false);

    const [photo, setPhoto] = useState('');

    const saveHandler = () => {
        if (partyName === '' || siteName === '' || panNo === '' || contact === '' || gstin === '') {
            setCustomerModal(true);
            setError(true)
        } else {
            dispatch(addUser({
                name: partyName,
                site: siteName,
                pan: panNo,
                contact: contact,
                gstin: gstin,
            }))
            setCustomerModal(false)
            setError(false)
        }
    }

    const imageHandler = () => {
        const options = {
            mediaType: 'photo',
        };
        launchImageLibrary(options, response => {
            if (response.assets) {
                setPhoto(response?.assets[0]);
            }
        });
    };

    const editDetailsHandler = () => {
        setCustomerModal(true)
        dispatch(emptyBill());
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f1f3f6", flexDirection: "column", }}>
            <StatusBar
                animated={true}
                backgroundColor={customerModal ? "#818181" : '#fff'}
                barStyle="dark-content"
            />

            {/* header */}
            <View style={{ flexDirection: "row", backgroundColor: "#fff", alignItems: "center", justifyContent: "space-between", elevation: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", }}>
                    <View style={{ paddingVertical: 8, flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10 }}>
                        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                            <Icon name="keyboard-arrow-left" size={27} color={zomatoRed} />
                        </TouchableOpacity>
                        <Text style={{ color: "#000", fontWeight: "600", fontSize: responsiveFontSize(2.5) }}>Add Details</Text>
                    </View>
                </View>
            </View>

            <ScrollView>

                {/* Customer card */}
                {userDetails.length === 0 ? (
                    <View style={{ paddingHorizontal: 10, height: "100%", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingBottom: 100 }}>
                        <View style={{ justifyContent: "center", width: "100%", flexDirection: "row", alignItems: "center" }}>
                            <Image
                                source={require("../assets/noUser.png")}
                                style={{
                                    width: 200,
                                    height: 200,
                                    resizeMode: 'contain',
                                }}
                            />
                        </View>
                        <View style={{ flexDirection: 'column', gap: 3 }}>
                            <Text style={{ color: "#000", textAlign: "center", fontWeight: "600", fontSize: responsiveFontSize(2.8), }}>You have not added any customers yet!</Text>
                            <Text style={{ color: '#a3a3a3', textAlign: "center", fontSize: responsiveFontSize(1.9), fontWeight: "400", }}>Add customers and generate the invoice according to your business logic </Text>
                            <TouchableOpacity style={{ backgroundColor: zomatoRed, height: 45, borderRadius: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30 }} onPress={() => setCustomerModal(true)}>
                                <Text style={{ color: '#fff', fontWeight: '600', fontSize: responsiveFontSize(2.2), textTransform: 'uppercase' }}>Add customer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={{ marginVertical: 18, marginHorizontal: 10, }}>

                        {/* Headline */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, marginBottom: 12 }}>
                            <Text style={{ color: '#cbd2dd' }}>_____ </Text>
                            <Text style={{ color: '#585858', fontSize: responsiveFontSize(2.1), fontWeight: '600', textTransform: 'uppercase' }}>Here is your added customer details</Text>
                            <Text style={{ color: '#cbd2dd' }}>_____ </Text>
                        </View>

                        {/* Details Card */}
                        <View style={{ backgroundColor: zomatoRed, borderRadius: 13, overflow: 'hidden', padding: 10, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                            {/* Image and Name */}
                            <View style={{ flexDirection: 'column', justifyContent: 'center', padding: 10, }}>
                                <View style={{ justifyContent: "center", flexDirection: "row", alignItems: "center", }}>
                                    {photo && photo ? (
                                        <Image
                                            source={{ uri: photo && photo.uri }}
                                            style={{
                                                width: 100,
                                                height: 100,
                                                resizeMode: 'cover',
                                                borderRadius: 100,
                                                backgroundColor: lightZomatoRed
                                            }}
                                        />
                                    ) : (
                                        <Image
                                            source={require("../assets/user3.png")}
                                            style={{
                                                width: 100,
                                                height: 100,
                                                borderRadius: 100,
                                                backgroundColor: lightZomatoRed,
                                            }}
                                        />
                                    )}

                                    <TouchableOpacity onPress={() => imageHandler()} style={{ position: "absolute", bottom: 5, left: 85 }}>
                                        <View style={{ borderColor: zomatoRed, borderWidth: 1, backgroundColor: '#fff', width: 23, height: 23, borderRadius: 100, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <Icon5 name="image-edit-outline" style={{}} size={15} color={zomatoRed} />
                                        </View>
                                    </TouchableOpacity>

                                </View>

                                <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '500', fontSize: responsiveFontSize(2.4), textTransform: 'uppercase', marginTop: 8 }}>{partyName}</Text>

                            </View>

                            {/* Details */}
                            <View style={{ width: '100%', borderRadius: 8, padding: 4, flexDirection: 'column', gap: 10, }}>

                                {/* Site name */}
                                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', backgroundColor: lightZomatoRed, padding: 6, borderRadius: 8 }}>
                                    <View style={{ width: 25, height: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 50, backgroundColor: zomatoRed, }}>
                                        <Icon2 name="location-sharp" size={15} style={{ color: lightZomatoRed }} />
                                    </View>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '400', width: '90%' }}>{siteName}</Text>
                                </View>

                                {/* PAN no */}
                                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', backgroundColor: lightZomatoRed, padding: 6, borderRadius: 8 }}>
                                    <View style={{ width: 25, height: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 50, backgroundColor: zomatoRed }}>
                                        <Icon2 name="card" size={14} style={{ color: lightZomatoRed }} />
                                    </View>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '400' }}>{panNo}</Text>
                                </View>

                                {/* Contact no */}
                                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', backgroundColor: lightZomatoRed, padding: 6, borderRadius: 8 }}>
                                    <View style={{ width: 25, height: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: zomatoRed, borderRadius: 50 }}>
                                        <Icon3 name="phone" size={12} style={{ color: lightZomatoRed }} />
                                    </View>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '400' }}>{contact}</Text>
                                </View>

                                {/* GSTIN no */}
                                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', backgroundColor: lightZomatoRed, padding: 6, borderRadius: 8 }}>
                                    <View style={{ width: 25, height: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: zomatoRed, borderRadius: 50 }}>
                                        <Icon3 name="barcode" size={13} style={{ color: lightZomatoRed }} />
                                    </View>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '400' }}>{gstin}</Text>
                                </View>

                            </View>

                        </View>

                        {/* Buttons */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 12, }}>

                            {/* Edit Button */}
                            <TouchableOpacity style={{ marginVertical: 8, backgroundColor: lightZomatoRed, paddingHorizontal: 8, paddingVertical: 10, width: '49%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 8, gap: 5, borderColor: zomatoRed, borderWidth: 0.6 }} onPress={() => editDetailsHandler()}>
                                <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(2), fontWeight: '600' }}>Edit details</Text>
                                <Icon4 name="edit" size={17} color={zomatoRed} />
                            </TouchableOpacity>

                            {/* Create Bill Button */}
                            <TouchableOpacity style={{ marginVertical: 8, backgroundColor: zomatoRed, paddingHorizontal: 8, paddingVertical: 10, width: '49%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 8, gap: 5, borderColor: zomatoRed, borderWidth: 0.6 }} onPress={() => navigation.navigate("BillDetails")}>
                                <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.2), fontWeight: '600' }}>Create Bill</Text>
                                <Icon2 name="newspaper" size={15} color={"#fff"} />
                            </TouchableOpacity>

                        </View>

                    </View>
                )}

            </ScrollView>

            {/* Customer Modal*/}
            <Modal
                isVisible={customerModal}
                onBackdropPress={() => setCustomerModal(false)}
                onSwipeComplete={() => setCustomerModal(false)}
                onRequestClose={() => setCustomerModal(false)}
                animationType="slide"
                swipeDirection={['down']}
                backdropOpacity={0.5}
                style={{ justifyContent: 'flex-end', margin: 0, }}
            >

                <View style={{ width: "100%", }}>

                    {/* Close Button */}
                    <TouchableOpacity style={{ alignSelf: 'center', backgroundColor: '#000', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 35, height: 35, borderRadius: 50, marginBottom: 10 }} onPress={() => setCustomerModal(false)}>
                        <Icon2 name="close" size={20} style={{ color: '#fff' }} />
                    </TouchableOpacity>

                    <View style={{ backgroundColor: modalBackColor, borderTopLeftRadius: 20, borderTopRightRadius: 20, }}>

                        {/* Main content */}
                        <ScrollView style={{ marginTop: 5, padding: 15, flexDirection: 'column', gap: 10 }}>

                            <Text style={{ textAlign: 'center', color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.6), marginBottom: 20 }}>Enter your customer details</Text>

                            <View style={{ flexDirection: 'column', gap: 8, padding: 2 }}>

                                {/* Party name */}
                                <View style={{ flexDirection: 'column', backgroundColor: '#fff', borderRadius: 15, paddingHorizontal: 15, paddingVertical: 10, gap: 4, elevation: 1 }}>
                                    <Text style={{ color: '#517c84', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Enter your PARTY name</Text>
                                    <View style={{ alignSelf: "center", width: "100%", paddingHorizontal: 14, backgroundColor: modalBackColor, elevation: 1, borderRadius: 8, borderColor: isPartyNameFocused ? zomatoRed : "", borderWidth: isPartyNameFocused ? 1 : 0, marginVertical: 2 }}>
                                        <TextInput
                                            style={{ paddingVertical: 5, fontSize: responsiveFontSize(2.1), fontWeight: "500", color: "#000", }}
                                            onChangeText={setPartyName}
                                            value={partyName}
                                            placeholderTextColor="#abb0ba"
                                            onFocus={() => setIsPartyNameFocused(true)}
                                            onBlur={() => setIsPartyNameFocused(false)}
                                        />
                                    </View>
                                </View>

                                {/* Site */}
                                <View style={{ flexDirection: 'column', backgroundColor: '#fff', borderRadius: 15, paddingHorizontal: 15, paddingVertical: 10, gap: 4, elevation: 1 }}>
                                    <Text style={{ color: '#517c84', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Enter the SITE name</Text>
                                    <View style={{ alignSelf: "center", width: "100%", paddingHorizontal: 14, backgroundColor: modalBackColor, elevation: 1, borderRadius: 8, borderColor: isSiteNameFocused ? zomatoRed : "", borderWidth: isSiteNameFocused ? 1 : 0, marginVertical: 2 }}>
                                        <TextInput
                                            style={{ paddingVertical: 5, fontSize: responsiveFontSize(2.1), fontWeight: "500", color: "#000", }}
                                            onChangeText={setSiteName}
                                            value={siteName}
                                            placeholderTextColor="#abb0ba"
                                            onFocus={() => setIsSiteNameFocused(true)}
                                            onBlur={() => setIsSiteNameFocused(false)}
                                        />
                                    </View>
                                </View>

                                {/* PAN */}
                                <View style={{ flexDirection: 'column', backgroundColor: '#fff', borderRadius: 15, paddingHorizontal: 15, paddingVertical: 10, gap: 4, elevation: 1 }}>
                                    <Text style={{ color: '#517c84', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Enter PAN card no.</Text>
                                    <View style={{ alignSelf: "center", width: "100%", paddingHorizontal: 14, backgroundColor: modalBackColor, elevation: 1, borderRadius: 8, borderColor: isPanNoFocused ? zomatoRed : "", borderWidth: isPanNoFocused ? 1 : 0, marginVertical: 2 }}>
                                        <TextInput
                                            style={{ paddingVertical: 5, fontSize: responsiveFontSize(2.1), fontWeight: "500", color: "#000", }}
                                            onChangeText={setPanNo}
                                            value={panNo}
                                            placeholderTextColor="#abb0ba"
                                            onFocus={() => setIsPanNoFocused(true)}
                                            onBlur={() => setIsPanNoFocused(false)}
                                        />
                                    </View>
                                </View>

                                {/* Contact */}
                                <View style={{ flexDirection: 'column', backgroundColor: '#fff', borderRadius: 15, paddingHorizontal: 15, paddingVertical: 10, gap: 4, elevation: 1 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                        <Text style={{ color: '#517c84', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Enter CONTACT no.</Text>
                                        <Text style={{ color: '#24882a', fontSize: responsiveFontSize(1.9), fontStyle: 'italic', }}>(Preferably whatsapp)</Text>
                                    </View>
                                    <View style={{ alignSelf: "center", width: "100%", paddingHorizontal: 14, backgroundColor: modalBackColor, elevation: 1, borderRadius: 8, borderColor: isContactFocused ? zomatoRed : "", borderWidth: isContactFocused ? 1 : 0, marginVertical: 2 }}>
                                        <TextInput
                                            style={{ paddingVertical: 5, fontSize: responsiveFontSize(2.1), fontWeight: "500", color: "#000", }}
                                            onChangeText={setContact}
                                            value={contact}
                                            placeholderTextColor="#abb0ba"
                                            keyboardType="numeric"
                                            onFocus={() => setIsContactFocused(true)}
                                            onBlur={() => setIsContactFocused(false)}
                                        />
                                    </View>
                                </View>

                                {/* GSTIN */}
                                <View style={{ flexDirection: 'column', backgroundColor: '#fff', borderRadius: 15, paddingHorizontal: 15, paddingVertical: 10, gap: 4, elevation: 1 }}>
                                    <Text style={{ color: '#517c84', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Enter GSTIN no.</Text>
                                    <View style={{ alignSelf: "center", width: "100%", paddingHorizontal: 14, backgroundColor: modalBackColor, elevation: 1, borderRadius: 8, borderColor: isGstinFocused ? zomatoRed : "", borderWidth: isGstinFocused ? 1 : 0, marginVertical: 2 }}>
                                        <TextInput
                                            style={{ paddingVertical: 5, fontSize: responsiveFontSize(2.1), fontWeight: "500", color: "#000", }}
                                            onChangeText={setGstin}
                                            value={gstin}
                                            placeholderTextColor="#abb0ba"
                                            onFocus={() => setIsGstinFocused(true)}
                                            onBlur={() => setIsGstinFocused(false)}
                                        />
                                    </View>
                                </View>

                                {error && (
                                    <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(1.6), textAlign: 'right' }}>* Please fill all the details. All the fields are necessary.</Text>
                                )}

                            </View>

                        </ScrollView>

                        {/* ButtonStyle */}
                        <View style={{ backgroundColor: '#fff', width: '100%', flexDirection: 'row', paddingVertical: 15, paddingHorizontal: 10, justifyContent: 'space-evenly', alignItems: "center", elevation: 1 }}>

                            {/* Cancel */}
                            <TouchableOpacity activeOpacity={0.7} onPress={() => setCustomerModal(false)} style={{ width: '47%', backgroundColor: lightZomatoRed, borderRadius: 8, borderColor: zomatoRed, borderWidth: 0.6, height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(2.2), fontWeight: "600" }}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                            {/* Save */}
                            <TouchableOpacity onPress={() => saveHandler()} activeOpacity={0.7} style={{ width: '47%', backgroundColor: zomatoRed, borderRadius: 8, marginLeft: 3, flexDirection: "row", alignItems: "center", justifyContent: "center", height: 40 }}>
                                <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.2), fontWeight: "600" }}>
                                    Save
                                </Text>
                            </TouchableOpacity>

                        </View>

                    </View>

                </View>

            </Modal>

        </SafeAreaView>
    )
}

export default CustomerDetails;

const styles = StyleSheet.create({
    dropdownButtonStyle: {
        backgroundColor: zomatoRed,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 3
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: responsiveFontSize(2),
        fontWeight: '500',
        color: '#fff',
    },
    dropdownButtonArrowStyle: {
        fontSize: responsiveFontSize(3.5),
        color: '#fff',
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: '#fff',
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: responsiveFontSize(2),
        fontWeight: '500',
        color: '#151E26',
        textAlign: 'center'
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
});

{/* Fixed charges */ }
{/* <View style={{ flexDirection: 'column', gap: 5, backgroundColor: modalBackColor, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, elevation: 1 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, justifyContent: 'space-between' }}>
                                    <Text style={{ color: '#585858', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Bend charges:</Text>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '600' }}>₹700.00</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, justifyContent: 'space-between' }}>
                                    <Text style={{ color: '#585858', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Loading charges:</Text>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '600' }}>₹98.00</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, justifyContent: 'space-between' }}>
                                    <Text style={{ color: '#585858', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Transportation charges:</Text>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '600' }}>₹300.00</Text>
                                </View>
                            </View> */}

{/* <View style={{ flexDirection: 'column', gap: 5, backgroundColor: lightZomatoRed, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, elevation: 1, borderColor: zomatoRed, borderWidth: 0.6 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, justifyContent: 'space-between' }}>
                                    <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Total amount</Text>
                                    <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(2.2), fontWeight: '600' }}>₹{amount}.00</Text>
                                </View>
                            </View> 
                        */}
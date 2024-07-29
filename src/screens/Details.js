import { StyleSheet, Text, View, StatusBar, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Image, ActivityIndicator } from 'react-native';
import { lightZomatoRed, modalBackColor, zomatoRed } from '../utils/colors';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome6';
import Icon4 from 'react-native-vector-icons/dist/Feather';
import Icon5 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon6 from 'react-native-vector-icons/dist/AntDesign';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import Modal from "react-native-modal";
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import { addUser, deleteUser } from '../redux/UserSlice';
import { emptyBill } from '../redux/BillDetailsSlice';
import axios from 'axios';

const Details = () => {

    const navigation = useNavigation();

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.user);

    const loginDetails = useSelector(state => state.login);

    const [customerModal, setCustomerModal] = useState(false);

    const [error, setError] = useState(false);
    const [errors, setErrors] = useState({});

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

    const [loading, setLoading] = useState(false);

    const [editDetails, setEditDetails] = useState(false);

    const [clientId, setClientId] = useState();

    useEffect(() => {
        setClientId(userDetails[0]?.id);
    }, [updateCustomerDetails])

    const postCustomerDetails = async () => {
        setLoading(true);
        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${loginDetails[0]?.accessToken}`;

            const formData = new FormData();

            formData.append('name', partyName);
            formData.append('site_name', siteName);
            formData.append('pan', panNo ? panNo : 'Not specified');
            formData.append('mobile', contact);
            formData.append('gst', gstin ? gstin : 'Not specified');

            // Make API call to post customer details
            const response = await axios.post('/employee/client/submit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const customerData = response?.data?.data;
            console.log("CustomerDetails", customerData);

            // Dispatch to Redux store
            dispatch(addUser({
                id: customerData.id,
                name: customerData.name,
                site: customerData.site_name,
                pan: customerData.pan,
                contact: customerData.mobile,
                gstin: customerData.gst,
            }));

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateCustomerDetails = async () => {
        // console.log('dixixixixixi', userDetails);
        // console.log("clientId", clientId);
        setLoading(true);
        dispatch(deleteUser());

        try {
            // Set Authorization header
            axios.defaults.headers.common['Authorization'] = `Bearer ${loginDetails[0]?.accessToken}`;

            const formData = new FormData();

            formData.append('client_id', clientId);
            formData.append('name', partyName);
            formData.append('site_name', siteName);
            formData.append('pan', panNo);
            formData.append('mobile', contact);
            formData.append('gst', gstin);

            // Make API call to update customer details
            const response = await axios.post('/employee/client/submit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Extract updated customer data from response
            const updatedCustomerData = response?.data?.data;
            console.log("updatedCustomerDetails", response);

            // console.log("formData", formData);

            // Dispatch actions to update Redux store
            dispatch(addUser({
                id: updatedCustomerData.id,
                name: updatedCustomerData.name,
                site: updatedCustomerData.site_name,
                pan: updatedCustomerData.pan,
                contact: updatedCustomerData.mobile,
                gstin: updatedCustomerData.gst,
            }));

        } catch (error) {
            // Log error
            console.error('Error updating data:', error);
            // Optional: Provide user feedback or additional error handling here
        } finally {
            // Reset loading state and close modals
            setLoading(false);
            setEditDetails(false);
            setCustomerModal(false);
        }
    };

    const editDetailsHandler = () => {

        setEditDetails(true);
        setCustomerModal(true);

        setPartyName(userDetails[0]?.name)
        setSiteName(userDetails[0]?.site);
        setPanNo(userDetails[0]?.pan);
        setContact(userDetails[0]?.contact);
        setGstin(userDetails[0]?.gstin);

        dispatch(emptyBill());
    }

    const saveHandler = async () => {

        if (partyName === '' || siteName === '') {
            setCustomerModal(true);
            setError(true);
        } else {
            setError(false);

            if (validate()) {
                dispatch(deleteUser());
                await postCustomerDetails();

                setCustomerModal(false);
                setError(false);

                console.log("Dixit", userDetails);
            }
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

    const removeUserHandler = () => {
        dispatch(deleteUser());
        // console.log("removeUser", userDetails);
        setPartyName('')
        setSiteName('');
        setPanNo('');
        setContact('');
        setGstin('');
    }

    const validate = () => {

        const newErrors = {};

        if (!contact) {
            newErrors.contact = '*Mobile number is required';
        } else if (!/^[0-9]{10}$/.test(contact)) {
            newErrors.contact = '*Mobile number must be exactly 10 digits';
        }

        // if (!/^[a-zA-Z0-9]{10}$/.test(panNo)) {
        //     newErrors.panNo = '*PAN number must be exactly 10 alphanumeric characters';
        // }
        // if (!panNo) {
        //     newErrors.panNo = '*PAN number is required';
        // } else if (!/^[a-zA-Z0-9]{10}$/.test(panNo)) {
        //     newErrors.panNo = '*PAN number must be exactly 10 alphanumeric characters';
        // }

        // if (!/^[a-zA-Z0-9]{15}$/.test(gstin)) {
        //     newErrors.gstin = '*GSTIN number must be exactly 15 digits';
        // }
        // if (!gstin) {
        //     newErrors.gstin = '*GSTIN number is required';
        // } else if (!/^[a-zA-Z0-9]{15}$/.test(gstin)) {
        //     newErrors.gstin = '*GSTIN number must be exactly 15 digits';
        // }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const cancelHandler = () => {
        setCustomerModal(false);
        setEditDetails(false);
    }

    const addCustomerHandler = () => {
        dispatch(deleteUser());
        setCustomerModal(true);
        // console.log("addCustomer", userDetails)
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
                        <Text style={{ color: "#000", fontWeight: "600", fontSize: responsiveFontSize(2.5) }}>Customer Details</Text>
                    </View>
                    <TouchableOpacity style={{ marginRight: 8 }} onPress={() => navigation.navigate("Profile")}>
                        <Image source={require("../assets/login.png")} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
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
                        <View style={{ flexDirection: 'column', gap: 5, }}>
                            <Text style={{ color: "#000", textAlign: "center", fontWeight: "600", fontSize: responsiveFontSize(2.8), }}>You have not added any customers yet!</Text>
                            <Text style={{ color: '#a3a3a3', textAlign: "center", fontSize: responsiveFontSize(1.9), fontWeight: "400", }}>Add customers and generate the invoice according to your business logic </Text>
                            <TouchableOpacity style={{ backgroundColor: zomatoRed, height: 45, borderRadius: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30 }} onPress={addCustomerHandler}>
                                <Text style={{ color: '#fff', fontWeight: '600', fontSize: responsiveFontSize(2.2), textTransform: 'uppercase', }}>Add customer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={{ marginVertical: 18, marginHorizontal: 10, }}>

                        {/* Headline */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, marginBottom: 12 }}>
                            <Text style={{ color: '#cbd2dd' }}>_________ </Text>
                            <Text style={{ color: '#585858', fontSize: responsiveFontSize(1.7), fontWeight: '600', textTransform: 'uppercase' }}>Here is your added customer details</Text>
                            <Text style={{ color: '#cbd2dd' }}>_________ </Text>
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

                                <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '500', fontSize: responsiveFontSize(2.4), textTransform: 'uppercase', marginTop: 8 }}>{userDetails[0]?.name}</Text>

                            </View>

                            {/* Details */}
                            <View style={{ width: '100%', borderRadius: 8, padding: 4, flexDirection: 'column', gap: 10, }}>

                                {/* Site name */}
                                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', backgroundColor: lightZomatoRed, padding: 6, borderRadius: 8 }}>
                                    <View style={{ width: 25, height: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 50, backgroundColor: zomatoRed, }}>
                                        <Icon2 name="location-sharp" size={15} style={{ color: lightZomatoRed }} />
                                    </View>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '500', width: '90%' }}>{userDetails[0]?.site}</Text>
                                </View>

                                {/* PAN no */}
                                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', backgroundColor: lightZomatoRed, padding: 6, borderRadius: 8 }}>
                                    <View style={{ width: 25, height: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 50, backgroundColor: zomatoRed }}>
                                        <Icon2 name="card" size={14} style={{ color: lightZomatoRed }} />
                                    </View>
                                    {userDetails[0]?.pan === 'Not specified' ? (
                                        <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(2), fontWeight: '400', fontStyle: 'italic' }}>{userDetails[0]?.pan}</Text>
                                    ) : (
                                        <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>{userDetails[0]?.pan}</Text>
                                    )}
                                </View>

                                {/* Contact no */}
                                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', backgroundColor: lightZomatoRed, padding: 6, borderRadius: 8 }}>
                                    <View style={{ width: 25, height: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: zomatoRed, borderRadius: 50 }}>
                                        <Icon3 name="phone" size={12} style={{ color: lightZomatoRed }} />
                                    </View>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>{userDetails[0]?.contact}</Text>
                                </View>

                                {/* GSTIN no */}
                                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', backgroundColor: lightZomatoRed, padding: 6, borderRadius: 8 }}>
                                    <View style={{ width: 25, height: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: zomatoRed, borderRadius: 50 }}>
                                        <Icon3 name="barcode" size={13} style={{ color: lightZomatoRed }} />
                                    </View>
                                    {userDetails[0]?.gstin === 'Not specified' ? (
                                        <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(2), fontWeight: '400', fontStyle: 'italic' }}>{userDetails[0]?.gstin}</Text>
                                    ) : (
                                        <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>{userDetails[0]?.gstin}</Text>
                                    )}
                                </View>

                            </View>

                        </View>

                        {/* Buttons */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 12, }}>

                            {/* Edit Button */}
                            <TouchableOpacity style={{ marginVertical: 8, backgroundColor: lightZomatoRed, paddingHorizontal: 8, paddingVertical: 10, width: '49%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 8, gap: 5, borderColor: zomatoRed, borderWidth: 0.6 }} onPress={() => editDetailsHandler()}>
                                <View style={{ backgroundColor: zomatoRed, height: 22, width: 22, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
                                    <Icon4 name="edit" size={14} color={lightZomatoRed} />
                                </View>
                                <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(2), fontWeight: '600' }}>Edit details</Text>
                            </TouchableOpacity>

                            {/* Create Bill Button */}
                            <TouchableOpacity style={{ marginVertical: 8, backgroundColor: zomatoRed, paddingHorizontal: 8, paddingVertical: 10, width: '49%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 8, gap: 5, borderColor: zomatoRed, borderWidth: 0.6 }} onPress={() => navigation.navigate("FillUpDetails")}>
                                <View style={{ backgroundColor: lightZomatoRed, height: 22, width: 22, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
                                    <Icon2 name="newspaper" size={15} color={zomatoRed} />
                                </View>
                                <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.2), fontWeight: '600' }}>Create Bill</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                )}

            </ScrollView>

            {/* Remove user button */}
            {userDetails.length !== 0 && (
                <View style={{ position: 'absolute', bottom: 0, alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, backgroundColor: '#fff', width: '100%', paddingVertical: 10, elevation: 2 }}>
                    <TouchableOpacity style={{ backgroundColor: lightZomatoRed, paddingVertical: 10, borderRadius: 8, width: '95%', borderColor: zomatoRed, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4 }} onPress={() => removeUserHandler()}>
                        <View style={{ backgroundColor: zomatoRed, height: 22, width: 22, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
                            <Icon6 name="deleteuser" size={14} color='#fff' />
                        </View>
                        <Text style={{ color: zomatoRed, textAlign: 'center', fontSize: 15, fontWeight: '600', textTransform: 'uppercase' }}>Remove user</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Customer Modal*/}
            <Modal
                isVisible={customerModal}
                onBackdropPress={() => {
                    setCustomerModal(false);
                    if (editDetails) setEditDetails(false);
                }}
                onSwipeComplete={() => {
                    setCustomerModal(false);
                    if (editDetails) setEditDetails(false);
                }}
                onRequestClose={() => {
                    setCustomerModal(false);
                    if (editDetails) setEditDetails(false);
                }}
                animationType="slide"
                swipeDirection={['down']}
                backdropOpacity={0.5}
                style={{ justifyContent: 'flex-end', margin: 0, }}
            >

                <View style={{ width: "100%", }}>

                    {/* Close Button */}
                    <TouchableOpacity
                        style={{ alignSelf: 'center', backgroundColor: '#000', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 35, height: 35, borderRadius: 50, marginBottom: 10 }}
                        onPress={() => {
                            setCustomerModal(false);
                            if (editDetails) setEditDetails(false);
                        }}>

                        <Icon2 name="close" size={20} style={{ color: '#fff' }} />

                    </TouchableOpacity>

                    {/* Main content */}
                    <View style={{ backgroundColor: modalBackColor, borderTopLeftRadius: 20, borderTopRightRadius: 20, }}>

                        <ScrollView style={{ marginTop: 5, padding: 15, flexDirection: 'column', gap: 10 }}>

                            {/* Modal Header */}
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
                                            // maxLength={10}
                                            placeholderTextColor="#abb0ba"
                                            onFocus={() => setIsPanNoFocused(true)}
                                            onBlur={() => setIsPanNoFocused(false)}
                                        />
                                    </View>
                                </View>
                                {/* {errors.panNo && <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(1.6) }}>{errors.panNo}</Text>} */}

                                {/* Contact */}
                                <View style={{ flexDirection: 'column', backgroundColor: '#fff', borderRadius: 15, paddingHorizontal: 15, paddingVertical: 10, gap: 4, elevation: 1 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                        <Text style={{ color: '#517c84', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Enter CONTACT no.</Text>
                                        <Text style={{ color: '#24882a', fontSize: responsiveFontSize(1.8), fontStyle: 'italic', }}>(Preferably whatsapp)</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignSelf: "center", width: "100%", backgroundColor: modalBackColor, elevation: 1, borderRadius: 8, marginVertical: 2, overflow: 'hidden' }}>
                                        <View style={{ width: '15%', backgroundColor: lightZomatoRed, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: zomatoRed, borderRightWidth: !isContactFocused ? 1 : 0.3, borderWidth: 1, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}>
                                            <Text style={{ color: zomatoRed, fontWeight: '600', fontSize: responsiveFontSize(2.1) }}>+91</Text>
                                        </View>
                                        <View style={{ borderColor: isContactFocused ? zomatoRed : "", borderWidth: isContactFocused ? 1 : 0, width: '85%', borderTopRightRadius: 8, borderBottomRightRadius: 8, }}>
                                            <TextInput
                                                style={{ paddingVertical: 5, fontSize: responsiveFontSize(2.1), fontWeight: "500", color: "#000", paddingHorizontal: 8, }}
                                                onChangeText={setContact}
                                                value={contact}
                                                placeholderTextColor="#abb0ba"
                                                keyboardType="numeric"
                                                maxLength={10}
                                                onFocus={() => setIsContactFocused(true)}
                                                onBlur={() => setIsContactFocused(false)}
                                            />
                                        </View>
                                    </View>
                                </View>
                                {errors.contact && <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(1.6) }}>{errors.contact}</Text>}

                                {/* GSTIN */}
                                <View style={{ flexDirection: 'column', backgroundColor: '#fff', borderRadius: 15, paddingHorizontal: 15, paddingVertical: 10, gap: 4, elevation: 1 }}>
                                    <Text style={{ color: '#517c84', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Enter GSTIN no.</Text>
                                    <View style={{ alignSelf: "center", width: "100%", paddingHorizontal: 14, backgroundColor: modalBackColor, elevation: 1, borderRadius: 8, borderColor: isGstinFocused ? zomatoRed : "", borderWidth: isGstinFocused ? 1 : 0, marginVertical: 2 }}>
                                        <TextInput
                                            style={{ paddingVertical: 5, fontSize: responsiveFontSize(2.1), fontWeight: "500", color: "#000", }}
                                            onChangeText={setGstin}
                                            value={gstin}
                                            // maxLength={15}
                                            placeholderTextColor="#abb0ba"
                                            onFocus={() => setIsGstinFocused(true)}
                                            onBlur={() => setIsGstinFocused(false)}
                                        />
                                    </View>
                                </View>
                                {/* {errors.gstin && <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(1.6), }}>{errors.gstin}</Text>} */}

                                {error && (
                                    <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(1.6), textAlign: 'right' }}>* Please fill all the details. All the fields are necessary.</Text>
                                )}

                            </View>

                        </ScrollView>

                        {/* Buttons */}
                        <View style={{ backgroundColor: '#fff', width: '100%', flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 10, justifyContent: 'space-evenly', alignItems: "center", elevation: 1 }}>

                            {/* Cancel */}
                            <TouchableOpacity activeOpacity={0.7} onPress={cancelHandler} style={{ width: '47%', backgroundColor: lightZomatoRed, borderRadius: 8, borderColor: zomatoRed, borderWidth: 0.6, height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(2.2), fontWeight: "600" }}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                            {/* Save */}
                            <TouchableOpacity onPress={() => editDetails ? updateCustomerDetails() : saveHandler()} activeOpacity={0.7} style={{ width: '47%', backgroundColor: loading ? '#e1e1e1' : zomatoRed, borderRadius: 8, marginLeft: 3, flexDirection: "row", alignItems: "center", justifyContent: "center", height: 40, }}>
                                {loading ? (
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, }}>
                                        <ActivityIndicator size="small" color='#5a5a5a' />
                                        <Text style={{ color: '#5a5a5a' }}>Saving data ...</Text>
                                    </View>
                                ) : (
                                    <View>
                                        {editDetails ? (
                                            <Text Text style={{ color: '#fff', fontSize: responsiveFontSize(2.2), fontWeight: "600" }}>
                                                Update
                                            </Text>
                                        ) : (
                                            <Text Text style={{ color: '#fff', fontSize: responsiveFontSize(2.2), fontWeight: "600" }}>
                                                Save
                                            </Text>
                                        )}
                                    </View>
                                )}
                            </TouchableOpacity>

                        </View>

                    </View>

                </View>
            </Modal>

        </SafeAreaView>
    )
}

export default Details;

const styles = StyleSheet.create({
    text1: {
        fontSize: responsiveFontSize(2.6), // Change this to the desired font size
    },
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
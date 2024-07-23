import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, StatusBar, View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { lightZomatoRed, modalBackColor, zomatoRed } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon4 from 'react-native-vector-icons/dist/Feather';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome5';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Modal from "react-native-modal";

const EditOrder = ({ route }) => {

    const initialData = route?.params?.data;

    const [details, setDetails] = useState(initialData);
    const [editItem, setEditItem] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [editModal, setEditModal] = useState(false);
    const [isPiecesFocused, setIsPiecesFocused] = useState(false);
    const [rateModal, setRateModal] = useState(false);
    const [rateValue, setRateValue] = useState('');
    const [isRateFocused, setIsRateFocused] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const handleEdit = (item, it) => {
        setEditItem({ item, it });
        setEditValue(it.quantity.toString());
        setEditModal(true);
    };

    const handleRateEdit = (item) => {
        setEditItem(item);
        setRateValue(item.rate.toString());
        setRateModal(true);
    };

    const handlePiecesSave = () => {
        const updatedDetails = { ...details };
        updatedDetails.orderDetails = updatedDetails.orderDetails.map(orderItem => {
            if (orderItem.id === editItem.item.id) {
                orderItem.orderData = orderItem.orderData.map(orderDataItem => {
                    if (orderDataItem.id === editItem.it.id) {
                        orderDataItem.quantity = editValue;
                    }
                    return orderDataItem;
                });
            }
            return orderItem;
        });
        setDetails(updatedDetails);
        setEditModal(false);
        setEditValue('');
        console.log('updatedPiecesDetails', details);
    };

    const handleRateSave = () => {
        const updatedDetails = { ...details };
        updatedDetails.orderDetails = updatedDetails.orderDetails.map(orderItem => {
            if (orderItem.id === editItem.id) {
                orderItem.rate = rateValue;
            }
            return orderItem;
        });
        setDetails(updatedDetails);
        setRateModal(false);
        setRateValue('');
        console.log('updatedRateDetails', details);
    };

    useEffect(() => {
        console.log('route', initialData);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f1f3f6", flexDirection: "column", paddingBottom: 8 }}>
            <StatusBar
                animated={true}
                backgroundColor={editModal || rateModal ? "#818181" : '#fff'}
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ flexDirection: "row", backgroundColor: "#fff", alignItems: "center", justifyContent: "space-between", elevation: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%" }}>
                    <View style={{ paddingVertical: 8, flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="keyboard-arrow-left" size={27} color={zomatoRed} />
                        </TouchableOpacity>
                        <Text style={{ color: "#000", fontWeight: "600", fontSize: responsiveFontSize(2.5) }}>Edit Order</Text>
                    </View>
                </View>
            </View>

            {/* Content */}
            <ScrollView style={{ flex: 1 }}>
                <View style={{ padding: 10 }}>
                    {details.orderDetails.map(item => (
                        <View style={{ backgroundColor: '#fff', borderRadius: 15, width: '100%', paddingHorizontal: 11, flexDirection: 'column', gap: 8, paddingVertical: 12, elevation: 1, marginBottom: 8 }} key={item?.id}>

                            {/* Header */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: lightZomatoRed, padding: 5, borderRadius: 8, borderColor: zomatoRed, borderWidth: 0.6 }}>
                                <Text style={{ color: zomatoRed, fontWeight: '600', fontSize: responsiveFontSize(2.3), textTransform: 'uppercase', marginLeft: 5 }}>{item?.product_type}</Text>
                                <Text style={{ color: zomatoRed, fontWeight: '600', fontSize: responsiveFontSize(2.3), textTransform: 'uppercase', marginLeft: 5 }}>{item?.color}</Text>
                            </View>

                            {/* Rate */}
                            <View style={{ paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 2 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ color: '#000', fontWeight: 500, fontSize: responsiveFontSize(2.2) }}>Rate:</Text>
                                    <View style={{ backgroundColor: modalBackColor, borderRadius: 8, elevation: 2, width: 35, height: 25, marginLeft: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: '#000', fontWeight: 600, fontSize: responsiveFontSize(2) }}>{item?.rate}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={{ backgroundColor: zomatoRed, height: 28, width: 28, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}
                                    onPress={() => handleRateEdit(item)}
                                >
                                    <Icon4 name="edit" size={18} color={'#fff'} />
                                </TouchableOpacity>
                            </View>

                            {/* Section */}
                            <View style={{ flexDirection: 'column', gap: 8, backgroundColor: modalBackColor, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10, elevation: 1, justifyContent: 'space-between' }}>
                                {item.orderData.map(it => (
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }} key={it?.id}>

                                        {/* Length */}
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, width: '40%' }}>
                                            <Text style={{ color: '#585858', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Length:</Text>
                                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>{it?.length} {item.unit}</Text>
                                        </View>

                                        {/* Pieces */}
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, width: '45%', justifyContent: 'flex-end' }}>
                                            <Text style={{ color: '#585858', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Pieces:</Text>
                                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>{it?.quantity}</Text>
                                        </View>

                                        {/* Edit Option */}
                                        <TouchableOpacity style={{ backgroundColor: zomatoRed, height: 22, width: 22, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }} onPress={() => handleEdit(item, it)}>
                                            <Icon4 name="edit" size={14} color={'#fff'} />
                                        </TouchableOpacity>

                                    </View>
                                ))}
                            </View>

                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Edit Pieces Modal */}
            <Modal
                isVisible={editModal}
                onBackdropPress={() => setEditModal(false)}
                onSwipeComplete={() => setEditModal(false)}
                onRequestClose={() => setEditModal(false)}
                animationType="slide"
                swipeDirection={['down']}
                backdropOpacity={0.5}
                style={{ justifyContent: 'flex-end', margin: 0 }}
            >
                <View style={{ width: "100%", height: '100%', justifyContent: 'flex-end' }}>

                    {/* Close Button */}
                    <TouchableOpacity style={{ alignSelf: 'center', backgroundColor: '#000', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 35, height: 35, borderRadius: 50, marginBottom: 10 }} onPress={() => setEditModal(false)}>
                        <Icon2 name="close" size={20} style={{ color: '#fff' }} />
                    </TouchableOpacity>

                    <View style={{ backgroundColor: modalBackColor, borderTopLeftRadius: 15, borderTopRightRadius: 15, elevation: 1, paddingVertical: 8 }}>

                        {/* Headline */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, marginVertical: 8, marginBottom: 10 }}>
                            <Text style={{ textAlign: 'center', color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.6), }}>Edit Pieces</Text>
                        </View>

                        {/* Update Pieces */}
                        <View style={{ flexDirection: 'column', paddingHorizontal: 14 }}>
                            <TextInput
                                style={{ borderColor: isPiecesFocused ? zomatoRed : "", borderWidth: isPiecesFocused ? 1 : 0, height: 40, color: '#000', width: '100%', paddingHorizontal: 10, marginBottom: 15, backgroundColor: '#fff', borderRadius: 8, elevation: 1, fontWeight: '600' }}
                                keyboardType="numeric"
                                value={editValue}
                                onChangeText={setEditValue}
                                onFocus={() => setIsPiecesFocused(true)}
                                onBlur={() => setIsPiecesFocused(false)}
                            />
                        </View>

                        {/* Buttons */}
                        <View style={{ backgroundColor: '#fff', width: '100%', flexDirection: 'row', paddingVertical: 5, justifyContent: 'space-evenly', alignItems: "center", elevation: 1 }}>
                            {/* Cancel */}
                            <TouchableOpacity activeOpacity={0.7} onPress={() => setEditModal(false)} style={{ width: '47%', backgroundColor: lightZomatoRed, borderRadius: 8, gap: 3, borderColor: zomatoRed, borderWidth: 0.6, height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(2.2), fontWeight: "600" }}>Cancel</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 19, height: 19, alignItems: 'center', backgroundColor: zomatoRed, borderRadius: 5, borderColor: zomatoRed, borderWidth: 1 }}>
                                    <Icon2 name="close" size={15} style={{ color: lightZomatoRed }} />
                                </View>
                            </TouchableOpacity>
                            {/* Save */}
                            <TouchableOpacity onPress={handlePiecesSave} style={{ backgroundColor: zomatoRed, padding: 10, borderRadius: 8, justifyContent: 'center', flexDirection: 'row', width: '47%', alignSelf: 'center', elevation: 4, borderLeftColor: zomatoRed, borderLeftWidth: 0.6, gap: 4, alignItems: 'center' }}>
                                <Text style={{ color: '#fff', fontWeight: '500', fontSize: responsiveFontSize(2.2) }}>Save</Text>
                                <View style={{ backgroundColor: lightZomatoRed, width: 19, height: 19, borderRadius: 4, alignItems: 'center', justifyContent: 'center', borderColor: zomatoRed, borderEndWidth: 0.6 }}>
                                    <Icon3 name="save" size={15} color={zomatoRed} />
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>

            {/* Edit Rate Modal */}
            <Modal
                isVisible={rateModal}
                onBackdropPress={() => {
                    setIsRateFocused(false);
                    setRateModal(false);
                }}
                onSwipeComplete={() => {
                    setIsRateFocused(false);
                    setRateModal(false);
                }}
                onRequestClose={() => {
                    setIsRateFocused(false);
                    setRateModal(false);
                }}
                animationType="slide"
                swipeDirection={['down']}
                backdropOpacity={0.5}
                style={{ justifyContent: 'flex-end', margin: 0 }}
            >
                <View style={{ width: "100%", height: '100%', justifyContent: 'flex-end' }}>

                    {/* Close Button */}
                    <TouchableOpacity
                        style={{ alignSelf: 'center', backgroundColor: '#000', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 35, height: 35, borderRadius: 50, marginBottom: 10 }}
                        onPress={() => {
                            setIsRateFocused(false);
                            setRateModal(false);
                        }}
                    >
                        <Icon2 name="close" size={20} style={{ color: '#fff' }} />
                    </TouchableOpacity>

                    <View style={{ backgroundColor: modalBackColor, borderTopLeftRadius: 15, borderTopRightRadius: 15, elevation: 1, paddingVertical: 8 }}>

                        {/* Headline */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, marginVertical: 8, marginBottom: 10 }}>
                            <Text style={{ textAlign: 'center', color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.6), }}>Edit Rate</Text>
                        </View>

                        {/* Update Rate */}
                        <View style={{ flexDirection: 'column', paddingHorizontal: 14 }}>
                            <TextInput
                                style={{ borderColor: isRateFocused ? zomatoRed : "", borderWidth: isRateFocused ? 1 : 0, height: 40, color: '#000', width: '100%', paddingHorizontal: 10, marginBottom: 15, backgroundColor: '#fff', borderRadius: 8, elevation: 1, fontWeight: '600' }}
                                keyboardType="numeric"
                                value={rateValue}
                                onChangeText={setRateValue}
                                onFocus={() => setIsRateFocused(true)}
                                onBlur={() => setIsRateFocused(false)}
                            />
                        </View>

                        {/* Buttons */}
                        <View style={{ backgroundColor: '#fff', width: '100%', flexDirection: 'row', paddingVertical: 5, justifyContent: 'space-evenly', alignItems: "center", elevation: 1 }}>

                            {/* Cancel */}
                            <TouchableOpacity activeOpacity={0.7} onPress={() => setRateModal(false)} style={{ width: '47%', backgroundColor: lightZomatoRed, borderRadius: 8, gap: 3, borderColor: zomatoRed, borderWidth: 0.6, height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(2.2), fontWeight: "600" }}>Cancel</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 19, height: 19, alignItems: 'center', backgroundColor: zomatoRed, borderRadius: 5, borderColor: zomatoRed, borderWidth: 1 }}>
                                    <Icon2 name="close" size={15} style={{ color: lightZomatoRed }} />
                                </View>
                            </TouchableOpacity>

                            {/* Save */}
                            <TouchableOpacity onPress={handleRateSave} style={{ backgroundColor: zomatoRed, padding: 10, borderRadius: 8, justifyContent: 'center', flexDirection: 'row', width: '47%', alignSelf: 'center', elevation: 4, borderLeftColor: zomatoRed, borderLeftWidth: 0.6, gap: 4, alignItems: 'center' }}>
                                <Text style={{ color: '#fff', fontWeight: '500', fontSize: responsiveFontSize(2.2) }}>Save</Text>
                                <View style={{ backgroundColor: lightZomatoRed, width: 19, height: 19, borderRadius: 4, alignItems: 'center', justifyContent: 'center', borderColor: zomatoRed, borderEndWidth: 0.6 }}>
                                    <Icon3 name="save" size={15} color={zomatoRed} />
                                </View>
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
};

export default EditOrder;
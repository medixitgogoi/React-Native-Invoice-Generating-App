import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { lightZomatoRed, modalBackColor, zomatoRed } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromBill } from '../redux/BillDetailsSlice';
import Toast from 'react-native-toast-message';

const BillDetails = () => {

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.bill);
    // console.log(productDetails);

    const navigation = useNavigation();

    const [bend, setBend] = useState(0);
    const [loading, setLoading] = useState(0);
    const [transport, setTransport] = useState(0);

    function indianNumberFormat(number) {

        // Split the number into an array of digits.
        const digits = number.toString().split('');

        // Reverse the array of digits.
        digits.reverse();

        // Add a comma after every three digits, starting from the right.
        for (let i = 3; i < digits.length; i += 3) {
            digits.splice(i, 0, ',');
        }

        // Join the array of digits back into a string.
        const formattedNumber = digits.join('');

        // Reverse the formatted number back to its original order.
        return formattedNumber.split('').reverse().join('');
    }

    const calculateTotalPrice = () => {
        let amount = 0;

        productDetails.map(item => {
            let quantity = 0;

            item.lengthAndPieces.map(item => {
                quantity += item.length * item.pieces;
            })

            amount += quantity * item.rate;

        })

        return amount;
    }

    const calculateTotalAmount = () => {
        let amount = 0;

        let price = calculateTotalPrice();
        amount = price + parseInt(bend) + parseInt(loading) + parseInt(transport);

        return amount;
    }

    const viewBillHandler = () => {
        // navigation.navigate("BillView", { bend: bend, loading: loading, transport: transport })
        navigation.navigate('Invoice');
    }

    const removeProductHandler = (item) => {

        Toast.show({
            type: 'error',
            text1: 'Product removed successfully',
            topOffset: 50,
            onPress: () => Toast.hide(),
        });

        dispatch(removeItemFromBill(item))
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f1f3f6", }}>
            <StatusBar
                animated={true}
                backgroundColor='#fff'
                barStyle="dark-content"
            />

            {/* header */}
            <View style={{ flexDirection: "row", backgroundColor: "#fff", alignItems: "center", justifyContent: "space-between", elevation: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", }}>
                    <View style={{ paddingVertical: 8, flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10 }}>
                        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                            <Icon name="keyboard-arrow-left" size={27} color={zomatoRed} />
                        </TouchableOpacity>
                        <Text style={{ color: "#000", fontWeight: "600", fontSize: responsiveFontSize(2.5) }}>Invoice Details</Text>
                    </View>
                </View>
            </View>

            {/* Content */}
            <ScrollView>
                <View style={{ marginHorizontal: 10, marginBottom: 70 }}>

                    {/* Bill card */}
                    <View>

                        {/* Headline */}
                        {productDetails.length !== 0 ? (
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, marginTop: 15, marginBottom: 10 }}>
                                <Text style={{ color: '#cbd2dd' }}>____________ </Text>
                                <Text style={{ color: '#585858', fontSize: responsiveFontSize(1.7), fontWeight: '600', textTransform: 'uppercase' }}>Here is the preview of the invoice</Text>
                                <Text style={{ color: '#cbd2dd' }}>____________ </Text>
                            </View>
                        ) : (
                            <View style={{ flexDirection: 'column', gap: 8, alignItems: 'center', justifyContent: 'center', height: 600, }}>
                                <Icon2 name="newspaper" size={156} color={zomatoRed} />
                                <Text style={{ color: '#959595', fontSize: responsiveFontSize(2.1), fontWeight: '400', textAlign: 'center' }}>Add the product details to see the preview of the bill</Text>
                            </View>
                        )}

                        {productDetails.map((item, index) => {

                            const calculateQuantity = () => {
                                let quantity = 0;

                                item.lengthAndPieces.map(item => {
                                    quantity += item.length * item.pieces;
                                })

                                return quantity;
                            }
                            const unit = item?.unit;

                            return (
                                <View style={{ backgroundColor: '#fff', borderRadius: 8, width: '100%', paddingHorizontal: 11, flexDirection: 'column', gap: 8, paddingVertical: 12, elevation: 1, marginBottom: 8 }} key={index}>

                                    {/* Header */}
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: lightZomatoRed, padding: 5, borderRadius: 8, borderColor: zomatoRed, borderWidth: 0.6 }}>
                                        <Text style={{ color: zomatoRed, fontWeight: '600', fontSize: responsiveFontSize(2.3), textTransform: 'uppercase', marginLeft: 5 }}>{item?.type}</Text>
                                        <TouchableOpacity style={{ alignSelf: 'flex-end', backgroundColor: zomatoRed, padding: 3, borderRadius: 6 }} onPress={() => removeProductHandler(item)}>
                                            <Icon2 name="close" size={18} color='#fff' />
                                        </TouchableOpacity>
                                    </View>

                                    {/* First section */}
                                    <View style={{ flexDirection: 'column', gap: 5, backgroundColor: modalBackColor, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, elevation: 1 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, justifyContent: 'space-between' }}>
                                            <Text style={{ color: '#585858', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Color:</Text>
                                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>{item?.color}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, justifyContent: 'space-between' }}>
                                            <Text style={{ color: '#585858', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Thickness:</Text>
                                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>{item?.thickness}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, justifyContent: 'space-between' }}>
                                            <Text style={{ color: '#585858', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Width:</Text>
                                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>{item?.width}</Text>
                                        </View>
                                    </View>

                                    {/* Second Section */}
                                    <View style={{ flexDirection: 'column', gap: 5, backgroundColor: modalBackColor, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, elevation: 1, justifyContent: 'space-between' }}>
                                        {item.lengthAndPieces.map(item => (
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, width: '50%', }}>
                                                    <Text style={{ color: '#585858', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Length:</Text>
                                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>{item?.length} {unit}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, width: '50%', justifyContent: 'flex-end' }}>
                                                    <Text style={{ color: '#585858', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Pieces:</Text>
                                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>{item?.pieces}</Text>
                                                </View>
                                            </View>
                                        ))}
                                    </View>

                                    {/* Third section */}
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: modalBackColor, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, elevation: 1, justifyContent: 'space-between' }}>
                                        <Text style={{ color: '#585858', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Quantity (in R.ft.):</Text>
                                        <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(2.2), }}>{indianNumberFormat(calculateQuantity())}</Text>
                                    </View>

                                    {/* Fourth section */}
                                    <View style={{ flexDirection: 'column', gap: 5, backgroundColor: modalBackColor, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, elevation: 1 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, justifyContent: 'space-between' }}>
                                            <Text style={{ color: '#585858', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Rate (In ₹):</Text>
                                            <Text style={{ color: '#000', marginLeft: 4, fontWeight: '500', fontSize: responsiveFontSize(2.3) }}>₹{item.rate}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, justifyContent: 'space-between' }}>
                                            <Text style={{ color: '#585858', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Amount:</Text>
                                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>₹{indianNumberFormat(calculateQuantity() * item.rate)}.00</Text>
                                        </View>
                                    </View>

                                </View>
                            )
                        })}

                    </View>

                    {/* Amount card */}
                    {productDetails.length !== 0 && (
                        <View style={{ backgroundColor: zomatoRed, marginBottom: 5, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 8, padding: 10, gap: 10 }}>

                            {/* Headline */}
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 6, backgroundColor: lightZomatoRed, elevation: 2, borderRadius: 5, }}>
                                <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(2.3), fontWeight: '600', textTransform: 'uppercase' }}>Total Price</Text>
                            </View>

                            {/* Bend, loading and transport */}
                            <View style={{ backgroundColor: modalBackColor, width: '100%', borderRadius: 5, flexDirection: 'column', paddingVertical: 8, elevation: 2 }}>

                                {/* Bend */}
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8 }}>
                                    <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Bend charges</Text>
                                    <View style={{ alignSelf: "center", width: "40%", backgroundColor: '#fff', elevation: 2, borderRadius: 8, overflow: 'hidden', flexDirection: 'row', height: '100%', borderColor: zomatoRed, borderWidth: 0.5 }}>
                                        <View style={{ backgroundColor: zomatoRed, height: '100%', paddingHorizontal: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.3) }}>₹</Text>
                                        </View>
                                        <TextInput
                                            style={{ fontSize: responsiveFontSize(2.1), fontWeight: "500", color: "#000", paddingVertical: 1, width: '100%', paddingHorizontal: 5 }}
                                            onChangeText={setBend}
                                            value={bend}
                                            placeholderTextColor='#000'
                                            keyboardType='numeric'
                                            placeholder='0'
                                        />
                                    </View>
                                </View>

                                {/* Loading */}
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 4 }}>
                                    <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Loading charges</Text>
                                    <View style={{ alignSelf: "center", width: "40%", backgroundColor: '#fff', elevation: 2, borderRadius: 8, overflow: 'hidden', flexDirection: 'row', height: '100%', borderColor: zomatoRed, borderWidth: 0.5 }}>
                                        <View style={{ backgroundColor: zomatoRed, height: '100%', paddingHorizontal: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.3) }}>₹</Text>
                                        </View>
                                        <TextInput
                                            style={{ fontSize: responsiveFontSize(2.1), fontWeight: "500", color: "#000", paddingVertical: 1, width: '100%', paddingHorizontal: 5 }}
                                            onChangeText={setLoading}
                                            value={loading}
                                            placeholderTextColor='#000'
                                            keyboardType='numeric'
                                            placeholder='0'
                                        />
                                    </View>
                                </View>

                                {/* Transport */}
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 4 }}>
                                    <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Transport charges</Text>
                                    <View style={{ alignSelf: "center", width: "40%", backgroundColor: '#fff', elevation: 2, borderRadius: 8, overflow: 'hidden', flexDirection: 'row', height: '100%', borderColor: zomatoRed, borderWidth: 0.5 }}>
                                        <View style={{ backgroundColor: zomatoRed, height: '100%', paddingHorizontal: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.3) }}>₹</Text>
                                        </View>
                                        <TextInput
                                            style={{ fontSize: responsiveFontSize(2.1), fontWeight: "500", color: "#000", paddingVertical: 1, width: '100%', paddingHorizontal: 5 }}
                                            onChangeText={setTransport}
                                            value={transport}
                                            placeholderTextColor='#000'
                                            keyboardType='numeric'
                                            placeholder='0'
                                        />
                                    </View>
                                </View>

                            </View>

                            {/* Total price */}
                            <View style={{ backgroundColor: modalBackColor, width: '100%', borderRadius: 5, flexDirection: 'column', paddingVertical: 7, elevation: 2 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12, }}>
                                    <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Total price of the products</Text>
                                    <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(2.2), fontWeight: '600' }}>₹{indianNumberFormat(calculateTotalPrice())}.00</Text>
                                </View>
                            </View>

                            {/* Total amount to be paid */}
                            <View style={{ backgroundColor: lightZomatoRed, width: '100%', borderRadius: 5, flexDirection: 'column', paddingVertical: 8 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12, }}>
                                    <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(2.2), fontWeight: '600', textTransform: 'uppercase' }}>total amount to be paid</Text>
                                    <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(2.2), fontWeight: '600' }}>₹{indianNumberFormat(calculateTotalAmount() ? calculateTotalAmount() : calculateTotalPrice())}.00</Text>
                                </View>
                            </View>

                        </View>
                    )}

                </View>
            </ScrollView>

            {/* Buttons */}
            <View style={{ backgroundColor: productDetails.length !== 0 ? '#fff' : '#f1f3f6', width: '100%', flexDirection: 'row', paddingVertical: 8, borderRadius: 3, justifyContent: 'space-evenly', alignItems: "center", elevation: 1, position: 'absolute', bottom: productDetails.length !== 0 ? 0 : 5, elevation: productDetails.length !== 0 ? 2 : 0 }}>

                {/* Add product */}
                <TouchableOpacity style={{ width: productDetails.length !== 0 ? '46%' : '95%', backgroundColor: lightZomatoRed, borderRadius: 8, borderColor: zomatoRed, borderWidth: 0.6, height: 42, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }} onPress={() => navigation.navigate('FillUpDetails')}>
                    <View style={{ backgroundColor: zomatoRed, height: 20, width: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
                        <Icon2 name="add" size={16} color='#fff' />
                    </View>
                    <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(2.2), fontWeight: "600" }}>
                        Add product
                    </Text>
                </TouchableOpacity>

                {/* View Invoice */}
                {productDetails.length !== 0 && (
                    <TouchableOpacity style={{ backgroundColor: zomatoRed, padding: 10, borderRadius: 8, justifyContent: 'center', flexDirection: 'row', width: '46%', alignSelf: 'center', elevation: 4, alignItems: 'center', gap: 5, height: 42, }} onPress={viewBillHandler}>
                        <View style={{ backgroundColor: lightZomatoRed, height: 20, width: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
                            <Icon2 name="newspaper" size={14} color={zomatoRed} />
                        </View>
                        <Text style={{ color: '#fff', fontWeight: '500', fontSize: responsiveFontSize(2.2) }}>View Invoice</Text>
                    </TouchableOpacity>
                )}

            </View>

        </SafeAreaView>
    )
}

export default BillDetails;

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
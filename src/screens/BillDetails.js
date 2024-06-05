import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import Modal from "react-native-modal";
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Icon5 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { lightZomatoRed, modalBackColor, zomatoRed } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToBill, removeItemFromBill } from '../redux/BillDetailsSlice';
import Toast from 'react-native-toast-message';

const thickness = [
    { title: '0.30 mm', },
    { title: '0.35 mm', },
    { title: '0.40 mm', },
    { title: '0.45 mm', },
    { title: '0.50 mm', },
];

const units = [
    { title: 'mm', },
    { title: 'ft', },
];

const types = [
    { title: 'Profile Sheet', },
    { title: 'Ridges', },
    { title: 'Tiles Profile Sheet', },
];

const colors = [
    { title: 'Red', },
    { title: 'Blue', },
    { title: 'Green', },
];

const widths = [
    { title: '16 inch', },
    { title: '18 inch', },
    { title: '24 inch', },
];

const BillDetails = () => {

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.bill);
    // console.log(productDetails);

    const navigation = useNavigation();

    const [billModal, setBillModal] = useState(false);
    const [moreProductModal, setMoreProductModal] = useState(false);

    const [error, setError] = useState(false);
    const [error2, setError2] = useState(false);

    const [width, setWidth] = useState('');

    const [length, setLength] = useState('');
    const [isLengthFocused, setIsLengthFocused] = useState(false);

    const [pieces, setPieces] = useState('');
    const [isPiecesFocused, setIsPiecesFocused] = useState(false);

    const [rate, setRate] = useState('');
    const [isRateFocused, setIsRateFocused] = useState(false);

    const [selectedColor, setSelectedColor] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedUnit, setSelectedUnit] = useState("");
    const [selectedThickness, setSelectedThickness] = useState("");
    const [selectedWidth, setSelectedWidth] = useState("");

    const [bend, setBend] = useState(0);
    const [loading, setLoading] = useState(0);
    const [transport, setTransport] = useState(0);

    const [products, setProducts] = useState([]);

    const generateBillHandler = () => {

        if (length === '' || pieces === '' || rate === '' || selectedUnit === '' || selectedThickness === '' || selectedColor === '' || selectedType === '') {
            setBillModal(true);
            setError(true);
        } else {
            if (selectedType === "Ridges" && selectedWidth === '') {
                setBillModal(true);
                setError(true);
            } else {
                Toast.show({
                    type: 'success',
                    text1: 'Product added successfully',
                    text2: `${selectedType} added`,
                    topOffset: 50,
                    onPress: () => Toast.hide(),
                });

                dispatch(addItemToBill({
                    unit: selectedUnit,
                    type: selectedType,
                    color: selectedColor,
                    thickness: selectedThickness,
                    width: selectedType === 'Ridges' ? selectedWidth : '3.5 mm',
                    length: length,
                    pieces: pieces,
                    rate: rate,
                }));

                setBillModal(false);
                setError(false);
                setWidth("");
                setLength("");
                setPieces("");
                setRate('');
                setSelectedType("");
                setSelectedColor("");
                setSelectedUnit("");
                setSelectedThickness("");
                setSelectedWidth("");

            }
        }
    }

    const addLengthPieces = () => {
        setBillModal(false)
        setMoreProductModal(true);
        products.push({
            id: Date.now() + Math.random().toString(30).substring(3, 12),
            length: length,
            pieces: pieces,
        })
        console.log(products)
    }

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

    const totalAmount = calculateTotalAmount();

    const viewBillHandler = () => {
        if (bend === 0 || loading === 0 || transport === 0) {
            setError2(true);
        } else {
            navigation.navigate("BillView", { bend: bend, loading: loading, transport: transport, totalAmount: totalAmount })
            setError2(false);
        }
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
                backgroundColor={billModal || moreProductModal ? "#818181" : '#fff'}
                barStyle="dark-content"
            />

            {/* header */}
            <View style={{ flexDirection: "row", backgroundColor: "#fff", alignItems: "center", justifyContent: "space-between", elevation: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", }}>
                    <View style={{ paddingVertical: 8, flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10 }}>
                        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                            <Icon name="keyboard-arrow-left" size={27} color={zomatoRed} />
                        </TouchableOpacity>
                        <Text style={{ color: "#000", fontWeight: "600", fontSize: responsiveFontSize(2.5) }}>Bill Details</Text>
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
                                <Text style={{ color: '#cbd2dd' }}>_____________ </Text>
                                <Text style={{ color: '#585858', fontSize: responsiveFontSize(1.7), fontWeight: '600', textTransform: 'uppercase' }}>Here is the preview of the bill</Text>
                                <Text style={{ color: '#cbd2dd' }}>_____________ </Text>
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
                                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>{item?.length} {item?.unit}</Text>
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
                                        <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(2.2), }}>{calculateQuantity()}</Text>
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

                                {error2 && (
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 12, backgroundColor: 'yellow', overflow: 'hidden', borderColor: zomatoRed, borderWidth: 0.4, borderRadius: 4, }}>
                                        <View style={{ backgroundColor: zomatoRed, width: 20, flexDirection: 'row', justifyContent: 'center', height: '100%', alignItems: 'center' }}>
                                            <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.5), fontWeight: '900' }}>!</Text>
                                        </View>
                                        <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(1.5), paddingVertical: 5, paddingLeft: 5, }}>
                                            Please fill in all the details before the invoice is generated.
                                        </Text>
                                    </View>
                                )}

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
            <View style={{ backgroundColor: productDetails.length !== 0 ? '#fff' : '#f1f3f6', width: '100%', flexDirection: 'row', paddingVertical: 10, borderRadius: 8, justifyContent: 'space-evenly', alignItems: "center", elevation: 1, position: 'absolute', bottom: productDetails.length !== 0 ? 0 : 5, elevation: productDetails.length !== 0 ? 2 : 0 }}>

                {/* Add product */}
                <TouchableOpacity style={{ width: productDetails.length !== 0 ? '46%' : '95%', backgroundColor: lightZomatoRed, borderRadius: 8, borderColor: zomatoRed, borderWidth: 0.6, height: 42, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }} onPress={() => navigation.navigate('FillUpDetails')}>
                    <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(2.2), fontWeight: "600" }}>
                        Add product
                    </Text>
                    <View style={{ backgroundColor: zomatoRed, height: 20, width: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
                        <Icon2 name="add" size={16} color='#fff' />
                    </View>
                </TouchableOpacity>

                {/* View bill */}
                {productDetails.length !== 0 && (
                    <TouchableOpacity style={{ backgroundColor: zomatoRed, padding: 10, borderRadius: 8, justifyContent: 'center', flexDirection: 'row', width: '46%', alignSelf: 'center', elevation: 4, alignItems: 'center', gap: 5, height: 42, }} onPress={() => viewBillHandler()}>
                        <Text style={{ color: '#fff', fontWeight: '500', fontSize: responsiveFontSize(2.2) }}>View Bill</Text>
                        <Icon2 name="newspaper" size={16} color={"#fff"} />
                    </TouchableOpacity>
                )}
            </View>

            {/* Bill Modal */}
            <Modal
                isVisible={billModal}
                onBackdropPress={() => setBillModal(false)}
                onSwipeComplete={() => setBillModal(false)}
                onRequestClose={() => setBillModal(false)}
                animationType="slide"
                swipeDirection={['down']}
                backdropOpacity={0.5}
                style={{ margin: 0, justifyContent: 'flex-end' }}
            >

                <View style={{ justifyContent: 'flex-end' }}>

                    {/* Close Button */}
                    <TouchableOpacity style={{ alignSelf: 'center', backgroundColor: '#000', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 35, height: 35, borderRadius: 50, marginBottom: 10 }} onPress={() => setBillModal(false)}>
                        <Icon2 name="close" size={20} style={{ color: '#fff' }} />
                    </TouchableOpacity>

                    {/* <ScrollView> */}
                    <View style={{ backgroundColor: modalBackColor, borderTopLeftRadius: 15, borderTopRightRadius: 15, elevation: 1, paddingHorizontal: 14, paddingVertical: 8, height: '93.8%' }}>

                        {/* Headline */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, marginVertical: 10, marginBottom: 15 }}>
                            <Text style={{ textAlign: 'center', color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.6), }}>Fill up the details below</Text>
                        </View>

                        {/* Unit and thickness */}
                        <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>

                            {/* Unit */}
                            <View style={{ marginBottom: 6, flex: 1 }}>
                                <View style={{ backgroundColor: '#fff', borderRadius: 15, padding: 12, elevation: 1 }}>
                                    <Text style={{ color: '#151E26', fontSize: responsiveFontSize(2.2), marginBottom: 5, fontSize: responsiveFontSize(2.3), fontWeight: '500' }}>Unit:</Text>
                                    <SelectDropdown
                                        data={units}
                                        onSelect={(selectedItem, index) => {
                                            setSelectedUnit(selectedItem.title)
                                            // console.log(selectedItem, index);
                                        }}
                                        renderButton={(selectedItem, isOpened) => {
                                            return (
                                                <View style={{ ...styles.dropdownButtonStyle, width: '100%' }}>
                                                    <Text style={styles.dropdownButtonTxtStyle}>
                                                        {(selectedItem && selectedItem.title) || 'Select unit'}
                                                    </Text>
                                                    <Icon5 name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} color="#000" />
                                                </View>
                                            );
                                        }}
                                        renderItem={(item, index, isSelected) => {
                                            return (
                                                <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: zomatoRed }) }}>
                                                    <Text style={{ ...styles.dropdownItemTxtStyle, ...(isSelected && { color: '#fff' }) }}>{item.title}</Text>
                                                </View>
                                            );
                                        }}
                                        showsVerticalScrollIndicator={false}
                                        dropdownStyle={styles.dropdownMenuStyle}
                                    />
                                </View>
                            </View>

                            {/* Thickness */}
                            <View style={{ marginBottom: 6, flex: 1 }}>
                                <View style={{ backgroundColor: '#fff', borderRadius: 15, padding: 10, elevation: 1 }}>
                                    <Text style={{
                                        color: '#151E26', fontSize: responsiveFontSize(2.2), fontSize: responsiveFontSize(2.3), fontWeight: '500', marginBottom: 3
                                    }}>Thickness:</Text>
                                    <SelectDropdown
                                        data={thickness}
                                        onSelect={(selectedItem, index) => {
                                            setSelectedThickness(selectedItem.title)
                                            // console.log(selectedItem, index);
                                        }}
                                        renderButton={(selectedItem, isOpened) => {
                                            return (
                                                <View style={{ ...styles.dropdownButtonStyle, width: '100%' }}>
                                                    <Text style={styles.dropdownButtonTxtStyle}>
                                                        {(selectedItem && selectedItem.title) || 'Select thickness'}
                                                    </Text>
                                                    <Icon5 name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} color="#000" />
                                                </View>
                                            );
                                        }}
                                        renderItem={(item, index, isSelected) => {
                                            return (
                                                <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: zomatoRed }) }}>
                                                    <Text style={{ ...styles.dropdownItemTxtStyle, ...(isSelected && { color: '#fff' }) }}>{item.title}</Text>
                                                </View>
                                            );
                                        }}
                                        showsVerticalScrollIndicator={false}
                                        dropdownStyle={styles.dropdownMenuStyle}
                                    />
                                </View>
                            </View>

                        </View>

                        {/* Type and color */}
                        <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginBottom: selectedType === "Ridges" ? 6 : 0 }}>

                            {/* Type */}
                            <View style={{ flex: 1 }}>
                                <View style={{ backgroundColor: '#fff', borderRadius: 15, padding: 12, elevation: 1 }}>
                                    <Text style={{ color: '#151E26', fontSize: responsiveFontSize(2.2), marginVertical: 5, fontSize: responsiveFontSize(2.3), fontWeight: '500' }}>Type:</Text>
                                    <SelectDropdown
                                        data={types}
                                        onSelect={(selectedItem, index) => {
                                            setSelectedType(selectedItem.title)
                                            // console.log(selectedItem.type, index);
                                        }}
                                        renderButton={(selectedItem, isOpened) => {
                                            return (
                                                <View style={{ ...styles.dropdownButtonStyle, width: '100%' }}>
                                                    <Text style={styles.dropdownButtonTxtStyle}>
                                                        {(selectedItem && selectedItem.title) || 'Select type'}
                                                    </Text>
                                                    <Icon5 name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} color="#000" />
                                                </View>
                                            );
                                        }}
                                        renderItem={(item, index, isSelected) => {
                                            return (
                                                <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: zomatoRed }) }}>
                                                    <Text style={{ ...styles.dropdownItemTxtStyle, ...(isSelected && { color: '#fff' }) }}>{item.title}</Text>
                                                </View>
                                            );
                                        }}
                                        showsVerticalScrollIndicator={false}
                                        dropdownStyle={styles.dropdownMenuStyle}
                                    />
                                </View>
                            </View>

                            {/* Color */}
                            <View style={{ flex: 1 }}>
                                <View style={{ backgroundColor: '#fff', borderRadius: 15, padding: 12, elevation: 1 }}>
                                    <Text style={{ color: '#151E26', fontSize: responsiveFontSize(2.2), marginVertical: 5, fontSize: responsiveFontSize(2.3), fontWeight: '500' }}>Color:</Text>
                                    <SelectDropdown
                                        data={colors}
                                        onSelect={(selectedItem, index) => {
                                            setSelectedColor(selectedItem.title)
                                            // console.log(selectedItem.type, index);
                                        }}
                                        renderButton={(selectedItem, isOpened) => {
                                            return (
                                                <View style={{ ...styles.dropdownButtonStyle, width: '100%' }}>
                                                    <Text style={styles.dropdownButtonTxtStyle}>
                                                        {(selectedItem && selectedItem.title) || 'Select color'}
                                                    </Text>
                                                    <Icon5 name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} color="#000" />
                                                </View>
                                            );
                                        }}
                                        renderItem={(item, index, isSelected) => {
                                            return (
                                                <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: zomatoRed }) }}>
                                                    <Text style={{ ...styles.dropdownItemTxtStyle, ...(isSelected && { color: '#fff' }) }}>{item.title}</Text>
                                                </View>
                                            );
                                        }}
                                        showsVerticalScrollIndicator={false}
                                        dropdownStyle={styles.dropdownMenuStyle}
                                    />
                                </View>
                            </View>

                        </View>

                        {/* Width */}
                        {selectedType === "Ridges" && (
                            <View style={{ flexDirection: 'row', gap: 5, flexWrap: 'wrap' }}>

                                {/* Width */}
                                <View style={{ flex: 1 }}>
                                    <View style={{ backgroundColor: '#fff', borderRadius: 15, padding: 12, elevation: 1 }}>
                                        <Text style={{ color: '#151E26', fontSize: responsiveFontSize(2.2), marginVertical: 5, fontSize: responsiveFontSize(2.3), fontWeight: '500' }}>Width:</Text>
                                        <SelectDropdown
                                            data={widths}
                                            onSelect={(selectedItem, index) => {
                                                setSelectedWidth(selectedItem.title)
                                                // console.log(selectedWidth);
                                                // console.log(width);
                                            }}
                                            renderButton={(selectedItem, isOpened) => {
                                                return (
                                                    <View style={{ ...styles.dropdownButtonStyle, width: '100%' }}>
                                                        <Text style={styles.dropdownButtonTxtStyle}>
                                                            {(selectedItem && selectedItem.title) || 'Select width'}
                                                        </Text>
                                                        <Icon5 name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} color="#000" />
                                                    </View>
                                                );
                                            }}
                                            renderItem={(item, index, isSelected) => {
                                                return (
                                                    <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: zomatoRed }) }}>
                                                        <Text style={{ ...styles.dropdownItemTxtStyle, ...(isSelected && { color: '#fff' }) }}>{item.title}</Text>
                                                    </View>
                                                );
                                            }}
                                            showsVerticalScrollIndicator={false}
                                            dropdownStyle={styles.dropdownMenuStyle}
                                        />
                                    </View>
                                </View>

                            </View>
                        )}

                        {/* Rate */}
                        <View style={{ flexDirection: 'column', backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 15, paddingVertical: 10, gap: 4, marginTop: 6, elevation: 1 }}>
                            <Text style={{ color: '#517c84', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Enter the rate:</Text>
                            <View style={{ alignSelf: "center", width: "100%", paddingHorizontal: 14, backgroundColor: modalBackColor, elevation: 1, borderRadius: 8, borderColor: isRateFocused ? zomatoRed : "", borderWidth: isRateFocused ? 1 : 0, marginVertical: 2 }}>
                                <TextInput
                                    style={{ paddingVertical: 5, fontSize: responsiveFontSize(2.1), fontWeight: "500", color: "#000", }}
                                    onChangeText={setRate}
                                    value={rate}
                                    placeholderTextColor={zomatoRed}
                                    onFocus={() => setIsRateFocused(true)}
                                    onBlur={() => setIsRateFocused(false)}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, marginTop: 6, elevation: 1, width: '100%', justifyContent: 'space-between' }}>

                            {/* Length */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, width: '45%', }}>
                                <Text style={{ color: '#517c84', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Length:</Text>
                                <View style={{ width: "50%", backgroundColor: modalBackColor, elevation: 1, borderRadius: 8, borderColor: isLengthFocused ? zomatoRed : "", borderWidth: isLengthFocused ? 1 : 0, marginVertical: 2 }}>
                                    <TextInput
                                        style={{ paddingVertical: 1, fontSize: responsiveFontSize(2.1), fontWeight: "500", color: "#000", textAlign: 'center' }}
                                        onChangeText={setLength}
                                        value={length}
                                        placeholderTextColor={zomatoRed}
                                        onFocus={() => setIsLengthFocused(true)}
                                        onBlur={() => setIsLengthFocused(false)}
                                        keyboardType="numeric"
                                    />
                                </View>
                            </View>

                            {/* Pieces */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, width: '45%', }}>
                                <Text style={{ color: '#517c84', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Pieces:</Text>
                                <View style={{ width: "50%", backgroundColor: modalBackColor, elevation: 1, borderRadius: 8, borderColor: isPiecesFocused ? zomatoRed : "", borderWidth: isPiecesFocused ? 1 : 0, marginVertical: 2 }}>
                                    <TextInput
                                        style={{ paddingVertical: 1, fontSize: responsiveFontSize(2.1), fontWeight: "500", color: "#000", textAlign: 'center' }}
                                        onChangeText={setPieces}
                                        value={pieces}
                                        placeholderTextColor={zomatoRed}
                                        onFocus={() => setIsPiecesFocused(true)}
                                        onBlur={() => setIsPiecesFocused(false)}
                                        keyboardType="numeric"
                                    />
                                </View>
                            </View>

                            {/* Add Button */}
                            <TouchableOpacity style={{ backgroundColor: zomatoRed, width: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }} onPress={addLengthPieces}>
                                <Icon2 name="add" size={16} color='#fff' />
                            </TouchableOpacity>

                        </View>

                        {/* Error Handling */}
                        {error && (
                            <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(1.6), textAlign: 'right', marginVertical: 5, }}>* Please fill all the details. All the fields are necessary.</Text>
                        )}

                        {/* Buttons */}
                        <View style={{ backgroundColor: '#fff', width: '100%', flexDirection: 'row', borderRadius: 10, marginVertical: 5, paddingVertical: 8, justifyContent: 'space-evenly', alignItems: "center", elevation: 1, position: 'absolute', bottom: 0, left: 13, right: 10 }}>

                            {/* Cancel */}
                            <TouchableOpacity activeOpacity={0.7} onPress={() => setBillModal(false)} style={{ width: '46%', backgroundColor: lightZomatoRed, borderRadius: 8, borderColor: zomatoRed, borderWidth: 0.6, height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(2.2), fontWeight: "600" }}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                            {/* Generate bill */}
                            <TouchableOpacity style={{ backgroundColor: zomatoRed, padding: 10, borderRadius: 8, justifyContent: 'center', flexDirection: 'row', width: '46%', alignSelf: 'center', elevation: 4 }} onPress={() => generateBillHandler()}>
                                <Text style={{ color: '#fff', fontWeight: '500', fontSize: responsiveFontSize(2.2) }}>
                                    Generate Bill
                                </Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                    {/* </ScrollView> */}

                </View>
            </Modal>

            {/* Add More Product Modal */}
            <Modal
                isVisible={moreProductModal}
                onBackdropPress={() => setMoreProductModal(false)}
                onSwipeComplete={() => setMoreProductModal(false)}
                onRequestClose={() => setMoreProductModal(false)}
                animationType="slide"
                swipeDirection={['down']}
                backdropOpacity={0.5}
                style={{ justifyContent: 'flex-end', margin: 0, }}
            >

                <View style={{ width: "100%", height: '100%', justifyContent: 'flex-end' }}>

                    {/* Close Button */}
                    <TouchableOpacity style={{ alignSelf: 'center', backgroundColor: '#000', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 35, height: 35, borderRadius: 50, marginBottom: 10 }} onPress={() => setMoreProductModal(false)}>
                        <Icon2 name="close" size={20} style={{ color: '#fff' }} />
                    </TouchableOpacity>

                    <View style={{ backgroundColor: modalBackColor, borderTopLeftRadius: 15, borderTopRightRadius: 15, elevation: 1, paddingHorizontal: 14, paddingVertical: 8 }}>

                        {/* Headline */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, marginVertical: 8, marginBottom: 10 }}>
                            <Text style={{ textAlign: 'center', color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.6), }}>Fill up the details below</Text>
                        </View>

                        {/* Length */}
                        <View style={{ flexDirection: 'column', backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 15, paddingVertical: 10, gap: 4, marginTop: 6, elevation: 1 }}>
                            <Text style={{ color: '#517c84', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Enter the length:</Text>
                            <View style={{ alignSelf: "center", width: "100%", paddingHorizontal: 14, backgroundColor: modalBackColor, elevation: 1, borderRadius: 8, marginVertical: 2 }}>
                                <TextInput
                                    style={{ paddingVertical: 5, fontSize: responsiveFontSize(2.1), fontWeight: "500", color: "#000", }}
                                    onChangeText={setLength}
                                    value={length}
                                    placeholderTextColor={zomatoRed}
                                    onFocus={() => setIsLengthFocused(true)}
                                    onBlur={() => setIsLengthFocused(false)}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>

                        {/* No of pieces */}
                        <View style={{ flexDirection: 'column', backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 15, paddingVertical: 10, gap: 4, marginTop: 6, elevation: 1 }}>
                            <Text style={{ color: '#517c84', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Enter the No. of pieces:</Text>
                            <View style={{ alignSelf: "center", width: "100%", paddingHorizontal: 14, backgroundColor: modalBackColor, elevation: 1, borderRadius: 8, marginVertical: 2 }}>
                                <TextInput
                                    style={{ paddingVertical: 5, fontSize: responsiveFontSize(2.1), fontWeight: "500", color: "#000", }}
                                    onChangeText={setPieces}
                                    value={pieces}
                                    placeholderTextColor={zomatoRed}
                                    onFocus={() => setIsPiecesFocused(true)}
                                    onBlur={() => setIsPiecesFocused(false)}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>

                        {/* Error Handling */}
                        {error && (
                            <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(1.6), textAlign: 'right', marginVertical: 5, }}>* Please fill all the details. All the fields are necessary.</Text>
                        )}

                        {/* Buttons */}
                        <View style={{ backgroundColor: '#fff', width: '100%', flexDirection: 'row', borderRadius: 10, marginVertical: 5, paddingVertical: 8, justifyContent: 'space-evenly', alignItems: "center", elevation: 1 }}>

                            {/* Cancel */}
                            <TouchableOpacity activeOpacity={0.7} onPress={() => setMoreProductModal(false)} style={{ width: '46%', backgroundColor: lightZomatoRed, borderRadius: 8, borderColor: zomatoRed, borderWidth: 0.6, height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(2.2), fontWeight: "600" }}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                            {/* Add */}
                            <TouchableOpacity style={{ backgroundColor: zomatoRed, padding: 10, borderRadius: 8, justifyContent: 'center', flexDirection: 'row', width: '46%', alignSelf: 'center', elevation: 4, borderLeftColor: zomatoRed, borderLeftWidth: 0.6, }}>
                                <Text style={{ color: '#fff', fontWeight: '500', fontSize: responsiveFontSize(2.2) }}>
                                    Add
                                </Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>
            </Modal>

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
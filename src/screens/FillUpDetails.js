import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import SelectDropdown from 'react-native-select-dropdown';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Icon5 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { lightZomatoRed, modalBackColor, zomatoRed } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToBill } from '../redux/BillDetailsSlice';
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

const FillUpDetails = () => {

    const dispatch = useDispatch();

    const navigation = useNavigation();

    const productDetails = useSelector(state => state.bill);

    const [moreProductModal, setMoreProductModal] = useState(false);

    const [error, setError] = useState(false);

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

    const [products, setProducts] = useState([]);

    const saveDataHandler = () => {

        if (rate === '' || selectedUnit === '' || selectedThickness === '' || selectedColor === '' || selectedType === '' || products?.length === 0) {
            setError(true);
        } else {
            if (selectedType === "Ridges" && selectedWidth === '') {
                setError(true);
            } else {

                navigation.navigate('BillDetails');

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
                    lengthAndPieces: products,
                    rate: rate,
                }));

                setError(false);
                setRate('');
                setProducts([]);
                setSelectedColor('');
                setSelectedType('');
                setSelectedUnit('');
                setSelectedThickness('');
                setSelectedWidth('');

            }
        }
    }

    const addLengthPieces = () => {
        setMoreProductModal(false);
        setProducts([...products, {
            id: Date.now() + Math.random().toString(36).substring(2, 9),
            length: length,
            pieces: pieces,
        }]);
        setLength('');
        setPieces('');
        setIsLengthFocused(false);
        setIsPiecesFocused(false);
    }

    const removeLengthPieces = (id) => {
        const filteredData = products.filter(item => item.id !== id);
        setProducts(filteredData);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f1f3f6", flexDirection: "column", paddingBottom: 8, }}>
            <StatusBar
                animated={true}
                backgroundColor={moreProductModal ? "#818181" : '#fff'}
                barStyle="dark-content"
            />

            {/* header */}
            <View style={{ flexDirection: "row", backgroundColor: "#fff", alignItems: "center", justifyContent: "space-between", elevation: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", }}>
                    <View style={{ paddingVertical: 8, flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10 }}>
                        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                            <Icon name="keyboard-arrow-left" size={27} color={zomatoRed} />
                        </TouchableOpacity>
                        <Text style={{ color: "#000", fontWeight: "600", fontSize: responsiveFontSize(2.5) }}>Add Product Details</Text>
                    </View>
                </View>
            </View>

            {/* Content */}
            <ScrollView>
                <View style={{ paddingHorizontal: 10, paddingBottom: 62, paddingTop: 10 }}>

                    {/* Headline */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, marginBottom: 10, marginBottom: 15 }}>
                        <Text style={{ textAlign: 'center', color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.6), }}>Fill up the details below</Text>
                    </View>

                    {/* Unit and thickness */}
                    <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>

                        {/* Unit */}
                        <View style={{ marginBottom: 6, flex: 1 }}>
                            <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10, elevation: 1 }}>
                                <Text style={{ color: '#151E26', fontSize: responsiveFontSize(2.2), marginBottom: 3, fontSize: responsiveFontSize(2.3), fontWeight: '500' }}>Unit:</Text>
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
                                                    {/* {(selectedItem && selectedItem.title) || 'Select Unit'} */}
                                                    {selectedUnit === '' ? 'Select Unit' : selectedUnit}
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
                            <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10, elevation: 1 }}>
                                <Text style={{ color: '#151E26', fontSize: responsiveFontSize(2.2), fontSize: responsiveFontSize(2.2), fontWeight: '500', marginBottom: 3 }}>Thickness:</Text>
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
                                                    {/* {(selectedItem && selectedItem.title) || 'Select Thickness'} */}
                                                    {selectedThickness === '' ? 'Select Thickness' : selectedThickness}
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
                            <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 12, elevation: 1 }}>
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
                                                    {/* {(selectedItem && selectedItem.title) || 'Select Type'} */}
                                                    {selectedType === '' ? 'Select Type' : selectedType}
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
                            <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 12, elevation: 1 }}>
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
                                                    {/* {(selectedItem && selectedItem.title) || 'Select Color'} */}
                                                    {selectedColor === '' ? 'Select Color' : selectedColor}
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
                                                        {/* {(selectedItem && selectedItem.title) || 'Select Width'} */}
                                                        {selectedWidth === '' ? 'Select Width' : selectedWidth}
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

                    {/* Length and pieces */}
                    <View style={{ flexDirection: 'column', backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 5, marginTop: 6, elevation: 1, }}>

                        {products?.map(item => (
                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: 5 }} key={item.id}>

                                {/* Length */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, width: '40%' }}>
                                    <Text style={{ color: '#517c84', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Length:</Text>
                                    <View style={{ width: "50%", height: 27, backgroundColor: modalBackColor, elevation: 1, borderRadius: 8, marginVertical: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.2) }}>{item.length}</Text>
                                    </View>
                                </View>

                                {/* Pieces */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, width: '40%', justifyContent: 'flex-end' }}>
                                    <Text style={{ color: '#517c84', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Pieces:</Text>
                                    <View style={{ width: "50%", height: 27, backgroundColor: modalBackColor, elevation: 1, borderRadius: 8, marginVertical: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.2) }}>{item.pieces}</Text>
                                    </View>
                                </View>

                                {/* Delete button */}
                                <TouchableOpacity onPress={() => removeLengthPieces(item.id)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 30, backgroundColor: lightZomatoRed, borderRadius: 5, borderColor: zomatoRed, borderWidth: 1 }}>
                                    <Icon2 name="close" size={18} style={{ color: zomatoRed }} />
                                </TouchableOpacity>

                            </View>
                        ))}

                        {/* Add More Button */}
                        <TouchableOpacity style={{ backgroundColor: lightZomatoRed, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 5, height: 35, borderColor: zomatoRed, borderWidth: 1, marginVertical: 8, gap: 5 }} onPress={() => setMoreProductModal(true)}>
                            <View style={{ backgroundColor: zomatoRed, width: 18, height: 18, borderRadius: 4, alignItems: 'center', justifyContent: 'center' }}>
                                <Icon2 name="add" size={16} color={lightZomatoRed} />
                            </View>
                            {products.length === 0 ? (
                                <Text style={{ color: zomatoRed, fontWeight: '500', fontSize: responsiveFontSize(2.2) }}>Add length and pieces</Text>
                            ) : (
                                <Text style={{ color: zomatoRed, fontWeight: '500', fontSize: responsiveFontSize(2.2) }}>Add more</Text>
                            )}
                        </TouchableOpacity>

                    </View>

                    {/* Error Handling */}
                    {error && (
                        <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(1.6), textAlign: 'right', marginVertical: 5, }}>* Please fill all the details. All the fields are necessary.</Text>
                    )}

                </View>
            </ScrollView>

            {/* Buttons */}
            <View style={{ backgroundColor: '#fff', width: '100%', paddingHorizontal: productDetails.length === 0 ? 10 : 0, flexDirection: 'row', paddingVertical: 8, borderRadius: 3, justifyContent: 'space-evenly', alignItems: "center", elevation: 1, position: 'absolute', bottom: 5, elevation: 2, }}>

                {/* View Preview */}
                {productDetails.length !== 0 && (
                    <TouchableOpacity style={{ width: '46%', backgroundColor: lightZomatoRed, borderRadius: 8, borderColor: zomatoRed, borderWidth: 0.6, height: 42, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }} onPress={() => navigation.navigate('BillDetails')}>
                        <View style={{ backgroundColor: zomatoRed, height: 21, width: 21, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
                            <Icon2 name="newspaper" size={13} color={'#fff'} />
                        </View>
                        <Text style={{ color: zomatoRed, fontWeight: '500', fontSize: responsiveFontSize(2.2) }}>View Preview</Text>
                    </TouchableOpacity>
                )}

                {/* Save details */}
                <TouchableOpacity style={{ backgroundColor: zomatoRed, padding: 10, borderRadius: 8, justifyContent: 'center', flexDirection: 'row', width: productDetails.length === 0 ? '100%' : '46%', alignSelf: 'center', elevation: 4, alignItems: 'center', gap: 6, height: 42, }} onPress={saveDataHandler}>
                    <View style={{ backgroundColor: lightZomatoRed, height: 19, width: 19, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
                        <Icon2 name="add" size={16} color={zomatoRed} />
                    </View>
                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.2), fontWeight: "500" }}>
                        Save details
                    </Text>
                </TouchableOpacity>

            </View>

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
                            <View style={{ alignSelf: "center", width: "100%", paddingHorizontal: 14, backgroundColor: modalBackColor, elevation: 1, borderRadius: 8, marginVertical: 2, borderColor: isLengthFocused ? zomatoRed : "", borderWidth: isLengthFocused ? 1.5 : 0, }}>
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
                            <View style={{ alignSelf: "center", width: "100%", paddingHorizontal: 14, backgroundColor: modalBackColor, elevation: 1, borderRadius: 8, marginVertical: 2, borderColor: isPiecesFocused ? zomatoRed : "", borderWidth: isPiecesFocused ? 1.5 : 0, }}>
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

                        {/* Buttons */}
                        <View style={{ backgroundColor: '#fff', width: '100%', flexDirection: 'row', borderRadius: 10, marginVertical: 5, paddingVertical: 8, justifyContent: 'space-evenly', alignItems: "center", elevation: 1 }}>

                            {/* Cancel */}
                            <TouchableOpacity activeOpacity={0.7} onPress={() => setMoreProductModal(false)} style={{ width: '46%', backgroundColor: lightZomatoRed, borderRadius: 8, gap: 3, borderColor: zomatoRed, borderWidth: 0.6, height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(2.2), fontWeight: "600" }}>
                                    Cancel
                                </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 19, height: 19, alignItems: 'center', backgroundColor: zomatoRed, borderRadius: 5, borderColor: zomatoRed, borderWidth: 1 }}>
                                    <Icon2 name="close" size={15} style={{ color: lightZomatoRed }} />
                                </View>
                            </TouchableOpacity>

                            {/* Add */}
                            <TouchableOpacity style={{ backgroundColor: zomatoRed, padding: 10, borderRadius: 8, justifyContent: 'center', flexDirection: 'row', width: '46%', alignSelf: 'center', elevation: 4, borderLeftColor: zomatoRed, borderLeftWidth: 0.6, gap: 4, alignItems: 'center' }} onPress={addLengthPieces}>
                                <Text style={{ color: '#fff', fontWeight: '500', fontSize: responsiveFontSize(2.2) }}>
                                    Add
                                </Text>
                                <View style={{ backgroundColor: lightZomatoRed, width: 16, height: 16, borderRadius: 4, alignItems: 'center', justifyContent: 'center', borderColor: zomatoRed, borderEndWidth: 0.6 }}>
                                    <Icon2 name="add" size={16} color={zomatoRed} />
                                </View>
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    )
}

export default FillUpDetails;

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
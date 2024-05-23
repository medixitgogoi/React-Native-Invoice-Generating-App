import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Practice = () => {
    return (
        <View>
            {/* Party Name */}
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', backgroundColor: zomatoRed, paddingVertical: 8, }}>
                <View style={{ width: 25, height: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: lightZomatoRed, borderRadius: 50 }}>
                    <Icon2 name="person-sharp" size={17} style={{ color: zomatoRed, }} />
                </View>
                <Text style={{ color: lightZomatoRed, fontSize: responsiveFontSize(2.1), fontWeight: '500' }}>{partyName}</Text>
            </View>

            {/* Site name */}
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', backgroundColor: zomatoRed, paddingVertical: 8, }}>
                <View style={{ width: 25, height: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: lightZomatoRed, borderRadius: 50 }}>
                    <Icon2 name="location-sharp" size={17} style={{ color: zomatoRed }} />
                </View>
                <Text style={{ color: lightZomatoRed, fontSize: responsiveFontSize(2.1), fontWeight: '500' }}>{siteName}</Text>
            </View>

            {/* PAN no */}
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', backgroundColor: zomatoRed, paddingVertical: 8, }}>
                <View style={{ width: 25, height: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: lightZomatoRed, borderRadius: 50 }}>
                    <Icon2 name="card" size={17} style={{ color: zomatoRed }} />
                </View>
                <Text style={{ color: lightZomatoRed, fontSize: responsiveFontSize(2.1), fontWeight: '500' }}>{panNo}</Text>
            </View>

            {/* Contact no */}
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', backgroundColor: zomatoRed, paddingVertical: 8, }}>
                <View style={{ width: 25, height: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: lightZomatoRed, borderRadius: 50 }}>
                    <Icon3 name="phone" size={15} style={{ color: zomatoRed }} />
                </View>
                <Text style={{ color: lightZomatoRed, fontSize: responsiveFontSize(2.1), fontWeight: '500' }}>{contact}</Text>
            </View>

            {/* GSTIN no */}
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', backgroundColor: zomatoRed, paddingVertical: 8, }}>
                <View style={{ width: 25, height: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: lightZomatoRed, borderRadius: 50 }}>
                    <Icon3 name="barcode" size={15} style={{ color: zomatoRed }} />
                </View>
                <Text style={{ color: lightZomatoRed, fontSize: responsiveFontSize(2.1), fontWeight: '500' }}>{gstin}</Text>
            </View>

        </View>
    )
}

export default Practice

const styles = StyleSheet.create({})

{/* Thickness */ }
{/* <View style={{ marginBottom: 8, flex: 1 }}>
    <View style={{ backgroundColor: '#fff', borderRadius: 15, padding: 10, elevation: 1 }}>
        <Text style={{
            color: '#151E26', fontSize: responsiveFontSize(2.2), fontSize: responsiveFontSize(2.3), fontWeight: '500', marginBottom: 3
        }}>Thickness:</Text>
        <SelectDropdown
            data={thickness}
            onSelect={(selectedItem, index) => {
                setSelectedThickness(selectedItem.title)
                console.log(selectedItem, index);
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
</View> */}
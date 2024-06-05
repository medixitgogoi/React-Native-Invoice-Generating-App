import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Practice = () => {
  return (
    <View>
      {/* Buttons */}
      <View style={{ backgroundColor: '#fff', width: '100%', flexDirection: 'row', borderRadius: 10, marginVertical: 5, paddingVertical: 8, justifyContent: 'space-evenly', alignItems: "center", elevation: 1, }}>

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
  )
}

export default Practice

const styles = StyleSheet.create({})
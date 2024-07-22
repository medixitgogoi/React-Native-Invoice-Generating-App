import { StyleSheet, Text, View } from 'react-native'

const Practice2 = () => {
    return (
        <View>
            <Text></Text>
        </View>
    )
}

export default Practice2

const styles = StyleSheet.create({})

{/* Edit Modal */ }
<Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => setModalVisible(false)}
>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View style={{ width: '80%', backgroundColor: '#fff', borderRadius: 8, padding: 20, alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(2.5), marginBottom: 15, color: '#000' }}>Edit Pieces</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: '#000', width: '100%', paddingHorizontal: 10, marginBottom: 15 }}
                keyboardType="numeric"
                value={editValue}
                onChangeText={setEditValue}
            />
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
        </View>
    </View>
</Modal>
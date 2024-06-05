import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import { useState } from 'react'
import AddPen from 'react-native-vector-icons/dist/AntDesign';
import RemovePen from 'react-native-vector-icons/dist/AntDesign'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { zomatoRed } from '../utils/colors';

const Practice = () => {

  const [clubs, setClubs] = useState([{ from: '', to: '' }]);
  console.log(clubs);

  const addClubs = () => {
    const newClubs = [...clubs, { from: '', to: '' }];
    setClubs(newClubs);
  };

  const removeClubs = (index) => {
    const updatedClubs = clubs.filter((_, i) => i !== index);
    setClubs(updatedClubs);
  };

  const handleClubsInputChange = (text, field, index) => {
    const updatedClubs = [...clubs];
    updatedClubs[index][field] = text;
    setClubs(updatedClubs);
  };

  return (
    <View style={{ backgroundColor: zomatoRed }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: 9 }}>
        <View style={{}}>
          <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: "600" }}>
            Clubs Associated with
          </Text>
        </View>

        <TouchableOpacity onPress={addClubs} style={{ paddingRight: 10 }}>
          <AddPen style={{ color: "#fff", fontSize: responsiveFontSize(2) }} name="pluscircle" />
        </TouchableOpacity>
      </View>

      {clubs && clubs.map((club, index) => (
        <View key={club.id} style={{ marginVertical: 10 }}>
          {/* <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.8), marginBottom: 5 }}>
            Club/Team #{index + 1}
          </Text> */}

          {/* <TextInput
            placeholder="Enter the name of Clubs/Teams Played for"
            placeholderTextColor={'#000'}
            style={{
              borderBottomWidth: 0.29,
              borderBottomColor: '#fff',
              marginTop: 5,
              padding: 0,
              fontSize: responsiveFontSize(1.8),
              color: '#000',
              fontWeight: '300',
            }}
            value={clubs.name}
            onChangeText={(text) => handleClubsInputChange(text, 'name', index)}
          /> */}

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.8), marginBottom: 5 }}>
                Joining Date
              </Text>
              {/* You can use a DatePicker or TextInput for date input */}
              <TextInput
                placeholder="MM/YYYY"
                placeholderTextColor={'#000'}
                style={{
                  borderBottomWidth: 0.29,
                  borderBottomColor: '#fff',
                  padding: 0,
                  fontSize: responsiveFontSize(1.8),
                  color: '#000',
                  fontWeight: '300',
                }}
                value={clubs.from}
                onChangeText={(text) => handleClubsInputChange(text, 'from', index)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.8), marginBottom: 5 }}>
                Exit Date
              </Text>
              {/* You can use a DatePicker or TextInput for date input */}
              <TextInput
                placeholder="MM/YYYY"
                placeholderTextColor={'#000'}
                style={{
                  borderBottomWidth: 0.29,
                  borderBottomColor: '#fff',
                  padding: 0,
                  fontSize: responsiveFontSize(1.8),
                  color: '#000',
                  fontWeight: '300',
                }}
                value={clubs.to}
                onChangeText={(text) => handleClubsInputChange(text, 'to', index)}
              />
            </View>
          </View>

          {index > 0 && (
            <TouchableOpacity
              style={{ width: "100%", marginTop: 5, backgroundColor: "#000", flexDirection: "row", alignItems: "center", justifyContent: "center" }}
              onPress={() => removeClubs(index)}>
              <RemovePen
                style={{
                  color: "#fff",
                  //   backgroundColor: "#000",
                  fontSize: responsiveFontSize(1.5),
                  paddingHorizontal: 3,
                  paddingVertical: 6,
                  borderRadius: 50,
                  textAlign: "center",
                }}
                name="minuscircle"
              />
              <Text style={{
                color: "#fff",
                //  backgroundColor: "#000",
                fontSize: responsiveFontSize(1.5),
              }}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  )
}

export default Practice

const styles = StyleSheet.create({})

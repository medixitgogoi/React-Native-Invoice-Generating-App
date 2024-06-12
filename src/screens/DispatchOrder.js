import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { zomatoRed } from '../utils/colors';
import { useSelector } from 'react-redux';

const DispatchOrder = () => {

  const navigation = useNavigation();

  const billDetails = useSelector(state => state.bill);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f1f3f6", flexDirection: "column", }}>
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
            <Text style={{ color: "#000", fontWeight: "600", fontSize: responsiveFontSize(2.5) }}>Dispatch Order</Text>
          </View>
          <TouchableOpacity style={{ marginRight: 8 }} onPress={() => navigation.navigate("Profile")}>
            <Image source={require("../assets/login.png")} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>
      </View>

      {billDetails.length === 0 ? (
        <View>
          <Text style={{ color: '#000', textAlign: 'center' }}>Nothing to display</Text>
        </View>
      ) : (
        <View>

        </View>
      )}

    </SafeAreaView>
  )
}

export default DispatchOrder;

const styles = StyleSheet.create({});
import { StyleSheet, Text, View } from 'react-native';
import StackNavigation from './src/navigation/StackNavigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/Store';
import Toast from 'react-native-toast-message';

const App = () => {

  return (
    <Provider store={store}>
      <StackNavigation />
      <Toast />
    </Provider>
  )
}

export default App;

const styles = StyleSheet.create({})
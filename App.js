import { StyleSheet, Text, View } from 'react-native';
import StackNavigation from './src/navigation/StackNavigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/Store';

const App = () => {

  return (
    <Provider store={store}>
      <StackNavigation />
    </Provider>
  )
}

export default App;

const styles = StyleSheet.create({});
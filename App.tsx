import React from 'react';
import RootStack from "./app/navigations";
import { store } from './app/store';
import { Provider } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';

function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
      <FlashMessage position="top" />
        <RootStack />
      </SafeAreaView>
    </Provider>
  );
}

export default App;

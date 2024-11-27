import React from "react";
import RootStack from "./app/navigations";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import FlashMessage from "react-native-flash-message";
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Provider as PaperProvider } from "react-native-paper";
console.log(process.env.EXPO_PUBLIC_API_URL);

const App = () => {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <FlashMessage position="top" />
            <RootStack />
          </SafeAreaView>
        </PaperProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;

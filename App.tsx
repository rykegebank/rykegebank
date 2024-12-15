import React from "react";
import RootStack from "./app/navigations";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import FlashMessage from "react-native-flash-message";
import { StatusBar } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as PaperProvider } from "react-native-paper";
import { Colors } from "./app/constants";
console.log(process.env.EXPO_PUBLIC_API_URL);

const App = () => {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <SafeAreaView style={{ flex: 1 }}>
            {/* <StatusBar
              backgroundColor={Colors.primaryColor}
              barStyle="light-content"
            /> */}
            <RootStack />
          </SafeAreaView>
        </PaperProvider>
      </QueryClientProvider>
      <FlashMessage
        position="bottom"
        style={{
          marginHorizontal: 15,
          borderRadius: 8,
          marginBottom: 10,
        }}
      />
    </Provider>
  );
};

export default App;

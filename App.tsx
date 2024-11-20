import RootStack from "./app/navigations";
import { store } from './app/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  );
}

export default App;

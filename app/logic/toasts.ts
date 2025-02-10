import { showMessage } from 'react-native-flash-message';
import { EvilIcons } from "@expo/vector-icons";

const genericSuccessToast = (message: string, position: 'top' | 'bottom' = 'bottom') => {
  showMessage({
    message: message,
    backgroundColor: "green",
    duration: 3000,
    icon: "success",
    position: position,
  });
};

const genericErrorToast = (message: string, position: 'top' | 'bottom' = 'bottom') => {
  console.log('positon',position)
  showMessage({
    message: message,
    backgroundColor: "red",
    duration: 3000,
    position: position,
  });
};

export default {
  genericSuccessToast,
  genericErrorToast,
};

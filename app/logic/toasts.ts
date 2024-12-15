
import { showMessage } from 'react-native-flash-message';

import { EvilIcons } from "@expo/vector-icons";

const genericSuccessToast = (message: string) => {
  showMessage({
    message: message,
    backgroundColor: "green",
    duration: 3000,
    icon: "success",

  });
};

const genericErrorToast = (message: string) => {
    showMessage({
        message: message,
        backgroundColor: "red",
        duration: 3000,
      });  
}





export default {
    genericSuccessToast,
    genericErrorToast,
};

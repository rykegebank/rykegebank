import { showMessage } from 'react-native-flash-message';
import { Colors } from '../constants';

export function showSuccessMessage(text: string): void {
    showMessage({
        message: text,
        type: 'success',
        backgroundColor: Colors.greenSuccessColor,
        color: Colors.colorWhite,
    });
}

export function showErrorMessage(text: string): void {
    showMessage({
        message: text,
        duration: 5000,
        type: 'danger',
        backgroundColor: Colors.red,
        color: Colors.colorWhite,
    });
}

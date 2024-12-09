import { showErrorMessage } from './flashMessage';

export const getErrorMessage = (exception: any): string => {
    try {
        let message = 'Something went wrong. Please try again.';  // Default message
        if (exception?.response?.data?.message) {
            message = exception.response.data.message;
        }

        if (exception?.message) {
            message = exception.message;
        }

        if (typeof message === 'string' && message.includes('undefined')) {
            message = 'Internet connection issue. Please check your network.';
        }

        return message;  // Return the final message
    } catch (e) {
        console.error('Error processing exception:', e);
        return 'Something went wrong. Please try again.';
    }
};


export const manageApiException = async (exception: any) => {
    const errorMessage = getErrorMessage(exception);
    showError(errorMessage); // Show the error message
};

const showError = (message: string) => {
    showErrorMessage(message);
};

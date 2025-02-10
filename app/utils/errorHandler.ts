import toasts from '../logic/toasts';

export const getErrorMessage = (exception: any): string => {
    try {
        let message = 'Something went wrong. Please try again.';  // Default message
        if (exception?.response?.data?.message) {
            message = exception.response.data.message;
        }

        if (exception?.message) {
            message = exception.message;
        }
        if (message.includes('Network Error')) {
            message = 'Internet connection issue. Please check your network.';
        }

        if (typeof exception === 'string') {
            return exception;
        }
      
        return message;  // Return the final message
    } catch (e) {
        console.error('Error processing exception:', e);
        return 'Something went wrong. Please try again.';
    }
};


export const manageApiException = async (exception: any, position: 'top' | 'bottom' = 'bottom') => {
    const errorMessage = getErrorMessage(exception);
    console.log('manageApiException',errorMessage);
    showError(errorMessage, position); 
};

const showError = (message: string, position: 'top' | 'bottom') => {
    toasts.genericErrorToast(message, position);
};

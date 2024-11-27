import { showErrorMessage } from './flashMessage';

export const getErrorMessage = (exception: any): string => {
    if (exception.response?.data?.message) {
        return exception.response.data.message;
    }
    return 'Something went wrong. Please try again.';
};
export const manageApiException = async (exception: any) => {
    const errorMessage = getErrorMessage(exception);
    showError(errorMessage);
};

const showError = (message: string) => {
    showErrorMessage(message);
};

import { format } from 'date-fns';

export const isoStringToLocalDateOnly = (dateTime: string, errorResult: string = '--'): string => {
    if (!dateTime || dateTime === 'null') {
        return errorResult;
    }

    try {
        const parsedDate = new Date(dateTime);
        if (isNaN(parsedDate.getTime())) {
            throw new Error('Invalid date');
        }

        return format(parsedDate, 'dd MMM yyyy');
    } catch (error) {
        return errorResult;
    }
};

export const isoStringToLocalTimeOnly = (dateTime: string, errorResult: string = '--'): string => {
    const parsedDate = new Date(dateTime);
    return format(parsedDate, 'hh:mm aa');
};

export const localDate = (dateTime: string, errorResult: string = '--'): string => {
    const parsedDate = new Date(dateTime);
    return format(parsedDate, 'MMMM dd, yyyy');
};




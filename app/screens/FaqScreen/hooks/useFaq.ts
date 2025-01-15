import { useFetchFaqs } from '../../../data/faqs/queries';
import { useState } from "react";


export const useFaqs = () => {
    const { data, error, isLoading } = useFetchFaqs();
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

    const changeSelectedIndex = (index: number) => {
        if (selectedIndex == index) {
            setSelectedIndex(-1);
        } else {
            setSelectedIndex(index);
        }
    };

    return {
        data,
        error,
        isLoading,
        changeSelectedIndex,
        selectedIndex
    };
};

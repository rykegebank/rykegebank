import { useFetchPolicy } from '../../../data/privacy/queries';
import { useState, useEffect } from "react";
import { useGeneralSettings } from "../../../hooks/useGeneralSettings";

export const usePolicy = () => {
    const { getTemplateName } = useGeneralSettings();
    const templateName = getTemplateName() || "";
    const { data, error, isLoading } = useFetchPolicy(templateName);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1); // Default to -1 (no selection)
    const [selectedHtml, setSelectedHtml] = useState<string>("");

    // Update selectedHtml whenever selectedIndex or data changes
    useEffect(() => {
        if (data && data[selectedIndex]) {
            setSelectedHtml(data[selectedIndex]?.data_values?.content || "");
        }
    }, [data, selectedIndex]);

    const changeSelectedIndex = (index: number) => {
        console.log('index',index)
        if (selectedIndex === index) {
            setSelectedIndex(-1); // Deselect if already selected
        } else {
            setSelectedIndex(index); // Select new index
        }
    };

    return {
        selectedHtml,
        data,
        error,
        isLoading,
        changeSelectedIndex,
        selectedIndex,
    };
};

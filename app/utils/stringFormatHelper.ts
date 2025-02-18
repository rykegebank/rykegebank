export const formatNumber = (value: string, precision: number = 2): string => {
    try {
        const number = parseFloat(value);
        if (isNaN(number)) {
            throw new Error("Invalid number");
        }
        return number.toFixed(precision);
    } catch (e) {
        return value;
    }
};

export const showPercent = (curSymbol: string, s?: string): string => {
    const value = parseFloat(s || "0"); 
    return value > 0 ? ` + ${curSymbol}${value}` : "";
};



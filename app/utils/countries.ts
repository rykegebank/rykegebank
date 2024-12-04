export const getCountry = (data: string): string => {


    return data?.split?.("-")?.[2]
}
export const getMobileCode = (data: string): string => {


    return data?.split?.("-")?.[1]
}
export const getCountryCode = (data: string): string => {


    return data?.split?.("-")?.[0]
}
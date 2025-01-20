import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLocale, setIsLtr, setError, setLoading, setData, setIsInitialized } from '../store/slices/languageSlice';
import { insertData, fetchData } from '../logic/token';
import { languages } from '../constants/strings';
import { SharedPreferenceHelper } from '../constants';
import { useFetchLanguage } from '../data/language/queries';
import { useMutation } from '@tanstack/react-query';
import { URLS } from '../data/urls';
import api from '../data/api';
import { MainLanguageResponseModel } from '../types/language';
import { manageApiException } from '../utils/errorHandler';

export interface Locale {
    languageCode: string;
    countryCode: string;
}

export const useLanguage = () => {
    const dispatch = useDispatch();
    const { locale, isLtr, error, isLoading, languageData, isInitialized } = useSelector((state: any) => state.language);


    useEffect(() => {
        const loadAndInitialize = async () => {
            // Only initialize once
            if (!isInitialized) {
                await loadCurrentLanguage();
                initializeLanguage();
                dispatch(setIsInitialized(true));
            }
        };

        loadAndInitialize();
    }, [isInitialized]);  // Dependency on isInitialized ensures it only triggers once

    const initializeLanguage = () => {
        mutateAsync({
            languageCode: locale.languageCode
        });
    };

    const { mutateAsync } = useMutation({
        mutationFn: async ({ languageCode }: { languageCode: string }) => {
            dispatch(setLoading(true));
            const url = `${URLS.language}${languageCode}`;
            const { data } = await api.get<MainLanguageResponseModel>(url);
            return data;
        },
        onError: (error) => {
            manageApiException(error);
        },
        onSuccess: (data) => {
            if (data.status === 'success') {
                dispatch(setData(data));
                dispatch(setLoading(false));
            } else {
                dispatch(setLoading(false));
                manageApiException(data.message);
            }
        },
    });

    const loadCurrentLanguage = async () => {
        try {
            const languageCode = await fetchData(SharedPreferenceHelper.languageCode);
            const countryCode = await fetchData(SharedPreferenceHelper.countryCode);

            const newLocale = {
                languageCode: languageCode || languages[0].languageCode,
                countryCode: countryCode || languages[0].countryCode,
            };

            dispatch(setLocale(newLocale));

            const isLanguageRtl = newLocale.languageCode === 'ar';
            dispatch(setIsLtr(!isLanguageRtl));

        } catch (error) {
            console.error('Failed to load current language:', error);
        }
    };

    const setLanguage = (newLocale: Locale) => {
        dispatch(setLocale(newLocale));
        dispatch(setIsLtr(newLocale.languageCode !== 'ar'));
        saveLanguage(newLocale);
    };

    const saveLanguage = async (locale: Locale) => {
        await insertData(SharedPreferenceHelper.languageCode, locale.languageCode);
        await insertData(SharedPreferenceHelper.countryCode, locale.countryCode);
    };

    const fetchUpdatedData = async (locale: Locale) => {
        await mutateAsync({
            languageCode: locale.languageCode
        });
    };
    return {
        locale,
        isLtr,
        isLoading,
        languageData,
        error,
        fetchUpdatedData,
        setLanguage,
    };
};

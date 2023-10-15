import React, { createContext, useState, useContext } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage doit être utilisé au sein d\'un LanguageProvider');
    }
    return context;
};
import { Calendar, LocaleConfig } from 'react-native-calendars';
import React, { useContext, useState, useEffect } from 'react';
import { SurvivorContext } from '../../../hooks/context/SurvivorContext';
import {useTheme} from "../../../hooks/useTheme";
import {darkTheme, lightTheme} from "../../../hooks/theme";
import {View} from "react-native";
import { useLanguage } from '../../../hooks/context/LanguageContext';
import translations from './translations.json';

function CalendarScreen() {
    const survivorContext = useContext(SurvivorContext);
    const { darkMode } = useTheme();
    const theme = darkMode ? darkTheme : lightTheme;
    const { language } = useLanguage();

    if (language === "fr") {
        LocaleConfig.locales['fr'] = {
            monthNames: [
              'Janvier',
              'Février',
              'Mars',
              'Avril',
              'Mai',
              'Juin',
              'Juillet',
              'Août',
              'Septembre',
              'Octobre',
              'Novembre',
              'Décembre'
            ],
            monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
            dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
            dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
            today: "Aujourd'hui"
          };
          LocaleConfig.defaultLocale = 'fr';
    } else if (language === "en") {
        LocaleConfig.locales['en'] = {
            monthNames: [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December'
            ],
            monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
            today: "Today"
        };
        LocaleConfig.defaultLocale = 'en';
    }

    const generateEvents = (employeeDetails) => {
        const currentYear = new Date().getFullYear();

        return employeeDetails.reduce((acc, employee) => {
            const originalDate = new Date(employee.birth_date);
            const adjustedDate = new Date(`${currentYear}-${originalDate.getMonth() + 1}-${originalDate.getDate()}`);
            const dateString = adjustedDate.toISOString().split('T')[0];

            if (!acc[dateString]) acc[dateString] = [];
            acc[dateString].push({
                type: 'birthday',
                name: `${employee.name} ${employee.surname}`
            });
            return acc;
        }, {});
    };

    const events = generateEvents(survivorContext.employeeDetails);

    const markedDates = Object.keys(events).reduce((acc, date) => {
        acc[date] = { selected: true, marked: true, selectedColor: '#ff0000' };
        return acc;
    }, {});

    return (
        <View style={{flex: 1, backgroundColor: theme.background}}>
            <View style={{top: 100, padding: 20}}>
                <Calendar
                    key={language}
                    markedDates={markedDates}
                    onDayPress={(day) => {
                        const dateString = day.dateString;
                        if (events[dateString]) {
                            const dayEvents = events[dateString];
                            const birthdayEvents = dayEvents.filter(e => e.type === 'birthday');
                            if (birthdayEvents.length > 0) {
                                alert(`${translations[language].birthdayOn} ${dateString}: ${birthdayEvents.map(e => e.name).join(', ')}`);
                            }
                        }
                    }}
                    theme={{
                        weekVerticalMargin: 10,
                        backgroundColor: theme.background,
                        calendarBackground: theme.background,
                        textSectionTitleColor: theme.text,
                        textSectionTitleDisabledColor: theme.text,
                        selectedDayBackgroundColor: theme.text,
                        selectedDayTextColor: theme.text,
                        todayTextColor: 'blue',
                        dayTextColor: 'grey',
                        textDisabledColor: '#d9e1e8',
                        dotColor: '#00adf5',
                        selectedDotColor: '#ffffff',
                        arrowColor: 'orange',
                        monthTextColor: theme.text,
                        indicatorColor: theme.text,
                        textDayFontFamily: 'monospace',
                        textMonthFontFamily: 'monospace',
                        textDayHeaderFontFamily: 'monospace',
                        textDayFontWeight: '300',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '300',
                        textDayFontSize: 16,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 16
                    }}
                />
            </View>
        </View>
    );
}

export default CalendarScreen;

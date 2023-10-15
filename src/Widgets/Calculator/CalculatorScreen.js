import React, { useState } from 'react'
import { View } from 'react-native'
import { Calculator } from 'react-native-calculator';
import { Text } from 'react-native-elements';
import { useTheme } from '../../../hooks/useTheme';
import { darkTheme, lightTheme } from '../../../hooks/theme';
import getStyles from './Calculator.styles';

export default function CalculatorScreen() {
    const [text, setText] = useState("");
    const { darkMode } = useTheme();
    const theme = darkMode ? darkTheme : lightTheme;
    const styles = getStyles(theme);

    function displayText(newText) {
        setText(newText);
    }

    return (
        <View style={styles.container}>
            <View style={styles.textView}>
                <Text style={styles.text} key={text}>{text}</Text>
            </View>
            <Calculator
                style={styles.calculator}
                hideDisplay={true}
                onTextChange={(text) => displayText(text)}
            />
        </View>
    );
}

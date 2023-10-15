#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
# File name: widget_generator.py
# Author: MasterLaplace
# Description: generate widget

import os
import re

name = input("[Ask] Enter the name of the widget: ")
image = input("[Ask] Import the widget logo: ")
offline = input("[Ask] Is the widget offline? (y/n): ")

if name == "":
    print("[Error] You must enter a name for the widget")
    exit()

if image == "":
    print("[Error] You must enter an image for the widget")
    exit()

if offline == "y":
    offline = True
    print("[Log] Disable axios module.")
else:
    offline = False

# move image to assets folder
os.rename(image, "assets/" + image)

INDEX_CONTENT = """export { default } from './%sScreen';
""" % name

SCREEN_CONTENT ="""import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Linking } from 'react-native';%s
import { useTheme } from "../../../hooks/useTheme";
import { darkTheme, lightTheme } from "../../../hooks/theme";
import getStyles from "./%sScreen.styles";
import { useLanguage } from '../../../../hooks/context/LanguageContext';
import translations from './translations.json';

function %sScreen() {
    const { darkMode } = useTheme();
    const theme = darkMode ? darkTheme : lightTheme;
    const styles = getStyles(theme);
    const { language } = useLanguage();

    return (
        <View style={styles.container}>
        </View>
    );
}

export default %sScreen;
""" % ("\nimport axios from 'axios';" if not offline else "", name, name, name)

STYLES_CONTENT = """import { StyleSheet } from 'react-native';

const getStyles = (theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
    });
};

export default getStyles;
"""

TRANSLATIONS_CONTENT = """{
    "en": {
    },
    "fr": {
    }
}
"""

# create a folder in widgets folder
os.mkdir("src/Widgets/" + name)

# create a file named index.js
f = open("src/Widgets/" + name + "/index.js", "x")
f.write(INDEX_CONTENT)
f.close()

# create a folder named widgets
f = open("src/Widgets/" + name + "/" + name + "Screen.js", "x")
f.write(SCREEN_CONTENT)
f.close()

f = open("src/Widgets/" + name + "/" + name + "Screen.styles.js", "x")
f.write(STYLES_CONTENT)
f.close()

f = open("src/Widgets/" + name + "/" + "translations.json", "x")
f.write(TRANSLATIONS_CONTENT)
f.close()

# Import a widget in App.js
NEW_IMPORT = 'import %sScreen from "../Widgets/%s";' % (name, name)

APP_FILE = """src/App/App.js"""

IMPORT_LINE = """// add import widget here {DO NOT REMOVE THIS LINE}"""

# Regex to find the position where to insert the import
pattern_imports = r'import.*?\/\/ add import widget here {DO NOT REMOVE THIS LINE}'

# Read the file
with open(APP_FILE, 'r') as fichier:
    contenu = fichier.read()

# Find the position where to insert the import
match = re.search(pattern_imports, contenu, re.DOTALL)
if match:
    position_insertion = match.end()
else:
    raise ValueError("[Error] La liste d'import à l'endroit spécifié n'a pas été trouvée dans le fichier.")

# Insert the import in the file
contenu_modifie = contenu[:position_insertion - len(IMPORT_LINE)] + NEW_IMPORT + '\n' + IMPORT_LINE + contenu[position_insertion:]

# Write the file with the new import
with open(APP_FILE, 'w') as fichier:
    fichier.write(contenu_modifie)

print(f"[Log] L'import '{NEW_IMPORT}' a été ajouté avec succès dans {APP_FILE}.")


NEW_STACK = "                <Stack.Screen name=\"%s\" component={%sScreen} options={{ title: '%s', ...commonScreenOptions }}/>" % (name, name, name)

STACK_LINE = "                {/*add widget here {DO NOT REMOVE THIS LINE}*/}"
"                {/*add widget here {DO NOT REMOVE THIS LINE}"

pattern_stack = r'add widget here {DO NOT REMOVE THIS LINE}\*\/}'

# Read the file
with open(APP_FILE, 'r') as fichier:
    contenu = fichier.read()

# Find the position where to insert the import
match = re.search(pattern_stack, contenu, re.DOTALL)
if match:
    position_insertion = match.end()
else:
    raise ValueError("[Error] La liste d'import à l'endroit spécifié n'a pas été trouvée dans le fichier.")

# Insert the import in the file
contenu_modifie = contenu[:position_insertion - len(STACK_LINE)] + NEW_STACK + '\n' + STACK_LINE + contenu[position_insertion:]

# Write the file with the new import
with open(APP_FILE, 'w') as fichier:
    fichier.write(contenu_modifie)

print(f"[Log] L'import '{NEW_STACK}' a été ajouté avec succès dans {APP_FILE}.")

HOME_FILE = """src/HomeScreen/HomeScreen.js"""


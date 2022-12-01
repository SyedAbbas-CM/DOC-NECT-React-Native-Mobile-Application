import { View } from 'react-native';
import Navigation from './src/Navigation';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { enGB, registerTranslation, } from 'react-native-paper-dates';
import { authContext, themeContext } from './src/context';
import { DarkTheme, LightTheme } from './src/themes';

import {useState } from 'react';
registerTranslation('en', enGB)

//main app
export default function App() {
  const [auth, setAuth] = useState({});
  const [theme, _setTheme] = useState(LightTheme);

  const setTheme = (color) => {
    console.log("new theme: ", color)
    if (color == "DARK")
      _setTheme(DarkTheme);
    else if (color == "LIGHT")
      _setTheme(LightTheme);
  }

  return (
    <authContext.Provider value={{auth, setAuth}}>
      <themeContext.Provider value={{theme, setTheme}}>
        <View style={{flex : 1}}>
          <Navigation/>
        </View>
      </themeContext.Provider>
    </authContext.Provider>
  );
}

import { View } from 'react-native';
import Navigation from './src/Navigation';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { enGB, registerTranslation, } from 'react-native-paper-dates';
import authContext from './src/context';
import {useState } from 'react';

registerTranslation('en', enGB)

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: "gray",
    primary: "#007fff",
    secondary: "#009fff"
  },
};


//main app
export default function App() {
  const [auth, setAuth] = useState({});

  return (
    <PaperProvider  theme={theme}>
      <authContext.Provider value={{auth, setAuth}}>
        <View style={{flex : 1}}>
          <Navigation/>
        </View>
      </authContext.Provider>
    </PaperProvider>
  );
}

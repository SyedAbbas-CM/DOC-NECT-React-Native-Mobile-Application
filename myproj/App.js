import { View } from 'react-native';
import Navigation from './src/Navigation';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: "gray",
    primary: "#007fff"
  }
};

//main app
export default function App() {
  return (
    <PaperProvider theme={theme}>
      <View style={{flex : 1}}>
        <Navigation/>
      </View>
    </PaperProvider>
  );
}

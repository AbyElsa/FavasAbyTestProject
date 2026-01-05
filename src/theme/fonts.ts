import { loadAsync } from 'expo-font';

export const loadFonts = () =>
  loadAsync({
    bold: require('@assets/Fonts/Roboto-Bold.ttf'),
    light: require('@assets/Fonts/Roboto-Light.ttf'),
    medium: require('@assets/Fonts/Roboto-Medium.ttf'),
    regular: require('@assets/Fonts/Roboto-Regular.ttf'),
  });

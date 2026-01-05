import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import Navigator from '@navigator';
import { loadImages, loadFonts } from '@theme';
import 'react-native-gesture-handler';
import { store } from '@utils/store';
import { StatusBar } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setReady] = useState<boolean>(false);

  const preloadAssets = async () => {
    try {
      await Promise.all([loadImages(), loadFonts()]);
    } finally {
      setReady(true);
      SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    preloadAssets();
  }, []);

  if (!isReady) return null;
  return (
    <Provider store={store}>
      <Navigator />
      <StatusBar backgroundColor={'#D0E4FF'} barStyle={'dark-content'} />
    </Provider>
  );
}

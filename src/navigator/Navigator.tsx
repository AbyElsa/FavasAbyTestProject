import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './tab/Tab';

function Navigator() {

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

export default Navigator;

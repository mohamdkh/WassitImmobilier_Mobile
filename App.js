import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import WelcomeScreen from './src/WelcomeScreen';
import WelcomeContext from './src/context/welcomecontext';
import MainTabScreen from './src/MainTabScreen';
import AddAnnonceScreen from './src/AddAnnonceScreen';

const Drawer = createDrawerNavigator();
const App = () => {
  const welContext=React.useMemo(()=>({
    TogglePageWelcome:()=>{
      setCloseWelcomeP(!CloseWelcomeP)
      console.log(CloseWelcomeP)
    }
  }))
  const [CloseWelcomeP,setCloseWelcomeP]=React.useState(true);
  return (
    <>
    <WelcomeContext.Provider value={welContext}>
      <NavigationContainer>
        {
        CloseWelcomeP?
        (
        <WelcomeScreen/>
        )
        :
        (
          <Drawer.Navigator initialRouteName="Home"
          //  drawerContent={props => <DrawerContent {...props} />}
           >
              <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
            </Drawer.Navigator>
        )
      }
      </NavigationContainer>
      </WelcomeContext.Provider>
    </>
  );
}
export default App;

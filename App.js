import React from 'react';
import {Image} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import CoinStack from 'StockTracker/src/components/coins/CoinsStack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Colors from './src/res/color'

const Tabs = createBottomTabNavigator()
const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          tintColor:"fefefe",
          style:{
            backgroundColor: Colors.blackPearl
          }
        }}
      >
        <Tabs.Screen
          name = "Coins"
          component = {CoinStack}
          options = {{
            tabBarIcon:({size,color}) =>{
              <Image
                style={{tintColor: color, width: size, height: size}}
                source = {require('StockTracker/src/assets/bank.png')}
              />
            }
          }}
          />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;

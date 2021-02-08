import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import CoinStack from 'StockTracker/src/components/coins/CoinsStack'

const App = () => {
  return (
    <NavigationContainer>
      <CoinStack/>
    </NavigationContainer>
  );
};

export default App;

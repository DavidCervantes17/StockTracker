import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import FavoritesScreen from './FavoriteScreen'
import Colors from '../../res/color'

const Stack = createStackNavigator()

const FavoritesStack = () => {
    return (
        <Stack.Navigator
        screenOptions={{
            headerStyle:{
                backgroundColor: Colors.blackPearl,
                shadowColor: Colors.blackPearl
            },
            headerTintColor: Colors.white
        }}
        >
            <Stack.Screen
                name = "Favoritos"
                component = {FavoritesScreen}
            />
        </Stack.Navigator>
    )
}

export default FavoritesStack 
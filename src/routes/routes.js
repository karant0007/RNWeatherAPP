import React from "react";

import { createStackNavigator } from '@react-navigation/stack';
 
import { NavigationContainer } from "@react-navigation/native";
import List from "../screens/List"; 
import Details from "../screens/Details";
 
 

const Stack = createStackNavigator();

function routes() {
    return (
        <NavigationContainer>
        <Stack.Navigator>
        {/* <Stack.Screen name="splash" options={{headerShown:false}} component={splash}/> */}
        <Stack.Screen name="main" options={{headerShown:false}} component={List}/>
        <Stack.Screen name="details" options={{headerShown:false}} component={Details}/>

 </Stack.Navigator>
        </NavigationContainer>
    );
}
export default routes;
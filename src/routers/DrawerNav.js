import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Card3D from '@/screens/Card3D';
import Goo from '@/screens/Goo';

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Card3D" component={Card3D} />
      <Drawer.Screen name="Goo" component={Goo} />
    </Drawer.Navigator>
  );
}

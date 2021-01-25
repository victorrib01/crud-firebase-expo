import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Index from './src/Index';
import Edit from './src/Edit';

const AppNavigator = createSwitchNavigator({
  Index: Index,
  Edit: Edit
},
{
  initialRouteName: 'Index',
}
)

export default createAppContainer(AppNavigator);
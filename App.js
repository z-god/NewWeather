import { createAppContainer, createStackNavigator, createBottomTabNavigator,StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import MainScreen from './js/Home'
import WelecomeScreen from './js/Welecome'

const MainNavigationStack = createStackNavigator({
  Welecome:{
    screen:WelecomeScreen,
  },
  Home:{
    screen:MainScreen
  }
},{
  initialRouteName:'Welecome',
  defaultNavigationOptions:{
    header:null,
  }
})

export default createAppContainer(MainNavigationStack);
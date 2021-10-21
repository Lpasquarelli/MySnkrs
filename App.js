
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import OnboardingScreen from './src/screens/OnBoarding/OnboardingScreen'
import LoginScreen from './src/screens/Login/LoginScreen'

import AsyncStorage from '@react-native-community/async-storage';

const AppStack = createStackNavigator();
import { AuthContext } from './src/components/config/context';

const App = () => {

  
  const initialLoginState = { 
    isLoading : true,
    userName: null,
    userToken: null,
  }
  const loginReducer = (prevState, action) => {
    switch( action.type){
      case 'RETRIEVE_TOKEN':
        return{
          ...prevState,
          userToken: action.token,
          isLoading:false
        };
      case 'LOGIN':
        return{
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading:false
        };
      case 'LOGOUT':
        return{
          ...prevState,
          userName: null,
          userToken: null,
          isLoading:false
        };
    }
  }
  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState)

  const authContext = React.useMemo(() => ({
    signIn: async (foundUser) => {
      //API Call 
      const userToken = String(foundUser[0].userToken);
      const userName = foundUser[0].userName;
      try {
        await AsyncStorage.setItem('userToken', userToken)
      }catch(e){
        console.log(e)
      }
      dispatch({type: 'LOGIN' , id: userName, token: userToken})
    },
    signOut: async () => {

      try {
        await AsyncStorage.removeItem('userToken')
      }catch(e){
        console.log(e)
      }

      dispatch({type: 'LOGOUT'})
    }
  }),[])

  const [isFirstLaunch, setIsFirstLaunch] = useState(null)

  React.useEffect(() => {
    AsyncStorage.getItem('alreadyLaunch').then(value => {
      if(value == null){
        AsyncStorage.setItem('alreadyLaunch', 'true');
        setIsFirstLaunch(true)
      }else{
        setIsFirstLaunch(false)
      }
    })
  }, [])

  if(isFirstLaunch === null){
    return(
      <NavigationContainer>
        <AppStack.Navigator screenOptions={{headerShown: false}} >
          <AppStack.Screen name={'Onboarding'} component={OnboardingScreen} />
          <AppStack.Screen name={'Login'} component={LoginScreen} />
        </AppStack.Navigator>
      </NavigationContainer>
    )
  } else if(isFirstLaunch === true){
    return(
      <NavigationContainer>
        <AppStack.Navigator screenOptions={{headerShown: false}} >
          <AppStack.Screen name={'Onboarding'} component={OnboardingScreen} />
          <AppStack.Screen name={'Login'} component={LoginScreen} />
        </AppStack.Navigator>
      </NavigationContainer>
    )
  }else{
    return(
      <NavigationContainer>
        <AppStack.Navigator screenOptions={{headerShown: false}} >
          <AppStack.Screen name={'Onboarding'} component={OnboardingScreen} />
          <AppStack.Screen name={'Login'} component={LoginScreen} />
        </AppStack.Navigator>
      </NavigationContainer>
    )
  }
}

export default App;

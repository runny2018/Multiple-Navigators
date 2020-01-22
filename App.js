import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { 
  createSwitchNavigator,
  createAppContainer,
  
} from 'react-navigation'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createStackNavigator} from 'react-navigation-stack'
import Icon from '@expo/vector-icons/Ionicons'



class WelcomeScreen extends Component{
  render(){
    return(
      <View style={styles.container}>
        <Button 
          title="Login"
          onPress={()=>this.props.navigation.navigate("Dashboard")}
          ></Button>
        <Button 
          title="SignUp"
          onPress={()=> alert("Button Pressed")}
          ></Button>
      </View>
    )
  }
}

class DashboardScreen extends Component{
  render(){
    return(
      <View style={styles.container}>
        <Text>Dashboard</Text>
      </View>
    )
  }
}

//The Dashboard Tabs are here below

class Feed extends Component{
  render(){
    return(
      <View style={styles.container}>
        <Button title="Go to the details screen"
                onPress={()=>this.props.navigation.navigate('Detail')}/>
      </View>
    )
  }
}

class Profile extends Component{
  render(){
    return(
      <View style={styles.container}>
        <Text>Profile</Text>
      </View>
    )
  }
}

class Settings extends Component{
  render(){
    return(
      <View style={styles.container}>
        <Text>Settings</Text>
      </View>
    )
  }
}

const Details = props => (
  <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
    <Text>Detail</Text>
  </View>
)

const SettingsStack=createStackNavigator({
  Settings:{
    screen: Settings,
    navigationOptions: ({navigation})=>{
      return {
        //headerTitle:"Settings",               //Feed name is automatically give. That's why I commented the headerTitle code
        headerLeft: ()=>
          <Icon name="md-menu"
                            size={30}
                            style={{paddingLeft:10}} 
                            onPress={()=> navigation.openDrawer()} />
        
      }
    }
  }
})

const ProfileStack=createStackNavigator({
  Profile:{
    screen: Profile,
    navigationOptions: ({navigation})=>{
      return {
        //headerTitle:"Feed",               //Feed name is automatically give. That's why I commented the headerTitle code
        headerLeft: ()=>
          <Icon name="md-menu"
                            size={30}
                            style={{paddingLeft:10}} 
                            onPress={()=> navigation.openDrawer()} />
        
      }
    }
  }
})

const FeedStack=createStackNavigator({
  Feed:{
    screen: Feed,
    navigationOptions: ({navigation})=>{
      return {
        //headerTitle:"Feed",               //Feed name is automatically give. That's why I commented the headerTitle code
        headerLeft: ()=>
          <Icon name="md-menu"
                            size={30}
                            style={{paddingLeft:10}} 
                            onPress={()=> navigation.openDrawer()} />
        
      }
    }
  },
  Detail:{
    screen: Details
  }
},
{
  defaultNavigationOptions:{
    gestureEnabled:false                               //disables gestures in iOS (right swiping to go to previous screen)
  }
}
)

const DashboardTabNavigator=createBottomTabNavigator({
  FeedStack,
  ProfileStack,
  SettingsStack
},{
  navigationOptions:({navigation})=>{
    const {routeName}=navigation.state.routes[navigation.state.index]
    return{
      header:null,
      headerTitle:routeName
    }
  }
})

const DashboardStackNavigator=createStackNavigator({
  DashboardTabNavigator:DashboardTabNavigator
},
{
  defaultNavigationOptions: ({navigation}) =>{
    return{
      headerLeft:()=> <Icon name="md-menu"
                            size={30}
                            style={{paddingLeft:10}} 
                            onPress={()=> navigation.openDrawer()} />
    }
  }
})

const AppDrawerNavigator=createDrawerNavigator({
  Dashboard:{screen:DashboardStackNavigator}
})

const AppSwitchNavigator=createSwitchNavigator({
  Welcome:{screen:WelcomeScreen},
  Dashboard:{screen:AppDrawerNavigator}
})

const AppContainer=createAppContainer(AppSwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class App extends Component {
  render(){
    return <AppContainer/>
  }
}

export default App

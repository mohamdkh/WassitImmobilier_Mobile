import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';
import {View,Text, Button} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

//*Screen
import HomeScreen from './HomeScreen'
import MapScreen from './MapScreen'
import ContactScreen from './ContactScreen'
import NotificationScreen from './NotificationScreen'
import DetailAnnonceScreen from './DetailAnnonceScreen'
import AddAnnonceScreen from './AddAnnonceScreen'
import MyAnnonceDetails from './MyAnnonceDetails';

const Tab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const MapStack=createStackNavigator();
const ContactStack=createStackNavigator();
const NotificationStack=createStackNavigator();

const HomeStackScreen =({navigation})=>{
    return(
        <HomeStack.Navigator screenOptions={{
            headerStyle:{
             backgroundColor:'#009387',
           },
           headerTintColor:'#fff',
           headerTitleStyle:{
             fontWeight:'bold'
           }
         }}>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{
                title:"Page d'accueil",
                
       }}/>
          </HomeStack.Navigator>
    )
}
const MapStackScreen=({navigation})=>{
    return (
        <MapStack.Navigator screenOptions={{
            headerStyle:{
             backgroundColor:'#009387',
           },
           headerTintColor:'#fff',
           headerTitleStyle:{
             fontWeight:'bold'
           }
         }}>
        <MapStack.Screen name="Home" component={MapScreen} options={{
                        title:"Exploration",
            }}/>
          <MapStack.Screen name="detailannonce" component={DetailAnnonceScreen} options={{
                        title:"Détail",
                        
            }}/>
             <MapStack.Screen name="AddAnnonce" component={AddAnnonceScreen} options={{
                        title:"Ajout d'une annonce",
                       
            }}/>

         </MapStack.Navigator> 
    )
}
const ContactStackScreen=({navigation})=>{
    return (
        <ContactStack.Navigator screenOptions={{
            headerStyle:{
             backgroundColor:'#009387',
           },
           headerTintColor:'#fff',
           headerTitleStyle:{
             fontWeight:'bold'
           }
         }}>
            <MapStack.Screen name="Home" component={ContactScreen} options={{
                        title:"Contact",
                        
            }}/>
         </ContactStack.Navigator>
    )
}
const NotificationStackScreen=({navigation})=>{
    return (
    <NotificationStack.Navigator screenOptions={{
        headerStyle:{
         backgroundColor:'#009387',
       },
       headerTintColor:'#fff',
       headerTitleStyle:{
         fontWeight:'bold'
       }
     }}>
       <MapStack.Screen name="Home" component={NotificationScreen} options={{
                        title:"Mes annonces",
                       
            }}/>
        <MapStack.Screen name="mydetailannonce" component={MyAnnonceDetails} options={{
                        title:"Détail annonce",
                       
            }}/>
      </NotificationStack.Navigator>
      )
}

const MainTabScreen=()=>(
    <Tab.Navigator
            initialRouteName="Home"
            shifting={true}
            labeled={false}
            sceneAnimationEnabled={false}
            activeColor="#fff"
            inactiveColor="#95a5a6"
            barStyle={{ backgroundColor: '#ffff' }}
            >
               <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                tabBarLabel: 'Accueil',
                tabBarColor:'#009387',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
                }}
            />
            <Tab.Screen
                name="Exploration"
                component={MapStackScreen}
                options={{
                tabBarLabel: 'Exploration',
                tabBarColor:'#009387',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="map-marker-multiple" color={color} size={26} />
                ),
                }}
            />
            <Tab.Screen
                name="Notification"
                component={NotificationStackScreen}
                options={{
                tabBarLabel: 'Notification',
                tabBarColor:'#009387',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="bell" color={color} size={26} />
                ),
                }}
            />
            <Tab.Screen
                name="Contact"
                component={ContactStackScreen}
                options={{
                tabBarLabel: 'Contact',
                tabBarColor:'#009387',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="email-send" color={color} size={26} />
                ),
                }}
            /> 
            </Tab.Navigator>
);
export default MainTabScreen;
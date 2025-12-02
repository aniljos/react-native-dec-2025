import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import {createStaticNavigation} from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack' 
import TeamsScreen from './screens/TeamsScreen';
import TeamDetailsScreen from './screens/TeamDetailsScreen';
import PlayersInfoScreen from './screens/PlayersInfoScreen';
import AddPlayerScreen from './screens/AddPlayerScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllPlayersScreen from './screens/AllPlayersScreen';
import GroupwisePlayers from './screens/GroupwisePlayers';
import {Ionicons} from '@expo/vector-icons';


const PlayersInfoTab = createBottomTabNavigator({
  initialRouteName: "teamwisePlayers",
  screenOptions:{
    headerShown: false
  },
  screens: {
    allPlayers: {
      screen: AllPlayersScreen,
      options: {
        title: "All",
        tabBarIcon: () => (<Ionicons name='people' />)
      }
    },
    groupwisePlayers: {
      screen: GroupwisePlayers,
      options: {
        title: "Group",
        tabBarIcon: () => (<Ionicons name='list' />)
      }
    },
    teamwisePlayers: {
      screen: PlayersInfoScreen,
      options: {
        title: "Team",
        tabBarIcon: () => (<Ionicons name='information-circle' />)
      }
    },
  }
})

const RootStack = createNativeStackNavigator({
  initialRouteName: 'teams',
  screenOptions: {
    headerStyle:{backgroundColor: '#9dd2d3ff'}
  },
  screens: {
    teams: {
      screen: TeamsScreen,
      options:{
        title: 'IPLTeams',
      //  headerStyle:{backgroundColor: '#9dd2d3ff'},
      }
    },
    teamdetails: TeamDetailsScreen,
    playersInfo: {
      screen: PlayersInfoTab,
      options: {
        
      }
    },
    newPlayer: AddPlayerScreen
  }
})

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <Navigation/>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
});

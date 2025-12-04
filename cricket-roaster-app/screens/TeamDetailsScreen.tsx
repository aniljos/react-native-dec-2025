import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackNavigationType } from '../navigation/RootStackNatigationType';

const TeamDetailsScreen = () => {

  const route = useRoute<RouteProp<RootStackNavigationType>>();

  const team = route.params as any;
  console.log("TeamDetailsScreen route", route);
  return (
    <View>
      <Text>TeamDetails Screen</Text>

      <Text>Team Name: {team.name}</Text>
      <Text>Captain: {team.captain}</Text>
      <Text>Owner: {team.owner}</Text>
    </View>
  )
}

export default TeamDetailsScreen

const styles = StyleSheet.create({})
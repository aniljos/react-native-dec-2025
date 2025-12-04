import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackNavigationType } from '../navigation/RootStackNatigationType'

const PlayersInfoScreen = () => {

  const route = useRoute<RouteProp<RootStackNavigationType>>();

  const team = route.params as any;

  return (
    <View>
      <Text>Players Info Screen</Text>
      <Text>Players for the team: {team.name}</Text>
    </View>
  )
}

export default PlayersInfoScreen

const styles = StyleSheet.create({})
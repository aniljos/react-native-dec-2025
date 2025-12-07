import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

import { RootStackNavigationType } from '../navigation/RootStackNatigationType';
import { baseUrl } from '../config/env';

const TeamDetailsScreen = () => {
  const route = useRoute<RouteProp<RootStackNavigationType, 'teamdetails'>>();
  const team = route.params as any;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: `${baseUrl}/${team.logo}` }} style={styles.logo} />

      <View style={styles.card}>
        <Text style={styles.title}>{team.name}</Text>
        <Text style={styles.subTitle}>Captain: <Text style={styles.highlight}>{team.captain}</Text></Text>

        <View style={styles.row}>
          <Text style={styles.label}>Short Name</Text>
          <Text style={styles.value}>{team.shortName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>City</Text>
          <Text style={styles.value}>{team.city}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Owner</Text>
          <Text style={styles.value}>{team.owner}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Championships</Text>
          <Text style={styles.value}>{team.championshipsWon}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Indian Players</Text>
          <Text style={styles.value}>{team.totalNoOfIndianPlayers}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Foreign Players</Text>
          <Text style={styles.value}>{team.totalNoOfForeignPlayers}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default TeamDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  logo: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 16,
    backgroundColor: '#e2e8f0',
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },
  subTitle: {
    fontSize: 16,
    color: '#475569',
    marginTop: 4,
    marginBottom: 12,
  },
  highlight: {
    color: '#0f172a',
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  label: {
    color: '#475569',
    fontWeight: '600',
  },
  value: {
    color: '#0f172a',
    fontWeight: '600',
  },
});

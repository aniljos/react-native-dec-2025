import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { baseUrl } from '../config/env';
import axios from 'axios';
import { Player, TeamSection } from '../models/Player';

const TeamPlayers = () => {
  const [data, setData] = useState<TeamSection[]>([]);
  const [sections, setSections] = useState<{ title: string, data: Player[] }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`${baseUrl}/players/grouped`);
        
        const json: TeamSection[] =  response.data;
        setData(json);
        setSections(json.map(item => {
          return {
            title: item.teamName,
            data: item.members
          }
        }))
      } catch (err: any) {
        setError(err?.message || 'Failed to load players');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.uniquePlayerId || item.playerName}
      renderSectionHeader={({ section }) => (
        <View style={styles.header}>
          <Text style={styles.teamName}>{section.title}</Text>
        </View>
      )}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Text style={styles.playerName}>{item.playerName}</Text>
          <Text style={styles.meta}>{item.role ? item.role : ''}</Text>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      SectionSeparatorComponent={() => <View style={styles.sectionSeparator} />}
      contentContainerStyle={styles.listContent}
      
    />
   
    
  );
};

export default TeamPlayers;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    padding: 16,
  },
  header: {
    backgroundColor: '#f8fafc',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#22c55e',
  },
  teamName: {
    fontWeight: '700',
    fontSize: 16,
    color: '#0f172a',
  },
  row: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  playerName: {
    color: '#0f172a',
    fontWeight: '600',
    marginBottom: 2,
  },
  meta: {
    color: '#475569',
  },
  separator: {
    height: 8,
  },
  sectionSeparator: {
    height: 14,
  },
  error: {
    color: '#ef4444',
  },
});

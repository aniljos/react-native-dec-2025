import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import axios from 'axios';

import { RootStackNavigationType } from '../navigation/RootStackNatigationType';
import { baseUrl } from '../config/env';
import { Player } from '../models/Player';

const countryColors: Record<string, string> = {
  India: '#e0f2fe',
  Australia: '#fef3c7',
  England: '#e2e8f0',
  'South Africa': '#dcfce7',
  'New Zealand': '#e5e7eb',
  'Sri Lanka': '#e0e7ff',
  Pakistan: '#ecfdf3',
  Afghanistan: '#f1f5f9',
  Bangladesh: '#ffe4e6',
  'West Indies': '#f3e8ff',
};



const PlayersInfoScreen = () => {
  const route = useRoute<RouteProp<RootStackNavigationType, 'playersInfo'>>();
  const rawParams = route.params as { name?: string; };
  const teamName = rawParams?.name  || '';
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!teamName) return;
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await axios.get<Player[] | { players: Player[] }>(`${baseUrl}/players`, {
          params: { teamName },
        });
        const data = Array.isArray(res.data) ? res.data : res.data?.players || [];
        console.log(res.data);
        setPlayers(data || []);
      } catch (err) {
        console.error('Error fetching players', err);
        setError('Could not load players. Pull to retry.');
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, [teamName]);

  const renderPlayer = ({ item }: { item: Player }) => {
    const bg = countryColors[item.countryName?item.countryName:"India"] || '#e2e8f0';
    return (
      <View style={[styles.card, { backgroundColor: bg }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator
          contentContainerStyle={styles.scrollContent}
          style={styles.detailScroll}
        >
          <View style={[styles.infoPanel, styles.primaryPanel]}>
            <View style={styles.cardTop}>
              {item.image ? (
                <Image source={{ uri: `${baseUrl}/${item.image}` }} style={styles.avatar} />
              ) : (
                <View style={[styles.avatar, styles.placeholderAvatar]}>
                  <Text style={styles.avatarText}>{item.playerName?.[0] || '?'}</Text>
                </View>
              )}
              <View style={styles.mainInfo}>
                <Text style={styles.name}>{item.playerName}</Text>
                <Text style={styles.role}>{item.role || 'Role n/a'}</Text>
                <Text style={styles.country}>{item.countryName || 'Country n/a'}</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoPanel}>
            <Text style={styles.detailLine}>Age: {item.age || '-'}</Text>
            <Text style={styles.detailLine}>Batting: {item.battingStyle || '-'}</Text>
            <Text style={styles.detailLine}>Runs: {item.runsScored ?? 0}</Text>
            <Text style={styles.detailLine}>100s: {item.centuriesScored ?? 0}</Text>
            <Text style={styles.detailLine}>Wkts: {item.wicketsTaken ?? 0}</Text>
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{teamName || 'Team Players'}</Text>
      <Text style={styles.subtitle}>Swipe to explore roster ➜</Text>

      {loading && (
        <View style={styles.state}>
          <ActivityIndicator color="#22c55e" />
          <Text style={styles.stateText}>Loading players...</Text>
        </View>
      )}

      {error ? (
        <View style={styles.state}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {!loading && !players.length ? (
        <View style={styles.state}>
          <Text style={styles.stateText}>No players found for this team.</Text>
        </View>
      ) : (
        <FlatList
          data={players}
          keyExtractor={item => item.uniquePlayerId || item.playerName}
          renderItem={renderPlayer}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

export default PlayersInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  title: {
    color: '#0f172a',
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    color: '#475569',
    marginTop: 4,
    marginBottom: 12,
  },
  listContent: {
    paddingVertical: 8,
    paddingBottom: 24,
  },
  card: {
    width: '100%',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  scrollContent: {
    paddingRight: 12,
  },
  infoPanel: {
    width: 260,
    padding: 12,
    backgroundColor: '#ffffffbb',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    marginRight: 12,
  },
  primaryPanel: {
    minWidth: 280,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: '#e2e8f0',
  },
  placeholderAvatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#0f172a',
    fontWeight: '700',
    fontSize: 24,
  },
  mainInfo: {
    marginLeft: 12,
  },
  name: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '700',
  },
  role: {
    color: '#475569',
    marginTop: 4,
  },
  country: {
    color: '#0f172a',
    marginTop: 4,
    fontWeight: '600',
  },
  detailScroll: {
    marginTop: 8,
  },
  detailChip: {
    backgroundColor: '#ffffffaa',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 8,
    color: '#0f172a',
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  detailLine: {
    color: '#0f172a',
    marginBottom: 6,
    fontWeight: '500',
  },
  state: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stateText: {
    color: '#475569',
    marginTop: 8,
  },
  errorText: {
    color: '#ef4444',
  },
});

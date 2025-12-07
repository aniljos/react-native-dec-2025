import React, { useEffect, useState, useCallback } from 'react';
import {
  ActivityIndicator,
  Image,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { baseUrl } from '../config/env';
import { Player } from '../models/Player';

const AllPlayersScreen = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const res = await fetch(`${baseUrl}/players/all`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const list: Player[] = Array.isArray(json) ? json : json.players;
      setPlayers(list || []);
      setError(null);
    } catch (err: any) {
      setError(err?.message || 'Failed to load players');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const renderItem = ({ item }: { item: Player }) => (
    <View style={styles.row}>
      <View style={styles.avatarWrapper}>
        <View style={styles.avatar}>
          {item.image ? (
            <Image
              source={{
                uri: item.image.startsWith('http')
                  ? item.image
                  : `${baseUrl}/${item.image.replace(/^\//, '')}`,
              }}
              style={styles.avatarImg}
            />
          ) : (
            <Text style={styles.avatarFallback}>{item.playerName?.[0] || '?'}</Text>
          )}
        </View>
      </View>
      <View style={styles.details}>
        <Text style={styles.playerName}>{item.playerName}</Text>
        <Text style={styles.meta}>
          {item.role || 'Role n/a'}
          {item.teamName ? ` • ${item.teamName}` : ''}
        </Text>
      </View>
    </View>
  );

  if (loading && !refreshing && players.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  }

  if (error && players.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
        <Text style={styles.hint}>Pull to retry.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={players}
      keyExtractor={(item) => item.uniquePlayerId || item.playerName}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={
        <Text style={styles.headerTitle}>All Players</Text>
      }
      ListFooterComponent={
        <Text style={styles.footerText}>
          End of roster • {players.length} {players.length === 1 ? 'player' : 'players'}
        </Text>
      }
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => load(true)} colors={['#22c55e']} />
      }
      ListEmptyComponent={
        !loading ? <Text style={styles.hint}>No players found. Pull to refresh.</Text> : null
      }
    />
  );
};

export default AllPlayersScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  listContent: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  avatarWrapper: {
    width: 48,
    height: 48,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  avatarFallback: {
    color: '#0f172a',
    fontWeight: '700',
    fontSize: 16,
  },
  details: {
    flex: 1,
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
    height: 10,
  },
  error: {
    color: '#ef4444',
    marginBottom: 6,
  },
  hint: {
    color: '#94a3b8',
  },
  footerText: {
    marginTop: 16,
    color: '#94a3b8',
    textAlign: 'center',
  },
});

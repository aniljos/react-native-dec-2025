import { Button, Platform, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TouchableHighlight, Pressable, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackNavigationType } from '../navigation/RootStackNatigationType';
import axios from 'axios';
import { baseUrl } from '../config/env';

const TeamsScreen = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackNavigationType>>();
    const [teams, setTeams] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isRefreshing, setRefreshing] = useState(false);
    //const navigation = useNavigation();

    useEffect(() => {
        fetchTeams();
    }, [])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchTeams();
        });

        return unsubscribe;
    }, [navigation]);


    
    async function fetchTeams() {
        try {
            // IOS => const url = "http://localhost:9000/teams";
            // Android => const url = "http://10.0.2.2:9000/teams";

            setLoading(true);
            const url = baseUrl + "/teams";
            const response = await axios.get(url);
          //  await new Promise(resolve => setTimeout(resolve, 5000)); // Artificial Delay
           // console.log(response);
            setTeams(response.data.teams);
            setLoading(false);

        } catch (error) {
            console.log("failed to fetch teams", error);
            setLoading(false);

        }
    }

    function navigateToPlayersInfo(team: any) {
        navigation.navigate('playersInfo', {
            screen: "teamwisePlayers",
            params: team
        } as any);
    }

    function navigateToDetails(team: any) {
        navigation.navigate('teamdetails', team);
        //navigation.navigate('teamdetails', {name: "abc"});
    }

    async function onRefresh() {
        setRefreshing(true);
        await fetchTeams();
        setRefreshing(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Teams</Text>
                <Text style={styles.helper}>Press a team to view players • Long press for team details</Text>
            </View>

            <ScrollView style={{}} 
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} 
                        progressBackgroundColor='#350ee0ff'/>}>


                {isLoading ? <ActivityIndicator size="large" color="#8f0808ff" /> : null}

                {teams.map((team: any) => {
                    return (
                        <Pressable
                            key={team.shortName}
                            onPress={() => navigateToPlayersInfo(team)}
                            onLongPress={() => navigateToDetails(team)}
                            style={({ pressed }) => pressed ? styles.itemPressed : styles.item}>

                            <View style={styles.row}>
                                <Image source={{ uri: `${baseUrl}/${team.logo}` }} style={styles.image} />
                                <View style={styles.meta}>
                                    <Text style={styles.teamName}>{team.name}</Text>
                                    <Text style={styles.metaText}>Short Name: {team.shortName}</Text>
                                    <Text style={styles.metaText}>Captain: {team.captain}</Text>
                                    <Text style={styles.metaText}>Championships: {team.championshipsWon ?? 'N/A'}</Text>
                                </View>
                            </View>

                        </Pressable>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default TeamsScreen

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    header: {
        margin: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
        color: '#0f172a',
        letterSpacing: 0.5,
    },
    helper: {
        marginTop: 4,
        color: '#0ea5e9',
        fontSize: 14,
    },
    item: {
        margin: 8,
        padding: 16,
        backgroundColor: '#ffffff',
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    itemPressed: {
        margin: 8,
        padding: 16,
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        opacity: 0.9,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    image: {
        height: 72,
        width: 72,
        borderRadius: 36,
        backgroundColor: '#e2e8f0',
    },
    meta: {
        flex: 1,
    },
    teamName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 4,
    },
    metaText: {
        fontSize: 14,
        color: '#475569',
        marginTop: 2,
    },
})

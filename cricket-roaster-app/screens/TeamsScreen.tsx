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
            <View style={{ margin: 10, padding: 20, borderWidth: 2, borderColor: '#31836bff' }}>
                <Text style={styles.title}>Teams Screen</Text>
            </View>

            <ScrollView style={{}} 
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} 
                        progressBackgroundColor='#350ee0ff'/>}>


                {isLoading ? <ActivityIndicator size="large" color="#8f0808ff" /> : null}

                {teams.map((team: any) => {
                    return (
                        <Pressable key={team.shortName} onPress={() => navigateToPlayersInfo(team)}
                            onLongPress={() => navigateToDetails(team)}
                            style={({ pressed }) => pressed ? styles.itemPressed : styles.item}>

                            {/* <View style={styles.item}> */}
                            <Image source={{ uri: `${baseUrl}/${team.logo}` }}
                                style={styles.image} />
                            <Text style={styles.itemText}>{team.name}</Text>
                            {/* </View> */}

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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    item: {
        margin: 8,
        padding: 30,
        backgroundColor: '#5a8687ff',
        shadowColor: '#192d2dff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    itemPressed: {
        margin: 8,
        padding: 30,
        backgroundColor: '#5a8687ff',
        // shadowColor: '#192d2dff',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8

    },
    image: {
        height: 120,
        width: 120,
        borderRadius: 60,
        marginBottom: 10
    },
    itemText: {
        fontSize: 18,
        color: '#2516abff',
    }
})

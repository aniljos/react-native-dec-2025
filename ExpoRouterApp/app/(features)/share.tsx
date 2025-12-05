import React, { useState } from 'react';
import { Alert, Button, Share, StyleSheet, Text, TextInput, View } from 'react-native';

const ShareScreen = () => {

    const [message, setMessage] = useState('');

    async function shareMessage() {

        try {
            const result = await Share.share({message, title: 'Share Message'});
            if(result.action === Share.sharedAction){
                if(result.activityType){
                    Alert.alert('Shared with activity type of ', result.activityType);
                }
                else{
                    Alert.alert('Message Shared');
                }
            }
            else if(result.action === Share.dismissedAction){
                Alert.alert('Share Dismissed');
            }
        } catch (error) {
            
        }
    }

    return (
        <View>
            <Text>Share Screen</Text>
            <TextInput placeholder='Enter text to share' 
                    value={message} onChangeText={setMessage} />

            <Text>Shareable text: {message}</Text>

            <Button title='Share' onPress={shareMessage} />
        </View>
    )
}

export default ShareScreen

const styles = StyleSheet.create({})
import React from 'react'
import { Button, Linking, StyleSheet, Text, View } from 'react-native'

const LinkingScreen = () => {

  function openBrowser() {
    Linking.openURL('https://www.google.com')
  }
  function callNumber() {
    Linking.openURL('tel:+1234567890')
  }
  function sendSMS() {
    Linking.openURL('sms:+1234567890?body=Hello from Expo Router');
  }

  return (
    <View>
      <Text>Linking Screen</Text>

      <Button title='Open Google' onPress={openBrowser}/>
      <Button title='Call Number' onPress={callNumber}/>
      <Button title='Send SMS' onPress={sendSMS}/>
    </View>
  )
}

export default LinkingScreen

const styles = StyleSheet.create({})
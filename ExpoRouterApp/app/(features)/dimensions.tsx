
import React from 'react';
import { Button, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';

const DimensionsScreen = () => {

    const screen = useWindowDimensions();
    // const [screen, setScreen] = useState(Dimensions.get('window'));
    // useEffect(() => {


    //     Dimensions.addEventListener("change", (window) => {

    //         setScreen(window.screen);
    //     });

    // }, [])


    const isPortrait = screen.height > screen.width;
    const styles= getStyles(isPortrait);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <Text style={{ fontSize: 20 }}>Dimensions Screen : {isPortrait ? 'Portrait' : 'Landscape'}</Text>

            {/* <View style={{flexDirection: isPortrait? 'column': 'row' }}> */}
            <View style={styles.inputContainer}>
                <TextInput placeholder='Enter a message' />

                <Button title='Click Me' onPress={() => alert('Button Pressed!')} />
            </View>

        </View>
    )
}

export default DimensionsScreen

const getStyles = (isPortrait: boolean) => {

    if(isPortrait){
        return StyleSheet.create({
            inputContainer: {
                flexDirection: 'column'
            }
        })
    }
    else{
        return StyleSheet.create({
            inputContainer: {
                flexDirection: 'row'
            }
        })
    }

}
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';



const Home = ({ navigation }) => {
    return (
        <View style={styles.home}>
            <Image
                style={styles.homelogo}
                source={require('../../assets/homelogo.png')}
            />

            <Button mode="outlined" style={styles.button} onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Board', {
            mode: 'PVE',
          });
        }}>
                <Image
                    source={require('../../assets/pve.png')}
                />
            </Button>

            <Button mode="outlined" style={styles.button} onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Board', {
            mode: 'PVP',

          });
        }}>
                <Image
                    source={require('../../assets/pvp.png')}
                />
            </Button>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    home: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor:'#FDF8FD'
    },

    homelogo: {
        marginTop: 46,
        marginBottom: 155
    },

    button: {
        borderStyle: 'solid',
        borderColor: '#6750A4',
        borderRadius: 100,
        width: 201,
        height: 40,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:35
    }
})
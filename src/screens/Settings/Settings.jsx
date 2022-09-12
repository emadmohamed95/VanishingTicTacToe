import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useEffect} from 'react'
import { Switch } from 'react-native-paper'
import { useState } from 'react';
import { saveSettings } from '../../actions/settings';
import { useSelector, useDispatch } from 'react-redux'
import DropDown from "react-native-paper-dropdown";

const durationList = [
    {
      label: '1',
      value: 1,
    },
    {
        label: '2',
        value: 2,
      },
      {
        label: '3',
        value: 3,
      },
      {
        label: '4',
        value: 4,
      },
      {
        label: '5',
        value: 5,
      },
      {
        label: '6',
        value: 6,
      },
      {
        label: '7',
        value: 7,
      },
      {
        label: '8',
        value: 8,
      },
      {
        label: '9',
        value: 9,
      },
      {
        label: '10',
        value: 10,
      },
  ];

const Settings = ({navigation}) => {

    const settings = useSelector(state => state.settings)
    const [isSwitchOn, setIsSwitchOn] = useState(settings.vanishMode);
    const [vanishDuration, setVanishDuration] = useState(settings.vanishDuration);

    // console.log(settings)

    useEffect(() => {
        setIsSwitchOn(settings.vanishMode)
        setVanishDuration(settings.vanishDuration)
    }, [settings])


    const dispatch = useDispatch()


    useEffect(() => {

        dispatch(saveSettings(isSwitchOn,vanishDuration))
        // console.log(vanishDuration)
  
    }, [vanishDuration])




    const onToggleSwitch = () => {setIsSwitchOn(!isSwitchOn)

        dispatch(saveSettings(!isSwitchOn,vanishDuration))
    
    };

    const [showDropDown, setShowDropDown] = useState(false);



    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.scorepanel}>



                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                >
                    <Image
                        source={require('../../assets/back.png')}
                    />
                </TouchableOpacity>

                {/* <Text>{game.status}</Text> */}

                <Text style={styles.score}>{'Settings'}</Text>

                {/* <Image
                    source={require('../../assets/Settings.png')}
                /> */}
               {''}

            </View>

            <View style={styles.scorepanel}>

                <Text>{'Vanish Mode'}</Text>

                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color='#6750A4' />

            </View>

            {settings.vanishMode?<View style={styles.scorepanel}>

            <Text>{'Vanish Duration'}</Text>


            <DropDown
            //   label={"Gender"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={vanishDuration}
              setValue={setVanishDuration}
              list={durationList}
              activeColor={'#6750A4'}
            />
            </View>:<></>}


        </SafeAreaView>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        // justifyContent: 'center',
        flexDirection: 'column',
        alignContent: 'center',
        backgroundColor:'#FDF8FD'

    },

    scorepanel: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignContent: 'center',
        // padding: '16px 44px 4px',
        paddingLeft: 35,
        paddingRight: 35,
        gap: '21px',
        marginTop: 48
    },

    score: {
        // fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 40,
        lineHeight: 48,
    },
})
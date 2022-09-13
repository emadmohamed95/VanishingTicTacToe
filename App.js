/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Surface } from 'react-native-paper';
import { Board } from './src/screens/Board/Board';
import { Provider } from "react-redux";
import store from "./src/store/index";
import Home from './src/screens/Home/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from './src/screens/Settings/Settings';
import mobileAds, { AdsConsentStatus } from 'react-native-google-mobile-ads';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import aps from './app.json'

import { AdsConsent, AdsConsentDebugGeography } from 'react-native-google-mobile-ads';


const adUnitId = __DEV__?TestIds.BANNER:Platform.OS==='ios'?aps['react-native-google-mobile-ads'].ios_app_id:aps['react-native-google-mobile-ads'].android_app_id;

const Stack = createNativeStackNavigator();


const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6750A4',
    accent: '#f1c40f',
  },
};

const AppWrapper = () => {


  return (

    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  )
}


const App = () => {

  const [visibleAdd, setVisibleAdd] = useState(false);

  const [nonPersonalizedAds, setNonPersonalizedAds] = useState(true);



  useEffect(() => {

    (async function() {
      // const consentInfo = await AdsConsent.requestInfoUpdate({
      //   debugGeography: AdsConsentDebugGeography.EEA,
      //   testDeviceIdentifiers: ['TEST-DEVICE-HASHED-ID'],
      // });

      const consentInfo = await AdsConsent.requestInfoUpdate();

      if(consentInfo.status===AdsConsentStatus.NOT_REQUIRED||consentInfo.status===AdsConsentStatus.OBTAINED){
        setNonPersonalizedAds(false)
      }else if (consentInfo.isConsentFormAvailable && consentInfo.status === AdsConsentStatus.REQUIRED) {
        const { status } = await AdsConsent.showForm();

        if(status===AdsConsentStatus.OBTAINED){
          setNonPersonalizedAds(false)
        }
      }


      mobileAds()
      .initialize()
      .then(adapterStatuses => {
        // Initialization complete!
        setVisibleAdd(true)
        // console.log(adapterStatuses)

        // console.log('complete')
      });
      


  })();

    // mobileAds()
    //   .initialize()
    //   .then(adapterStatuses => {
    //     // Initialization complete!
    //     setVisibleAdd(true)
    //     console.log(adapterStatuses)

    //     console.log('complete')
    //   });

  }, [])

  return (
    // <SafeAreaView style={styles.container}>
    //   {/* <Text>
    //     Hi Miraaal
    //   </Text> */}
    //   <Home />
    //   {/* <Board/> */}
    // </SafeAreaView>
    <SafeAreaView style={styles.container}>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Board" component={Board} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
      {visibleAdd ? 
      
      <View style={styles.bannerAd}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: nonPersonalizedAds,
        }}
      /> 
      
      </View>
: <></>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    // height: '100%',
    // display:'flex',
    // justifyContent:'center',
    // alignItems:'center',
    flex: 1,
    backgroundColor: '#FDF8FD'

  },
  bannerAd:{
    // marginTop:155
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'flex-end'
}
});

export default AppWrapper;

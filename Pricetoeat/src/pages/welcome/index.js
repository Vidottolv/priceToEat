import React, { useEffect } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { useFonts } from 'expo-font';

const Welcome = () => {
  const navigation = useNavigation();
  
  useEffect(() => {
    const splashScreenTime = 3.5; 
    setTimeout(() => {
      navigation.replace('signin'); 
    }, splashScreenTime * 1000);
  }, []);

  const [loaded] = useFonts({
    'Quicksand-Regular': require('../../assets/fonts/Quicksand-Regular.ttf'),
    'Quicksand-Bold': require('../../assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-Medium': require('../../assets/fonts/Quicksand-Medium.ttf'),
  });
  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0.7, 0.8]}
        colors={['#99BC85', '#fff']}>
          <Text style={[styles.title, styles.underline]}> PriceT'eat </Text>
          <LottieView
            source={require('../../assets/json/Animation - start app.json')}
            autoPlay={true}
            loop={false}
            style={styles.lottieView}
          />
      </LinearGradient>
    </View>
  );
};
  
  export default Welcome;

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  gradient: {
    height: '100%',
    width: '100%',
  },
    lottieView: {
    flex:1
  },
  title:{
    fontSize:50,
    fontFamily:'Quicksand-Bold',
    marginTop:'30%',
    color:'#000',
    alignSelf:'center'
  },
  underline: {
    textDecorationLine: 'underline'
  }
})
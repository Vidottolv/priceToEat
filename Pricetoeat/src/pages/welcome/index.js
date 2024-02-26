import React, { useEffect } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import * as Font from 'expo-font';


const Welcome = () => {
    const navigation = useNavigation();
  
    useEffect(() => {
      const splashScreenTime = 3.5; 
      setTimeout(() => {
        navigation.replace('signin'); 
      }, splashScreenTime * 1000);
    }, []);
  
    return (
      <View style={styles.container}>
        <LinearGradient
          style={styles.gradient}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          locations={[0.7, 0.8]}
          colors={['#c8e29d', '#fff']}>
          <Text style={[styles.title, styles.underline]}> PriceT'eat </Text>
          <LottieView
            source={require('../../assets/Animation - start app.json')}
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
        fontWeight:'bold',
        marginTop:'30%',
        color:'#000',
        alignSelf:'center'
    },
    underline: {
        textDecorationLine: 'underline'
    }
})
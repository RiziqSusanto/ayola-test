import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, Pressable} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import OtpInput from '../components/OtpInput';
import {OtpScreenNavigationProp, OtpScreenRouteProp} from '../navigation';

const OtpScreen: React.FC<{
  navigation: OtpScreenNavigationProp;
  route: OtpScreenRouteProp;
}> = ({route, navigation}) => {
  const {email, password} = route.params;
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsResendDisabled(timer > 0);
  }, [timer]);

  const handleResend = () => {
    setTimer(30);
    setIsResendDisabled(true);
  };

  const handleOtpSubmission = async () => {
    if (otp === '111111') {
      try {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
      } catch (error) {
        console.error('Error storing data:', error);
      }
      navigation.navigate('Login');
    } else {
      alert('Incorrect OTP. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Enter authentication code</Text>
        <Text style={styles.description}>
          Enter the 6-digits that we have sent via {'\n'}the phone number to{' '}
          <Text style={{fontWeight: 'bold'}}>+62 882-25629-000</Text>
        </Text>
        <OtpInput length={6} onOtpChange={setOtp} />
      </View>
      <Text style={styles.timer}>Timer: {timer}s</Text>
      <Pressable
        onPress={handleResend}
        disabled={isResendDisabled}
        style={[styles.resend, {opacity: isResendDisabled ? 0.5 : 1}]}>
        <Text style={styles.resendText}>Resend code</Text>
      </Pressable>

      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleOtpSubmission} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    color: '#000',
    marginBottom: 8,
  },
  description: {
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  timer: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
  },
  resend: {
    alignItems: 'center',
    marginBottom: 15,
  },
  resendText: {
    fontSize: 16,
    color: '#888',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default OtpScreen;

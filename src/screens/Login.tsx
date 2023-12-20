import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LoginScreenNavigationProp} from '../navigation';
import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions} from '@react-navigation/native';

const LoginScreen: React.FC<{navigation: LoginScreenNavigationProp}> = ({
  navigation,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true;
      },
    );

    return () => backHandler.remove();
  }, []);

  const handleLogin = async () => {
    const storedEmail = await AsyncStorage.getItem('email');
    const storedPassword = await AsyncStorage.getItem('password');
    if (email.trim() === '' || password.trim() === '') {
      alert('Please enter both email and password.');
    } else if (email !== storedEmail || password !== storedPassword) {
      alert('Invalid credential');
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Home'}],
        }),
      );
      setEmail('');
      setPassword('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>LOGIN</Text>
      <View style={styles.inputContainer}>
        <Icon name="user-o" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons
          name="key-outline"
          size={20}
          color="gray"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#000',
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Poppins',
    lineHeight: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginHorizontal: 40,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  loginButton: {
    marginTop: 45,
    backgroundColor: '#A172FB',
    padding: 10,
    borderRadius: 20,
    width: 230,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default LoginScreen;

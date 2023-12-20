import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RegistrationScreenNavigationProp} from '../navigation';

const RegisterScreen: React.FC<{
  navigation: RegistrationScreenNavigationProp;
}> = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must contain at least 8 characters, a lowercase letter, an uppercase letter, and a symbol.',
      );
      return false;
    }

    setPasswordError('');
    return true;
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address.');
      return false;
    }

    setEmailError('');
    return true;
  };

  const handleRegistration = () => {
    if (!validateEmail()) {
      return;
    }

    if (!validatePassword()) {
      return;
    }
    navigation.navigate('Otp', {email, password});
    setEmail('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.registerText}>REGISTRATION</Text>
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
          onBlur={validatePassword}
        />
      </View>
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
      {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleRegistration}>
        <Text style={styles.buttonText}>Register</Text>
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
  error: {
    color: 'red',
  },
  registerText: {
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
  registerButton: {
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

export default RegisterScreen;

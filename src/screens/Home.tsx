import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {HomeScreenNavigationProp, HomeScreenRouteProp} from '../navigation';
import AsyncStorage from '@react-native-community/async-storage';

const HomeScreen: React.FC<{
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}> = ({navigation}) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('password');
    } catch (error) {
      console.error('Error clearing data:', error);
    }
    navigation.navigate('Registration');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#A172FB',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;

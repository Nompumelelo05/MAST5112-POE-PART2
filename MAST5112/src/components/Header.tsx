import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/images/shileLogo.jpg')} 
          style={styles.logo} 
        />
        <Text style={styles.title}>Christoffel's Culinary Cuisine</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30, 
    borderBottomLeftRadius: 15, 
    borderBottomRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  logoContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 8, 
  },
  title: {
    fontSize: 20, 
    fontWeight: '800',
    color: '#FFD700',
    letterSpacing: 0.5,
  },
});

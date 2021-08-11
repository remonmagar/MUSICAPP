import React from 'react';
import { ScrollView, StyleSheet, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Button, Divider, Text } from 'react-native-elements';

import * as actions from '../actions';

export default class StorageScreen extends React.Component {
    static navigationOptions = {
      title: 'Storage',
    };
  
    constructor() {
      super();
  
      this.state = {
        value: ''
      }
    }
  
    async storeData() {
      const data = {
        value: 'Some Testing Data!'
      }
  
      const value = await actions.storeData('someKey', data);
  
      if (value) {
          //console.log(value);
      }
    }
  
    async retrieveData() {
      this.setState({
        value: ''
      });
  
      const data = await actions.retrieveData('favoriteAlbum');
  
      if (data) {
        console.log(data);
       //  this.setState({
         //value: data.value
     //})
      }
    }
  
    async removeData() {
     const success = await actions.clearStorage();
  
     if (success) {
      this.setState({value: ''})
     }
    }
  
    render() {
      const {value} = this.state;
  
      return (
        <ScrollView style={styles.container}>
          <Text> Saved Songs </Text>
  
          <Button title='store data!' onPress={ () => { this.storeData()}} />
          <Button title='retreive  data!' onPress={ () => { this.retrieveData()}} />
          <Button title='remove data!' onPress={ () => { this.removeData()}} />
  
          
        </ScrollView>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 15,
      backgroundColor: '#91dfe5',
    },
    button: {
      marginBottom: 30,
      width: 260,
      alignItems: 'center',
      backgroundColor: '#2196F3'
    },
    buttonText: {
      padding: 20,
      color: 'white'
    }
  });
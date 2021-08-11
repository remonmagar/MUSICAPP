import React from 'react';
import { View, StyleSheet } from 'react-native';
import {Label, TextInput, Button, Input } from 'react-native-elements';
import { SearchBar } from 'react-native-elements';

export class SearchList extends React.Component {

constructor()
{
  super();

    this.state = {
      value: ''
    }
  }
  
  componentDidMount() {
    this.input.focus();
  }
  
    onChange(value) {
      this.setState({value});
    }
    onSubmitSearch()
    {
      const { submitSearch } = this.props;
      
      console.log(this.state.value);
      submitSearch(this.state.value);
    }
  
    render() {
  
      return (
        <React.Fragment>
        <Input ref={input => this.input = input} placeholder="Search Artist" onChangeText={(event) => {this.onChange(event)}}/>
        <Button title="Search" onPress={() => this.onSubmitSearch()}/>
</React.Fragment>
      );
    }
  }
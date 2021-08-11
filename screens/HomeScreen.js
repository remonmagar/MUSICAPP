//this is my home screen page
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Button,
  FlatList
} from 'react-native';

import {ListItem,Text,Icon, Card} from 'react-native-elements';
import { MonoText } from '../components/StyledText';


const menuList = [
  {
    title: 'Search Album or Artist',
    subtitle:'Select your favorite music',
    icon: 'music',
    navigateTo:'Album'
  },
  
  {
    title:'Add To Favourite List',
    subtitle:'Access your Favorite music',
    icon: 'heart',
    navigateTo:'Favorite'
  }
]
export default class HomeScreen extends React.Component {
static navigationOptions = {
title: 'Home',
}
render(){
return(
<ScrollView style={styles.container}>
{
  menuList.map((item,index) => {
    return(
      <Card key={index}
      title={item.title}>
        <View style={styles.cardView}>
           <Text style={{marginBottom:10}}> {item.subtitle} </Text>
           <Icon 
           raised
           name={item.icon}
           type='font-awesome'
           color='#fd320e'
           size={30}
           onPress={() => {this.props.navigation.navigate(item.navigateTo)}}
           />
        </View>
      </Card>
    )
  })
}
</ScrollView>

  );
}

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#91dfe5',
  },
  cardView:
  {
    alignItems: 'center'
  }
});


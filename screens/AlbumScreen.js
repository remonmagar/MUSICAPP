import React from 'react';
import { ScrollView, StyleSheet, View, Linking, Alert } from 'react-native';
import { Card, Text, Button, Icon } from 'react-native-elements';
import { CardList } from '../components/CardList';
import { SearchList } from '../components/SearchList';

import * as actions from '../actions';


export default class AlbumScreen extends React.Component {

    static navigationOptions = {
        title: 'Album',
    };
    constructor()
    {
        super();
        this.state = {
            album:[],
            isFetching:false,
            artist: ''
        }
        this.searchTracks = this.searchTracks.bind(this);
        this.renderBottomNavigation = this.renderBottomNavigation.bind(this);
    }
searchTracks(artist)
{
  this.setState({isFetching:true, album:[], artist})
  actions.searchTracks(artist).then(album => this.setState({album,isFetching:false})).catch(err => this.
    setState({albums:[],isFetching:false}));
}

async saveAlbumToFavorite(album)
{
const favoriteAlbum = await actions.retrieveData('favoriteAlbum' )|| {};

if(favoriteAlbum[album.id])
{
  Alert.alert(
    'Cannot Add Album!',
    `Album Already Added to Favorites!`,
    [
      {text: 'Continue', onPress: () => console.log('OK Pressed')},
    ],
    { cancelable: false }
  )
  return false;
}
favoriteAlbum[album.id] = album;

const success = await actions.storeData('favoriteAlbum',favoriteAlbum);

if(success)
{
  Alert.alert(
    'Album Added!',
    `Album ${album.title} from ${this.state.artist} was added to Favorites!`,
    [
      {text: 'Continue', onPress: () => console.log('OK Pressed')},
    ],
    { cancelable: false }
  )
}
}
renderBottomNavigation(album)
{
  const {artist} = this.state;
return(
  <View style={styles.albumMenu}>
   
    
    <Icon onPress={() => { this.props.navigation.navigate('AlbumDetail', {album,artist}) }}
    raised
    name='info'
    type='font-awesome'
    color='#f50'
    size={30}/>
    <Icon onPress={() =>this.saveAlbumToFavorite(album)}
    raised
    name='heart'
    type='font-awesome'
    color='#f50'
    size={30}/>
  </View>
)

}

renderAlbumView()
{
  const { album, isFetching } = this.state;
  return (
<ScrollView style={styles.container}>
      <SearchList submitSearch={this.searchTracks}></SearchList>
      { album.length > 0 && !isFetching &&
      <CardList data={ album } 
      imageKey={'cover_big'} 
      titleKey={'title'}
      buttonText = {"Button"}
      bottomView={this.renderBottomNavigation}>
        
      </CardList>
      }
      { album.length > 0 && !isFetching &&
      <Text> Loading Album... </Text>
      }

    </ScrollView>
  );
}
    
    render(){
        return this.renderAlbumView();
    
  
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#91dfe5',
  },
  albumMenu:{
    flexDirection:'row',
    justifyContent: 'space-between'
  }
});
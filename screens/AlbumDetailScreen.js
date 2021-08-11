import React from 'react';
import { ScrollView, StyleSheet, View, Linking, Alert, FlatList, SectionList } from 'react-native';
import {Avatar, Text, Icon, Divider, List, ListItem } from 'react-native-elements';

import * as actions from '../actions';

export default class AlbumDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'AlbumDetail',
  };

  constructor()
  {
      super();

      this.state = {
          tracks:[],
          //isPlaying: false,
      //currentSongIndex: undefined
      }
    
      //this.currentSong = undefined;
  }

  componentDidMount()
  {
    const album = this.props.navigation.getParam('album',{});
    actions.getAlbumTracks(album.id).then(
        tracks => this.setState({tracks})
    ).catch(error => console.error(error))
  
}
async saveFavoriteTrack (album, track)
{
    const favoriteAlbum = await actions.retrieveData('favoriteAlbum') || {};

    let albumData = favoriteAlbum[album.id];

    if(!albumData)
    {
        albumData = album;
    }
    if(!albumData['tracks'])
    {
        albumData['tracks'] = {};
    }
        albumData['tracks'][track.id] = track;
        favoriteAlbum[album.id] = albumData;

        const success = actions.storeData('favoriteAlbum',favoriteAlbum);

        if(success)
        {
            Alert.alert(
                'Track Added!',
                `Track ${track.title} from ${track.artist.name} was added to Favorites!`,
                [
                  {text: 'Continue', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )
        }
    }

    
    
  
renderTracks(album)
{
const {tracks} = this.state;

if(tracks && tracks.length > 0)
{
    return tracks.map((track, index) => {
        return (
            <ListItem
            key = {index}
            title = {track.title}
            leftIcon={
              <Icon raised
                name='play'
                type='font-awesome'
                color='#f50'
                onPress={() => Linking.openURL(track.preview)}/>
                }
            
            rightIcon={
                <Icon raised
                name='heart'
                type='font-awesome'
                color='#f50'
                onPress={() => this.saveFavoriteTrack(album,track)}/>
            }

            />
        )

    })
    
}


}
render()
{
    const album = this.props.navigation.getParam('album',{});
    const artist = this.props.navigation.getParam('artist','');

   // const {tracks, isPlaying} = this.state;
    if(album.id)
    {
    return(
        <ScrollView style={styles.container}>
            <View style={styles.header}>
            <View styles={styles.avatar}>
            <Avatar size="xlarge" rounded source={{uri:album.cover_medium}}></Avatar>
            </View>
            <View style={styles.headerRight}>
                <Text h4> {album.title} </Text>
                <Text h4> {artist} </Text>
                    
            <Icon
            raised
            name='play'
            type='font-awesome'
            color='#f50'
            size={30}
            onPress={() => Linking.openURL(this.state.tracks[0].preview)} />
                  </View>
                    </View>
                    <Divider style={{backgroundColor: 'black'}}/>
                    <View>
                        {this.renderTracks(album)}
                    </View>
            </ScrollView>
    );}
    else{
        <View><Text>Loading...</Text></View>
    }
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    header: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: '#91dfe5',
      padding: 20
    },
     avatar: {
      flex: 1,
      marginRight: 10
    },
    headerRight: {
      flex: 1,
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      flexDirection: 'column'
    },
    mainText: {
      fontWeight: 'bold',
      color: '#3a3a3a',
      fontSize: 17
    },
    subText: {
      color: '#3a3a3a',
      fontSize: 17
    }
  });
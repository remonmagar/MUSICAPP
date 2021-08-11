import React from 'react';
import { ScrollView, StyleSheet, View, Linking } from 'react-native';
import { Card, Button, Text, List, ListItem, Icon } from 'react-native-elements';

import * as actions from '../actions';
import _ from 'lodash';

export default class FavoriteScreen extends React.Component {
  static navigationOptions = {
    title: 'Favorite',
  };

  constructor() {
    super();

    this.state = {
      favoriteAlbum: undefined
    }

    this.getFavoriteAlbums();
  }

  async getFavoriteAlbums() {
    const favoriteAlbum = await actions.retrieveData('favoriteAlbum');

    if (favoriteAlbum) {
      this.setState({favoriteAlbum});
    }
  }

  async deleteAlbum(albumId) {
    const { favoriteAlbum } = this.state;

    delete favoriteAlbum[albumId];

    const success = await actions.storeData('favoriteAlbum', favoriteAlbum);

    if (success) {
      this.setState({favoriteAlbum});
    }
  }

  renderFavoriteTracks(tracks) {
    if (tracks) {
      return _.map(tracks, (track, id) => {
        return (
          <ListItem
            key={id}
            title={track.title}
            leftIcon={{name: 'play-arrow'}}
            rightIcon={
              <Icon
                raised
                name='music'
                type='font-awesome'
                color='#f50'
                onPress={() => Linking.openURL(track.preview)}/>
            } />
        )
      })
    }
  }

  renderFavoriteAlbums() {
    const { favoriteAlbum } = this.state;

    if (favoriteAlbum) {
      return _.map(favoriteAlbum, (album, id) => {
        return (
          <View key={id}>
            <Card
              title={album.title}>
                <Button
                  title='Delete Album'
                  raised
                  backgroundColor='#f50'
                  name='trash'
                  onPress={() => this.deleteAlbum(album.id)}
              />
              { this.renderFavoriteTracks(album.tracks)}

            </Card>
          </View>
        )
      })
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View containerStyle={styles.listContainer}>
          {this.renderFavoriteAlbums()}
        </View>
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
  listContainer: {
    backgroundColor: '#eaeaea'
  }

});
import axios from 'axios';
import _ from 'lodash';
import { AsyncStorage } from 'react-native';

const API_KEY = '05800d55eamsh896e3311b03f357p1acc36jsn2f43f188326e';
const axiosInstance = axios.create({
baseURL: 'https://deezerdevs-deezer.p.rapidapi.com/',
timeout: 2000,
headers: {'x-rapidapi-key':API_KEY}
});

export const searchTracks = singerName => {
 return axiosInstance.get(`search?q=${singerName}`).then(
 response => {

     const album = response.data.data.map((item) => item.album);
    const uniqueAlbum = _.uniqBy(album, 'title');
    return uniqueAlbum;
})
}

export const getAlbumTracks = albumId =>
{
    return axiosInstance.get(`album/${albumId}`).then(response => response.data.tracks.data)
}

export const storeData = async (key, value) => {
    const stringifyValue = JSON.stringify(value);
  
    try {
      await AsyncStorage.setItem(key, stringifyValue);
      return value;
    } catch (error) {
      // Error saving data
    }
  }
  
  
  export const retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
  
      if (value !== null) {
  
        return JSON.parse(value);
      }
     } catch (error) {
       // Error retrieving data
     }
  }
  
  
  export const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      // Error saving data
    }
  }
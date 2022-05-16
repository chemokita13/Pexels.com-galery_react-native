import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Button } from '@rneui/base'
import * as WebBrowser from 'expo-web-browser';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';


import ImgList from '../components/ImgList';
import { getImages } from '../api/pexels'

const ImageScr = ({ route }) => {

  const { image } = route.params

  const press = async () => {
    await WebBrowser.openBrowserAsync(image.photographer_url)
  }

  const [photos, setphotos] = useState([])

  const loadImgs = async (term) => {
    const res = await getImages(term)
    await setphotos(res.data.photos)
  }

  useEffect(() => {
    loadImgs(image.alt)
  }, [])

  const downloadFile = async () => {
    try {
      let fileUri = FileSystem.documentDirectory + 'galeryApp_' + image.id + '.jpeg'
      const { uri } = await FileSystem.downloadAsync(image.src.original, fileUri)
      saveFile(uri)
    } catch (error) {
      console.error(error)
    }
  }

  const saveFile = async (uriFinal) => {
    const { status } = await MediaLibrary.requestPermissionsAsync()
    if (status == 'granted') {
      const asset = await MediaLibrary.createAssetAsync(uriFinal)
      await MediaLibrary.createAlbumAsync('Download', asset, false)
    }
  }

  const download = () => {
    downloadFile()
  }

  return (
    <View style={styles.hdph}>
      <Image
        source={{ uri: image.src.large2x }}
        style={{ height: 400 }}
      />
      <View style={{ display: 'flex', paddingVertical: 18, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Avatar title={image.photographer.split(' ').map(str => str[0]).join('').toUpperCase()} containerStyle={{ backgroundColor: 'red' }} rounded />
          <TouchableOpacity onPress={press}>
            <Text style={styles.txt}>
              {image.photographer}
            </Text>
          </TouchableOpacity>
        </View>
        <Button title='Download photo' buttonStyle={{ backgroundColor: '#29783' }} onPress={() => download()} />
      </View>
      <View>
        <ImgList photos={photos} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  hdph: {
    backgroundColor: '#0d0d0d',
    flex: 1,
    flexDirection: 'column',
    padding: 10
  },
  txt: {
    color: 'white',
    fontWeight: 'bold',
    marginStart: 5,
    fontSize: 18
  }
})

export default ImageScr
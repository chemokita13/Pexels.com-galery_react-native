import { View, StyleSheet, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Input, Button } from "@rneui/base"

import { getImages } from '../api/pexels'
import ImgList from '../components/ImgList'


const HomeScr = ({ search }) => {

  const [photos, setphotos] = useState([])
  const [searchTerm, setsearchTerm] = useState('')
  const [results, setresults] = useState(0)

  const loadImgs = async (term) => {
    const res = await getImages(term)
    await setphotos(res.data.photos)
    await setresults(res.data.total_results)
  }

  const srch = async () => {
    await loadImgs(searchTerm)
  }

  useEffect(() => {
    loadImgs()
  }, [])

  return (
    <>

      {search && (
        <View style={styles.srch}>
          <Input
            placeholder={" Search a Term"}
            style={{ color: '#fff' }}
            inputContainerStyle={styles.inp}
            leftIcon={{ type: 'feather', name: 'search', color: '#fff' }}
            leftIconContainerStyle={styles.icon}
            onChangeText={(value) => setsearchTerm(value)}
          />
          <Button title='Search' buttonStyle={styles.btn} onPress={() => srch()} />
        </View>
      )}

      <View style={styles.app} >
        <Text style={styles.totalRes}>{results} results</Text>
        <ImgList photos={photos} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({

  app: {
    flex: 1,
    backgroundColor: 'rgb(20,20,20)',
    alignItems: 'center',
    justifyContent: 'center'
  },

  totalRes: {
    color: '#d0d0d0',
    textAlign: 'right',
    width: '100%',
    marginTop:15
  },

  srch: {
    backgroundColor: '#0d0d0d',
    width: "100%",
    paddingLeft: 10,
    flex: 1 / 5,
    flexDirection: 'row',
    paddingRight: 80,
    alignItems: 'center'
  },

  inp: {
    backgroundColor: '#2c292c',
    borderBottomWidth: 0,
    paddingHorizontal: 4,
    marginTop: 10
  },

  icon: {
    paddingStart: 10,
    marginRight: 7
  },

  btn: {
    backgroundColor: '#229783',
    marginBottom: 20,
    height: 47
  }

})

export default HomeScr
import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { render } from 'react-dom'

import CardImg from './CardImg'

const ImgList = ({photos}) => {


  return (
    <View>
      <FlatList  
      data={photos}
      renderItem={
        ({item})=> <CardImg image={item} />
      }
      keyExtractor={(item)=>item.id}
      numColumns={2}
      />
    </View>
  )
}

export default ImgList
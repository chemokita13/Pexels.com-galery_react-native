import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native'

const CardImg = ({ image }) => {

    const nav = useNavigation()

    return (
        <TouchableOpacity style={styles.crdImgs} onPress={() => nav.navigate('img', { image })}>
            <Image
                source={{
                    uri:
                        image.src.portrait
                            ? image.src.portrait
                            : 'https://e7.pngegg.com/pngimages/709/358/png-clipart-price-toyservice-soil-business-no-till-farming-no-rectangle-pie.png'
                }}
                style={{ height: 180, width: '100%' }}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    crdImgs: {
        display: 'flex',
        width: '47.5%',
        margin: 4,
        justifyContent: 'space-between',
        backgroundColor: '#2c292c',
        borderWidth: 0,
        borderRadius: 5,
    }
})

export default CardImg
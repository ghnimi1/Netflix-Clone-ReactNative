import React from 'react'
import { View, Text, Image } from 'react-native'

export default function Header() {
    return (
        <View style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 5,
            height: 50,
            elevation: 6
        }}>
            <Image
                style={{
                    height: 45,
                    width: 100
                }}
                source={{ uri: 'https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png' }}
            />
        </View>
    )
}

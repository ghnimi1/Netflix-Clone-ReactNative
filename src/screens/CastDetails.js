import { useTheme } from '@react-navigation/native'
import React from 'react'
import { View, Text, ScrollView, Image } from 'react-native'
import { SharedElement } from "react-navigation-shared-element";

export default function CastDetails({ route }) {
    const { item } = route.params
    const base_url = 'https://image.tmdb.org/t/p/original'
    const { colors } = useTheme()
    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.HeaderColor }}>
                <SharedElement id={`item.${item.id}.image`}>
            <Image
                style={{
                    height: 300,
                }}
                source={{ uri: `${base_url}${item?.profile_path}` }}
            />
            </SharedElement>
            <View style={{ marginLeft: 15 }}>
                <Text style={{
                    color: colors.TextColor,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: 30
                }}>{item?.name}</Text>
                <Text style={{
                    color: colors.TextColor,
                    fontWeight: 'bold',
                    fontSize: 30
                }}>Personal Info</Text>
                <Text style={{
                    color: colors.TextColor,
                    fontWeight: 'bold',
                    fontSize: 23
                }}>Known For : </Text>
                <Text style={{
                    color: colors.TextDes,
                    fontSize: 20
                }}>{item.known_for_department}</Text>
            </View>
        </ScrollView>
    )
}

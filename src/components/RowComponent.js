import { useNavigation, useTheme } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import axios from '../axios'
import { SharedElement } from "react-navigation-shared-element";


export default function RowComponent({ title, fetchUrl, isLarged }) {
    const [movies, setMovies] = useState([])
    const base_url = 'https://image.tmdb.org/t/p/original'
    const navigation = useNavigation()
    const { colors } = useTheme()
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results);
        }
        fetchData()
    }, [])
    return (
        <View style={{ backgroundColor: colors.HeaderColor }}>
            <Text
                style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: colors.TextColor,
                    marginLeft: 10
                }}>{title}</Text>
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                contentContainerStyle={{
                    flexDirection: 'row',
                    marginBottom: 10
                }}
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Details', { item: item })}
                    >
                        <SharedElement id={`item.${item.id}.image`}>
                        <Image
                            style={isLarged
                                ? {
                                    width: 100,
                                    height: 150,
                                    margin: 5,
                                    borderRadius: 5
                                } : {
                                    width: 150,
                                    height: 100,
                                    margin: 5,
                                    borderRadius: 3
                                }}
                            source={{ uri: `${base_url}${isLarged ? item?.poster_path : item?.backdrop_path}` }}
                        />
                        </SharedElement>
                    </TouchableOpacity>
                )
                }
            />

        </View>
    )
}

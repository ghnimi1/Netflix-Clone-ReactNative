import { useNavigation, useTheme } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import YouTube from 'react-native-youtube'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import movieTrailer from 'movie-trailer';
import axios from '../axios'
import { SharedElement } from "react-navigation-shared-element";


export default function DetailsFilm({ route }) {
    const { item } = route.params
    const { colors } = useTheme()
    const base_url = 'https://image.tmdb.org/t/p/original'
    const [trailerUrl, setTrailerUrl] = useState('')
    const [casts, setCast] = useState([])
    const navigation = useNavigation()

    getDataCast = async (id) => {
        const request = await axios.get(`/movie/${id}/credits?api_key=f44b02db4e5d371e4bf37f5769281d2f&language=en-US`)
        setCast(request.data.cast)
    }
    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('')
        } else {
            movieTrailer(movie?.name || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search)
                    setTrailerUrl(urlParams.get('v'))
                })
                .catch(error => console.log(error))
        }
    }
    useEffect(() => {
        handleClick(item)
        getDataCast(item.id)
    }, [])
    console.log(casts);
    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.HeaderColor }}>
            <SharedElement id={`item.${item.id}.image`}>
                <Image
                    style={{
                        height: 300,
                    }}
                    source={{ uri: `${base_url}${item?.backdrop_path}` }}
                />
            </SharedElement>
            <SharedElement id={`item.${item.id}.title`}>
                <Text style={{
                    color: colors.TextColor,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: 30
                }}>{item?.title || item?.name}</Text>
            </SharedElement>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between', margin: 15
            }}>
                <SharedElement id={`item.${item.id}.image`}>

                    <View style={{ flexDirection: 'row' }}>
                        <FontAwesome name="fire" size={30} color="red" />
                        <Text style={{
                            color: colors.TextColor,
                            textAlign: 'justify',
                            fontSize: 20,
                            margin: 5,
                        }}>{item?.vote_average}</Text>
                    </View>
                </SharedElement>
                <SharedElement id={`item.${item.id}.image`}>
                    <View style={{ flexDirection: 'row' }}>
                        <FontAwesome name="line-chart" size={30} color="green" />
                        <Text style={{
                            color: colors.TextColor,
                            textAlign: 'justify',
                            fontSize: 20,
                            margin: 5,
                        }}>{item?.vote_count}</Text>
                    </View>
                </SharedElement>
                <SharedElement id={`item.${item.id}.image`}>

                    <View style={{ flexDirection: 'row' }}>
                        <MaterialIcons name="date-range" size={30} color="blue" />
                        <Text style={{
                            color: colors.TextColor,
                            textAlign: 'justify',
                            fontSize: 20,
                            margin: 5,
                        }}>{item?.release_date}</Text>
                    </View>
                </SharedElement>
            </View>
            <Text style={{
                color: colors.TextColor,
                fontSize: 30,
                margin: 5,
                borderBottomWidth: 1,
                borderColor: colors.TextColor
            }}>
                Overview
            </Text>
            <SharedElement id={`item.${item.id}.description`}>
                <Text style={{
                    color: colors.TextDes,
                    textAlign: 'justify',
                    fontSize: 20,
                    margin: 5
                }}>{item?.overview}</Text>
            </SharedElement>
            <Text style={{
                color: colors.TextColor,
                fontSize: 30,
                margin: 5,
                borderBottomWidth: 1,
                borderColor: colors.TextColor
            }}>Series Cast</Text>
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                contentContainerStyle={{
                    flexDirection: 'row',
                    marginBottom: 10
                }}
                data={casts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('DetailsCast', { item: item })}
                    >
                        <SharedElement id={`item.${item.id}.image`}>
                            <Image
                                style={{
                                    width: 100,
                                    height: 150,
                                    margin: 5,
                                    borderRadius: 5
                                }}
                                source={{ uri: `${base_url}${item?.profile_path}` }}
                            />
                        </SharedElement>

                    </TouchableOpacity>
                )
                }
            />

            {trailerUrl === true ? <YouTube videoId={trailerUrl}
                fullscreen={false}
                play={false}
                apiKey='AIzaSyDBZxulkGzioTgw6wxprO5YMWf0RZvxFA4'
                style={{
                    alignSelf: 'center',
                    height: 200, width: '90%', marginBottom: 20
                }} /> : null}
        </ScrollView>
    )
}

import React, { useEffect, useState } from 'react'
import axios from '../axios'
import { View, Text, ImageBackground, Button } from 'react-native';
import requests from '../requests';

function Banner(props) {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchTopRated)
            setMovies(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)])
        }
        fetchData()
    }, [])
    console.log(movies);
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }
    return (
        <View>
            <ImageBackground
                style={{
                    height: 200,
                    resizeMode: "cover",
                    justifyContent: "center"
                }}
                source={{ uri: `https://image.tmdb.org/t/p/original/${movies?.backdrop_path}` }}>
                <Text style={{
                    color: 'white',
                    fontSize: 22,
                    marginLeft: 15,
                    fontWeight: 'bold'
                }}>{movies?.title || movies?.name || movies?.original_name}</Text>
                <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                    <Button color="#6d7874" title='Play' />
                    <View style={{ width: 10 }}></View>
                    <Button color='#6d7874' title='My List' />
                </View>
                <Text style={{
                    color: 'white',
                    fontSize: 17,
                    marginLeft: 15
                }}>{truncate(movies?.overview, 150)}</Text>
            </ImageBackground>
        </View>
    );
}

export default Banner;
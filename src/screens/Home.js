import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import Banner from '../components/Banner'
import RowComponent from '../components/RowComponent'
import requests from '../requests'

export default function Home() {
    return (
        <ScrollView>
            <Banner />
            <RowComponent title='TRENDING NOW' fetchUrl={requests.fetchTrending} isLarged />
            <RowComponent title='TOP RATED' fetchUrl={requests.fetchTopRated} />
            <RowComponent title='ACTION MOVIES' fetchUrl={requests.fetchActionMovies} />
            <RowComponent title='COMEDY MOVIES' fetchUrl={requests.fetchComedyMovies} />
            <RowComponent title='HORROR MOVIES' fetchUrl={requests.fetchHorrorMovies} />
            <RowComponent title='ROMANCE MOVIES' fetchUrl={requests.fetchRomanceMovies} />
            <RowComponent title='NETFLIX ORIGINALS' fetchUrl={requests.fetchNetflixOriginals} />
            <RowComponent title='DOCUMENTARIES' fetchUrl={requests.fetchDocumentaries} />
        </ScrollView>
    )
}

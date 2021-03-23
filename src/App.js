import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Videos from './components/Videos'
import Notification from './components/Notification'
import './App.css'

function App() {
  const [videos, setVideos] = useState(null)
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState(null)
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState(0)
  const [errorMessage, setErrorMessage] = useState(null)
  const categoryLink = 'https://www.googleapis.com/youtube/v3/videoCategories'
  const countryLink = 'https://www.googleapis.com/youtube/v3/i18nRegions'
  const apiKey = process.env.REACT_APP_API_KEY

  useEffect(() => {
    if(country !== '' && country !== null) {
      axios.get(categoryLink, { params: {part: 'snippet', regionCode: country.id, key: apiKey}})
        .then(response => {
          const newCategories = response.data.items.filter(item => item.snippet.assignable === true)
          setCategories(newCategories)
          if(newCategories.filter(cat => cat.id === category).length === 0) {
            setCategory(0)
          }
        })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[country])

  useEffect(()=> {
    axios.get(countryLink, {params: {part: 'snippet', key: apiKey}})
      .then(response => {
        setCountries(response.data.items)
      })
  },[])

  const setError = (alertMessage) => {
    setErrorMessage(alertMessage)
    setTimeout(() => {
      setErrorMessage(null)
    },3000)
  }

  if (countries === null) {
    return (
      <div>
        Loading ...
      </div>
    )
  }

  if (videos !== null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <div id='div2'>
          <div id='filt'>
            <Filter 
              country={country} 
              setCountry={setCountry}
              categories={categories}
              category={category}
              setCategory={setCategory}
              countries={countries}
              setVideos={setVideos}
              setNotification={setError}
            />
          </div>
          <div id='videos'>
            <Videos 
              videos={videos}
              country={country}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Notification message={errorMessage} />
      <div id='div3'>
        <div id='div1'>
          <Filter 
            country={country} 
            setCountry={setCountry}
            categories={categories}
            category={category}
            setCategory={setCategory}
            countries={countries}
            setVideos={setVideos}
            setNotification={setError}
          />
        </div>
      </div>
    </div>
  )

}

export default App;

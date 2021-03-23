import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { 
  TextField, Select, MenuItem, FormControl, Button, FormHelperText
} from '@material-ui/core'
import axios from 'axios'
import './Filter.css'

const Filter = (props) => {
  const apiKey = process.env.REACT_APP_API_KEY
  const requestLink = 'https://www.googleapis.com/youtube/v3/videos'

  const handleChange = (event) => {
    props.setCategory(event.target.value)
  }

  const fetchVideos = async () => {

    const params = {
      part: 'snippet',
      chart: 'mostPopular',
      regionCode: props.country.id,
      videoCategoryId: props.category,
      key: apiKey
    }

    const response = await axios.get(requestLink, { params: params })
    props.setVideos(response.data.items)
  }


  const submit = async (event) => {
    event.preventDefault()
    try {
      if(props.country === null || props.country === '') {
        props.setNotification('Invalid country')
      }
      else {
        props.setCurrentCountry(props.country)
        await fetchVideos()
      }
    } catch ( err ) {
      props.setNotification(`Unable to fetch videos. ${err.message}`)
    }
  }

  return (
    <div id='parent'>
      <FormControl onSubmit={submit} id='searchForm'>
        <div>
          <Autocomplete
            id='countries'
            options={props.countries}
            getOptionLabel={(country) => country.snippet.name}
            renderInput={(params) => <TextField id='text' {...params} label="Country" variant="outlined" />}
            onChange={(event, value) => {props.setCountry(value)}}
          /> 
          <FormHelperText id='categoryText'>Category</FormHelperText>
          <Select id='categories' value={props.category} onChange={handleChange}>
            <MenuItem value='0' className='menu'>All</MenuItem>
            {props.categories.map(c => 
              <MenuItem key={c.id} value={c.id} className='menu'>{c.snippet.title}</MenuItem>
            )}
          </Select>
        </div>
        <Button type='submit' onClick={submit} id='submitButton'>Search</Button>
      </FormControl>
    </div>
  )
}

export default Filter
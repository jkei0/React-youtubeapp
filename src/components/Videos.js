import React from 'react'
import ReactPlayer from 'react-player'
import './Videos.css'

const Videos = (props) => {

  const videoUri = 'https://www.youtube.com/watch?v='
  const channelUri = 'https://www.youtube.com/channel'

  if(props.videos === null) {
    return (
      <div>
        Loading ...
      </div>
    )
  }

  const playerStyle = {
    marginTop: '3%',
    alignItems: 'center',
  }

  return (
    <div id='parent'>
      <h3 id='title'>Popular videos in {props.country.snippet.name}</h3>
      <div id='video-wrapper'>
        {props.videos.map(video => (
          <div className='singleVideo' key={video.id}>
            <ReactPlayer className='reactPlayer'
            url={`${videoUri}${video.id}`}
            controls={true}
            light={true}
            style={playerStyle}
            />
            <h3 className='title'>{video.snippet.title}</h3>
            <a className='link' href={`${channelUri}/${video.snippet.channelId}`}>{video.snippet.channelTitle}</a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Videos
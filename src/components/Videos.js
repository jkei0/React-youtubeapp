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
    paddingTop: '3%',
    paddingLeft: '30%',
    top: '-40%',
  }

  return (
    <div id='d'>
      <h3 id='title'> Popular videos in {props.country.snippet.name}</h3>
      {props.videos.map(video => (
        <div key={video.id}>
          <ReactPlayer
          className='player'
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
  )
}

export default Videos
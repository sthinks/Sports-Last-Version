import React from 'react'
import ReactPlayer from 'react-player'
import VideoBg from '../../assets/images/home/video-bg.png'
import './video-player.css'

export const VideoPlayer = () => {
  return (
    <div className="video-player">
      <ReactPlayer
        controls={true}
        muted={true}
        url="https://youtu.be/ZOYvatAqrL8"
        light={VideoBg}
        width="100%"
        height="100vh"
      />
    </div>
  )
}

import React from 'react'
import { connect } from 'react-redux'

import {
  onLoadedMetadata,
  onLoadStart,
  onPause,
  onPlay,
  onTimeUpdate,
  onVolumeChange,
  playSong,
  // addPlaylist,
  playNexSong,
  playPrevSong
} from 'src/redux/player/actions'
import { toggleHistory } from 'src/redux/meta/actions'

import Player from '../components/Player'

const defaultProps = {
  song: null
}

const PlayerContainer = props => {
  // const { song } = props
  // return song ? <Player {...props} /> : null
  return <Player {...props} />
}
PlayerContainer.defaultProps = defaultProps

const mapStateToProps = ({ player, meta, music }) => {
  return {
    //song : songUrl
    meta,
    player,
    // song: music.song
  }
}
export default connect(
  mapStateToProps,
  {
    onLoadedMetadata,
    onLoadStart,
    onPause,
    onPlay,
    onTimeUpdate,
    onVolumeChange,
    toggleHistory,
    playSong,
    // addPlaylist,
    playNexSong,
    playPrevSong
  }
)(PlayerContainer)

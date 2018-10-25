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
} from '../../redux/player/actions'
//title, artwork, songId, singerName
import PlayerTwo from '../components/PlayerTwo'
import { toggleHistory } from '../../redux/meta/actions'

const defaultProps = {
  song: null
}

const PlayerContainerTwo = props => {
  const { song, meta } = props // song이 있고, 다른 분기점 하나 더 있어야 한다.
  return song && meta.showMyplayer ? <PlayerTwo {...props} /> : null
  //return <Player {...props} />
}
PlayerContainerTwo.defaultProps = defaultProps

const mapStateToProps = ({ player, meta, music }) => {
  return {
    //song : songUrl
    meta,
    player,
    song: music.song
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
)(PlayerContainerTwo)

// EXplain : palylist reducer에서 정보를 받아와서 다음곡 재생하기.
import * as types from './ActionType'
import * as musicActions from '../music/ActionType'
import * as playListActions from '../playlist/ActionType'
import axios from 'axios'
import { SONG_URL } from '../../App/constants/ApiConstants'

export const onLoadedMetadata = duration => ({
  type: types.ON_LOADED_METADATA,
  duration
})
export const onLoadStart = () => ({
  type: types.ON_LOAD_START
})

export const onPause = () => ({
  type: types.ON_PAUSE
})

export const onPlay = () => ({
  type: types.ON_PLAY
})

export const onTimeUpdate = currentTime => ({
  type: types.ON_TIME_UPDATE,
  currentTime
})

export const onVolumeChange = (muted, volume) => ({
  type: types.ON_VOLUME_CHANGE,
  muted,
  volume
})

export const playSong = (playlist, playingIndex) => ({
  type: types.PLAY_SONG,
  playlist,
  playingIndex
})
export const playNexSong = targetId => (dispatch, getState) => {
  const state = getState()
  const currentSongInfo = state.music.song
  const targetPlayList = state.playList.musicList
  dispatch({ type: types.PLAY_NEXT_SONG })

  if (targetPlayList) {
    //없으면 -1 반환.
    const currentSongIndex = targetPlayList.indexOf(currentSongInfo.songId)
    const nextId =
      targetPlayList[(currentSongIndex + 1) % targetPlayList.length]
    return axios
      .get(SONG_URL.replace(':id', nextId))
      .then(response => {
        const songInfo = {
          songId: response.data.id,
          title: response.data.title,
          artworkUrl: response.data.artwork_url,
          duration: response.data.duration / 1000
        }
        dispatch({
          type: musicActions.SELECT_SONG,
          song: songInfo
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const playPrevSong = targetId => (dispatch, getState) => {
  const state = getState()
  const currentSongInfo = state.music.song
  const targetPlayList = state.playList.musicList
  dispatch({ type: types.PLAY_PREV_SONG })

  if (targetPlayList) {
    let nextId
    const currentSongIndex = targetPlayList.indexOf(currentSongInfo.songId)
    // TODO: currentSongIndex가 0일때, 플레이리스트의 첫 곡이므로, 첫곡이 재생중인경우에 prev버튼을 누르면 다시 처음부터 재생되게 해야한다.
    if (currentSongIndex === -1 || currentSongIndex === 0)
      nextId = targetPlayList[0]
    else nextId = targetPlayList[currentSongIndex - 1]
    return axios
      .get(SONG_URL.replace(':id', nextId))
      .then(response => {
        const songInfo = {
          songId: response.data.id,
          title: response.data.title,
          artworkUrl: response.data.artwork_url,
          duration: response.data.duration / 1000
        }
        console.log('soninfo', songInfo)
        dispatch({
          type: musicActions.SELECT_SONG,
          song: songInfo
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

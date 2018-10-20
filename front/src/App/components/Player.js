import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames/bind'

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

import css from './Player.scss'
import audio from './audio'

import getImageUrl from '../../utils/ImageUtils'
import IMAGE_SIZES from '../constants/ImageConstants'
import Slider from './Slider'
import { formatSeconds } from '../../utils/NumberUtils'
import HistoryTab from './HistoryTab/HistoryTab'

const cx = classnames.bind(css)
const moduleName = 'Player'
// const Player = ({
//   changeCurrentTime,
//   changeVolume,
//   togglePlay,
//   toggleMuted,
//   toggleHistory,
//   playNexSong,
//   playPrevSong,
//   song
// }) => {
class Player extends Component {
  render() {
    // if(this.props.song === 'undefined') return <div/>
    if (!this.props.song) return <div />
    const artworkUrl = this.props.song[2]
    const title = this.props.song[1]
    const duration = this.props.song[3]
    const { currentTime, isPlaying, muted } = this.props.player
    //변수명때문에 굳이 .. 위에 안씀.
    const volume = muted ? 0 : this.props.player.volume
    return (
      <div className={cx(`${moduleName}`)}>
        <div
          className={cx(
            `${moduleName}` +
              (this.props.meta.toggleHistory ? '-history' : '-none')
          )}
        >
          <div className={cx(`${moduleName}__inner`)}>
            <div className={cx(`${moduleName}__section`)}>
              <div className={cx(`${moduleName}__buttons`)}>
                {/*TODO : prevButton*/}
                <div
                  className={cx(`${moduleName}__button`)}
                  role="button"
                  tabIndex="0"
                  onClick={playPrevSong}
                >
                  <i className={cx(`${moduleName}__button__prev`)} />
                </div>
                <div
                  className={cx(`${moduleName}__button`)}
                  role="button"
                  onClick={this.props.togglePlay}
                  tabIndex="0"
                  style={{ color: '#ffffff' }}
                >
                  <i
                    className={cx(
                      `${moduleName}__button__` + (isPlaying ? 'play' : 'pause')
                    )}
                  />
                </div>
                {/*TODO : nextButton*/}
                <div
                  className={cx(`${moduleName}__button`)}
                  role="button"
                  tabIndex="0"
                  onClick={() => {
                    playNexSong(this.props.song[0])
                  }}
                >
                  <i className={cx(`${moduleName}__button__forward`)} />
                </div>
              </div>
            </div>
            <div className={cx(`${moduleName}__section--time`)}>
              <div
                style={{ color: '#45f7aa', width: '50px', textAlign: 'center' }}
              >
                {formatSeconds(currentTime)}
              </div>
            </div>
            <div className={cx(`${moduleName}__section--seek`)}>
              <Slider
                max={duration}
                onChange={this.props.changeCurrentTime}
                value={currentTime}
              />
            </div>
            <div className={cx(`${moduleName}__section--time`)}>
              <div className="player__time">{formatSeconds(duration)}</div>
            </div>

            <div className={cx(`${moduleName}__section`)}>
              <div
                className={cx(`${moduleName}__button`)}
                role="button"
                onClick={this.props.toggleMuted}
                tabIndex="0"
                style={{
                  paddingTop: '11px',
                  display: 'flex'
                }}
              >
                <i className={cx(`${moduleName}__button__mute`)} />

                <div className={cx(`${moduleName}__section--volume`)}>
                  <Slider
                    max={1}
                    onChange={this.props.changeVolume}
                    value={volume}
                  />
                </div>
              </div>
              <div className="player__song">
                <div className={cx(`${moduleName}__song__main`)}>
                  <div
                    className={cx(`${moduleName}__song__artwork`)}
                    style={{
                      backgroundImage: `url(${getImageUrl(
                        artworkUrl,
                        IMAGE_SIZES.SMALL
                      )})`
                    }}
                  />
                  {/*TODO : Change Link*/}
                  <div className={cx(`${moduleName}__song_infoWrapper`)}>
                    <div className={cx(`${moduleName}__song__title`)}>
                      {title}
                    </div>
                    <div className={cx(`${moduleName}__song__username`)}>
                      Creator
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="player__section player__section--options">
              <div className={cx(`${moduleName}__buttons`)}>
                <div role="button" tabIndex="0">
                  <span
                    className={cx(`${moduleName}__add_playlist`)}
                    // onClick={addPlaylist}
                  />
                </div>
                <div role="button" tabIndex="0">
                  <span className={cx(`${moduleName}__heart`)} />
                </div>
                <div role="button" tabIndex="0">
                  <span
                    className={cx(`${moduleName}__toggle__history`)}
                    onClick={toggleHistory}
                  />
                </div>
                <div
                  className="player__button player__button--volume"
                  role="button"
                  tabIndex="0"
                />
              </div>
            </div>
            <div className="player__section player__section--volume" />
          </div>
        </div>
        <div
          style={{ display: this.props.meta.toggleHistory ? 'block' : 'none' }}
          className={cx(`${moduleName}__historyTab`)}
        >
          <HistoryTab />
        </div>
      </div>
    )
  }
}

export default connect(
  ({ player, meta, music }) => {
    return {
      meta,
      player,
      song: music.song
    }
  },
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
)(audio(Player))

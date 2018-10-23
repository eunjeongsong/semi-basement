import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames/bind'
import PropTypes from 'prop-types'

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
import getImageUrl from 'src/utils/ImageUtils'
import { formatSeconds } from 'src/utils/NumberUtils'

import css from './index.scss'
import audio from '../audio'
import IMAGE_SIZES from '../../constants/ImageConstants'
import Slider from '../Slider'
import HistoryTab from '../HistoryTab/HistoryTab'

const cx = classnames.bind(css)
const moduleName = 'Player'
class Player extends Component {
  render() {
    if (!this.props.song) return <div />
    const { playNexSong, song } = this.props
    const volume = this.props.player.muted ? 0 : this.props.player.volume
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
                  onClick={this.props.playPrevSong}
                >
                  <i className={cx(`${moduleName}__button__prev`)} />
                </div>
                <div
                  className={cx(`${moduleName}__button`)}
                  role="button"
                  onClick={this.props.togglePlay}
                  tabIndex="0"
                  style={{ color: '#ffffff', background: 'red' }}
                >
                  <i
                    className={cx(
                      `${moduleName}__button__` +
                        (this.props.player.isPlaying ? 'play' : 'pause')
                    )}
                  />
                </div>
                {/*TODO : nextButton*/}
                <div
                  className={cx(`${moduleName}__button`)}
                  role="button"
                  tabIndex="0"
                  onClick={() => {
                    // this.props.playNexSong(this.props.song.songId)
                    playNexSong(song.songId)
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
                {formatSeconds(this.props.player.currentTime)}
              </div>
            </div>
            <div className={cx(`${moduleName}__section--seek`)}>
              <Slider
                max={this.props.song.duration}
                onChange={this.props.changeCurrentTime}
                value={this.props.player.currentTime}
              />
            </div>
            <div className={cx(`${moduleName}__section--time`)}>
              <div className="player__time">
                {formatSeconds(this.props.song.duration)}
              </div>
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
                        this.props.song.artworkUrl,
                        IMAGE_SIZES.SMALL
                      )})`
                    }}
                  />
                  {/*TODO : Change Link*/}
                  <div className={cx(`${moduleName}__song_infoWrapper`)}>
                    <div className={cx(`${moduleName}__song__title`)}>
                      {this.props.song.title}
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
                    onClick={this.props.toggleHistory}
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

Player.propTypes = {
  changeCurrentTime: PropTypes.func.isRequired,
  changeVolume: PropTypes.func.isRequired,
  toggleMuted: PropTypes.func.isRequired,
  togglePlay: PropTypes.func.isRequired
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

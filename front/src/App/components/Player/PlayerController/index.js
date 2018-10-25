import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames/bind'
import PropTypes from 'prop-types'

import { onPlay, playNexSong, playPrevSong } from 'src/redux/player/actions'

import css from './index.scss'

const cx = classnames.bind(css)
const moduleName = 'PlayerController'

class PlayerController extends Component {
  render() {
    const { playPrevSong, togglePlay, playNexSong } = this.props // 애네도 actions 함수여야 하는데...
    return (
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
          onClick={togglePlay}
          tabIndex="0"
          style={{ color: '#ffffff' }}
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
            playNexSong()
          }}
        >
          <i className={cx(`${moduleName}__button__forward`)} />
        </div>
      </div>
    )
  }
}

PlayerController.propTypes = {
  togglePlay: PropTypes.func.isRequired
}

export default connect(
  ({ player }) => {
    return { player }
  },
  {
    onPlay,
    playNexSong,
    playPrevSong
  }
)(PlayerController)

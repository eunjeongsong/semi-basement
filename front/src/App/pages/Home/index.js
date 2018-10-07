import React, { Component } from "react"
import Navigation from "./components/Navigation/index"
import axios from "axios"
import SONG_URL_LIST from "../../constants/test/SongUrlConstants"
import SONG_URL_LIST1 from "../../constants/test/SongUrlConstants1"
import { resolveUrl } from "../../constants/ApiConstants"
import ArtworkPlay from "./components/ArtworkPlay"

import classnames from "classnames/bind"
import css from "./index.scss"
const cx = classnames.bind(css)
const moduleName = "Home"

class Home extends Component {
  state = {
    songInfos: [],
    songInfos2: []
  }

  componentDidMount() {
    this._requestId()
    this._requestId2()
  }

  _requestId2 = () => {
    SONG_URL_LIST1.map(url => {
      return axios.get(resolveUrl(url)).then(response => {
        //console.log('resolveUrl(url)',resolveUrl(url));
        this.setState({
          songInfos2: this.state.songInfos2.concat(response.data)
        })
      })
    })
  }
  _requestId = () => {
    SONG_URL_LIST.map(url => {
      return axios.get(resolveUrl(url)).then(response => {
        //console.log('resolveUrl(url)',resolveUrl(url));
        this.setState({
          songInfos: this.state.songInfos.concat(response.data)
        })
      })
    })
  }

  _rederDiscover = () => {
    const songs = this.state.songInfos.map((songInfo, index) => {
      return (
        <ArtworkPlay
          key={index}
          singerName={songInfo.user.permalink}
          duration={songInfo.duration}
          title={songInfo.title}
          artwork={songInfo.artwork_url}
          songId={songInfo.id}
        />
      )
    })
    return songs
  }
  _rederDiscover2 = () => {
    const songs = this.state.songInfos2.map((songInfo, index) => {
      //debugger
      return (
        <ArtworkPlay
          key={index}
          singerName={songInfo.user ? songInfo.user.permalink : "AbelKo"}
          duration={songInfo.duration}
          title={songInfo.title}
          artwork={songInfo.artwork_url}
          songId={songInfo.id}
        />
      )
    })
    return songs
  }
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <Navigation />
        <div className={cx(`${moduleName}-category`)}>
          <div />
          <div className={cx(`${moduleName}-category-title`)}>
            SEBA's Choice
          </div>
        </div>
        <div className={cx(`${moduleName}-songWrapper`)}>
          {this.state.songInfos.length === 6
            ? this._rederDiscover()
            : "Loading"}
        </div>
        <div className={cx(`${moduleName}-category`)}>
          <div />
          <div className={cx(`${moduleName}-category-title`)}>
            UNDER GROUND BEST
          </div>
        </div>
        <div className={cx(`${moduleName}-songWrapper`)}>
          {this.state.songInfos2.length === 6
            ? this._rederDiscover2()
            : "Loading"}
        </div>
      </div>
    )
  }
}
export default Home

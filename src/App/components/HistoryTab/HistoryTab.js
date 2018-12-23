import React, { Component } from 'react';
import css from './HistoryTab.scss';
import classnames from 'classnames/bind';
import HistoryComponent from './HistoryComponent';
import { connect } from 'react-redux';
const cx = classnames.bind(css);
const moduleName = 'HistoryTab';

export class HistoryTab extends Component {
  renderHistory = () => {
    return this.props.historyMusic.map((music, index) => (
      <HistoryComponent
        key={`history-${index}`}
        id={music.id}
        artworkUrl={music.artwork_url}
        duration={music.duration / 1000}
        title={music.title}
        musician={music.user.username}
      />
    ));
  };
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <div
          className={cx(`${moduleName}__Wrapper`)}
          style={{ color: '#ffffff' }}>
          {this.props.historyMusic ? this.renderHistory() : 'Loading'}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    historyMusic: state.music.historyMusic,
  };
}

export default connect(mapStateToProps)(HistoryTab);

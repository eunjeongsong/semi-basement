import React from 'react';
import classnames from 'classnames/bind';

import * as utils from 'src/utils';
import IMAGE_SIZES from 'src/App/constants/ImageConstants';

import css from './PlayerListItem.scss';
import MyPlayerTooltip from './components/MyPlayerTooltip';

const cx = classnames.bind(css);
const moduleName = 'PlayerListItem';

const PlayerListItem = ({ info, index, onClickPlay }) => {
  const { songId, title, singer, artworkUrl, duration } = info;
  return (
    <div
      className={cx(`${moduleName}`)}
      key={index}
      onClick={() => {
        onClickPlay({ songId, title, singer, artworkUrl, duration });
      }}>
      <i className={cx(`${moduleName}-move`)} />
      <div
        className={cx(`${moduleName}-artwork`)}
        style={{
          backgroundImage: `url(${utils.getImageUrl(
            artworkUrl,
            IMAGE_SIZES.SMALL,
          )})`,
        }}
      />
      <div className={cx(`${moduleName}-center`)}>
        <p className={cx(`${moduleName}-center-top`)}>{title}</p>
        <p className={cx(`${moduleName}-center-bottom`)}>{singer}</p>
      </div>
      <p className={cx(`${moduleName}-duration`)}>
        {utils.formatSeconds(duration)}
      </p>
      <div className={cx(`${moduleName}-etcWrapper`)}>
        <MyPlayerTooltip index={index}>
          <div className={cx(`${moduleName}-etc`)}>
            <i />
          </div>
        </MyPlayerTooltip>
      </div>
    </div>
  );
};

export default PlayerListItem;

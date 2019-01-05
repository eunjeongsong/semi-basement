const PREFIX = 'MUSIC';

export const SELECT_MUSIC = `${PREFIX}/SELECT_MUSIC`;
export const HISTORY_MUSIC = `${PREFIX}/HISTORY_MUSIC`;
export const HISTORY_MUSIC_REQUEST = `${PREFIX}/HISTORY_MUSIC_REQUEST`;
export const HISTORY_MUSIC_SUCCESS = `${PREFIX}/HISTORY_MUSIC_SUCCESS`;
export const HISTORY_MUSIC_FAILURE = `${PREFIX}/HISTORY_MUSIC_FAILURE`;
export const FETCH_NEW_STREAM_MUSICS_SUCCESS = `${PREFIX}/FETCH_NEW_STREAM_MUSICS_SUCCESS`;
export const FETCH_MUSICS_REQUEST = `${PREFIX}/FETCH_MUSICS_REQUEST`;
export const FETCH_MUSICS_SUCCESS = `${PREFIX}/FETCH_MUSICS_SUCCESS`;
export const LOAD_MUSIC_DETAIL = `${PREFIX}/LOAD_MUSIC_DETAIL`;
export const LOAD_MUSIC_DETAIL_REQUEST = `${PREFIX}/LOAD_MUSIC_DETAIL_REQUEST`;
export const LOAD_MUSIC_DETAIL_SUCCESS = `${PREFIX}/LOAD_MUSIC_DETAIL_SUCCESS`;
export const LOAD_MUSIC_DETAIL_FAILURE = `${PREFIX}/LOAD_MUSIC_DETAIL_FAILURE`;
export const LOAD_KEYWORD_MUSIC = `${PREFIX}/LOAD_KEYWORD_MUSIC`;
export const LOAD_KEYWORD_MUSIC_REQUEST = `${PREFIX}/LOAD_KEYWORD_MUSIC_REQUEST`;
export const LOAD_KEYWORD_MUSIC_SUCCESS = `${PREFIX}/LOAD_KEYWORD_MUSIC_SUCCESS`;
export const LOAD_KEYWORD_MUSIC_FAILURE = `${PREFIX}/LOAD_KEYWORD_MUSIC_FAILURE`;

//Legacy actions
export function historyMusic(musicId) {
  return {
    type: HISTORY_MUSIC,
    musicId,
  };
}

export function historyMusicRequest() {
  return {
    type: HISTORY_MUSIC_REQUEST,
  };
}

export function historyMusicSuccess(data) {
  return {
    type: HISTORY_MUSIC_SUCCESS,
    data,
  };
}

export function historyMusicFailure(err) {
  return {
    type: HISTORY_MUSIC_FAILURE,
    err,
  };
}

export function selectMusic(playingMusic) {
  return {
    type: SELECT_MUSIC,
    playingMusic,
  };
}

export function loadMusicDetail(musicId) {
  return {
    type: LOAD_MUSIC_DETAIL,
    musicId,
  };
}

export function loadMusicDetailRequest() {
  return {
    type: LOAD_MUSIC_DETAIL_REQUEST,
  };
}

export function loadMusicDetailSuccess(data) {
  return {
    type: LOAD_MUSIC_DETAIL_SUCCESS,
    data,
  };
}

export function loadMusicDetailFailure(err) {
  return {
    type: LOAD_MUSIC_DETAIL_FAILURE,
    err,
  };
}

export function loadKeywordMusic(keyword) {
  return {
    type: LOAD_KEYWORD_MUSIC,
    keyword,
  };
}

export function loadKeywordMusicRequest() {
  return {
    type: LOAD_KEYWORD_MUSIC_REQUEST,
  };
}

export function loadKeywordMusicSuccess(data) {
  return {
    type: LOAD_KEYWORD_MUSIC_SUCCESS,
    data,
  };
}

export function loadKeywordMusicFailure(err) {
  return {
    type: LOAD_KEYWORD_MUSIC_FAILURE,
    err,
  };
}

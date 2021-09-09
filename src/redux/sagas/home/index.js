import {FLICKR_IMAGE, FLICKR_IMAGE_PAGINATION} from '../../constants';
import {takeEvery, call, put} from 'redux-saga/effects';
import ApiService from '../../../networks/ApiService';
import AxiosService from '../../../networks/AxiosService';

function* callFlickrApi(action) {
  try {
    const response = yield call(
      AxiosService.getServiceData,
      ApiService.HOME_API,
      action.requestBody,
    );
    const result = response.data;
    yield put({type: FLICKR_IMAGE.FLICKR_IMAGE_SUCCESS, result});
  } catch (error) {
    yield put({type: FLICKR_IMAGE.FLICKR_IMAGE_FAILURE});
  }
}

function* callFlickrPaginationApi(action) {
  try {
    const response = yield call(
      AxiosService.getServiceData,
      ApiService.HOME_API,
      action.requestBody,
    );
    const result = response.data;
    yield put({
      type: FLICKR_IMAGE_PAGINATION.FLICKR_IMAGE__PAGINATION_SUCCESS,
      result,
    });
  } catch (error) {
    yield put({type: FLICKR_IMAGE_PAGINATION.FLICKR_IMAGE_PAGINATION_FAILURE});
  }
}

export const homeSaga = [
  takeEvery(FLICKR_IMAGE.FLICKR_IMAGE_START, callFlickrApi),
  takeEvery(
    FLICKR_IMAGE_PAGINATION.FLICKR_IMAGE_PAGINATION_START,
    callFlickrPaginationApi,
  ),
];

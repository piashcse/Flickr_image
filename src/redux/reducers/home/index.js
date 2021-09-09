import {FLICKR_IMAGE, FLICKR_IMAGE_PAGINATION} from '../../constants';

const initialState = {
  photos: {},
  photo: [],
  isFetching: false,
};

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case FLICKR_IMAGE.FLICKR_IMAGE_START:
      return {
        ...state,
        photos: {},
        photo: [],
        isFetching: true,
      };
    case FLICKR_IMAGE.FLICKR_IMAGE_SUCCESS:
      return {
        ...state,
        photos: action.result?.photos,
        photo: action.result?.photos?.photo,
        isFetching: false,
      };
    case FLICKR_IMAGE.FLICKR_IMAGE_FAILURE:
      return {
        ...state,
        photos: {},
        photo: [],
        isFetching: false,
      };
    case FLICKR_IMAGE_PAGINATION.FLICKR_IMAGE_PAGINATION_START:
      return {
        ...state,
        photos: {...state.photos},
        photo: [...state.photo],
        isFetching: true,
      };
    case FLICKR_IMAGE_PAGINATION.FLICKR_IMAGE__PAGINATION_SUCCESS:
      return {
        ...state,
        photos: {...action.result?.photos},
        photo: [...state.photo, ...action.result?.photos?.photo],
        isFetching: false,
      };
    case FLICKR_IMAGE_PAGINATION.FLICKR_IMAGE_PAGINATION_FAILURE:
      return {
        ...state,
        photos: {...state.photos},
        photo: [...state.photo],
        isFetching: false,
      };
    default:
      return state;
  }
}

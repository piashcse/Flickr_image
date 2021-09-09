import { FLICKR_IMAGE, FLICKR_IMAGE_PAGINATION } from "../constants";

export function getFlickrPhoto(requestBody) {
  return {
    type: FLICKR_IMAGE.FLICKR_IMAGE_START,
    requestBody,
  };
}

export function getFlickrPhotoPagination(requestBody) {
  return {
    type: FLICKR_IMAGE_PAGINATION.FLICKR_IMAGE_PAGINATION_START,
    requestBody,
  };
}


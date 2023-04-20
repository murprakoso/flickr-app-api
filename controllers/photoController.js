import response from "../response.js";

const getPhotos = (req, res) => {
  return response(res, 200, true, "get photos");
};

const getSinglePhoto = (req, res) => {
  return response(res, 200, true, "get single photo");
};

const getTags = (req, res) => {
  return response(res, 200, true, "get tags");
};

const search = (req, res) => {
  return response(res, 200, true, "search photos");
};

export { getPhotos, getSinglePhoto, getTags, search };

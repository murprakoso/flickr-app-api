const { default: axios } = require('axios');
const express = require('express');
const response = require('../response');

const router = express.Router();

const apiKey = process.env.FLICKR_APIKEY;

/** GET /api/photos?page=1 */
router.get('/photos', async (req, res) => {
  const qPage = req.query.page;
  const qPerPage = 20;

  const url = `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${apiKey}&format=json&per_page=${qPerPage}&page=${qPage}&safe_search=3&nojsoncallback=1`;

  try {
    const result = await axios.get(url);
    const resultDataPhotos = result.data.photos;
    const photos = resultDataPhotos.photo.map((photo) => ({
      id: photo.id,
      title: photo.title,
      owner: photo.owner,
      url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
    }));

    const data = {
      page: resultDataPhotos.page,
      pages: resultDataPhotos.pages,
      perpage: resultDataPhotos.perPage,
      total: resultDataPhotos.total,
      photos,
    };

    return response(res, 200, true, '', data);
  } catch (error) {
    return response(res, 500, 'Internal server error', error.message);
  }
});

/** GET /api/photos/:ID */
router.get('/photos/:photoId', async (req, res) => {
  const { photoId } = req.params;

  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${apiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`;

  try {
    const result = await axios.get(url);

    const { photo } = result.data;
    const data = {
      url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
      ...result.data.photo,
    };

    return response(res, 200, true, '', data);
  } catch (error) {
    return response(res, 500, 'Internal server error', error.message);
  }
});

/** GET /api/search?tags=:string&page=:number */
router.get('/search', async (req, res) => {
  const { tags, page } = req.query;
  const perPage = 20;

  // const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=${perPage}&page=${page}&format=json&nojsoncallback=1`
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tags}&privacy_filter=5&safe_search=3&per_page=${perPage}&page=${page}&format=json&nojsoncallback=1`;

  try {
    const result = await axios.get(url);
    const resultDataPhotos = result.data.photos;
    const photos = resultDataPhotos.photo.map((photo) => ({
      id: photo.id,
      title: photo.title,
      owner: photo.owner,
      url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
    }));

    const data = {
      page: resultDataPhotos.page,
      pages: resultDataPhotos.pages,
      perpage: resultDataPhotos.perpage,
      total: resultDataPhotos.total,
      tags: resultDataPhotos.tags,
      photos,
    };

    return response(res, 200, true, '', data);
  } catch (error) {
    return response(res, 500, 'Internal server error', error.message);
  }
});

/** GET /api/feeds */
router.get('/feeds', async (req, res) => {
  // eslint-disable-next-line operator-linebreak
  const url =
    'https://www.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1';

  try {
    const result = await axios.get(url);

    const photos = result.data.items.map((item) => ({
      title: item.title,
      author: item.author,
      author_id: item.author_id,
      url: item.media.m,
      description: item.description,
      date_taken: item.date_taken,
      published: item.published,
      tags: item.tags ? item.tags.split(' ') : '',
    }));

    return response(res, 200, true, '', photos);
  } catch (error) {
    return response(res, 500, false, error);
  }
});

module.exports = router;

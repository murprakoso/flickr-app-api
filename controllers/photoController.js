import axios from 'axios'
import response from '../response.js'

const apiKey = process.env.FLICKR_APIKEY

/** get recent photos */
const getPhotos = async (req, res) => {
    const qPage = req.query.page
    const qPerPage = 20

    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${apiKey}&format=json&per_page=${qPerPage}&page=${qPage}&safe_search=3&nojsoncallback=1`

    try {
        const result = await axios.get(url)
        const photos = result.data.photos.photo.map((photo) => {
            return {
                id: photo.id,
                title: photo.title,
                owner: photo.owner,
                url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
            }
        })

        const { page, pages, perpage, total } = result.data.photos
        const data = {
            page,
            pages,
            perpage,
            total,
            photos,
        }

        return response(res, 200, true, '', data)
    } catch (error) {
        return response(res, 500, 'Internal server error', error.message)
    }
}

/** Single detail photo */
const getSinglePhoto = async (req, res) => {
    const { photoId } = req.params

    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${apiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`

    try {
        const result = await axios.get(url)

        const { photo } = result.data
        const data = {
            url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
            ...result.data.photo,
        }

        return response(res, 200, true, '', data)
    } catch (error) {
        return response(res, 500, 'Internal server error', error.message)
    }
}

/** search feeds/tags */
const search = async (req, res) => {
    const { tags, page } = req.query
    const perPage = 20

    // const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=${perPage}&page=${page}&format=json&nojsoncallback=1`
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tags}&privacy_filter=1&safe_search=3&per_page=${perPage}&page=${page}&format=json&nojsoncallback=1`

    try {
        const result = await axios.get(url)

        const photos = result.data.photos.photo.map((photo) => {
            return {
                id: photo.id,
                title: photo.title,
                owner: photo.owner,
                url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
            }
        })

        const { page, pages, perpage, total } = result.data.photos
        const data = {
            page,
            pages,
            perpage,
            total,
            tags,
            photos,
        }

        return response(res, 200, true, '', data)
    } catch (error) {
        return response(res, 500, 'Internal server error', error.message)
    }
}

/** public feeds */
const feeds = async (req, res) => {
    const url = `https://www.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1`

    try {
        const result = await axios.get(url)

        const photos = result.data.items.map((item) => {
            return {
                title: item.title,
                author: item.author,
                author_id: item.author_id,
                url: item.media.m,
                description: item.description,
                date_taken: item.date_taken,
                published: item.published,
                tags: item.tags ? item.tags.split(' ') : '',
            }
        })

        return response(res, 200, true, '', photos)
    } catch (error) {
        return response(res, 500, false, error)
    }
}

export { getPhotos, getSinglePhoto, search, feeds }

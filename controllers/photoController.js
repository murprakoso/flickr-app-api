import axios from 'axios'
import response from '../response.js'

const apiKey = process.env.FLICKR_APIKEY

const getPhotos = async (req, res) => {
    // const apiKey = 'cebc9f60ed18e10a4272ccbc0c13ad17'
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${apiKey}&format=json&nojsoncallback=1`

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
        return response(res, 200, true, '', photos)
    } catch (error) {
        return response(res, 500, 'Internal server error', error.message)
    }
}

const getSinglePhoto = (req, res) => {
    return response(res, 200, true, 'get single photo')
}

const getTags = (req, res) => {
    return response(res, 200, true, 'get tags')
}

const search = (req, res) => {
    return response(res, 200, true, 'search photos')
}

export { getPhotos, getSinglePhoto, getTags, search }

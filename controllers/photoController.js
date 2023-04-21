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

const getTags = async (req, res) => {
    const url = `https://www.flickr.com/services/rest/?method=flickr.tags.getHotList&api_key=${apiKey}&count=10&format=json&nojsoncallback=1`

    try {
        const result = await axios.get(url)

        console.log(result.data)

        // const photos = result.data.photos.photo.map((photo) => {
        //     return {
        //         id: photo.id,
        //         title: photo.title,
        //         owner: photo.owner,
        //         url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
        //     }
        // })
        return response(res, 200, true, '', result.data)
    } catch (error) {
        return response(res, 500, 'Internal server error', error.message)
    }
}

const search = (req, res) => {
    return response(res, 200, true, 'search photos')
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

export { getPhotos, getSinglePhoto, getTags, search, feeds }

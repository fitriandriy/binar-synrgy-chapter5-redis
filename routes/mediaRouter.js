const express = require('express')
const router = express.Router()
const { getPosts, getComments, getAlbums, getPhotos, getTodos, getUsers } = require('../services/mediaService')

router.get('/posts', getPosts)
router.get('/comments', getComments)
router.get('/albums', getAlbums)
router.get('/photos', getPhotos)
router.get('/todos', getTodos)
router.get('/users', getUsers)

module.exports = router
const axios = require('axios')
const redis = require('redis')

const client = redis.createClient({
  url: 'redis://localhost:6379',
  socket: {
    connectTimeout: 5000
  }
})

client.connect().catch((err) => console.log(err))

const getPosts = async (req, res) => {
  try {
    const posts = await client.get('posts')

    if(posts)
      res
        .status(200)
        .send({message: 'Success from cache', data: JSON.parse(posts)})
    else {
      const response = await axios(
        `https://jsonplaceholder.typicode.com/posts`
      )
      client.setEx('posts', 600, JSON.stringify(response.data))

      res.status(200).send({message: 'success from API', data: response.data})
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({message: 'internal server error'})
  }
}

const getComments = async (req, res) => {
  const id = req.query.postId

  try {
    const comments = await client.get(`comments/postId=${id}`)

    if(comments)
      res
        .status(200)
        .send({message: 'Success from cache', data: JSON.parse(comments)})
    else {
      const response = await axios(
        `https://jsonplaceholder.typicode.com/comments?postId=${id}`
      )
      client.setEx(`comments/postId=${id}`, 600, JSON.stringify(response.data))

      res.status(200).send({message: 'success from API', data: response.data})
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({message: 'internal server error'})
  }
}

const getAlbums = async (req, res) => {
  try {
    const albums = await client.get('albums')

    if(albums)
      res
        .status(200)
        .send({message: 'Success from cache', data: JSON.parse(albums)})
    else {
      const response = await axios(
        `https://jsonplaceholder.typicode.com/albums`
      )
      client.setEx('albums', 600, JSON.stringify(response.data))

      res.status(200).send({message: 'success from API', data: response.data})
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({message: 'internal server error'})
  }
}

const getPhotos = async (req, res) => {
  try {
    const photos = await client.get('photos')

    if(photos)
      res
        .status(200)
        .send({message: 'Success from cache', data: JSON.parse(photos)})
    else {
      const response = await axios(
        `https://jsonplaceholder.typicode.com/photos`
      )
      client.setEx('photos', 600, JSON.stringify(response.data))

      res.status(200).send({message: 'success from API', data: response.data})
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({message: 'internal server error'})
  }
}

const getTodos = async (req, res) => {
  try {
    const todos = await client.get('todos')

    if(todos)
      res
        .status(200)
        .send({message: 'Success from cache', data: JSON.parse(todos)})
    else {
      const response = await axios(
        `https://jsonplaceholder.typicode.com/todos`
      )
      client.setEx('todos', 600, JSON.stringify(response.data))

      res.status(200).send({message: 'success from API', data: response.data})
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({message: 'internal server error'})
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await client.get('users')

    if(users)
      res
        .status(200)
        .send({message: 'Success from cache', data: JSON.parse(users)})
    else {
      const response = await axios(
        `https://jsonplaceholder.typicode.com/users`
      )
      client.setEx('users', 600, JSON.stringify(response.data))

      res.status(200).send({message: 'success from API', data: response.data})
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({message: 'internal server error'})
  }
}

module.exports = {
  getPosts, 
  getComments, 
  getAlbums, 
  getPhotos, 
  getTodos, 
  getUsers
}
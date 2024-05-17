const axios = require('axios')
const redis = require('redis')

const client = redis.createClient({
  url: 'redis://localhost:6379',
  socket: {
    connectTimeout: 5000
  }
})

client.connect().catch((err) => console.log(err))

const getJobs = async (req, res) => {
  const searchTerm = req.query.search

  try {
    const comments = await client.get(searchTerm)

    if(comments)
      res
        .status(200)
        .send({message: 'Success from cache', data: JSON.parse(comments)})
    else {
      const response = await axios(
        `https://jsonplaceholder.typicode.com/comments?postId=${searchTerm}`
      )
      client.setEx(searchTerm, 600, JSON.stringify(response.data))

      res.status(200).send({message: 'success from API', data: response.data})
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({message: 'internal server error'})
  }
}

module.exports = {getJobs}
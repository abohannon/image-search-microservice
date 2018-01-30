const fetch = require('node-fetch')
const API_KEY = 'AIzaSyC0e615PFI4bXO7Fpe0ycu7h6Dr3nmWsCg'
const SEARCH_ID = '007292438043507674194:yeh92fuem_y'

module.exports = (app) => {
  app.get('/', (req, res) => res.send('Hello world'))

  app.get('/api/search/:term', async (req, res) => {
    const { term } = req.params
    const { offset } = req.query
    const page = offset > 0 ? 10 * offset : 1

    try {
      const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ID}&searchType=image&start=${page}&q=${req.params.term}`)
      const body = await response.json()

      const searchResults = body.items.reduce((results, item, i) => {
        results[i] = {
          title: item.title,
          'image url': item.link,
           context: item.image.contextLink
        }

        return results
      }, [])

      res.send(searchResults)

    } catch (err) {
      console.log('There was an error fetching data', err)
    }
  })

}

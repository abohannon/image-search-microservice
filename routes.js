const fetch = require('node-fetch')
const keys = require('./config/keys')
const mongoose = require('mongoose')
const Search = mongoose.model('search')

module.exports = (app) => {
  app.get('/', (req, res) => res.send('Hello world'))

  app.get('/api/search/:term', async (req, res) => {
    const { term } = req.params
    const { offset } = req.query
    const page = offset > 0 ? 10 * offset : 1

    const newSearch = new Search({
      query: term,
      date: Date.now()
    })

    try {
      const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${keys.API_KEY}&cx=${keys.SEARCH_ID}&searchType=image&start=${page}&q=${term}`)
      const body = await response.json()

      const searchResults = await body.items.reduce((results, item, i) => {
        results[i] = {
          title: item.title,
          'image url': item.link,
           context: item.image.contextLink
        }
        return results
      }, [])

      await newSearch.save()

      res.send(searchResults)

    } catch (err) {
      console.log('There was an error fetching data', err)
    }
  })

  app.get('/api/recent', (req, res) => {

    Search.find({}, (err, searches) => {
      const recentSearches = searches.reduce((searches, search, i) => {
        searches[i] = {
          query: search.query,
          date: search.date
        }
        return searches
      }, [])

      res.send(recentSearches.reverse())
    })
  })

}

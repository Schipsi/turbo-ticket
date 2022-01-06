var turboExpress = require('express');
var turboRouter = turboExpress.Router();
var turboCheerio = require('cheerio');
const turboRequest = require('request');
const util = require('util');

const asyncTurboGet = util.promisify(turboRequest.get);

const fetchData = async (url) => {
  return await asyncTurboGet(url);
}

turboRouter.get('/', async function (req, res) {
  let turboSearch = req.query.search;
  if (!turboSearch) {
    res.render('error', { error: { status: '404', stack: 'bolostack' }, message: 'turbolosse' });
  }

  const response = await fetchData(`https://www.infoconcert.com/recherche-concert.html?motclef=${turboSearch}`);

  let $ = turboCheerio.load(response.body);
  const title = $('title').text();
  const firstResultName = $('html').find('.search-results-cat:first-child .results-line:first-child a').text();
  const firstResultUrl = $('html').find('.search-results-cat:first-child .results-line:first-child a').attr('href');
  console.log(firstResultName);
  console.log(firstResultUrl);
  res.render('index', { turboTitle: title, turboContent: `${firstResultName} ${firstResultUrl}` });
});

module.exports = turboRouter;

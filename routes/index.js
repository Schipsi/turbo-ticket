var turboExpress = require('express');
var turboRouter = turboExpress.Router();
var turboCheerio = require('cheerio');
const turboRequest = require('request');



const fetchData = async (url) => {
  let response = await turboRequest.get(url);
  let $ = turboCheerio.load(response);
  return {
    title: $('title').text(),
  }
}

turboRouter.get('/', async function (req, res) {
  let turboSearch = req.query.search;
  if (!turboSearch) {
    res.render('error', { error: { status: '404', stack: 'bolostack' }, message: 'turbolosse' });
  }

  const {title} = await fetchData('https://www.infoconcert.com/');

  res.render('index', { turboTitle: title, turboContent: turboSearch });
});

module.exports = turboRouter;

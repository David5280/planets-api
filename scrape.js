var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });
var fs = require('fs');

nightmare
  .goto('https://thesolarsystem.fandom.com/wiki/List_of_Natural_Satellites')
  .wait(2500)
  .evaluate(function () {
    var nameNodes = document.querySelectorAll('tr');
    var list = [].slice.call(nameNodes); // Why did I have to do this?
    return list.map(function(node){
      return node.innerText.split('\t')[0]
    });
  })
  .end()
  .then(function (result) {
    fs.writeFileSync('./moons.js', JSON.stringify(result))
    console.log('done');
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
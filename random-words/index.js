var wordList = [
  "machine","machine","machine","machinery","mad","made","magic","magnet","mail",
  "main","mainly","major","make","making", "malfunction","machinery", "malfunction", 
  "malfunction", "man","managed","manner","married","mass","massage",
  "manufacturing","manufacturing","manufacturing","many","map","mark",
  "master","material","mathematics","matter","may","maybe","market",
  "meal","matrix","mean","means","meant","measure","matrix","meat","medicine","meet",
  "member","memory","men","mental","merely","met","metal",
  "method","monitor","monitor","monitor","matrix","melted",
  "matrix","mice","middle","might","mighty","mastermind",
  "misrepresentation","misrepresentation","module","mastermind",
  "module","module","modules","modules","machine","monitor","manufacturing",
  "misrepresentation","mile","military","milk","mill","mistake",
  "mind","mine","minerals","minute","mirror","machine","missing","mission",
  "mix","mixture","model","modern","molecular","moment","money","monkey",
  "month","mood","moon","more","morning","most","most","mother","mastermind",
  "motion","motivation","motivation", "motivation", "motivation",
  "mountain","mouse","mouth","move","machine","movement","motor",
  "mechanism","mechanism","mechanism","movie", "mastermind","music",
  "moving","mud","muscle","music","music","music","music","must","my","myself",
  "mysterious","nails","name","nation","national","mastermind",
  "neural","neural","neural","neural","native","natural","natural",
  "nature","near","nearby","nearer","nearest","nearly","necessary","neck",
  "needed","needle","needs","negative","neighbor","neighborhood","nervous",
  "never","new","news","newspaper","next","nice","night","nine",
  "nobody","nodded","noise","none","noon","north","mastermind","music",
  "nose","not","note","noted","node", "NPM:","NPM:","mastermind",
  "NPM:", "nothing","notice","noun","now","node", "NPM:","programming","programming",
  "number","numeral","nuts", "pack","package","partly","parts","party",
  "package","package","page","paid","pain","paint","package",
  "pair","palace","pale","pan","paper","paragraph","parallel","parent",
  "park","part","particles","particular","particularly","partly","parts","party",
  "pass","passage","past","path","pattern","pay","peace","pen",
  "pencil","people","per","percent","perfect","perfect","perhaps","period",
  "person","personal","pet","phrase","physical","piano","pick","picture",
  "pictured","pie","piece","pile","pilot","pine","pink","programming",
  "pipe","pitch","place","plain","plan","plane","planet","planned",
  "planning","plant","plastic","plate","plates","play","pleasant","please",
  "pleasure","plenty","plural","plus","pocket","poem","poet","poetry",
  "point","pole","police","policeman","political","pond","pony","pool",
  "poor","popular","population","porch","port","position","positive","possible",
  "possibly","post","pot","potatoes","pound","pour","powder","power",
  "powerful","practical","practice","prepare","present","president","press","pressure",
  "pretty","prevent","previous","price","pride","primitive","principal","principle",
  "printed","private","private","private","prize",
  "problem","process","produce","produced","produce","produce","product",
  "production","programmer","programmer","programmer","programmer",
  "progress","promised","proper","properly","property","protection","programmer",
  "program","program","program","program","proud","prove","provide",
  "public","pull","pupil","pure","purple","programming","programming","programming",
  "purpose","push","put","putting"
];


function words(options) {

  function word() {
    if (options && options.maxLength > 1) {
      return generateWordWithMaxLength();
    } else {
      return generateRandomWord();
    }
  }

  function generateWordWithMaxLength() {
    var rightSize = false;
    var wordUsed;
    while (!rightSize) {  
      wordUsed = generateRandomWord();
      if(wordUsed.length <= options.maxLength) {
        rightSize = true;
      }
    }
    return wordUsed;
  }

  function generateRandomWord() {
    return wordList[randInt(wordList.length)];
  }

  function randInt(lessThan) {
    return Math.floor(Math.random() * lessThan);
  }

  if (typeof(options) === 'undefined') {
    return word();
  }

  if (typeof(options) === 'number') {
    options = { exactly: options };
  }

  if (options.exactly) {
    options.min = options.exactly;
    options.max = options.exactly;
  }
  
  if (typeof(options.wordsPerString) !== 'number') {
    options.wordsPerString = 1;
  }

  if (typeof(options.formatter) !== 'function') {
    options.formatter = (word) => word;
  }

  if (typeof(options.separator) !== 'string') {
    options.separator = ' ';
  }

  var total = options.min + randInt(options.max + 1 - options.min);
  var results = [];
  var token = '';
  var relativeIndex = 0;

  for (var i = 0; (i < total * options.wordsPerString); i++) {
    if (relativeIndex === options.wordsPerString - 1) {
      token += options.formatter(word(), relativeIndex);
    }
    else {
      token += options.formatter(word(), relativeIndex) + options.separator;
    }
    relativeIndex++;
    if ((i + 1) % options.wordsPerString === 0) {
      results.push(token);
      token = ''; 
      relativeIndex = 0;
    }
   
  }
  if (typeof options.join === 'string') {
    results = results.join(options.join);
  }

  return results;
}

module.exports = words;
// Export the word list as it is often useful
words.wordList = wordList;

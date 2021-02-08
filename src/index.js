/*
*   This module collects values made in ./words.js and mass exports them in an array.
*   Copyright 2021 © Joey Malvinni
*   License: MIT
*/

// Importing deps
let { 
    random, 
    dictionary, 
    modules, 
    generateN_Dictionary, 
    generateP_Dictionary, 
    generateM_Dictionary,
    ArchivedGenerateN,
    ArchivedGenerateP,
    ArchivedGenerateM,
} = require('./words');
let fs = require('fs')

const crypto = require('crypto');
format = require('biguint-format');

function randomC(qty) {
    var x = crypto.randomBytes(qty);
    return format(x, 'dec');
}
function value() {
    return +((Math.round((randomC(4) / Math.pow(2, 4 * 8 - 1) * (2 - 0) + 0) * 100) / 100).toFixed())
}

// Exporting random words to a file, which generates the "bad" file (and was used to generate the original bad training data). 
// Used in the original rough output, but is not recomended (the default "bad.txt" is fine-tuned and is much better than these exports).
function exportRandomWordsToFile(){
    let dataStream = fs.createWriteStream('./default_data/bad.txt')
    for(let i = 0; i <= 1000; i++){
        let res = value();
        if(res === 0) dataStream.write(dictionary() + '\n')
            else if(res === 1) dataStream.write(modules() + '\n')
            else if(res === 2) dataStream.write(generateN_Dictionary() + ' ' + generateP_Dictionary() + ' ' + generateM_Dictionary() + '\n')
            else if(res === 3) dataStream.write(ArchivedGenerateN() + ' ' + generateP_Dictionary() + ' ' + generateM_Dictionary() + '\n')
            else if(res === 4) dataStream.write(generateN_Dictionary() + ' ' + ArchivedGenerateP() + ' ' + generateM_Dictionary() + '\n')
            else if(res === 5) dataStream.write(generateN_Dictionary() + ' ' + generateP_Dictionary() + ' ' + ArchivedGenerateM() + '\n')
            else if(res === 6) dataStream.write(ArchivedGenerateN() + ' ' + ArchivedGenerateP() + ' ' + generateM_Dictionary() + '\n')
            else if(res === 7) dataStream.write(ArchivedGenerateN() + ' ' + generateP_Dictionary() + ' ' + ArchivedGenerateM() + '\n')
            else dataStream.write(random() + '\n')
    }
    dataStream.end()

    console.log('Saved bad random acronyms.')
}

// Generating the 10000 random acronyms
function generate(){
    let array = [];
    for(let i = 0; i <= 10000; i++){
        array.push(modules())
    }
    return array
}
function generateAllPossibleNPMAcronyms(){
    // Gets all of the possible combinations when givin multiple arrays
    function combine(...args) {
        var r = [], max = args.length-1;
        function helper(arr, i) {
            for (var j=0, l=args[i].length; j<l; j++) {
                var a = arr.slice(0); // clone arr
                a.push(args[i][j]);
                if (i==max)
                    r.push(a);
                else
                    helper(a, i+1);
            }
        }
        helper([], 0);
        return r;
    }

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

    let nArray = [];
    let pArray = [];
    let mArray = [];

    for(let i = 0; i < wordList.length; i++){
        if(wordList[i].startsWith('n')){
            nArray.push(wordList[i])
        } else if(wordList[i].startsWith('p')){
            pArray.push(wordList[i])
        } else if(wordList[i].startsWith('m')){
            mArray.push(wordList[i])
        }
    } 

    function uppercase(string) {
        return string.replace(/\w\S*/g, function(text) {
            return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
        });
    }

    let final = combine(nArray, pArray, mArray)
    let formatted = [];

    for(let i = 0; i < final.length; i++){
        let arr = [];
        for(let j = 0; j < final[i].length; j++){
            arr.push(uppercase(final[i][j]))
        }
        formatted.push(arr.join(' '))
    }

    fs.writeFileSync('./default_data/all_combinations.txt', formatted.join('\n'))
}

generateAllPossibleNPMAcronyms()

module.exports = generate
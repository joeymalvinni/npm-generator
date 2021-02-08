fs = require('fs');
let fetch = require('node-fetch');

const crypto = require('crypto');
format = require('biguint-format');

function randomC(qty) {
    var x = crypto.randomBytes(qty);
    return format(x, 'dec');
}
function value() {
    return randomC(4) / Math.pow(2, 4 * 8 - 1) * (1 - 0) + 0;
}
// Random Acronym generation
function random(){
    if(value() === 0){
        return modules()
    } else {
        return dictionary()
    }
}

function modules(){
    return ArchivedGenerateN() + ' ' + ArchivedGenerateP() + ' ' + ArchivedGenerateM()
}

function dictionary(){
    return generateN_Dictionary() + ' ' + generateP_Dictionary() + ' ' + generateM_Dictionary()
}

// Generate the word files
async function words(){
    console.log('Fetching words...')
    let data = await fetch('http://app.aspell.net/create?max_size=35&spelling=US&max_variant=0&diacritic=strip&special=hacker&download=wordlist&encoding=utf-8&format=inline').then(res => res.text())
    console.log('Successfully got data!')
    let splitted = data.split('\n')

    splitted.splice(0, 44)

    console.log(splitted)

    let nData = [];
    let pData = [];
    let mData = [];

    console.log('Catelogging the data...')
    for(let i = 0; i < splitted.length; i++){
        if(splitted[i].startsWith('n') || splitted[i].startsWith('N')){
            nData.push(splitted[i])
        } else if(splitted[i].startsWith('p') || splitted[i].startsWith('P')){
            pData.push(splitted[i])
        } else if(splitted[i].startsWith('m') || splitted[i].startsWith('M')){
            mData.push(splitted[i])
        }
    }
    console.log('Data is sorted!')


    console.log('Saving the data...')
    streamFile(nData, 'n')
    streamFile(pData, 'p')
    streamFile(mData, 'm')
    console.log('Data successfully saved!!!')

    console.log('Data generated.')
}

// Worker function that streams the words to a file
function streamFile(data, filename){
    let stream = fs.createWriteStream(`./src/${filename}.txt`)
    for(let i = 0; i < data.length; i++){
        stream.write(data[i] + '\n')
    }

    stream.on('error', function(err) {
        console.log(err);
        stream.end();
    });
    stream.end()
}

module.exports = { 
    random, 
    dictionary, 
    modules, 
    generateN_Dictionary, 
    generateP_Dictionary, 
    generateM_Dictionary,
    ArchivedGenerateN,
    ArchivedGenerateP,
    ArchivedGenerateM,
}


function generateN_Dictionary(){
    let data = fs.readFileSync('./src/n.txt').toString().split('\n')
    const position = crypto.randomBytes(4).readUInt32BE() % data.length;
    return uppercase(data[position]);
}

function generateP_Dictionary(){
    let data = fs.readFileSync('./src/p.txt').toString().split('\n')
    const position = crypto.randomBytes(4).readUInt32BE() % data.length;
    return uppercase(data[position]);
}

function generateM_Dictionary(){
    let data = fs.readFileSync('./src/m.txt').toString().split('\n')
    const position = crypto.randomBytes(4).readUInt32BE() % data.length;
    return uppercase(data[position]);
}

function uppercase(string) {
    return string.replace(/\w\S*/g, function(text) {
        return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
    });
}

let randomWords = require('../random-words/index.js')

function ArchivedGenerateN(){
    let words = randomWords({exactly: 1000, formatter: (word, index)=> {
        return index === 0 ? word.slice(0,1).toUpperCase().concat(word.slice(1)) : word;
    }})
    for(let i = 0; i < words.length; i++){
        if(words[i].startsWith('N')){
            return words[i];
        }
    }
}

function ArchivedGenerateP(){
    let words = randomWords({exactly: 1000, formatter: (word, index)=> {
        return index === 0 ? word.slice(0,1).toUpperCase().concat(word.slice(1)) : word;
    }})
    for(let i = 0; i < words.length; i++){
        if(words[i].startsWith('P')){
            return words[i];
        }
    }
}

function ArchivedGenerateM(){
    let words = randomWords({exactly: 1000, formatter: (word, index)=> {
        return index === 0 ? word.slice(0,1).toUpperCase().concat(word.slice(1)) : word;
    }})
    for(let i = 0; i < words.length; i++){
        if(words[i].startsWith('M')){
            return words[i];
        }
    }
}
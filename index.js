/*
*   This module provides the main functions that output .
*   Copyright 2021 © Joey Malvinni
*   License: Apache
*/

/**
 * @license
 * Copyright 2021 © Joey Malvinni. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */

////////////////////////////////////////////////////////////
//                                                        //
//       INDEX.js                                         //
//                                                        //
//       This file takes the classifier.json file         //
//       outputted by the generator and exports           //
//       three functions, the first, which generates      //
//       the acronyms and outputs them to a file,         //
//       the second, which generates the acronyms         //
//       with the classifier and returns them within      //
//       an array as a promise, and the last,             //
//       to which you input an array and get              //
//       an object back determining whether the           //
//       string is a good acronym or not.                 //
//                                                        //
////////////////////////////////////////////////////////////

var bayes = require('bayes')
let fs = require('fs')
const readline = require("readline");
let util = require('util');
var crypto = require("crypto");
let isBad = require('./src/bad_words')

if(process.env.npm_config_output && process.env.npm_config_output === 'file'){
    outputToFile()
}

if(process.env.npm_config_output && process.env.npm_config_output === 'console'){
    generate().then(data =>{
        data.forEach(line => {
            console.log(line)
        })
    })
}


if(process.env.npm_config_acronym){
    isGoodAcronym(process.env.npm_config_acronym).then(console.log)
}

async function isGoodAcronym(acronym){
    let { getClassifier, changeClassifier } = require('./src/classifier.js')
    let classifier;
    
    const readFile = util.promisify(fs.readFile) 

    if(fs.existsSync(`./default_data/${getClassifier()}.json`)) {
        let stats = await readFile('./default_data/classifierJSON.json')
        classifier = bayes.fromJson(stats)

        let bad = fs.readFileSync('./default_data/bad.txt').toString().split('\n')
        let good = fs.readFileSync('./default_data/good.txt').toString().split('\n')

        for(let i = 0; i < bad.length; i++){
            try {
                await classifier.learn(bad[i], 'n')
                await classifier.learn(bad[i], 'n')
                await classifier.learn(bad[i], 'n')
            } catch(err){
                // :(
            }
        }
        for(let i = 0; i < good.length; i++){
            try {
                await classifier.learn(good[i], 'y')
                await classifier.learn(good[i], 'y')
                await classifier.learn(good[i], 'y')
            } catch(err){
                // :(
            }
        }
        let goodN = fs.readFileSync('./gen_good.txt').toString().split('\n')
        for(let i = 0; i < good.length; i++){
            try {
                await classifier.learn(goodN[i], 'y')
                await classifier.learn(goodN[i], 'y')
                await classifier.learn(goodN[i], 'y')
            } catch(err){
                
            }
        }
    } else {
        firstPrompt('Classifier file does not exist. Please try again ')
    }

    function end(){
        return new Promise(async (resolve, reject)=>{
            let result = await classifier.categorize(acronym)
            let classified_data = result === 'y' ? true : false;
            
            let data = await isBad(acronym);

            let acronymLetters = acronym.split(' ').map(i => i.charAt(0)).join('')

            let isCorrectAcronym;

            if(acronymLetters === 'NPM'){
                isCorrectAcronym = true;
            } else {
                isCorrectAcronym = false;
            }

            resolve({
                inappropriate: data, 
                good: classified_data,
                NPM: isCorrectAcronym
            })
        })
    }


    return end()
}

function generate(){
    return new Promise(async (resolve, reject)=>{
        let generate = require('./src/index')

        let classifier;
    
        const readFile = util.promisify(fs.readFile) 
            
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        function ask(question){
            return new Promise((resolve, reject)=>{
                rl.question(question, function(answer) {
                    resolve(answer)
                })
            })
        }
    
        async function firstPrompt(question){
            let data = await ask(`${question}> `)
            checkFile(data)
        }
    
        let { getClassifier } = require('./src/classifier.js')
        
        checkFile(getClassifier())
    
        async function checkFile(file){
            if(fs.existsSync(`./default_data/${file}.json`)) {
                let stats = await readFile('./default_data/classifierJSON.json')
                classifier = bayes.fromJson(stats)
    
                let bad = fs.readFileSync('./default_data/bad.txt').toString().split('\n')
                let good = fs.readFileSync('./default_data/good.txt').toString().split('\n')
        
                for(let i = 0; i < bad.length; i++){
                    try {
                        await classifier.learn(bad[i], 'n')
                    } catch(err){
                        // :(
                    }
                }
                for(let i = 0; i < good.length; i++){
                    try {
                        await classifier.learn(good[i], 'y')
                    } catch(err){
                        // :(
                    }
                }
                let goodN = fs.readFileSync('./gen_good.txt').toString().split('\n')
                for(let i = 0; i < good.length; i++){
                    try {
                        await classifier.learn(goodN[i], 'y')
                    } catch(err){
                        
                    }
                }
                end()
            } else {
                firstPrompt('Classifier file does not exist. Please try again ')
            }
        }  
    
        async function end(){
            let data = generate()
            let array = [];
            for(let i = 0; i <= data.length; i++){
                if(i !== data.length){
                    let result = await classifier.categorize(data[i])
                    if(result === 'y'){
                        array.push(data[i])
                    }
                } else {
                    resolve(array)
                }
            }
        }
    })
}

async function outputToFile(){
    let generate = require('./src/index')

    let classifier;

    const readFile = util.promisify(fs.readFile) 
        
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    function ask(question){
        return new Promise((resolve, reject)=>{
            rl.question(question, function(answer) {
                resolve(answer)
            })
        })
    }

    async function firstPrompt(question){
        let data = await ask(`${question}> `)
        checkFile(data)
    }

    let { getClassifier } = require('./src/classifier.js')
    
    checkFile(getClassifier())

    async function checkFile(file){
        if(fs.existsSync(`./default_data/${file}.json`)) {
            let stats = await readFile('./default_data/classifierJSON.json')
            classifier = bayes.fromJson(stats)

            let bad = fs.readFileSync('./default_data/bad.txt').toString().split('\n')
            let good = fs.readFileSync('./default_data/good.txt').toString().split('\n')
    
            for(let i = 0; i < bad.length; i++){
                try {
                    await classifier.learn(bad[i], 'n')
                } catch(err){
                    // :(
                }
            }
            for(let i = 0; i < good.length; i++){
                try {
                    await classifier.learn(good[i], 'y')
                } catch(err){
                    // :(
                }
            }
            let goodN = fs.readFileSync('./gen_good.txt').toString().split('\n')
            for(let i = 0; i < good.length; i++){
                try {
                    await classifier.learn(goodN[i], 'y')
                } catch(err){
                    
                }
            }
            end()
        } else {
            firstPrompt('Classifier file does not exist. Please try again ')
        }
    }  

    async function end(){
        let data = generate()
        var id = crypto.randomBytes(7).toString('hex');

        let file = fs.readdirSync(__dirname + `\\output\\`)[0]
        
        if(fs.existsSync(__dirname + '\\output\\' + file)){
            let rename = util.promisify(fs.rename);
        
            await rename(__dirname + '\\output\\' + file, __dirname + '\\archived_outputs\\' + file)
        }

        let stream = fs.createWriteStream(__dirname + `\\output\\${id}-output.txt`)
        for(let i = 0; i < data.length; i++){
            let result = await classifier.categorize(data[i])
            if(result === 'y'){
                stream.write(data[i] + '\n')
            }
        }
    
        stream.on('error', function(err) {
            console.log(err);
            stream.end();
        });
    
        stream.end()
        setTimeout(() => {
            let exists = fs.existsSync(__dirname + `\\output\\${id}-output.txt`)
            if(exists){
                console.log('Generated ./output/' + id + '-output.txt')   
            } else {
                throw `Couldn't generate file.`
            }
            process.exit()
        }, 1000);
    }
}

function isAcronym(word){
	return Object.assign(
        isGoodAcronym(word), {
            generate, 
            outputToFile,
            isGoodAcronym
        }
    )
};

module.exports = {isGoodAcronym, generate}
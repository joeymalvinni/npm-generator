/*
*   This module generates the classifier file based upon your personal preferences.
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
//     GENERATOR.js                                       //
//                                                        //
//     This file trains the neural network.               //
//     It outputs a JSON file, classifier.json,           //
//     which is used in index.js to know your personal    //
//     preferences of acronyms and generate a rough       //
//     output.txt file which gives you a better           //
//     idea of what will be really outputted              //
//     in the index.js file.                              //
//                                                        //
////////////////////////////////////////////////////////////

var bayes = require('bayes')
let fs = require('fs')
const readline = require("readline");
let util = require('util');
var crypto = require("crypto");
let fetch = require('node-fetch')
let { getClassifier, changeClassifier } = require('./src/classifier.js')

start()

// Main function
async function start(){
    let classifier;
    // Prompt template
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    // Promisified readFile
    const readFile = util.promisify(fs.readFile) 
    // Reading the expansions file
    let file = await readFile('./expansions.txt')
    // Splitting the expansions
    let splitted = file.toString().split('\n')

    defineClass(getClassifier())

    // Checking if the default classifier file exists
    async function defineClass(data){
        if(fs.existsSync(`./default_data/${data}.json`)) {
            let stats = await readFile(`./default_data/${data}.json`)
            classifier = bayes.fromJson(stats)
            
            firstPrompt()
        } else {
            let answer = await ask(`What is your classifier JSON file? (e.g. af8a9eef37c6e3-classifierJSON or 41fe80a7aca2e9-classifierJSON) > `)

            defineClass(answer)
        }
    }
    
    function ask(question){
        return new Promise((resolve, reject)=>{
            rl.question(question, function(answer) {
                resolve(answer)
            })
        })
    }

    async function firstPrompt(){
        let data = await ask('Would you like to train the neural network from the real acronyms? (y, n, yes, no) > ')
        if(data === 'yes' || data === 'y'){
            updateExpansions()
        } else if(data === 'no' || data === 'n'){
            defaultTraining()
        } else {
            firstPrompt()
        }
    }

        
    let generate = require('./src/index')

    async function updateExpansions(){
        let data = await fetch('https://raw.githubusercontent.com/npm/npm-expansions/master/expansions.txt').then(res => res.text())
        let stream = fs.createWriteStream('./expansions.txt')
        data = data.split('\n').splice(0, data.split('\n').length - 6).join('\n')
        stream.write(data)
    
        stream.end()
        getInfo(0)
    }

    async function defaultTraining(){
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

        console.log('Entering the mandatory training zone. Enter .exit when you are satified that the neural network knows what a good acronym is.\n')

        defaultStart(0)
    }
    // Generating sample data
    let data = generate();
    
    // Training the network on randomized data
    async function defaultStart(i){
        if(i < data.length){
            let result = await classifier.categorize(data[i])
            console.log(result + ' - ' + data[i])
                let response = await ask("Do you like this acronym? " + data[i] + ' (y or n) > ')
                if(response.toString() === 'y'){
                    defaultStart(i + 1)
                    await classifier.learn(data[i], 'y')
                } else if(response.toString() === 'n'){
                    await classifier.learn(data[i], 'n')
                    defaultStart(i + 1)
                } else if(response.toString() === '.exit'){
                    end()
                } else {
                    defaultStart(i)
                }
        } else {
            end()
        }
    }  
    
    // Traing the network on the actual data from npm-extensions
    async function getInfo(i){
        if(i < splitted.length){
            let data = await ask("Do you like this acronym? " + splitted[i] + ' (y or n) > ')
            if(data.toString() === 'y'){
                getInfo(i + 1)
                await classifier.learn(splitted[i], 'y')
            } else if(data.toString() === 'n'){
                await classifier.learn(splitted[i], 'n')
                getInfo(i + 1)
            } else {
                getInfo(i)
            }
        } else {
            defaultStart()
        }
    }
    
    // Cleanup worker
    function end(){
        rl.close();
        setTimeout(() => {
            finalDump()
        }, 1000);
    }
 
    // Final export to show the exported data
    async function finalDump(){
        let data = generate()
        var id = crypto.randomBytes(7).toString('hex');
        let stream = fs.createWriteStream(__dirname + `\\output\\${id}-output.txt`)
        for(let i = 0; i < data.length; i++){
            let result = await classifier.categorize(data[i])
            if(result === 'y'){
                // The result is approved by the classifier, so write it to the stream
                stream.write(data[i] + '\n')
            }
        }

        // Gracefully handling errors
        stream.on('error', function(err) {
            console.log(err);
            stream.end();
        });
        stream.end()

        // Writing the classifier JSON to the file
        fs.writeFileSync(__dirname + `\\default_data\\${id}-classifierJSON.json`, classifier.toJson())

        changeClassifier(__dirname + `\\default_data\\${id}-classifierJSON.json`)

        // Info
        console.log(`Generated output file: ${id}-output.txt`)
    }
}

async function generateClassifier(){
    let id = crypto.randomBytes(7).toString('hex');
    classifier = bayes()

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

    fs.writeFileSync(__dirname + `\\default_data\\${id}-classifierJSON.json`, classifier.toJson())
}

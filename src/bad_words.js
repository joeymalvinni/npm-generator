/*
*   This module checks if the inputted word is inappropriate.
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

let fetch = require('node-fetch')

function isBad(word){
    return new Promise(async (resolve, reject)=>{
        word = word.toLowerCase()
        splitwords = word.split(' ')
        let isBad = [];
        let data = await fetch('http://www.bannedwordlist.com/lists/swearWords.txt').then(res => res.text())
        let splitted = data.split('\n')

        for(let j = 0; j <= splitwords.length; j++){
            if(j !== splitwords.length){
                for(let i = 0; i < splitted.length; i++){
                    if(splitted[i] !== null && splitted[i] !== ''){
                        if(splitwords[j] === splitted[i] || editDistance(splitwords[j], splitted[i]) / 3 === 0 || (splitwords[j].includes(splitted[i]) && editDistance(splitwords[j], splitted[i]) < 5)) {
                            isBad.push(true)
                            break;
                        } else{
                            isBad.push(false)
                        }
                    }
                }
            } else {
                if(isBad.includes(true)){
                    resolve(true)
                } else{
                    resolve(false)
                }
            }
        }
    })
}

function editDistance(a, b){
    if (a.length === 0) return b.length
    if (b.length === 0) return a.length
    let tmp, i, j, prev, val, row

    if (a.length > b.length) {
        tmp = a
        a = b
        b = tmp
    }

    row = Array(a.length + 1)
    for (i = 0; i <= a.length; i++) {
        row[i] = i
    }
  
    for (i = 1; i <= b.length; i++) {
        prev = i
        for (j = 1; j <= a.length; j++) {
            if (b[i-1] === a[j-1]) {
                val = row[j-1]
            } else {
                val = Math.min(row[j-1] + 1, Math.min(prev + 1, row[j] + 1))
            }
            row[j - 1] = prev
            prev = val
        }
        row[a.length] = prev
    }
    return row[a.length]
}

module.exports = isBad
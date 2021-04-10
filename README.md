# **npm-generator**
```
                                                              _             
  _ __  _ __  _ __ ___         __ _  ___ _ __   ___ _ __ __ _| |_ ___  _ __ 
 | '_ \| '_ \| '_ ` _ \ _____ / _` |/ _ \ '_ \ / _ \ '__/ _` | __/ _ \| '__|
 | | | | |_) | | | | | |_____| (_| |  __/ | | |  __/ | | (_| | || (_) | |   
 |_| |_| .__/|_| |_| |_|      \__, |\___|_| |_|\___|_|  \__,_|\__\___/|_|   
       |_|                    |___/  
```
🖥️✨🤖 Generating the acronyms for N-P-M using Machine Learning.
  
  
[![Build Status](https://travis-ci.com/joeymalvinni/npm-generator.svg?branch=main)](https://travis-ci.com/joeymalvinni/npm-generator)
[![GitHub license](https://img.shields.io/github/license/joeymalvinni/npm-generator.svg)](https://github.com/joeymalvinni/npm-generator/blob/master/LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/joeymalvinni/npm-generator.svg)](https://GitHub.com/Naereen/joeymalvinni/npm-generator/contributors/)
[![Known Vulnerabilities](https://snyk.io/test/github/joeymalvinni/npm-generator/badge.svg?targetFile=package.json)](https://snyk.io/test/github/joeymalvinni/npm-generator?targetFile=package.json)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
  
  
Examples include:
  
- Noise Particles Missing
- Nice Poetry Module
- New Paragraph Maker
- NPM: Package Missing
- Nobody Produced Magic
- Neural Programming Mastermind
- New Programmer Music
- Need Production Modules
- New Programming Matrix

  
## **Installation**
```
git clone https://github.com/joeymalvinni/npm-generator.git
cd npm-generator
npm install
```
  

## **Usage**

Train the Naive-Bayes classifier JSON:
```
npm run generate
```
You will need to enter `y` or `n` (or `yes` and `no`) when prompted. Press `.exit` during the generative stage to stop training the network and output good acronyms to a file.
  
Generate acronyms for N-P-M and output them to a file:
``` 
npm start --output=file
```
  

Generate the acronyms for N-P-M and log all of them to the console:
```
npm start --output=console
```
  

Classify an acronym:
```
npm start --acronym="Node Package Manager"
```

## License

This program is licensed by Joey Malvinni under the Apache 2.0 License.

See the [LICENSE](LICENSE) for more info.

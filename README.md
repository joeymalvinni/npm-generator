# **npm-generator**
🖥️✨🤖 Generating the acronyms for N-P-M using Machine Learning.
<br><br><br>

## **Installation**
```
git clone https://github.com/joeymalvinni/npm-generator.git
cd npm-generator
npm install
```
<br>

## **Usage**
<br>

Train the Naive-Bayes classifier JSON:
```
npm run generate
```
You will need to enter `y` or `n` (or `yes` and `no`) when prompted. Press `.exit` during the generative stage to stop training the network and output good acronyms to a file.

<br>

Generate acronyms for N-P-M and output them to a file:
``` 
npm start --output=file
```
<br>

Generate the acronyms for N-P-M and log all of them to the console:
```
npm start --output=console
```
<br>

Classify an acronym:
```
npm start --acronym="Node Package Manager"
```
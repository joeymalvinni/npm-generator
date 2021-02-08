# **npm-generator**
🖥️✨🤖 Generating the acronyms for N-P-M using Machine Learning.
  

  
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
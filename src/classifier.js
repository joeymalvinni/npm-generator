let classifier = 'classifierJSON'

function changeClassifier(path){
    classifier = path;
}

function getClassifier(){
    return classifier;
}

module.exports = { changeClassifier, getClassifier }
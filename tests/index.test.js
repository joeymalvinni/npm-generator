let { isGoodAcronym, generate } = require('../index')

var expect  = require('chai').expect;

describe('Checking if npm-generator is in working order.', function() {
    it('Should correctly sort good acronyms', function(done){
        isGoodAcronym('Neural Phrase Maker').then(gData => {
            expect(gData.NPM).to.eql(true)
            expect(gData.inappropriate).to.eql(false)
            expect(gData.good).to.eql(true)

            done()
        })
    })
    it('Should correctly sort good acronyms', function(done){
        isGoodAcronym('Neural Programming Module').then(gData => {
            expect(gData.NPM).to.eql(true)
            expect(gData.inappropriate).to.eql(false)
            expect(gData.good).to.eql(true)

            done()
        })
    })
    it('Should correctly sort good acronyms', function(done){
        isGoodAcronym('NPM: Popular Modules').then(gData => {
            expect(gData.NPM).to.eql(true)
            expect(gData.inappropriate).to.eql(false)
            expect(gData.good).to.eql(true)

            done()
        })
    })
    it('Should correctly sort bad acronyms', function(done){
        isGoodAcronym('Nice Try, Mister').then(data => {
            expect(data.NPM).to.eql(false)
            expect(data.inappropriate).to.eql(false)
            expect(data.good).to.eql(true)
            done()
        })
    })
    it('Should correctly sort bad acronyms', function(done){
        isGoodAcronym('Nose Slug Mud').then(data => {
            expect(data.NPM).to.eql(false)
            expect(data.inappropriate).to.eql(false)
            expect(data.good).to.eql(false)
            done()
        })
    })
    it('Should correctly sort bad acronyms', function(done){
        isGoodAcronym('NOT AN ACRONYM').then(data => {
            expect(data.NPM).to.eql(false)
            expect(data.inappropriate).to.eql(false)
            expect(data.good).to.eql(true)
            done()
        })
    })
    it('Should generate acronyms', function(done){
        this.timeout(15000);
        generate().then(data =>{
            expect(data).to.not.equal(undefined);
            done()
        })
    });
});
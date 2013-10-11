
var st = require('../lib/stocktwits');


describe('GET', function () {
    it('should return an error on non JSON response', function (done) {
        st.get('streams/user', {id:'StockTwits'}, function (err, res) {
            err.message.indexOf('<!DOCTYPE html>').should.equal(0);
            done();
        });
    });
    it('should return an API error', function (done) {
        st.get('streams/user/nonexistinguser987', function (err, res) {
            err.response.status.should.equal(404);
            err.errors[0].message.should.equal('User not found');
            done();
        });
    });
    
    it('should make a GET request without parameters', function (done) {
        st.get('streams/user/StockTwits', function (err, res) {
            if (err) return done(err);
            res.body.response.status.should.equal(200);
            res.body.messages.length.should.equal(30);
            done();
        });
    });
    it('should make a GET request with parameters', function (done) {
        st.get('streams/user/StockTwits', {limit:15, filter:'links'}, function (err, res) {
            if (err) return done(err);
            res.body.response.status.should.equal(200);
            res.body.messages.length.should.equal(15);
            for (var i=0; i < res.body.messages.length; i++) {
                res.body.messages[i].links.should.be.an.instanceof(Array);
            }
            done();
        });
    });

    it('should store the rate limits', function (done) {
        st.get('streams/user/StockTwits', function (err, res) {
            if (err) return done(err);
            res.limit.should.equal(200);
            res.remaining.should.be.below(200);
            res.reset.should.be.an.instanceof(Date);
            done();
        });
    });
});
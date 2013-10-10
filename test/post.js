
var st = require('../lib/stocktwits');

var token = 'YOUR_ACCESS_TOKEN';


describe('POST', function () {
    it('should make a POST request', function (done) {
        st.post('messages/create', {access_token:token}, {body:'message'}, function (err, res) {
            if (err) return done(err);
            res.body.response.status.should.equal(200);
            res.body.message.body.should.equal('message');
            done();
        });
    });
});

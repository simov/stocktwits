
var st = require('../lib/stocktwits');


describe('module', function () {
    it('should create instance when required', function (done) {
        st.version.should.equal('2');
        done();
    });
    it('should have a constructor', function (done) {
        var StockTwits = st.StockTwits,
            v3 = new StockTwits({version: 3});
        v3.version.should.equal('3');
        done();
    });

    it('should initialize the API version without options object', function (done) {
        var StockTwits = st.StockTwits,
            v = new StockTwits();
        v.version.should.equal('2');
        done();
    });
    it('should initialize the API version from an integer', function (done) {
        var StockTwits = st.StockTwits,
            v = new StockTwits({version: 3});
        v.version.should.equal('3');
        done();
    });
    it('should initialize the API version from a string', function (done) {
        var StockTwits = st.StockTwits,
            v = new StockTwits({version: '3'});
        v.version.should.equal('3');
        done();
    });

    it('should create a query string', function (done) {
        st.toQueryString({param1:'value1', param2:'value2'})
            .should.equal('param1=value1&param2=value2');
        done();
    });
    it('should create a path', function (done) {
        st.path('some/api', {param1:'value1', param2:'value2'})
            .should.equal('/api/2/some/api.json?param1=value1&param2=value2');
        done();
    });
});

const chai=require('chai');
const chaiHttp=require('chai-http');
const should=chai.should();
const chaiLike=require('chai-like');
const chaiThings=require('chai-things');

const server=require('../index');
var serverRun;
// console.log(dayjobapp);
chai.use(chaiHttp);
chai.use(chaiLike);
chai.use(chaiThings);

// before(function (done) {
//     serverRun=server.listen(3000,done);
// });
//
// after(function (done) {
//     serverRun.close(done)
// });
before(done => {
    serverRun=server.listen(3001,done);
});

after(done => {
    serverRun.close(done);
});







//get user

describe('userprofile',function () {
    describe('Get value of user',function(){

        var uid=2;
        it('It should get all value of particular user',function (done) {
            chai.request(server)
                .get('/v1/myUsers/'+uid)
                .send()

                .end(function (err,res) {
                    res.should.have.status(200);
                    should.exist(res.body);
                    res.body.should.be.a('array');
                    done();
                });

        })

    })
})

//get user

describe('adminprofile',function () {
    describe('Get value of admin',function(){

        var uid=1;
        it('It should get all value of particular amin',function (done) {
            chai.request(server)
                .get('/v1/myUsers/'+uid)
                .send()

                .end(function (err,res) {
                    res.should.have.status(200);
                    should.exist(res.body);
                    res.body.should.be.a('array');
                    done();
                });

        })

    })
})

//get blog

describe('viewarticle',function () {
    describe('Get value of blog',function(){

        it('it should get value all blog that is added',function (done) {
            chai.request(server)
                .get('/v1/addblog/')
                .send()

                .end(function (err,res) {
                    res.should.have.status(200);
                    should.exist(res.body);
                    res.body.should.be.a('array');
                    done();
                });

        })

    })
})

//get Image

describe('imageview',function () {
    describe('Get value of image and its details',function(){

        it('it should get value of image and its detail  ',function (done) {
            chai.request(server)
                .get('/v1/addimage/')
                .send()

                .end(function (err,res) {
                    res.should.have.status(200);
                    should.exist(res.body);
                    res.body.should.be.a('array');
                    done();
                });

        })

    })
})

describe('question',function () {
    describe('Get value of question',function(){
        it('it should get value of questions',function (done) {
            chai.request(server)
                .get('/v1/viewquestion/')
                .send()

                .end(function (err,res) {
                    res.should.have.status(200);
                    should.exist(res.body);
                    res.body.should.be.a('array');
                    done();
                });

        })

    })
})


//blog update test
describe('updateform',function () {
    describe('update blog',function(){

        var id=2;
        it('it should update available and status',function (done) {
            chai.request(server)
                .put('/v1/addblog/'+id)
                .send({'status':'1','Available':'0'})

                .end(function (err,res) {
                    res.should.have.status(201);
                    res.body.should.be.an('object');
                    done();
                });

        })

    })
})



//user update
describe('userprofile',function () {
    describe('update user detail by Employee',function(){

        var id=3;
        it('it should update User profile ',function (done) {
            chai.request(server)
                .put('/v1/myUsers/'+id)
                .send({'firstname':'asd','lastname':'asd','address':'asd','email':'asddsa@asd.com'})

                .end(function (err,res) {
                    res.should.have.status(201);
                    res.body.should.be.an('object');
                    done();
                });

        })

    })
})


//post employee
describe('userprofile',function () {
    describe('post user ',function(){
      var test={'id':'5','firstname':'dsa','lastname':'dsa','address':'dsa','email':'dsa@dsa.com','password':'password'}
        it('it should register user',function (done) {
            chai.request(server)
                .post('/v1/registers')
                .send(test)
                .end(function (err,res) {
                    res.should.have.status(201);
                    res.body.should.be.an('object');
                    done();
                });

        })

    })
})

//post for blog
describe('blog',function () {
    describe('post blog ',function(){
      var test={'id':'5','title':'asd','description':'asdasdasdasdas'}
        it('it should save blog data',function (done) {
            chai.request(server)
                .post('/v1/addblog')
                .send(test)
                .end(function (err,res) {
                    res.should.have.status(201);
                    res.body.should.be.an('object');
                    done();
                });

        })

    })
})



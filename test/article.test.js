const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const server = require('../app');

let testart = {
  title: 'hehe',
  content: 'hehehe'
}

let notitle = {
  title: '',
  content: ''
}

chai.use(chaiHttp);

let currentlength = 0;

describe("GET all Articles ", function () {
  it("expected to return array of articles, with a message", function (done) {
    chai.request(server)
      .get('/article')
      .end((err, res) => {
        expect(res.body.msg).to.be.a('string')
        expect(res.body.details).to.be.an('array')
        currentlength = res.body.details.length
        done()
      })
  })
})

describe("POST new article ", function () {
  
  it("expected to return posted article and increase articles length", function (done) {
    chai.request(server)
      .post('/article')
      .send(testart)
      .end((err, res) => {
        expect(res.body.msg).to.be.a('string')
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('msg')
        expect(res.body).to.have.property('details')
        done()
      })
  })


})


describe("check delete article ", function () {
  it("expected to return a success on a delete", function (done) {
    chai.request(server)
      .delete('/article/12321311')
      .send(testart)
      .end((err, res) => {
        expect(res.body.msg).to.be.a('string')
        expect(res.body).to.have.status(200)
        expect(err).to.be.null
        done()
      })
  })
})

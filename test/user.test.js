const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const server = require('../app');

chai.use(chaiHttp);

let user = {
  username: 'hehe',
  password: 'heheh',
  email: 'hehe@awtian.com'
}

describe('test auth feature', function () {
  
  describe('POST new user', function() {
    it('should pass requirements', function(done) { 
      chai.request(server)
        .post('/user')
        .send(user)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.have.property('message')
          expect(res.body).to.have.property('details')
          done()
        })
    })
  })

  describe('POST LOGIN', function () {
    it('should return token for user, and login', function(done) {
      chai.request(server)
        .post('/user/login')
        .send({
          password: 'heheh',
          email: 'hehe@awtian.com'
        })
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token')
          done()
        })
    })
  })


})
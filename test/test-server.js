var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/app');
var should = chai.should();
var Blob = require('../server/models/blob')

chai.use(chaiHttp);

describe('Blobs', function () {

    Blob.collection.drop();

    beforeEach(function(done){
        var newBlob = new Blob({
            name:'El',
            lastName:'Barto',
        })
        newBlob.save(function(err){
            done()
        })
    })

    afterEach(function(done){
        Blob.collection.drop();
        done();
    })

    it('should list ALL blobs on /blobs GET', function(done){
        chai.request(server)
            .get('/blobs')
            .end(function(err,res){
                // console.log(res.body)
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('name');
                res.body[0].should.have.property('lastName');
                res.body[0].name.should.equal('El');
                res.body[0].lastName.should.equal('Barto');
                done();
            })
    });


    it('should list a SINGLE blob on /blob/<id> GET', function(done) {
        var blobToGet = new Blob({
            name:'Super',
            lastName:'man',
        })
        blobToGet.save(function(err, data){
            chai.request(server)
                .get('/blob/'+data.id)
                .end(function(err, res){
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('name');
                    res.body.should.have.property('lastName');
                    res.body.name.should.equal('Super');
                    res.body.lastName.should.equal('man');
                    done()
            })
        })
    });
    it('should add SINGLE blob an a /blobs POST', function(done){
        var blob = {
            'name':'Max',
            'lastName':'Scherzer',
        }
        chai.request(server)
            .post('/blobs/', blob)
            .send(blob)
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('SUCCESS');
                res.body.should.be.a('object');
                res.body.SUCCESS.should.be.a('object');
                res.body.SUCCESS.should.have.property('name');
                res.body.SUCCESS.should.have.property('lastName');
                res.body.SUCCESS.name.should.equal('Max');
                res.body.SUCCESS.lastName.should.equal('Scherzer');
                done();
            })
    });
    it('should update a SINGLE blob on a /blob/<id> PUT', function(done) {
        var updateToPut = {
            name:'Perm',
            lastName:'Anent'
        }
        chai.request(server)
            .get('/blobs/')
            .end(function(err,res){
                chai.request(server)
                    .put('/blob/'+res.body[0]._id)
                    .send(updateToPut)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.have.property('UPDATED');
                        res.body.should.be.a('object');
                        res.body.UPDATED.should.be.a('object');
                        res.body.UPDATED.should.have.property('name');
                        res.body.UPDATED.should.have.property('lastName');
                        done()
                    })
            }
    )});
    it('should delete a SINGLE blob on a /blob/<id> DELETE', function () {
        chai.request(server)
        .get('/blobs/')
        .end(function(err,res){
            chai.request(server)
                .put('/blob/'+res.body[0]._id)
                .send(updateToPut)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('REMOVED');
                    res.body.should.be.a('object');
                    res.body.REMOVED.should.be.a('object');
                    res.body.REMOVED.should.have.property('name');
                    res.body.REMOVED.should.have.property('lastName');
                    res.body.REMOVED.name.should.equal('El')
                    done()
                })
        }
    )}
    )
})
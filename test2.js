var superagent = require('superagent')
var expect = require('expect.js')
var expect = require("chai").expect;

describe('express rest api server', function(){
  var id

  it('posts an object', function(done){
    superagent.post('http://localhost:3010/api/employees')
      .send({
		                                    code: '2',
	                                    	name: 'shital',
		                                    city: 'pune'
    
      })
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
       expect(res.body.length).to.eql(1)
       expect(res.body[0]._id.length).to.eql(24)
        id = res.body[0]._id
      
      })
	    done()
  })

  it('retrieves an object', function(done){
    superagent.get('http://localhost:3010/api/employees'+id)
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body._id.length).to.eql(24)
        expect(res.body._id).to.eql(id)
        expect(res.body.name).to.eql('sita123')
    
      })
	      done()
  })

  it('retrieves a collection', function(done){
    superagent.get('http://localhost:3010/api/employees')
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(res.body.length).to.be.above(0)
        expect(res.body.map(function (item){return item._id})).to.contain(id)
   
      })
	       done()
  })

  it('updates an object', function(done){
    superagent.put('http://localhost:3010/api/employees'+id)
      .send({
	                                    	code: 21,
	                                    	name: 'pallavi',
		                                    city: 'pune'  
		  
	  })
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body.msg).to.eql('success')
    
      })
	      done()
  })

  it('checks an updated object', function(done){
    superagent.get('http://localhost:3010/api/employees'+id)
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body._id.length).to.eql(24)
        expect(res.body._id).to.eql(id)
        expect(res.body.name).to.eql('pallavi')

      })
	          done()
  })
  it('removes an object', function(done){
    superagent.del('http://localhost:3010/api/employees/561e2b4a935fca702046318b')
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body.msg).to.eql('success')

      })
	          done()
  })
})
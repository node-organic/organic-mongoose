describe('mongoose', function(){
  var Mongoose = require('../index')
  var Plasma = require('organic-plasma')
  var dna = {
    database: {
      name: 'organic-mongoose-test'
    }
  }
  var instance;
  it('starts and connects', function(next){
    var plasma = new Plasma()
    plasma.once('Mongoose', function(){
      instance.disconnect(null, function(){
        next()
      })
    })
    instance = new Mongoose(plasma, dna)
  })

  it('test uknown host/port [0.0.0.1:27018]', function(next){
    instance.dna.database.host = '0.0.0.1'
    instance.dna.database.port = 27018
    instance.dna.database.options = {connectTimeoutMS: 1000}
    instance.connect(null, function(err){
      expect(err).toBeDefined()
      expect(
        err.message.indexOf('failed to connect to server [0.0.0.1:27018]') != -1
      ).toBe(true)
      next()
    })
  })
})

var fs = require('fs')
var path = require('path')

describe("mongoose", function(){
  var Mongoose = require("../index")
  var Plasma = require("organic").Plasma
  var dna = {
    database: {
      name: "organic-mongoose-test"
    }
  }
  var instance;
  it("starts and connects", function(next){
    var plasma = new Plasma()
    instance = new Mongoose(plasma, dna)
    plasma.once("Mongoose", function(){
      instance.disconnect(null, function(){
        next()
      })
    })
  })

  it("recreates db", function(next){
    instance.config.recreateDatabase = true
    instance.connect(null, function(){
      instance.disconnect(null, function(){
        next()
      })
    })
  })

  it("test uknown host/port [0.0.0.1:27018]", function(next){
    instance.config.database.host = "0.0.0.1"
    instance.config.database.port = 27018
    instance.connect(null, function(err){
      expect(err).toBeDefined()
      expect(
        err.message.indexOf("failed to connect to [0.0.0.1:27018]") != -1
      ).toBe(true)
      next()
    })
  })
})
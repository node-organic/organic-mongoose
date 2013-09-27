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
    instance = new Mongoose(new Plasma(), dna)
    next()
  })

  it("recreates db", function(next){
    instance.disconnect(null, function(){
      instance.config.recreateDatabase = true
      instance.connect()
      instance.disconnect()
      next()  
    })
  })
})
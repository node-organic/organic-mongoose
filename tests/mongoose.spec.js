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
})
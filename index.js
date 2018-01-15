var mongoose = require("mongoose")

module.exports = function OrganicMongoose(plasma, config){

  this.config = config
  this.config.emitReady = config.emitReady || "Mongoose"
  this.config.database.host = this.config.database.host || "localhost"
  this.config.database.port = this.config.database.port || 27017
  this.config.database.options = this.config.database.options || {}

  this.emit = function(type) {
    plasma.emit(type)
  }

  if(config.reactOn)
    plasma.on(config.reactOn, this.connect, this)
  else
    this.connect(null)

  plasma.on("kill", this.disconnect, this)
}

module.exports.prototype.connect = function(c, next){
  var self = this

  if (global.Promise) {
    mongoose.Promise = global.Promise
  }
  else {
    mongoose.Promise = require("bluebird")
  }

  if (self.config.reuseMongooseConnection && mongoose.connection.readyState > 0) {
    self.emit(self.config.emitReady)
    return next && next()
  }

  var uri = `mongodb://${self.config.database.host}:${self.config.database.port}/${self.config.database.name}`
  var options = self.config.database.options
  options.useMongoClient = true
  mongoose.connect(uri, options)
    .then(function () {
      if(self.config.recreateDatabase) {
        mongoose.connection.db.dropDatabase(function(){
          // workaround mongoose.connection issue with dropped db and open connection
          mongoose.connection.db.close(function(){
            mongoose.connection.readyState = 0
            mongoose.connect(uri, options)
              .then(function () {
                self.emit(self.config.emitReady)
                next && next()
              })
              .catch(function (err){
                console.error(err)
                return next && next(err)
            })
          })
        })
      } else {
        self.emit(self.config.emitReady)
        next && next()
      }
    })
    .catch(function (err){
      console.error(err)
      return next && next(err)
    })
}

module.exports.prototype.disconnect = function(c, next){
  mongoose.disconnect(next)
}

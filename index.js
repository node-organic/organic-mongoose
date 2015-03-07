var mongoose = require("mongoose")

module.exports = function OrganicMongoose(plasma, config){

  this.config = config
  this.config.emitReady = config.emitReady || "Mongoose"
  this.config.database.host = this.config.database.host || "localhost"

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
  mongoose.connect(self.config.database.host,
    self.config.database.name,
    self.config.database.port ?
    self.config.database.port : self.config.database.options ?
    self.config.database.options : {},
  function(err){
    if (err) {
      console.error(err)
      return next && next(err)
    }

    if(self.config.recreateDatabase) {
      mongoose.connection.db.dropDatabase(function(){
        // workaround mongoose.connection issue with dropped db and open connection
        mongoose.connection.db.close(function(){
          mongoose.connection.readyState = 0
          mongoose.connect(self.config.database.host,
            self.config.database.name,
            self.config.database.port ?
            self.config.database.port : self.config.database.options ?
            self.config.database.options : {},
          function(err){
            if(err) {
              console.error(err)
              return next && next(err)
            }
            self.emit(self.config.emitReady)
            next && next()
          })
        })
      })
    } else {
      self.emit(self.config.emitReady)
      next && next()
    }
  })
}

module.exports.prototype.disconnect = function(c, next){
  mongoose.disconnect(next)
}
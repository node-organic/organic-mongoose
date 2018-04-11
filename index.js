const mongoose = require('mongoose')

module.exports = class OrganicMongoose {
  constructor (plasma, dna) {
    this.dna = dna
    this.dna.emitReady = dna.emitReady || 'Mongoose'
    this.dna.database.host = dna.database.host || 'localhost'
    this.dna.database.port = dna.database.port || 27017
    this.dna.database.options = dna.database.options || {}

    this.emit = function (type) {
      plasma.emit(type)
    }

    if (dna.reactOn) {
      plasma.on(dna.reactOn, this.connect, this)
    } else {
      this.connect(null)
    }

    plasma.on('kill', this.disconnect, this)
  }

  connect (c, next) {
    let self = this
    let uri = `mongodb://${self.dna.database.host}:${self.dna.database.port}/${self.dna.database.name}`
    let options = self.dna.database.options
    mongoose.connect(uri, options)
      .then(function () {
        self.emit(self.dna.emitReady)
        next && next()
      })
      .catch(function (err) {
        console.error(err)
        return next && next(err)
      })
  }

  disconnect (c, next) {
    mongoose.disconnect(next)
  }
}

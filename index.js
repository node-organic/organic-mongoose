var Organel = require("organic").Organel;
var mongoose = require("mongoose");

module.exports = Organel.extend(function Mongoose(plasma, config){
  Organel.call(this, plasma);

  this.config = config;

  if(config.reactOn)
    this.on(config.reactOn, this.connect)
  else
    this.connect()

  plasma.on("kill", this.disconnect)
}, {
  connect: function(c, next){
    var self = this;
    mongoose.connect('localhost', self.config.database.name, function(err){
      if (err) {
        console.error(err)
        return next && next(err)
      }

      if(self.config.recreateDatabase) {
        mongoose.connection.db.dropDatabase(function(){
          mongoose.disconnect(function(){
            mongoose.connect('localhost', self.config.database.name, function(err){
              if(err) {console.log(err); return next && next(err)}
              self.emit({type: "Mongoose", data:{}});
              next && next()
            });
          })
        });
      } else {
        self.emit({type: "Mongoose", data:{}});
        next && next()
      }
    });
    return false; // do not aggregate c
  },
  disconnect: function(c, next){
    mongoose.disconnect(next);
    return false;
  }
})

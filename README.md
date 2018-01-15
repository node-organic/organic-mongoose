# organic-mongoose

The organelle provides support for mongoose ORM.

## DNA structure and defaults

    {
      reactOn: String, /* optional */,
      database: {
        host: String, /* optional */
        name: String, /* required */
        port: Number, /* optional */
        options: Object /* optional */
      },
      recreateDatabase: Boolean, /* optional */
      reuseMongooseConnection: Boolean, /* optional */
    }

- `reactOn` - Type of chemical
- `database.host` - connection_string, mongodb://uri or the host to which you are connecting (default: localhost)
- `database.name` - name of the database to connect and/or create
- `database.port` - database port (default: 27017)
- `database.options` - options is a hash with the following possible properties:
 - db      - passed to the connection db instance
 - server  - passed to the connection server instance(s)
 - replset - passed to the connection ReplSet instance
 - user    - username for authentication
 - pass    - password for authentication
 - auth    - options for authentication (see http://mongodb.github.com/node-mongodb-native/api-generated/db.html#authenticate)

  for more info see http://mongoosejs.com/docs/api.html#connection_Connection-open

- `reacreateDatabase` - when set upon first connection will clean all the database records.
- `reuseMongooseConnection` - false by default. When set to true - the organelle will emit "ready", if there is already open mongoose connection.

## emits chemical with type `Mongoose`
Once ready and opened connection to mongodb.

## reacts to chemicals with type `kill`
And closes any open mongoose connections.
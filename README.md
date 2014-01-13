# organic-mongoose

The organelle provides support for mongoose ORM.

## DNA structure and defaults

    {
      reactOn: String, /* optional */,
      database: {
        name: String
      },
      recreateDatabase: Boolean, /* optional */
    }

- `reactOn` - Type of chemical
- `database.name` - name of the database to connect and/or create
- `reacreateDatabase` - when set upon first connection will clean all the database records.

## emits chemical with type `Mongoose`
Once ready and opened connection to mongodb.

## reacts to chemicals with type `kill`
And closes any open mongoose connections.
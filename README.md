# Scavenger

Scavenger is an open-source web parser service.

### Getting started

Just clone this repository, install all dependencies and build.

```shell
$ git clone https://github.com/diogoazevedos/scavenger
$ cd scavenger; npm install
$ npm run build
```

> We strongly recommend the usage of [pm2](http://pm2.keymetrics.io) to manage the service.

### Structure

This service uses [mongodb](https://mongodb.org) to manage users access, just create the structure below.

```javascript
use scavenger
db.createUser({ user: 'scavenger', pwd: 'secret', roles: [ 'readWrite' ] })
db.users.createIndex({ token: '' }, { unique: true })
db.users.createIndex({ username: '' }, { unique: true })
```

### Authenticate

This service uses **Bearer** authentication, you need to create a user in the **users** collection.

```javascript
db.users.insert({ username: 'diogoazevedos', token: 'thRWEK9lehLzvL4l6jazbfQgDel0rT8w' })
```

### Request format

This service can handle with the most features of [x-ray](https://github.com/lapwinglabs/x-ray). 

```json
{
  "source": "https://github.com/diogoazevedos",
  "context": "[itemscope]",
  "selector": {
    "name": ".vcard-fullname",
    "orgs": [".clearfix .avatar@alt"],
    "repos": {
        "context": ".source",
        "selector": [{
            "name": ".repo"
        }]
    }
  }
}
```

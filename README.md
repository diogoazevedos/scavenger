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

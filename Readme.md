# Forge JavaScript SDK
Unofficial JavaScript SDK for the Laravel Forge Api

## Installation
With NPM:
``` shell
npm install forge-sdk
```
With Yarn:
``` shell
yarn add forge-sdk
```

## Usage
The SDK harneses Promises and the Fetch Api to handle requests.

``` javascript
import Forge from 'forge-sdk'

let forge = new Forge(API_KEY)

// Get Servers
let servers;

forge.servers()
    .then(r => servers = r)
```

## Availible Methods

### Servers
``` javascript
forge.servers()
forge.server(serverId)
```

### Services

#### MySQL
``` javascript
forge.rebootMysql(serverId)
forge.stopMysql(serverId)
```
#### Postgres
``` javascript
forge.rebootPostgres(serverId)
forge.stopPostgres(serverId)
```
#### NginX
``` javascript
forge.rebootNginx(serverId)
forge.stopNginx(serverId)
forge.siteNginxFile(serverId, siteId)
forge.updateSiteNginxFile(serverId, siteId, content)
```
#### Blackfire
``` javascript
forge.installBlackfire(serverId, data)
forge.removeBlackfire(serverId)
```
#### Papertrail
``` javascript
forge.installPapertrail(serverId, data)
forge.removePapertrail(serverId)

```

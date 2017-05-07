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
forge.rebootServer(serverId)
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

### Daemons

``` javascript
forge.daemons(serverId)
forge.daemon(serverId, daemonId)
forge.createDaemon(serverId, data)
forge.restartDaemon(serverId, daemonId)
forge.deleteDaemon(serverId, daemonId)
```

### Firewall Rules

``` javascript
forge.firewallRules(serverId)
forge.firewallRule(serverId, ruleId)
forge.createFirewallRule(serverId, data)
forge.deleteFirewallRule(serverId, ruleId)
```

### Sites

``` javascript
forge.sites(serverId)
forge.site(serverId, siteId)
forge.createSite(serverId, data)
forge.updateSite(serverId, siteId, data)

// NOT FOUND IN API DOCS --- @TODO: CHECK OUT FORGE PHP SDK
// refreshSiteToken(serverId, siteId){}

forge.deleteSite(serverId, siteId)
```

#### Environment File
``` javascript
forge.siteEnvironmentFile(serverId, siteId)
forge.updateSiteEnvironmentFile(serverId, siteId, content)
```

#### Site Repositories and Deployments
``` javascript
forge.installGitRepositoryOnSite(serverId, siteId, data)
forge.destroySiteGitRepository(serverId, siteId)
forge.siteDeploymentScript(serverId, siteId)
forge.updateSiteDeploymentScript(serverId, siteId, content)
forge.enableQuickDeploy(serverId, siteId)
forge.disableQuickDeploy(serverId, siteId)
forge.deploySite(serverId, siteId)
forge.resetDeploymentState(serverId, siteId)
forge.siteDeploymentLog(serverId, siteId)
```

#### Installing Wordpress
``` javascript
forge.installWordPress(serverId, siteId, data)
forge.removeWordPress(serverId, siteId)
```

#### Updating Load balancing Configuration
``` javascript
forge.updateLoadBalancingConfiguration(serverId, siteId, data)
```

### Workers

``` javascript
forge.workers(serverId, siteId)
forge.worker(serverId, siteId, workerId)
forge.createWorker(serverId, siteId, data)
forge.deleteWorker(serverId, siteId, workerId)
forge.restartWorker(serverId, siteId, workerId)
```


## Contrubutions are welcome.
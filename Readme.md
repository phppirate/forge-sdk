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
sites(serverId)

site(serverId, siteId)

createSite(serverId, data)

updateSite(serverId, siteId, data)

// NOT FOUND IN API DOCS --- @TODO: CHECK OUT FORGE PHP SDK
// refreshSiteToken(serverId, siteId){}

deleteSite(serverId, siteId)
```

#### Environment File
``` javascript
siteEnvironmentFile(serverId, siteId)

updateSiteEnvironmentFile(serverId, siteId, content)
```

#### Site Repositories and Deployments
``` javascript
installGitRepositoryOnSite(serverId, siteId, data)

destroySiteGitRepository(serverId, siteId)

siteDeploymentScript(serverId, siteId)

updateSiteDeploymentScript(serverId, siteId, content)

enableQuickDeploy(serverId, siteId)

disableQuickDeploy(serverId, siteId)

deploySite(serverId, siteId)

resetDeploymentState(serverId, siteId)

siteDeploymentLog(serverId, siteId)
```

#### Installing Wordpress
``` javascript
installWordPress(serverId, siteId, data)

removeWordPress(serverId, siteId)
```

#### Updating Load balancing Configuration
``` javascript
updateLoadBalancingConfiguration(serverId, siteId, data)
```

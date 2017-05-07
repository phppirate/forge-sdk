class ForgeRequest {
    constructor(api_key) {
        this.api_key = api_key;

        this.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.api_key
        };
    }

    base(method, path, body = null, callback = () => true) {
        return new Promise((resolve, reject) => {
            fetch('https://forge.laravel.com/api/v1/' + path, {
                method,
                headers: this.headers,
                body
            }).then(r => resolve(callback(r))).catch(err => {
                console.error(err);
                reject(err);
            });
        });
    }

    json(method, path, body, callback = () => true) {
        return new Promise((resolve, reject) => {
            this.base(method, path, body, r => r.json()).then(r => resolve(callback(r))).catch(err => reject(err));
        });
    }

    text(method, path, body, callback = () => true) {
        return new Promise((resolve, reject) => {
            return this.base(method, path, body, r => r.text()).then(r => resolve(callback(r))).catch(err => reject(err));
        });
    }
}

class Server {
    constructor(data) {
        Object.keys(data).forEach(i => {
            this[i] = data[i];
        });
    }
}

class Daemon {
    constructor(data) {
        Object.keys(data).forEach(i => {
            this[i] = data[i];
        });
    }
}

class FirewallRule {
    constructor(data) {
        Object.keys(data).forEach(i => {
            this[i] = data[i];
        });
    }
}

class Server$1 {
    constructor(data) {
        Object.keys(data).forEach(i => {
            this[i] = data[i];
        });
    }
}

class Forge {

  constructor(api_key) {
    this.request = new ForgeRequest(api_key);
  }

  // ---------------------------------
  // Servers
  // ---------------------------------

  servers() {
    return this.request.json('GET', `servers`, null, r => r.servers.map(data => new Server(data)));
  }

  server(serverId) {
    return this.request.json('GET', `servers/${serverId}`, null, r => new Server(r.server));
  }

  // ---------------------------------
  // Services
  // ---------------------------------

  // MySQL
  rebootMysql(serverId) {
    return this.request.base('POST', `servers/${serverId}/mysql/reboot`);
  }

  stopMysql(serverId) {
    return this.request.base('POST', `servers/${serverId}/mysql/stop`);
  }

  // Postgres
  rebootPostgres(serverId) {
    return this.request.base('POST', `servers/${serverId}/postgres/reboot`);
  }

  stopPostgres(serverId) {
    return this.request.base('POST', `servers/${serverId}/postgres/stop`);
  }

  // NginX
  rebootNginx(serverId) {
    return this.request.base('POST', `servers/${serverId}/nginx/reboot`);
  }

  stopNginx(serverId) {
    return this.request.base('POST', `servers/${serverId}/nginx/stop`);
  }

  siteNginxFile(serverId, siteId) {
    return this.request.text('GET', `servers/${serverId}/sites/${siteId}/nginx`, null, r => r);
  }

  updateSiteNginxFile(serverId, siteId, content) {
    return this.request.base('PUT', `servers/${serverId}/sites/${siteId}/nginx`, { content });
  }

  // Blackfire 
  installBlackfire(serverId, data) {
    return this.request.base('POST', `servers/${serverId}/blackfire/install`, data);
  }

  removeBlackfire(serverId) {
    return this.request.base('DELETE', `servers/${serverId}/blackfire/remove`);
  }

  // Papertrail
  installPapertrail(serverId, data) {
    return this.request.base('POST', `servers/${serverId}/papertrail/install`, data);
  }

  removePapertrail(serverId) {
    return this.request.base('DELETE', `servers/${serverId}/papertrail/remove`);
  }

  // ---------------------------------
  // Daemons
  // ---------------------------------

  daemons(serverId) {
    return this.request.json('GET', `servers/${serverId}/daemons`, null, r => r.daemons.map(data => new Daemon(data)));
  }

  daemon(serverId, daemonId) {
    return this.request.json('GET', `servers/${serverId}/daemons/${daemonId}`, null, r => new Daemon(r.daemon));
  }

  createDaemon(serverId, data) {
    return this.request.json('POST', `servers/${serverId}/daemons`, data, r => new Daemon(r.daemon));
  }

  restartDaemon(serverId, daemonId) {
    return this.request.base('POST', `servers/${serverId}/daemons/${daemonId}/restart`);
  }

  deleteDaemon(serverId, daemonId) {
    return this.request.base('DELETE', `servers/${serverId}/daemons/${daemonId}`);
  }

  // ---------------------------------
  // Firewall Rules
  // ---------------------------------

  firewallRules(serverId) {
    return this.request.json('GET', `servers/${serverId}/firewall-rules`, null, r => r.rules.map(data => new FirewallRule(data)));
  }

  firewallRule(serverId, ruleId) {
    return this.request.json('GET', `servers/${serverId}/firewall-rules/${ruleId}`, null, r => new FirewallRule(r.rule));
  }

  createFirewallRule(serverId, data) {
    return this.request.json('POST', `servers/${serverId}/firewall-rules`, data, r => new FirewallRule(r.rule));
  }

  deleteFirewallRule(serverId, ruleId) {
    return this.request.json('DELETE', `servers/${serverId}/firewall-rules/${ruleId}`);
  }

  // ---------------------------------
  // Sites
  // ---------------------------------

  sites(serverId) {
    return this.request.json('GET', `servers/${serverId}/sites`, null, r => r.sites.map(data => new Server$1(data)));
  }

  site(serverId, siteId) {
    return this.request.json('GET', `servers/${serverId}/sites/${siteId}`, null, r => new Server$1(r.site));
  }

  createSite(serverId, data) {
    return this.request.json('POST', `servers/${serverId}/sites`, data, r => new Server$1(r.site));
  }

  updateSite(serverId, siteId, data) {
    return this.request.json('PUT', `servers/${serverId}/sites/${siteId}`, data, r => new Server$1(r.site));
  }

  // NOT FOUND IN API DOCS --- @TODO: CHECK OUT FORGE PHP SDK
  // refreshSiteToken(serverId, siteId){}

  deleteSite(serverId, siteId) {
    return this.request.base('DELETE', `servers/${serverId}/sites/${siteId}`);
  }

  // Environment File
  siteEnvironmentFile(serverId, siteId) {
    return this.request.text('GET', `servers/${serverId}/sites/${siteId}/env`, null, r => r);
  }

  updateSiteEnvironmentFile(serverId, siteId, content) {
    return this.request.base('PUT', `servers/${serverId}/sites/${siteId}/env`, { content });
  }

  // Site Repositories and Deployments
  installGitRepositoryOnSite(serverId, siteId, data) {
    return this.request.base('POST', `servers/${serverId}/sites/${siteId}/git`, data);
  }

  // NOT FOUND IN API DOCS --- @TODO: CHECK OUT FORGE PHP SDK
  // updateSiteGitRepository(serverId, siteId, data){}

  destroySiteGitRepository(serverId, siteId) {
    return this.request.base('DELETE', `servers/${serverId}/sites/${siteId}/git`);
  }

  siteDeploymentScript(serverId, siteId) {
    return this.request.text('GET', `servers/${serverId}/sites/${siteId}/deployment/script`, null, r => r);
  }

  updateSiteDeploymentScript(serverId, siteId, content) {
    return this.request.text('PUT', `servers/${serverId}/sites/${siteId}/deployment/script`, { content });
  }

  enableQuickDeploy(serverId, siteId) {
    return this.request.base('POST', `servers/${serverId}/sites/${siteId}/deployment`);
  }

  disableQuickDeploy(serverId, siteId) {
    return this.request.base('DELETE', `servers/${serverId}/sites/${siteId}/deployment`);
  }

  deploySite(serverId, siteId) {
    return this.request.base('POST', `servers/${serverId}/sites/${siteId}/deployment/deploy`);
  }

  resetDeploymentState(serverId, siteId) {
    return this.request.base('POST', `servers/${serverId}/sites/${siteId}/deployment/reset`);
  }

  siteDeploymentLog(serverId, siteId) {
    return this.request.text('GET', `servers/${serverId}/sites/${siteId}/deployment/log`, null, r => r);
  }

  // Notifications
  enableHipchatNotifications(serverId, siteId, data) {}

  disableHipchatNotifications(serverId, siteId) {}

  // Installing Wordpress
  installWordPress(serverId, siteId, data) {
    return this.request.base('POST', `servers/${serverId}/sites/${siteId}/wordpress`, data);
  }

  removeWordPress(serverId, siteId) {
    return this.request.base('DELETE', `servers/${serverId}/sites/${siteId}/wordpress`);
  }

  // Updating Load balancing Configuration
  updateLoadBalancingConfiguration(serverId, siteId, data) {
    return this.request.base('POST', `servers/${serverId}/sites/${siteId}/balancing`, data);
  }
}

export default Forge;
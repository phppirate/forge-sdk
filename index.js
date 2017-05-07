class MySQLDatabase {
    constructor(data) {
        Object.keys(data).forEach(i => {
            this[i] = data[i];
        });
    }
}

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
                body: body ? JSON.stringify(body) : null
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

class FirewallRule {
    constructor(data) {
        Object.keys(data).forEach(i => {
            this[i] = data[i];
        });
    }
}

class Certificate {
    constructor(data) {
        Object.keys(data).forEach(i => {
            this[i] = data[i];
        });
    }
}

class MySQLUser {
    constructor(data) {
        Object.keys(data).forEach(i => {
            this[i] = data[i];
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

class Worker {
    constructor(data) {
        Object.keys(data).forEach(i => {
            this[i] = data[i];
        });
    }
}

class Site {
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

  rebootServer(serverId) {
    return this.request.base('POST', `servers/${serverId}/reboot`);
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
    return this.request.json('GET', `servers/${serverId}/sites`, null, r => r.sites.map(data => new Site(data)));
  }

  site(serverId, siteId) {
    return this.request.json('GET', `servers/${serverId}/sites/${siteId}`, null, r => new Site(r.site));
  }

  createSite(serverId, data) {
    return this.request.json('POST', `servers/${serverId}/sites`, data, r => new Site(r.site));
  }

  updateSite(serverId, siteId, data) {
    return this.request.json('PUT', `servers/${serverId}/sites/${siteId}`, data, r => new Site(r.site));
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

  // ---------------------------------
  // Workers
  // ---------------------------------

  workers(serverId, siteId) {
    return this.request.json('GET', `servers/${serverId}/sites/${siteId}/workers`, null, r => r.workers.map(data => new Worker(data)));
  }

  worker(serverId, siteId, workerId) {
    return this.request.json('GET', `servers/${serverId}/sites/${siteId}/workers/${workerId}`, null, r => new Worker(r.worker));
  }

  createWorker(serverId, siteId, data) {
    return this.request.json('POST', `servers/${serverId}/sites/${siteId}/workers`, data, r => new Worker(r.worker));
  }

  deleteWorker(serverId, siteId, workerId) {
    return this.request.base('DELETE', `servers/${serverId}/sites/${siteId}/workers/${workerId}`);
  }

  restartWorker(serverId, siteId, workerId) {
    return this.request.base('POST', `servers/${serverId}/sites/${siteId}/workers/${workerId}/restart`);
  }

  // ---------------------------------
  // Site SSL Certificates
  // ---------------------------------
  certificates(serverId, siteId) {
    return this.request.json('GET', `servers/${serverId}/sites/${siteId}/certificates`, null, ({ certificates }) => certificates.map(data => new Certificate(data)));
  }

  certificate(serverId, siteId, certificateId) {
    return this.request.json('GET', `servers/${serverId}/sites/${siteId}/certificates/${certificateId}`, null, ({ certificate }) => new Certificate(certificate));
  }

  createCertificate(serverId, siteId, data) {
    return this.request.json('POST', `servers/${serverId}/sites/${siteId}/certificates`, data, ({ certificate }) => new Certificate(certificate));
  }

  deleteCertificate(serverId, siteId, certificateId) {
    return this.request.base('DELETE', `servers/${serverId}/sites/${siteId}/certificates/${certificateId}`);
  }

  getCertificateSigningRequest(serverId, siteId, certificateId) {
    return this.request.base('GET', `servers/${serverId}/sites/${siteId}/certificates/${certificateId}/csr`);
  }

  installCertificate(serverId, siteId, certificateId) {
    return this.request.base('POST', `servers/${serverId}/sites/${siteId}/certificates/${certificateId}/install`, data);
  }

  activateCertificate(serverId, siteId, certificateId) {
    return this.request.base('POST', `servers/${serverId}/sites/${siteId}/certificates/${certificateId}/activate`);
  }

  obtainLetsEncryptCertificate(serverId, siteId, data) {
    return this.request.json('POST', `servers/${serverId}/sites/${siteId}/certificates/letsencrypt`, data, ({ certificate }) => new Certificate(certificate));
  }

  // ---------------------------------
  // MySQL
  // ---------------------------------

  mysqlDatabases(serverId) {
    return this.request.json('GET', `servers/${serverId}/mysql`, data, ({ databases }) => databases.map(data => new MySQLDatabase(data)));
  }

  mysqlDatabase(serverId, databaseId) {
    return this.request.json('GET', `servers/${serverId}/mysql/${databaseId}`, data, ({ database }) => new MySQLDatabase(database));
  }

  createMysqlDatabase(serverId, data) {
    return this.request.json('POST', `servers/${serverId}/mysql`, data, ({ database }) => new MySQLDatabase(database));
  }

  updateMysqlDatabase(serverId, databaseId, data) {
    return this.request.json('PUT', `servers/${serverId}/mysql/${databaseId}`, data, ({ database }) => new MySQLDatabase(database));
  }

  deleteMysqlDatabase(serverId, databaseId) {
    return this.request.base('DELETE', `servers/${serverId}/mysql/${databaseId}`);
  }

  // Users
  mysqlUsers(serverId) {
    return this.request.json('GET', `servers/${serverId}/mysql-users`, data, ({ users }) => users.map(data => new MySQLUser(data)));
  }

  mysqlUser(serverId, userId) {
    return this.request.json('GET', `servers/${serverId}/mysql-users/${userId}`, data, ({ user }) => new MySQLUser(user));
  }

  createMysqlUser(serverId, data) {
    return this.request.json('POST', `servers/${serverId}/mysql-users`, data, ({ user }) => new MySQLUser(user));
  }

  updateMysqlUser(serverId, userId, data) {
    return this.request.json('PUT', `servers/${serverId}/mysql-users/${userId}`, data, ({ user }) => new MySQLUser(user));
  }

  deleteMysqlUser(serverId, userId) {
    return this.request.base('DELETE', `servers/${serverId}/mysql-users/${userId}`);
  }

}

export default Forge;

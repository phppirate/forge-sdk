export default class FirewallRule {
    constructor(data) {
        Object.keys(data).forEach(i => {
            this[i] = data[i]
        })
    }
}

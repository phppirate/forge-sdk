export default class MySQLDatabase {
    constructor(data) {
        Object.keys(data).forEach(i => {
            this[i] = data[i]
        })
    }
}

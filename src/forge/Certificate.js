export default class Certificate {
    constructor(data) {
        Object.keys(data).forEach(i => {
            this[i] = data[i]
        })
    }
}

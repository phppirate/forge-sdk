export default class Worker {
    constructor(data) {
        Object.keys(data).forEach(i => {
            this[i] = data[i]
        })
    }
}

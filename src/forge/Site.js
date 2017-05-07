export default class Site {
    constructor(data) {
        Object.keys(data).forEach(i => {
            this[i] = data[i]
        })
    }
}

export default class ForgeRequest {
    constructor(api_key) {
        this.api_key = api_key

        this.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.api_key,
        }
    }

    base(method, path, body = null, callback = () => true){
        return new Promise((resolve, reject) => {
            fetch('https://forge.laravel.com/api/v1/' + path, {
                method,
                headers: this.headers,
                body: body ? JSON.stringify(body) : null
            })
            .then(r => resolve(callback(r)))
            .catch(err => {
                console.error(err);
                reject(err)
            })
        });
    }

    json(method, path, body, callback = () => true){
        return new Promise((resolve, reject) => {
            this.base(method, path, body, r => r.json())
                .then(r => resolve(callback(r)))
                .catch(err => reject(err))
        })
    }

    text(method, path, body, callback = () => true){
        return new Promise((resolve, reject) => {
            return this.base(method, path, body, r => r.text())
                .then(r => resolve(callback(r)))
                .catch(err => reject(err))
        })
    }
}

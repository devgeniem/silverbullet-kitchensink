import request from 'superagent';
import session from './session';

function getApiPath(path) {
    return '/api'+path;
}

export default {
    login(credentials) {
        return new Promise((resolve, reject) => {
            request
                .post(getApiPath('/auth/user'))
                .send({
                    email: credentials.email,
                    password: credentials.password
                })
                .end((err, res) => {
                    var response = (res.type === 'application/json') ? JSON.parse(res.text) : res;
                    if (err) {
                        reject(response);
                        console.warn(response);
                    } else {
                        session.login(response, credentials.rememberme);
                        resolve(response);
                        console.log(response);
                    }
                });
            });
    },
    get(path, options={}) {
        return new Promise((resolve, reject) => {
            var token = session.getToken();
            var req = request.get(getApiPath(path));
            if (token) {
                req.set('Authorization', 'Bearer '+token);
            }
            req.end((err, res) => {
                var response = (res.type === 'application/json') ? JSON.parse(res.text) : res;
                if (err) {
                    reject(response);
                    console.warn(response);
                } else {
                    resolve(response);
                    console.log(response);
                }
            });
        });
    },
    post(path, data={}, options={}) {
        return new Promise((resolve, reject) => {
            var token = session.getToken();
            var req = request.post(getApiPath(path));
            if (token) {
                req.set('Authorization', 'Bearer '+token);
            }
            if (options.attach) { // multipart
                req.field('data', JSON.stringify(data));
                options.attach.forEach(file => {
                    req.attach('upload', file, file.name);
                });
            } else { //normal send
                req.send(data);
            }
            req.end((err, res) => {
                var response = (res.type === 'application/json') ? JSON.parse(res.text) : res;
                if (err) {
                    reject(response);
                    console.warn(response);
                } else {
                    resolve(response);
                    console.log(response);
                }
            });
        });
    },
    put(path, data={}, options={}) {
        return new Promise((resolve, reject) => {
            var token = session.getToken();
            var req = request.put(getApiPath(path));
            if (token) {
                req.set('Authorization', 'Bearer '+token);
            }
            req.send(data).end((err, res) => {
                var response = (res.type === 'application/json') ? JSON.parse(res.text) : res;
                if (err) {
                    reject(response);
                    console.warn(response);
                } else {
                    resolve(response);
                    console.log(response);
                }
            });
        });
    },
    del(path, options={}) {
        return new Promise((resolve, reject) => {
            var token = session.getToken();
            var req = request.del(getApiPath(path));
            if (token) {
                req.set('Authorization', 'Bearer '+token);
            }
            req.end((err, res) => {
                var response = (res.type === 'application/json') ? JSON.parse(res.text) : res;
                if (err) {
                    reject(response);
                    console.warn(response);
                } else {
                    resolve(response);
                    console.log(response);
                }
            });
        });
    }
}

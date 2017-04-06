import request from 'superagent';

const getApiPath = path => '/api' + path;

export default {
  login(credentials) {
    return new Promise((resolve, reject) => {
      request
        .post(getApiPath('/auth/user'))
        .send({
          email: credentials.email,
          password: credentials.password,
        })
        .end((err, res) => {
          const response = (res.type === 'application/json') ? JSON.parse(res.text) : res;
          if (err) {
            reject(response);
          } else {
            resolve(response);
          }
        });
    });
  },
  get(path, options={}) {
    return new Promise((resolve, reject) => {
      const token = options.token;
      const req = request.get(getApiPath(path));
      if (token) {
        req.set('Authorization', 'Bearer '+token);
      }
      req.end((err, res) => {
        const response = (res && res.type === 'application/json') ? JSON.parse(res.text) : res;
        if (err) {
          reject(response);
        } else {
          resolve(response);
        }
      });
    });
  },
  post(path, data={}, options={}) {
    return new Promise((resolve, reject) => {
      const token = options.token;
      const req = request.post(getApiPath(path));
      if (token) {
        req.set('Authorization', 'Bearer '+token);
      }
      if (options.attach) { // multipart
        req.field('data', JSON.stringify(data));
        options.attach.forEach((file) => {
          req.attach('upload', file, file.name);
        });
      } else { //normal send
        req.send(data);
      }
      req.end((err, res) => {
        const response = (res.type === 'application/json') ? JSON.parse(res.text) : res;
        if (err) {
          reject(response);
        } else {
          resolve(response);
        }
      });
    });
  },
  put(path, data={}, options={}) {
    return new Promise((resolve, reject) => {
      const token = options.token;
      const req = request.put(getApiPath(path));
      if (token) {
        req.set('Authorization', 'Bearer '+token);
      }
      req.send(data).end((err, res) => {
        const response = (res.type === 'application/json') ? JSON.parse(res.text) : res;
        if (err) {
          reject(response);
        } else {
          resolve(response);
        }
      });
    });
  },
  del(path, options={}) {
    return new Promise((resolve, reject) => {
      const token = options.token;
      const req = request.del(getApiPath(path));
      if (token) {
        req.set('Authorization', 'Bearer '+token);
      }
      req.end((err, res) => {
        const response = (res.type === 'application/json') ? JSON.parse(res.text) : res;
        if (err) {
          reject(response);
        } else {
          resolve(response);
        }
      });
    });
  },
};

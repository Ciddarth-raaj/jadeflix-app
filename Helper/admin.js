import API from '../Util/api';

const admin = {
  register: (username, password, otp) =>
    new Promise(function (resolve, reject) {
      API.post('/admin/register', {
        username: username,
        password: password,
        otp: otp,
      })
        .then(async res => {
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.data.msg);
          }
        })
        .catch(err => {
          reject(err);
        });
    }),

  login: (username, password) =>
    new Promise(function (resolve, reject) {
      API.post('/admin/login', {
        username: username,
        password: password,
      })
        .then(async res => {
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.data.msg);
          }
        })
        .catch(err => {
          reject(err);
        });
    }),
  sendLoginOtp: username =>
    new Promise(function (resolve, reject) {
      API.get('/admin/login/otp?username=' + username)
        .then(async res => {
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.data.msg);
          }
        })
        .catch(err => {
          reject(err);
        });
    }),
  loginWithOtp: otp =>
    new Promise(function (resolve, reject) {
      API.post('/admin/login/otp', {
        otp: otp,
      })
        .then(async res => {
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.data.msg);
          }
        })
        .catch(err => {
          reject(err);
        });
    }),
  sendRegisterOtp: username =>
    new Promise(function (resolve, reject) {
      API.get('/admin/register/otp?username=' + username)
        .then(async res => {
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.data.msg);
          }
        })
        .catch(err => {
          reject(err);
        });
    }),
  sendForgotOtp: username =>
    new Promise(function (resolve, reject) {
      API.get('/admin/login/forgot?username=' + username)
        .then(async res => {
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.data.msg);
          }
        })
        .catch(err => {
          reject(err);
        });
    }),
  changePassword: (otp, password) =>
    new Promise(function (resolve, reject) {
      API.post('/admin/login/forgot', {otp: otp, password: password})
        .then(async res => {
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.data.msg);
          }
        })
        .catch(err => {
          reject(err);
        });
    }),
};

export default admin;

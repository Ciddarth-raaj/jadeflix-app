import API from '../Util/api';
// import constants from '../constants/api';

const category = {
  get: () =>
    new Promise(function (resolve, reject) {
      const store_id = global.config.store_id;
      API.get('/category?store_id=' + store_id)
        .then(async res => {
          if (res.status === 200) {
            resolve(category.format(res.data));
          } else {
            reject(res.data.msg);
          }
        })
        .catch(err => {
          reject(err);
        });
    }),
  getAdmin: () =>
    new Promise(function (resolve, reject) {
      const store_id = global.config.store_id;
      API.get('/category/admin', {
        headers: {
          'x-access-token': global.config.accessToken,
        },
      })
        .then(async res => {
          if (res.status === 200) {
            resolve(category.format(res.data));
          } else {
            reject(res.data.msg);
          }
        })
        .catch(err => {
          reject(err);
        });
    }),
  format: data => {
    const formatted = [];

    data.forEach(d => {
      formatted.push({
        category_id: d.category_id,
        category_name: d.category_name,
        image: d.image,
      });
    });

    return formatted;
  },
  getAdminId: category_id =>
    new Promise(function (resolve, reject) {
      API.get('/category/admin/id?category_id=' + category_id, {
        headers: {
          'x-access-token': global.config.accessToken,
        },
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
  update: data =>
    new Promise(function (resolve, reject) {
      API.patch('/category', data, {
        headers: {
          'x-access-token': global.config.accessToken,
        },
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
  create: data =>
    new Promise(function (resolve, reject) {
      API.post('/category', data, {
        headers: {
          'x-access-token': global.config.accessToken,
        },
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
};

export default category;

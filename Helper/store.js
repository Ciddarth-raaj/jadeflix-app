import API from '../Util/api';
// import constants from "../constants/api";
import moment from 'moment';

const store = {
  getAll: () =>
    new Promise(function (resolve, reject) {
      API.get('/store')
        .then(async res => {
          if (res.status === 200) {
            resolve(store.format(res.data));
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
        store_id: d.store_id,
        store_name: d.store_name,
        store_slug: d.store_slug,
        store_picture: d.store_picture,
        store_owner_name: d.store_owner_name,
        store_phone: d.store_phone,
        store_email: d.store_email,
        is_active: d.status == 0 ? false : true,
        created_at: moment(d.created_at).fromNow(),
      });
    });

    return formatted;
  },
  getData: (store_id, store_slug) =>
    new Promise(function (resolve, reject) {
      API.get('/store/data?store_id=' + store_id + '&store_slug=' + store_slug)
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
  getDataAdmin: () =>
    new Promise(function (resolve, reject) {
      API.get('/store/data/admin', {
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
  getStatistics: () =>
    new Promise(function (resolve, reject) {
      API.get('/store/statistics', {
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
      API.post('/store', data, {
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
  preCheck: store_name =>
    new Promise(function (resolve, reject) {
      API.post(
        '/store/create/check',
        {store_name: store_name},
        {
          headers: {
            'x-access-token': global.config.accessToken,
          },
        },
      )
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

export default store;

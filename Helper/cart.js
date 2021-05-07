import API from '../Util/api';
import constants from '../Constants/api';

const cart = {
  get: () =>
    new Promise(function (resolve, reject) {
      const store_id = global.config.store_id;
      API.get('/cart?store_id=' + store_id, {
        headers: {
          'x-access-token': global.config.accessToken,
        },
      })
        .then(async res => {
          if (res.status === 200) {
            resolve(cart.format(res.data));
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

    for (let i in data) {
      formatted.push({
        product_id: data[i].product_id,
        product_name: data[i].product_name,
        mrp: data[i].mrp,
        sp: data[i].sp,
        description: data[i].description,
        image: data[i].image,
        qty: data[i].quantity,
      });
    }

    return formatted;
  },
  add: (product_id, qty) =>
    new Promise(function (resolve, reject) {
      const store_id = global.config.store_id;
      API.patch(
        '/cart',
        {product_id: product_id, quantity: qty, store_id: store_id},
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
  delete: product_id =>
    new Promise(function (resolve, reject) {
      const store_id = global.config.store_id;
      var axios = require('axios');
      var data = JSON.stringify({
        product_id: product_id,
        store_id: store_id,
      });

      var config = {
        method: 'delete',
        url: constants.BASE_URL + '/cart',
        headers: {
          'x-access-token': global.config.accessToken,
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          resolve(JSON.stringify(response.data));
        })
        .catch(function (error) {
          reject(error);
        });
    }),
};

export default cart;

import API from '../Util/api';
import moment from 'moment';

const order = {
  getAdmin: () =>
    new Promise(function (resolve, reject) {
      API.get('/order/admin', {
        headers: {
          'x-access-token': global.config.accessToken,
        },
      })
        .then(async res => {
          if (res.status === 200) {
            resolve(order.format(res.data));
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
        order_id: d.order_id,
        user_id: d.user_id,
        address_id: d.address_id,
        store_id: d.store_id,
        total_price: d.total_price,
        total_items: d.total_items,
        total_qty: d.total_qty,
        status: d.status,
        created_at: moment(d.created_at).fromNow(),
      });
    });

    return formatted;
  },
  create: data =>
    new Promise(function (resolve, reject) {
      API.post('/order', data, {
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

export default order;

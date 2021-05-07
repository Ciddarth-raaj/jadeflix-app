import API from '../Util/api';
import CartHelper from './cart';
import ImageHelper from './image';

const products = {
  get: (offset, limit, filter) =>
    new Promise(function (resolve, reject) {
      const filterUrl = products.getFilterUrl(filter);
      const store_id = global.config.store_id;
      API.get(
        '/products?store_id=' +
          store_id +
          '&offset=' +
          offset +
          '&limit=' +
          limit +
          filterUrl,
      )
        .then(async res => {
          if (res.status === 200) {
            resolve(products.format(res.data, store_id));
          } else {
            reject(res.data.msg);
          }
        })
        .catch(err => {
          reject(err);
        });
    }),
  getFilterUrl: filter => {
    let url = '&';

    if (filter !== undefined) {
      if (filter.category_ids !== undefined) {
        filter.category_ids.forEach(
          (b, i) => (url += '&category_ids[' + i + ']=' + b),
        );
      }
    }

    return url;
  },
  getAdmin: (offset, limit, filter) =>
    new Promise(function (resolve, reject) {
      const filterUrl = products.getFilterUrl(filter);
      API.get(
        '/products/admin?offset=' + offset + '&limit=' + limit + filterUrl,
        {
          headers: {
            'x-access-token': global.config.accessToken,
          },
        },
      )
        .then(async res => {
          if (res.status === 200) {
            resolve(products.formatAdmin(res.data));
          } else {
            reject(res.data.msg);
          }
        })
        .catch(err => {
          reject(err);
        });
    }),
  format: async (data, store_id) => {
    const formatted = [];
    let cart = [];
    try {
      cart = await CartHelper.get(store_id);
    } catch (err) {
      console.log(err);
    }
    const formattedCart = {};
    for (let i in cart) {
      formattedCart[cart[i].product_id] = cart[i].qty;
    }

    for (let i in data) {
      formatted.push({
        product_id: data[i].product_id,
        product_name: data[i].product_name,
        mrp: data[i].mrp,
        sp: data[i].sp,
        description: data[i].description,
        image: data[i].image,
        is_active: data[i].is_active == 1 ? true : false,
        qty:
          formattedCart[data[i].product_id] === undefined
            ? 0
            : formattedCart[data[i].product_id],
        images: await ImageHelper.format(data[i].images),
      });
    }

    console.log(formatted);

    return formatted;
  },
  formatAdmin: async data => {
    const formatted = [];

    for (let i in data) {
      formatted.push({
        product_id: data[i].product_id,
        product_name: data[i].product_name,
        mrp: data[i].mrp,
        sp: data[i].sp,
        description: data[i].description,
        image: data[i].image,
        is_active: data[i].is_active == 1 ? true : false,
        images: await ImageHelper.format(data[i].images),
      });
    }

    return formatted;
  },
  getId: product_id =>
    new Promise(function (resolve, reject) {
      const store_id = global.config.store_id;
      API.get('/products/id?store_id=' + store_id + '&product_id=' + product_id)
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
  getIdAdmin: product_id =>
    new Promise(function (resolve, reject) {
      API.get('/products/admin/id?product_id=' + product_id, {
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
      API.post('/products', data, {
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
      API.patch('/products', data, {
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

export default products;

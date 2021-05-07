import API from '../Util/api';

const image = {
  upload: (file, name, folder) =>
    new Promise(function (resolve, reject) {
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('name', name);
      formData.append('folder', folder);
      API.post('/image', formData, {
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
  format: async data => {
    if (data == null) {
      return [{image_id: 0, link: '/assets/image1.jpg'}];
    }
    const formatted = [];

    for (let i in data) {
      formatted.push({
        image_id: data[i].image_id,
        link: data[i].link,
      });
    }

    return formatted;
  },
};

export default image;

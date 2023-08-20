const baseAPI = '/api';

const scryfallCardService = {
  get() {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/scryfallCards`)
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  },

  getByMinCmc(minCmc) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/scryfallCards?minCmc=${minCmc}`)
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  },


  create(scryfallCard) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/scryfallCard`, {
        method: 'PUT',
        body: JSON.stringify(scryfallCard),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(result => result.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  },

  update(scryfallCard) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/scryfallCard`, {
        method: 'POST',
        body: JSON.stringify(scryfallCard),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  destroy(scryfallCard) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/scryfallCard/${scryfallCard.id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  }
};

export default scryfallCardService;

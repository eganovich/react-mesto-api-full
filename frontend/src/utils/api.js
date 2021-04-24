class Api {
  constructor(config) {
    this.headers = config.headers;
    this.url = config.url;
  }

  handleOriginalResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  //Запрос информации о пользователе
  getInfoAboutUser(token) {
    return fetch(`${this.url}/users/me`, {
      headers: {"Content-Type" : "application/json",
        'Authorization': `Bearer ${token}`},
    })
      .then(this.handleOriginalResponse)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Запрос изменения информации о пользователе
  patchInfoAboutUser(userInfo, token) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: {"Content-Type" : "application/json",
        'Authorization': `Bearer ${token}`},
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about,
      }),
    })
      .then(this.handleOriginalResponse)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Запрос на изменение аватара
  patchAvatar(userInfo, token) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: {"Content-Type" : "application/json",
        'Authorization': `Bearer ${token}`},
      body: JSON.stringify({
        avatar: userInfo.avatar,
      }),
    })
      .then(this.handleOriginalResponse)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Запрос перечня карточек с сервера
  getCards(token) {
    debugger;
    return fetch(`${this.url}/cards`, {
      method: "GET",
      headers: {"Content-Type" : "application/json",
        'Authorization': `Bearer ${token}`},
    })
      .then(this.handleOriginalResponse)
      .then((data) => {
        console.log(data);
        return data;        
      })
      .catch((err) => {
        console.log(err);
      });
      
    }

  //запрос на публикацию новой карточки
  postNewCard(newCard, token) {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: {"Content-Type" : "application/json",
        'Authorization': `Bearer ${token}`},
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link,
      }),
    })
      .then(this.handleOriginalResponse)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Запрос на удаление карточки
  deleteCard(id, token) {
    return fetch(`${this.url}/cards/${id}`, {
      method: "DELETE",
      headers: {"Content-Type" : "application/json",
        'Authorization': `Bearer ${token}`},
    })
      .then(this.handleOriginalResponse)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Запрос на установку лайка
  setLike(id, token) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: "PUT",
      headers: {"Content-Type" : "application/json",
        'Authorization': `Bearer ${token}`},
    })
      .then(this.handleOriginalResponse)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Запрос на удаление лайка
  deleteLike(id, token) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {"Content-Type" : "application/json",
        'Authorization': `Bearer ${token}`},
    })
      .then(this.handleOriginalResponse)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

const api = new Api({
  url: "https://api.eganovich.nomoredomains.icu",
});

export default api;

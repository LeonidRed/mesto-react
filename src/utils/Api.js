class Api {
  constructor(options) {
    this._url = options.baseUrl
    this._headers = options.headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  editProfile(values) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name: values.name, about: values.about })
    })
      .then(this._checkResponse)
  }

  addCard(values) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name: values.name, link: values.link })
    })
      .then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  changeLikeCardStatus(id, like) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: like ? "PUT" : "DELETE",
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  changeAvatar(value) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: value.avatar })
    })
      .then(this._checkResponse)
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63/',
  headers: {
    authorization: '7895de42-b3c1-48b3-b57e-768d9fcc51ad',
    'Content-Type': 'application/json'
  }
})

export { api }
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-12',
  headers: {
    authorization: 'd1bd9214-4aa4-446a-86e1-bed9a18b0675',
    'Content-Type': 'application/json'
  }
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(checkResponse);
}

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(checkResponse);
}

const editProfile = (profileData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    body: JSON.stringify({
      name: profileData.username,
      about: profileData.description
    }),
    headers: config.headers
  })
  .then(checkResponse);
}

const editAvatar = (link) => {
return fetch(`${config.baseUrl}/users/me/avatar`, {
  method: 'PATCH',
    body: JSON.stringify({
      avatar: link.photo,
    }),
    headers: config.headers
  })
  .then(checkResponse);
}

const addNewCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
    headers: config.headers
  })
  .then(checkResponse);
}

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkResponse);
}

const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(checkResponse);
}

const removeLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkResponse);
}

export {getUserData, getInitialCards, editProfile, addNewCard,
  deleteCard, addLike, removeLike, editAvatar}

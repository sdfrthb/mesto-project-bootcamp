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

function request(endPoint, options) {
  return fetch(`${config.baseUrl}${endPoint}`, options).then(checkResponse)
}

const getUserData = () => {
  return request(`/users/me`, {
    headers: config.headers
  })
}

const getInitialCards = () => {
  return request(`/cards`, {
    headers: config.headers
  })
}

const editProfile = (profileData) => {
  return request(`/users/me`, {
    method: 'PATCH',
    body: JSON.stringify({
      name: profileData.username,
      about: profileData.description
    }),
    headers: config.headers
  })
}

const editAvatar = (link) => {
return request(`/users/me/avatar`, {
  method: 'PATCH',
    body: JSON.stringify({
      avatar: link.photo,
    }),
    headers: config.headers
  })
}

const addNewCard = (cardData) => {
  return request(`/cards`, {
    method: 'POST',
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
    headers: config.headers
  })
}

const deleteCard = (cardId) => {
  return request(`/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

const addLike = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
}

const removeLike = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

export {getUserData, getInitialCards, editProfile, addNewCard,
  deleteCard, addLike, removeLike, editAvatar}

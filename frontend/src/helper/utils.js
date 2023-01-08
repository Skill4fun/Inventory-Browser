import jwt from 'jsonwebtoken';

export const getDataFromToken = (token) => {
  return jwt.decode(token);
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem('browserTableToken');
};

export const registerNewUser = async (formData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      },
    );
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch {
    const result = {
      status: 401,
      message:
        'Hálózati hiba, a szerver nem elérhető. Regisztráció sikertelen!',
    };
    return result;
  }
};

export const loginUser = async (formData) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  const result = await response.json();
  result.status = response.status;
  return result;
};

export const fetchWithAuth = async (URI, options) => {
  const builtOptions = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(getTokenFromLocalStorage() && { Authorization: `Bearer ${getTokenFromLocalStorage()}` }),
    },
  };
  return fetch(URI, builtOptions);
};

export const updateUser = async (formData) => {
  try {
    const response = await fetchWithAuth(
      `${process.env.REACT_APP_BACKEND_URI}/users`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      },
    );
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch {
    const result = {
      status: 401,
      message:
        'Hálózati hiba, a szerver nem elérhető. A profil frissítése sikertelen!',
    };
    return result;
  }
};

export const verifyEmail = async (userId, isLoggedIn = false) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/email-verification/${userId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isLoggedIn }),
      },
    );
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch (error) {
    const result = {
      message:
        'Hálózati hiba, a szerver nem elérhető.',
    };
    return result;
  }
};

export const resendEmailVerification = async (userId) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/email-verification/${userId}`);
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch (error) {
    const result = {
      message:
        'Hálózati hiba, a szerver nem elérhető.',
    };
    return result;
  }
};

export async function getProducts({
  renderPageNr, renderLimit, minQty, brand, srchRegex,
}) {
  try {
    const response = await fetchWithAuth(
      /* eslint-disable-next-line max-len */
      `${process.env.REACT_APP_BACKEND_URI}/products/${brand}?minQty=${minQty}&page=${renderPageNr}&limit=${renderLimit}&search=${srchRegex}`,
    );
    const result = await response.json();
    return result;
  } catch {
    const result = {
      errorMessage:
        'Hálózati hiba, a szerver nem elérhető.',
    };
    return result;
  }
}

export const saveList = async (userId) => {
  try {
    const response = await fetchWithAuth(
      `${process.env.REACT_APP_BACKEND_URI}/list/${userId}`,
      {
        method: 'PATCH',
      },
    );
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch {
    const result = {
      message:
        'Hálózati hiba, a szerver nem elérhető. Mentés sikertelen.',
    };
    return result;
  }
};

export const fetchArticles = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/articles`);
    const { articles, message, status = response.status } = await response.json();
    return { status, articles, message };
  } catch ({ message }) {
    const status = 401;
    return { status, message };
  }
};

export const removeItemFromList = async (listItemId) => {
  try {
    const response = await fetchWithAuth(
      `${process.env.REACT_APP_BACKEND_URI}/list/${listItemId}`,
      {
        method: 'DELETE',
      },
    );
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch {
    const result = {
      message:
        'Hálózati hiba, a szerver nem elérhető.',
    };
    return result;
  }
};

export const removeAllItemsFromList = async () => {
  try {
    const response = await fetchWithAuth(
      `${process.env.REACT_APP_BACKEND_URI}/list/`,
      {
        method: 'DELETE',
      },
    );
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch {
    const result = {
      message:
        'Hálózati hiba, a szerver nem elérhető.',
    };
    return result;
  }
};

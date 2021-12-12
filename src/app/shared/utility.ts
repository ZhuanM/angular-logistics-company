export function getAccessToken() {
  const localAccessToken = localStorage.getItem('access_token');
  const sessionAccessToken = sessionStorage.getItem('access_token');

  if (localAccessToken) {
    return localAccessToken;
  }
  
  if (sessionAccessToken) {
    return sessionAccessToken;
  }

  return null;
}

export function getRefreshToken() {
  const localRefreshToken = localStorage.getItem('refresh_token');
  const sessionRefreshToken = sessionStorage.getItem('refresh_token');

  if (localRefreshToken) {
    return localRefreshToken;
  }
  
  if (sessionRefreshToken) {
    return sessionRefreshToken;
  }

  return null;
}

export function getExpiryDate() {
  const localExpiryDate = localStorage.getItem('expiry_date');
  const sessionExpiryDate = sessionStorage.getItem('expiry_date');

  if (localExpiryDate) {
    return localExpiryDate;
  }
  
  if (sessionExpiryDate) {
    return sessionExpiryDate;
  }

  return null;
}

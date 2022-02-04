export function getAccessToken() {
  const sessionAccessToken = sessionStorage.getItem('access_token');

  if (sessionAccessToken) {
    return sessionAccessToken;
  }

  return null;
}

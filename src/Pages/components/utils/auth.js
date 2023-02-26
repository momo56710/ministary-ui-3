export const getSession = () => JSON.parse(sessionStorage.getItem('startup_jwt'))

export const setSession = session =>
  sessionStorage.setItem('startup_jwt', session);

export const removeSession = () =>
  sessionStorage.removeItem('startup_jwt');

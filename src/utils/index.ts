function saveUser(name: string) {
  if (window) {
    window.localStorage.setItem('user', name);
  }
}

function getUser() {
  if (window) {
    return window.localStorage.getItem('user')?.toString();
  }
  return '';
}

export { saveUser, getUser };

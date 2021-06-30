function saveUser(name: string) {
  if (window) {
    window.localStorage.setItem('user', name);
  }
}

function getUser() {
  if (window) {
    let val = window.localStorage.getItem('user')?.toString();
    return val;
  }
  return '';
}

export { saveUser, getUser };

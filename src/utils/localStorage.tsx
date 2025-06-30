export default class Storage {
  static clear() {
    localStorage.clear();
  }

  static getItem(key = '') {
    return JSON.parse(localStorage.getItem(key) || 'false');
  }

  static setItem(key:string, value:object) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static removeItem(key:string) {
    localStorage.removeItem(key);
  }
}

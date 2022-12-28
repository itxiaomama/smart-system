const storage = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  remove(key) {
    localStorage.removeItem(key);
  },
  removeAll() {
    localStorage.removeAll();
  },
  getAll() {
    let len = localStorage.length;
    let arr = [];
    for (var i = 0; i < len; i++) {
      var getkey = localStorage.key(i);
      var getval = localStorage.getItem(getkey);
      arr[i].push({
        'key': getkey,
        'val': getval
      })
    }
    return arr
  }
}

export default storage
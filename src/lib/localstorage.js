export default {
    put: (key, value) => {
      // When setting an undefined, localStorage stores the string version "undefined", which is not falsy anymore.
      // We enforce key deletion when value is undefined or null
        if (value === undefined || value === null) {
            window.localStorage.removeItem(key);
        } else {
            window.localStorage.setItem(key, value);
        }
    },
    get: (key) => window.localStorage.getItem(key),
    remove: (key) => window.localStorage.removeItem(key),
    clear: () => window.localStorage.clear(),
  };

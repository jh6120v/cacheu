class Cacheu {
  static PERSIST_KEY = 'CACHEU_DATA';

  /**
   * ttl: Data retention times(seconds)
   * cleanup: Periodically clean up expired data in times(seconds)
   *
   * @type {{cleanup: number, ttl: number}}
   */
  static config = {
    ttl: 600,
    cleanup: 3600,
    persistMode: false,
  };

  static data = {};

  static persistData = {};

  /**
   * @param config
   */
  constructor(config = {}) {
    if (config?.persistMode === true && !localStorage) {
      config.persistMode = false;
    }

    Cacheu.config = {
      ...Cacheu.config,
      ...config,
    };

    if (Cacheu.config.persistMode) {
      try {
        const recoveryData = localStorage.getItem(Cacheu.PERSIST_KEY);
        if (recoveryData) {
          const parseData = JSON.parse(recoveryData);

          // shallow copy
          Cacheu.data = { ...parseData };
          Cacheu.persistData = { ...parseData };

          // check persist data is available
          Cacheu.cleanup();
        }
      } catch (e) {
        // if JSON.parse() get any error
        console.error(e);
      }
    }

    setInterval(Cacheu.cleanup, Cacheu.config.cleanup * 1000);
  }

  /**
   * Create Cache data
   *
   * @param config
   * @returns {Cacheu}
   */
  static create(config) {
    return new Cacheu(config);
  }

  /**
   * Set data in cache
   *
   * @param key
   * @param value
   * @param expire
   * @param persist
   */
  static set(key, value, expire = this.config.ttl, persist = false) {
    const data = {
      expire: expire === 0 ? 0 : Date.now() + expire * 1000,
      value,
    };

    this.data[key] = data;

    if (persist) {
      try {
        this.persistData[key] = data;
        localStorage.setItem(Cacheu.PERSIST_KEY, JSON.stringify(this.persistData));
      } catch (e) {
        // if JSON.stringify() get any error
        console.error(e);
      }
    }
  }

  /**
   * Get data from cache
   *
   * @param key
   * @param defaultValue
   * @returns {null|*}
   */
  static get(key, defaultValue = null) {
    if (!this.has(key)) {
      return defaultValue;
    }

    return this.data[key].value;
  }

  /**
   * Check data is exist in cache
   *
   * @param key
   * @returns {boolean}
   */
  static has(key) {
    const data = this.data[key];
    return !!(data && !this.isExpired(data.expire));
  }

  /**
   * Remove data from cache
   *
   * @param key
   */
  static remove(key) {
    delete this.data[key];

    if (this.persistData?.[key]) {
      try {
        delete this.persistData[key];

        // when no data in persist data, remove all data from localStorage
        if (Object.keys(this.persistData).length === 0) {
          localStorage.removeItem(Cacheu.PERSIST_KEY);

          return;
        }

        localStorage.setItem(Cacheu.PERSIST_KEY, JSON.stringify(this.persistData));
      } catch (e) {
        // if JSON.stringify() get any error
        console.error(e);
      }
    }
  }

  /**
   * Remove all data from cache
   */
  static removeAll() {
    this.data = {};
    this.persistData = {};

    localStorage.removeItem(this.PERSIST_KEY);
  }

  /**
   * Check time whether is expired
   *
   * @param time
   * @returns {boolean}
   */
  static isExpired(time) {
    if (time === 0) return false;

    return time < Date.now();
  }

  /**
   * Check and clean all expired data
   */
  static cleanup() {
    for (const [key, value] of Object.entries(Cacheu.data)) {
      if (Cacheu.isExpired(value.expire)) {
        Cacheu.remove(key);
      }
    }
  }
}

export default Cacheu;

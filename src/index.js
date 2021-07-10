class Cache {
  /**
   * ttl: Data retention times(seconds)
   * cleanup: Periodically clean up expired data in times(seconds)
   *
   * @type {{cleanup: number, ttl: number}}
   */
  static config = {
    ttl: 600,
    cleanup: 3600,
  };

  static data = {};

  /**
   * @param config
   */
  constructor(config = {}) {
    Cache.config = {
      ...Cache.config,
      ...config,
    }

    setInterval(Cache.cleanup, Cache.config.cleanup * 1000);
  }

  /**
   * Create Cache data
   *
   * @param config
   * @returns {Cache}
   */
  static create(config) {
    return new Cache(config);
  }

  /**
   * Set data in cache
   *
   * @param key
   * @param value
   * @param expire
   */
  static set(key, value, expire = this.config.ttl) {
    this.data[key] = {
      expire: expire === 0 ? 0 : Date.now() + expire * 1000,
      value,
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
    const data = this.data?.[key];
    return !!(data && !this.isExpired(data.expire));
  }

  /**
   * Remove data from cache
   *
   * @param key
   */
  static remove(key) {
    delete this.data[key];
  }

  /**
   * Remove all data from cache
   */
  static removeAll() {
    this.data = {};
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
    for (const [key, value] of Object.entries(Cache.data)) {
      if (Cache.isExpired(value.expire)) {
        Cache.remove(key);
      }
    }
  }
}

module.exports = Cache;

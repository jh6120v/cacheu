interface CacheConfig {
  ttl: number;
  cleanup: number;
  persistPrefixKey: string;
}

interface CacheData {
  expires: number,
  value: any;
  persist: boolean;
}

type CacheDataCollection = Record<string, CacheData>

export default class Cache {
  static config: CacheConfig = {
    ttl: 600,
    cleanup: 3600,
    persistPrefixKey: 'CACHE',
  };

  static data: CacheDataCollection = {};

  constructor(config: Partial<CacheConfig> = {}) {
    Cache.config = {
      ...Cache.config,
      ...config,
    };

    // periodic cleanup
    setInterval(() => Cache.cleanup(), Cache.config.cleanup * 1000);

    // load from localStorage
    this.#loadAllFromStorage();
  }

  static create(config: Partial<CacheConfig>): void {
    new Cache(config);
  }

  static set<U>(key: string, value: U, expires: number = Cache.config.ttl, persist: boolean = false): void {
    Cache.data[key] = {
      expires: expires === 0 ? 0 : Date.now() + expires * 1000,
      value,
      persist,
    };

    // if the same key is set again, but persist is not true, it will be removed from localStorage.
    if (!persist) {
      this.#removeFromStorage(key);

      return;
    }

    this.#saveToStorage(key);
  }

  static get<U>(key: string, defaultValue: U | null = null): any {
    if (!Cache.has(key)) {
      return defaultValue;
    }

    return Cache.data[key].value;
  }

  static has(key: string): boolean {
    const data = Cache.data[key];
    return (!!data && !this.#isExpired(data.expires));
  }

  static remove(key: string): void {
    if (Cache.data[key]?.persist) {
      this.#removeFromStorage(key);
    }

    delete Cache.data[key];
  }

  static removeAll(): void {
    for (const key in Cache.data) {
      if (Cache.data[key]?.persist) {
        this.#removeFromStorage(key);
      }
    }

    Cache.data = {};
  }

  static cleanup(): void {
    for (const [key, value] of Object.entries(Cache.data)) {
      if (this.#isExpired(value.expires)) {
        Cache.remove(key);
      }
    }
  }

  static #isExpired(time: number): boolean {
    if (time === 0) return false;

    return time < Date.now();
  }

  static #saveToStorage(key: string): void {
    if (Cache.data[key]) {
      const data = JSON.stringify(Cache.data[key]);
      localStorage.setItem(`${Cache.config.persistPrefixKey}_${key}`, data);
    }
  }

  static #removeFromStorage(key: string): void {
    localStorage.removeItem(`${Cache.config.persistPrefixKey}_${key}`);
  }

  #loadFromStorage(key: string): void {
    const data = localStorage.getItem(`${Cache.config.persistPrefixKey}_${key}`);
    if (data) {
      Cache.data[key] = JSON.parse(data);
    }
  }

  #loadAllFromStorage(): void {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(Cache.config.persistPrefixKey)) {
        const cacheKey = key.replace(new RegExp(`^${Cache.config.persistPrefixKey}_`), '');
        this.#loadFromStorage(cacheKey);
      }
    }
  }
}

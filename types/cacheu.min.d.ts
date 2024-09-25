interface CacheConfig {
    ttl: number;
    cleanup: number;
    persistPrefix: string;
}

interface CacheData<T> {
    expires: number;
    value: T;
    persist: boolean;
}

interface CacheDataCollection<T> extends Record<string, CacheData<T>> {
}

declare class Cache {
    static config: CacheConfig;
    static data: CacheDataCollection<any>;

    constructor(config?: Partial<CacheConfig>);

    static create(config: Partial<CacheConfig>): void;

    static set<U>(key: string, value: U, expires?: number, persist?: boolean): void;

    static get<U>(key: string, defaultValue?: U | null): U | null;

    static has(key: string): boolean;

    static remove(key: string): void;

    static removeAll(): void;

    static isExpired(time: number): boolean;

    static cleanup(): void;

    static loadFromStorage(key: string): void;

    static saveToStorage(key: string): void;

    static loadAllFromStorage(): void;
}

export default Cache;

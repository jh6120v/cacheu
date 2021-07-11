declare interface config {
    ttl: number
    cleanup: number
}

export default class {
    static config: config;
    static data: object;
    constructor(config: config);
    static create(config: object): Cache;
    static set(key: string, value: any, expire: number): void;
    static get(key: string): any | null;
    static has(key: string): boolean;
    static remove(key: string): void;
    static removeAll(): void;
    static isExpired(time: number): boolean;
    static cleanup(): void;
}

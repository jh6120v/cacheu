import Cache from '../src/index';

describe('test cache', () => {
  let store = {
    'HELLO_testKey': '{"expires":0,"value":"test_data","persist":true}',
  };

  const localStorageMock = (function() {
    return {
      length: Object.keys(store).length,
      getItem(key) {
        return store[key] || null;
      },
      setItem(key, value) {
        store[key] = value.toString();
      },
      removeItem(key) {
        delete store[key];
      },
      clear() {
        store = {};
      },
      key(i) {
        return Object.keys(store)[i];
      },
    };
  })();

  beforeAll(() => {
    Object.defineProperty(global, 'localStorage', {
      value: localStorageMock,
    });

    Cache.create({
      ttl: 1000,
      cleanup: 1000,
      persistPrefixKey: 'HELLO',
    });
  });

  test('test whether the config is successfully set', () => {
    expect(Cache.config.ttl).toEqual(1000);
    expect(Cache.config.cleanup).toEqual(1000);
    expect(Cache.config.persistPrefixKey).toEqual('HELLO');
    expect(Cache.data).toEqual({
      'testKey': { expires: 0, value: 'test_data', persist: true },
    });

    localStorage.clear();
  });

  test('test cache set and get without persist.', () => {
    Cache.set('test_without_persist', 'test without persist.');
    const data = Cache.get('test_without_persist');

    expect(data).toEqual('test without persist.');
    expect(localStorageMock.getItem('test_without_persist')).toEqual(null);
  });

  test('test cache set and get with persist.', () => {
    Cache.set('test_with_persist', 'test with persist.', 0, true);
    const data = Cache.get('test_with_persist');

    expect(data).toEqual('test with persist.');
    expect(localStorageMock.getItem('HELLO_test_with_persist')).toEqual('{"expires":0,"value":"test with persist.","persist":true}');
  });

  test('test cache set and auto remove from local storage.', () => {
    Cache.set('test_with_persist', 'test auto.', 0, true);
    expect(localStorageMock.getItem('HELLO_test_with_persist')).toEqual('{"expires":0,"value":"test auto.","persist":true}');

    Cache.set('test_with_persist', 'test auto.');
    expect(localStorageMock.getItem('HELLO_test_with_persist')).toEqual(null);
  });

  test('test set no-expire value', () => {
    Cache.set('no-expire', 'no-expire-value', 0);

    expect(Cache.data['no-expire']).toEqual({
      expires: 0,
      value: 'no-expire-value',
      persist: false,
    });
  });

  test('test the non-existent key-value, get null', () => {
    const data = Cache.get('test_not_exist');

    expect(data).toEqual(null);
  });

  test('test the non-existent key-value and set default value, get default value', () => {
    const data = Cache.get('test_not_exist', 'test123');

    expect(data).toEqual('test123');
  });

  test('test key exist', () => {
    Cache.set('key_exist', 'key_exist_value');

    expect(Cache.has('key_exist')).toBe(true);
    expect(Cache.has('key_not_exist')).toBe(false);
  });

  test('test remove func', () => {
    Cache.set('test_remove', 'test_remove_value', Cache.config.ttl, true);

    expect(Cache.get('test_remove')).toEqual('test_remove_value');

    Cache.remove('test_remove');

    expect(Cache.has('test_remove')).toBe(false);
    expect(Cache.get('test_remove')).toEqual(null);
    expect(localStorageMock.getItem('test_remove')).toEqual(null);
  });

  test('test removeAll function', () => {
    Cache.set('test_remove_all1', 'test_remove_all1_value');
    Cache.set('test_remove_all2', 'test_remove_all2_value');

    expect(Cache.get('test_remove_all1')).toEqual('test_remove_all1_value');
    expect(Cache.get('test_remove_all2')).toEqual('test_remove_all2_value');

    Cache.removeAll();

    expect(Cache.data).toEqual({});
  });

  test('test expires', () => {
    const real = Date.now;
    Date.now = jest.fn().mockReturnValue(1625240540160);

    Cache.set('test_cleanup1', 'test_cleanup1_value', 0);
    Cache.set('test_cleanup2', 'test_cleanup2_value', 1);

    Date.now = real;
    Cache.cleanup();

    expect(Cache.get('test_cleanup1')).toEqual('test_cleanup1_value');
    expect(Cache.get('test_cleanup2')).toEqual(null);
  });
});

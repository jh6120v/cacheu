import Cache from '../src/index';

describe('test cache', () => {
  test('test whether the config is successfully set', () => {
    Cache.create({
      ttl: 1000,
      cleanup: 1000,
    });

    expect(Cache.config.ttl).toEqual(1000);
    expect(Cache.config.cleanup).toEqual(1000);
  });

  test('test cache set and get.', () => {
    Cache.set('test', 'test123');
    const data = Cache.get('test');

    expect(data).toEqual('test123');
  });

  test('test set no-expire value', () => {
    Cache.set('no-expire', 'no-expire-value', 0);

    expect(Cache.data['no-expire']).toEqual({
      expire: 0,
      value: 'no-expire-value',
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
    Cache.set('test_remove', 'test_remove_value');

    expect(Cache.get('test_remove')).toEqual('test_remove_value');

    Cache.remove('test_remove');

    expect(Cache.has('test_remove')).toBe(false);
    expect(Cache.get('test_remove')).toEqual(null);
  });

  test('test removeAll func', () => {
    Cache.set('test_remove_all1', 'test_remove_all1_value');
    Cache.set('test_remove_all2', 'test_remove_all2_value');

    expect(Cache.get('test_remove_all1')).toEqual('test_remove_all1_value');
    expect(Cache.get('test_remove_all2')).toEqual('test_remove_all2_value');

    Cache.removeAll();

    expect(Cache.data).toEqual({});
  });

  test('test isExpired func', () => {
    expect(Cache.isExpired(0)).toBe(false);
    expect(Cache.isExpired('1625240540160')).toBe(true);
    expect(Cache.isExpired(Date.now() + 1000)).toBe(false);
  });

  test('should ', () => {
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


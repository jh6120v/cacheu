import Cacheu from '../src/index';

describe('test cache', () => {
  test('test whether the config is successfully set', () => {
    Cacheu.create({
      ttl: 1000,
      cleanup: 1000,
    });

    expect(Cacheu.config.ttl).toEqual(1000);
    expect(Cacheu.config.cleanup).toEqual(1000);
  });

  test('test cache set and get.', () => {
    Cacheu.set('test', 'test123');
    const data = Cacheu.get('test');

    expect(data).toEqual('test123');
  });

  test('test set no-expire value', () => {
    Cacheu.set('no-expire', 'no-expire-value', 0);

    expect(Cacheu.data['no-expire']).toEqual({
      expire: 0,
      value: 'no-expire-value',
    });
  });

  test('test the non-existent key-value, get null', () => {
    const data = Cacheu.get('test_not_exist');

    expect(data).toEqual(null);
  });

  test('test the non-existent key-value and set default value, get default value', () => {
    const data = Cacheu.get('test_not_exist', 'test123');

    expect(data).toEqual('test123');
  });

  test('test key exist', () => {
    Cacheu.set('key_exist', 'key_exist_value');

    expect(Cacheu.has('key_exist')).toBe(true);
    expect(Cacheu.has('key_not_exist')).toBe(false);
  });

  test('test remove func', () => {
    Cacheu.set('test_remove', 'test_remove_value');

    expect(Cacheu.get('test_remove')).toEqual('test_remove_value');

    Cacheu.remove('test_remove');

    expect(Cacheu.has('test_remove')).toBe(false);
    expect(Cacheu.get('test_remove')).toEqual(null);
  });

  test('test removeAll func', () => {
    Cacheu.set('test_remove_all1', 'test_remove_all1_value');
    Cacheu.set('test_remove_all2', 'test_remove_all2_value');

    expect(Cacheu.get('test_remove_all1')).toEqual('test_remove_all1_value');
    expect(Cacheu.get('test_remove_all2')).toEqual('test_remove_all2_value');

    Cacheu.removeAll();

    expect(Cacheu.data).toEqual({});
  });

  test('test isExpired func', () => {
    expect(Cacheu.isExpired(0)).toBe(false);
    expect(Cacheu.isExpired('1625240540160')).toBe(true);
    expect(Cacheu.isExpired(Date.now() + 1000)).toBe(false);
  });

  test('should ', () => {
    const real = Date.now;
    Date.now = jest.fn().mockReturnValue(1625240540160);

    Cacheu.set('test_cleanup1', 'test_cleanup1_value', 0);
    Cacheu.set('test_cleanup2', 'test_cleanup2_value', 1);

    Date.now = real;
    Cacheu.cleanup();

    expect(Cacheu.get('test_cleanup1')).toEqual('test_cleanup1_value');
    expect(Cacheu.get('test_cleanup2')).toEqual(null);
  });
});


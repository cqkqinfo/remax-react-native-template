import {
  setStorageSync,
  getStorageSync,
  removeStorageSync,
  clearStorageSync
} from '@kqinfo/ui';

type keys = 'token' | 'openId';

interface Storage {
  get: {
    (key: keys | string): string | null;
  };
  set: {
    (key: keys | string, value: string): void;
  };
  del: {
    (key: keys): void;
  };
  clear: () => void;
}

const storage: Storage = {
  get: key => getStorageSync(key),
  set: (key, value: string) => {
    setStorageSync(key, value);
  },
  del: key => removeStorageSync(key),
  clear: () => clearStorageSync()
};

export default storage;

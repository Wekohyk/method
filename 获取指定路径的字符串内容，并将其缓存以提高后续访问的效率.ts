import { BUNDLE_ID } from "@/env";

// 处理带有命名空间的本地存储操作。它提供了设置、获取、删除单个项以及删除所有项的方法。
declare class LocalStorage<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  constructor(namespace: string);

  setItem<K extends keyof T, V = T[K]>(key: K, value: V): Promise<0>;

  getItem<K extends keyof T, V = T[K]>(key: K): Promise<V | null>;

  removeItem<K extends keyof T>(key: K): Promise<0>;

  removeAll(): Promise<0>;
}

const storage = new LocalStorage(BUNDLE_ID);

export default storage;

const PATH_STRING_CACHE = new Map<string, string>();

export const getPathString = async (path: string): Promise<string | null> => {
  if (PATH_STRING_CACHE.has(path)) {
    return PATH_STRING_CACHE.get(path) as string;
  }
  const cache = await storage.getItem<string, string | null>(`PATH_${path}`);
  if (cache) {
    PATH_STRING_CACHE.set(path, cache!);
    return cache!;
  }
  const res = await fetch(path);
  const pathString = await res.text();
  PATH_STRING_CACHE.set(path, pathString);
  storage.setItem(`PATH_${path}`, pathString);
  return pathString;
};

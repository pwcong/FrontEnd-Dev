export function getCacheList(routes, cacheList) {
  cacheList = cacheList || new Set();

  routes.forEach((r) => {
    if ((r.meta || {}).cache) {
      cacheList.add(r.name);
    }

    if (Array.isArray(r.children)) {
      getCacheList(r.children, cacheList);
    }
  });

  return Array.from(cacheList.values());
}

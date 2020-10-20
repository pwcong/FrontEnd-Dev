import React from 'react';
import _ from 'lodash';

export interface IUseListData<T> {
  totalCount: number;
  data: Array<T>;
}

export interface IUseListOptions<T> {
  getData: (params: object) => Promise<IUseListData<T>>;
}

export type IUseListParams<P> = P & {
  pageNum: number;
  pageCount: number;
};

export function useList<T, P = {}>(
  defaultParams: IUseListParams<P>,
  options: IUseListOptions<T>
) {
  const { getData } = options;

  const [loading, setLoading] = React.useState(false);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [params, setParams] = React.useState(defaultParams);
  const [list, setList] = React.useState<Array<T>>([]);
  const [data, setData] = React.useState<IUseListData<T>>({
    data: [],
    totalCount: 0,
  });

  const hasMore = React.useMemo(
    () => params.pageCount * params.pageNum < data.totalCount,
    [params, data]
  );

  const onLoad = React.useCallback(
    _.debounce(async () => {
      setLoading(true);

      try {
        const targetParams = Object.keys(params).reduce((p, c) => {
          const v = params[c];
          if (v !== '' && v !== undefined) {
            p[c] = v;
          }
          return p;
        }, {});

        const data = await getData(targetParams);
        setData(data);

        if (loadingMore) {
          setList(list.concat(data.data));
        } else {
          setList(data.data);
        }
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    }, 200),
    [params, list, setList, setData, setLoading, loadingMore, setLoadingMore]
  );

  const onRefresh = React.useCallback(
    _.debounce(() => {
      setParams({ ...params, pageNum: 1 });
    }, 200),
    [params]
  );

  const onLoadMore = React.useCallback(
    _.debounce(() => {
      setLoadingMore(true);
      setParams({ ...params, pageNum: params.pageNum + 1 });
    }, 200),
    [params]
  );

  React.useEffect(() => {
    onLoad();
  }, [params]);

  return {
    loading,
    setLoading,
    loadingMore,
    setLoadingMore,
    data,
    setData,
    list,
    setList,
    params,
    setParams,
    onLoad,
    onRefresh,
    onLoadMore,
    hasMore,
  };
}

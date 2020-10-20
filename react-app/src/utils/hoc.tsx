import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Loading } from '@/components';

export function withRoutePage(page) {
  const Component = React.lazy(page);

  const WrappedComponent: React.FC = (props) => {
    return (
      <React.Suspense
        fallback={<Loading fullScreen={true} message="页面加载中" />}
      >
        <Component {...props} />
      </React.Suspense>
    );
  };

  WrappedComponent.displayName = `withRoutePage(RoutePage)`;

  return WrappedComponent;
}

export function withRouteGuard(
  Component,
  before?: (props: RouteComponentProps) => Promise<boolean>
) {
  before = before || (() => Promise.resolve(true));
  const WrappedComponent: React.FC<RouteComponentProps> = (props) => {
    const [node, setNode] = React.useState<React.ReactElement>(null);

    React.useEffect(() => {
      let isUnmounted = false;

      before(props).then(
        (result) =>
          !isUnmounted && !!result && setNode(<Component {...props} />)
      );

      return () => (isUnmounted = true);
    }, []);

    return node;
  };

  WrappedComponent.displayName = `withRouteGuard(${Component.displayName})`;

  return WrappedComponent;
}

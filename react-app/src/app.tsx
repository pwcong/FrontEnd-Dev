import React from 'react';
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import classnames from 'classnames';
import omit from 'omit.js';

import { IStoreState, IUserState } from '@/store';
import { routes } from '@/router';
import { withRouteGuard, withRoutePage } from '@/utils';

import './app.scss';

export interface IProps {
  userState: IUserState;
}

const ANIMATION_MAP = {
  PUSH: 'forward',
  REPLACE: 'forward',
  POP: 'back',
};

const App: React.FC<IProps & RouteComponentProps> = (props) => {
  const { userState, history, location } = props;

  const pages = React.useMemo(() => {
    return routes.map((r) => (
      <Route
        key={r.path}
        {...omit(r, ['component'])}
        component={withRouteGuard(
          withRoutePage(r.component),
          (props) =>
            new Promise((resolve) => {
              const { location } = props;
              if ((r.meta || {}).requireAuth && !userState.user) {
                props.history.replace(
                  `/sso?returnUrl=${encodeURIComponent(
                    `${location.pathname}${location.search}`
                  )}`
                );
                resolve(false);
              } else {
                resolve(true);
              }
            })
        )}
      />
    ));
  }, [userState.user]);

  return (
    <TransitionGroup
      className="router-view"
      childFactory={(child) => {
        return React.cloneElement(child, {
          classNames: classnames(
            'router-wrapper',
            ANIMATION_MAP[history.action]
          ),
        });
      }}
    >
      <CSSTransition timeout={50000} key={location.pathname}>
        <Switch location={location}>{pages}</Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

const mapStateToProps = (state: IStoreState) => ({
  userState: state.user,
});

export default connect(mapStateToProps)(withRouter(App));

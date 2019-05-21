import React from 'react';

import { withRouter, Route, Switch, RouteComponentProps } from 'react-router';
import { HashRouter as Router } from 'react-router-dom';

import { classNames, getPrefixCls } from '@rc-x/utils';

import packageJSON from '../../package.json';

import './style.scss';

export type IComponent = {
  entry: any;
  pkg: any;
};

export interface IProps extends RouteComponentProps {
  components: Array<IComponent>;
}

const baseCls = getPrefixCls('docs');

class App extends React.PureComponent<IProps> {
  renderAside = () => {
    const { components } = this.props;

    const cls = getPrefixCls('aside', baseCls);
    const topCls = getPrefixCls('top', cls);
    const navsCls = getPrefixCls('navs', cls);
    const navCls = getPrefixCls('nav', cls);

    return (
      <div className={cls}>
        <div
          className={topCls}
          onClick={() => {
            this.props.history.push('/');
          }}
        >
          Document
        </div>
        <div className={navsCls}>
          {components.map((component, i) => {
            const pkg = component.pkg;
            const pathname = this.props.history.location.pathname;
            return (
              <div
                className={classNames(navCls, {
                  [`${navCls}-active`]: pathname.substring(1) === pkg.baseName
                })}
                key={navCls + '-' + i}
                onClick={() => {
                  this.props.history.push(pkg.baseName);
                }}
              >
                <div className={`${navCls}-title`}>{pkg.componentName}</div>
                <div className={`${navCls}-desc`}>{pkg.description}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  renderMain = () => {
    const { components } = this.props;

    const cls = getPrefixCls('main', baseCls);

    return (
      <div className={cls}>
        <Router>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            {components.map(component => (
              <Route
                key={component.pkg.baseName}
                path={'/' + component.pkg.baseName}
                exact={true}
                render={() => (
                  <React.Suspense
                    fallback={
                      <div className={`${baseCls}-loading`}>Loading</div>
                    }
                  >
                    <component.entry />
                  </React.Suspense>
                )}
              />
            ))}
          </Switch>
        </Router>
      </div>
    );
  };

  render() {
    return (
      <div className={baseCls}>
        {this.renderAside()}
        {this.renderMain()}
      </div>
    );
  }
}

const Home: React.FunctionComponent = props => {
  return (
    <div
      style={{
        textAlign: 'center',
        paddingTop: '192px',
        fontSize: 24,
        color: '#333'
      }}
    >
      RC-Component-X
      <p
        style={{
          textAlign: 'center',
          color: '#999',
          fontSize: 12,
          marginTop: '16px'
        }}
      >
        {packageJSON.description}
      </p>
    </div>
  );
};

export default withRouter(App);

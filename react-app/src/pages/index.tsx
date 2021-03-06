import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavBar, Icon } from 'antd-mobile';

import { IStoreState, IUserState } from '@/store';

import './index.scss';

export interface IProps extends RouteComponentProps {
  userState: IUserState;
}

const Page: React.FC<IProps> = (props) => {
  const goPage = React.useCallback(() => {
    props.history.push('/test');
  }, []);

  return (
    <div className="page-index">
      <NavBar
        icon={<Icon type="left" />}
        rightContent={<span onClick={goPage}>进入</span>}
      >
        React App
      </NavBar>
    </div>
  );
};

const mapStateToProps = (state: IStoreState) => ({
  userState: state.user,
});

export default connect(mapStateToProps)(withRouter(Page));

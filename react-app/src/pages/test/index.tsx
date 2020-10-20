import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavBar, Icon } from 'antd-mobile';

import { IStoreState, IUserState } from '@/store';

import './style.scss';

export interface IProps extends RouteComponentProps {
  userState: IUserState;
}

const Page: React.FC<IProps> = (props) => {
  const goBack = React.useCallback(() => {
    props.history.goBack();
  }, []);

  return (
    <div className="page-test">
      <NavBar icon={<Icon type="left" />} onLeftClick={goBack}>
        Test
      </NavBar>
    </div>
  );
};

const mapStateToProps = (state: IStoreState) => ({
  userState: state.user,
});

export default connect(mapStateToProps)(withRouter(Page));

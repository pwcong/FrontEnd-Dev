import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import { Loading } from '@/components';
import native from '@/common/lib/native';
import { IStoreState, IUserState, IUser, setUser } from '@/store';

import './sso.scss';

export interface IProps extends RouteComponentProps {
  userState: IUserState;
  setUser: (user: IUser) => void;
}

const Page: React.FC<IProps> = (props) => {
  const { history, location, userState, setUser } = props;

  const searchParams = new URLSearchParams(location.search);

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    native
      .getUser()
      .then((res) => {
        const { userCode, userName, tokenId } = res;

        setTimeout(() => {
          if (!userState.user) {
            setUser({
              tokenId,
              userCode,
              userName,
            });
            history.replace(
              decodeURIComponent(searchParams.get('returnUrl') || '/')
            );
          }
        }, 300);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return <Loading fullScreen={true} message="自动登录中" />;
};

const mapStateToProps = (state: IStoreState) => ({
  userState: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user: IUser) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Page));

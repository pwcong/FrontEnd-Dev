import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonApp
} from '@ionic/react';
import { arrowBack } from 'ionicons/icons';

import { IStoreState, IUserState } from '@/store';

export interface IProps extends RouteComponentProps {
  userState: IUserState;
}

const Page: React.FC<IProps> = (props) => {
  const goPage = React.useCallback(() => {
    props.history.push('/test');
  }, []);

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton style={{ color: 'white' }} fill="clear">
              <IonIcon icon={arrowBack} />
              关闭
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton style={{ color: 'white' }} fill="clear" onClick={goPage}>
              进入
            </IonButton>
          </IonButtons>
          <IonTitle style={{ color: 'white' }}>React App</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonApp>
  );
};

const mapStateToProps = (state: IStoreState) => ({
  userState: state.user,
});

export default connect(mapStateToProps)(withRouter(Page));

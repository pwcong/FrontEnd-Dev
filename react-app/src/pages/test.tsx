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
  IonApp,
} from '@ionic/react';
import { arrowBack } from 'ionicons/icons';

import { IStoreState, IUserState } from '@/store';

export interface IProps extends RouteComponentProps {
  userState: IUserState;
}

const Page: React.FC<IProps> = (props) => {
  const goBack = React.useCallback(() => {
    props.history.goBack();
  }, []);

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton style={{ color: 'white' }} fill="clear" onClick={goBack}>
              <IonIcon icon={arrowBack} />
              返回
            </IonButton>
          </IonButtons>
          <IonTitle style={{ color: 'white' }}>Test</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonApp>
  );
};

const mapStateToProps = (state: IStoreState) => ({
  userState: state.user,
});

export default connect(mapStateToProps)(withRouter(Page));

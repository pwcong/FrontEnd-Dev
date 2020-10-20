import React from 'react';
import classnames from 'classnames';
import { Icon } from 'antd-mobile';

import './style.scss';

export interface IProps {
  className?: string;
  fullScreen?: boolean;
  message?: React.ReactNode;
}

const Loading: React.FC<IProps> = (props) => {
  const { className, message, fullScreen } = props;
  return (
    <div
      className={classnames('loading', className, {
        'full-screen': fullScreen,
      })}
    >
      <div className="loading-icon">
        <Icon size="lg" type="loading" />
      </div>
      <div className="loading-message">{message}</div>
    </div>
  );
};

export default Loading;

import React from 'react';

export interface IRestProps {
  onMouseDown?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onMouseOver?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export const getRestProps = (props: IRestProps, revert?: boolean) => {
  const restNames = [
    'onMouseDown',
    'onMouseEnter',
    'onMouseLeave',
    'onMouseOver'
  ];

  const restProps = {};
  Object.keys(props).forEach(k => {
    (revert ? restNames.indexOf(k) < 0 : restNames.indexOf(k) > -1) &&
      (restProps[k] = props[k]);
  });

  return restProps;
};

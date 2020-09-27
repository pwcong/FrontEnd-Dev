import React from 'react';
import Test from '../index';

import packageJSON from '../package.json';

const TestComponent: React.FunctionComponent = props => {
  return (
    <div>
      {Object.keys(props).map((k, i) => (
        <div key={`prop-${i}`} style={{ fontSize: 14, color: '#666666' }}>
          {k + ' = ' + JSON.stringify(props[k])}
        </div>
      ))}
    </div>
  );
};

export default function() {
  return (
    <Test
      component={TestComponent}
      componentTestProps={{
        input: {
          type: 'input',
          label: '文本',
          value: 'Hello World!'
        },
        switch: {
          type: 'switch',
          label: '开关',
          value: false
        },
        radio: {
          type: 'radio',
          label: '单选',
          value: 'a',
          options: [
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
            { label: 'C', value: 'c' }
          ]
        },
        checkbox: {
          type: 'checkbox',
          label: '多选',
          value: ['a'],
          options: [
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
            { label: 'C', value: 'c' }
          ]
        }
      }}
      componentPackageJson={packageJSON}
    />
  );
}

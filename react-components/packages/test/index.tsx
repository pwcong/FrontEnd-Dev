import React, { useState } from 'react';

import { classNames, getPrefixCls } from '@rc-x/utils';

import './style.scss';

const baseCls = getPrefixCls('test');

export type IComponentPropType =
  | 'radio'
  | 'switch'
  | 'checkbox'
  | 'input'
  | 'inputNumber';

export interface IComponentBaseProp {
  type: IComponentPropType;
  label: string;
  value: any;
}

export interface IComponentInputProp extends IComponentBaseProp {
  type: 'input';
  value: string;
}

export interface IComponentInputNumberProp extends IComponentBaseProp {
  type: 'inputNumber';
  value: number;
}

export interface IComponentSwitchProp extends IComponentBaseProp {
  type: 'switch';
  value: boolean;
}

export interface IComponentRadioProp extends IComponentBaseProp {
  type: 'radio';
  options: { label: string; value: any }[];
}

export interface IComponentCheckboxProp extends IComponentBaseProp {
  type: 'checkbox';
  value: Array<any>;
  options: { label: string; value: any }[];
}

export type IComponentProp =
  | IComponentRadioProp
  | IComponentCheckboxProp
  | IComponentInputProp
  | IComponentInputNumberProp
  | IComponentSwitchProp;

export type IComponentProps = { [name: string]: any };
export type IComponentTestProps = { [name: string]: IComponentProp };

export interface ITestChildProps {
  component: any;
  componentProps?: IComponentProps;
  componentTestProps: IComponentTestProps;
}

export interface ITestProps {
  componentPackageJson: { [name: string]: any };
  component: any | Array<any>;
  componentName?: string | Array<string>;
  componentProps?: Array<IComponentProps> | IComponentProps;
  componentTestProps: Array<IComponentTestProps> | IComponentTestProps;
  defaultActiveComponentName?: string;
  children?: React.ReactNode;
}

const TestChild = (props: ITestChildProps) => {
  const { component, componentProps, componentTestProps } = props;

  const controllers = Object.keys(componentTestProps).map(k => {
    const prop = componentTestProps[k];
    const [value, setValue] = useState(prop.value);
    return {
      name: k,
      value,
      setValue
    };
  });

  const _componentTestProps = {};
  controllers.forEach(c => (_componentTestProps[c.name] = c.value));

  return (
    <div className={getPrefixCls('child', baseCls)}>
      <div className={getPrefixCls('props', baseCls)}>
        <div className={getPrefixCls('title', baseCls)}>Props</div>
        {controllers.map((c, index) => {
          const componentProp = componentTestProps[c.name];

          if (!componentProp) {
            return null;
          }

          const propCls = getPrefixCls('prop', baseCls);

          let controller: React.ReactNode;
          switch (componentProp.type) {
            case 'input':
              controller = (
                <input
                  value={c.value}
                  type="text"
                  onChange={e => {
                    c.setValue(e.target.value);
                  }}
                />
              );
              break;
            case 'inputNumber':
              controller = (
                <input
                  type="number"
                  value={c.value}
                  onChange={e => {
                    c.setValue(Number(e.target.value));
                  }}
                />
              );
              break;
            case 'radio':
              const radioGroupCls = getPrefixCls('radio-group', propCls);
              controller = (
                <div className={radioGroupCls}>
                  {componentProp.options.map((o, _index) => (
                    <label key={`${radioGroupCls}-${_index}`}>
                      <input
                        name={`${c.name}-${index}-${_index}`}
                        value={o.value}
                        type="radio"
                        checked={o.value === c.value}
                        onChange={e => c.setValue(o.value)}
                      />
                      {o.label}
                    </label>
                  ))}
                </div>
              );
              break;
            case 'switch':
              const switchGroupCls = getPrefixCls('switch-group', propCls);
              controller = (
                <div className={switchGroupCls}>
                  <label>
                    <input
                      name={`${c.name}-${index}`}
                      type="checkbox"
                      checked={c.value}
                      onChange={e => {
                        c.setValue(e.target.checked);
                      }}
                    />
                    {c.value ? 'true' : 'false'}
                  </label>
                </div>
              );
              break;
            case 'checkbox':
              const checkboxGroupCls = getPrefixCls('checkbox-group', propCls);
              controller = (
                <div className={checkboxGroupCls}>
                  {componentProp.options.map((o, _index) => (
                    <label key={`${checkboxGroupCls}-${_index}`}>
                      <input
                        name={`${c.name}-${index}-${_index}`}
                        value={o.value}
                        type="checkbox"
                        checked={c.value.indexOf(o.value) > -1}
                        onChange={e => {
                          const newValue: Array<any> = [];
                          const valueIndex = c.value.indexOf(o.value);
                          if (valueIndex < 0) {
                            newValue.push(o.value);
                          }
                          c.value.forEach((v, __index) => {
                            if (valueIndex > -1 && __index === valueIndex) {
                              return;
                            }
                            newValue.push(v);
                          });
                          c.setValue(newValue);
                        }}
                      />
                      {o.label}
                    </label>
                  ))}
                </div>
              );
              break;
            default:
              break;
          }

          return (
            <div className={propCls} key={`${propCls}-${index}`}>
              <div className={getPrefixCls('label', propCls)}>
                {`${componentProp.label} (${c.name}) :`}
              </div>

              <div className={getPrefixCls('controller')}>{controller}</div>
            </div>
          );
        })}
      </div>
      <div className={getPrefixCls('component', baseCls)}>
        <div className={getPrefixCls('title', baseCls)}>Component</div>
        {React.createElement(component, {
          ...(componentProps || {}),
          ..._componentTestProps
        })}
      </div>
    </div>
  );
};

const Test = (props: ITestProps) => {
  const {
    component,
    componentName,
    componentProps,
    componentTestProps,
    componentPackageJson,
    defaultActiveComponentName,
    children
  } = props;

  if (Array.isArray(component)) {
    if (
      !Array.isArray(componentName) ||
      !Array.isArray(componentProps) ||
      !Array.isArray(componentTestProps) ||
      componentName.length !== component.length ||
      componentProps.length !== component.length ||
      componentTestProps.length !== component.length
    ) {
      return <div>Invalid Test Props</div>;
    }
  }

  let testMain: React.ReactNode;
  if (Array.isArray(component)) {
    let defaultIndex = 0;
    if (defaultActiveComponentName) {
      const activeIndex = (componentName as Array<string>).indexOf(
        defaultActiveComponentName
      );
      activeIndex > -1 && (defaultIndex = activeIndex);
    }

    const [tabIndex, setTabIndex] = useState(defaultIndex);

    testMain = [
      <div className={getPrefixCls('items', baseCls)} key="items">
        {component.map((c, i) => {
          const childCls = getPrefixCls('item', baseCls);
          return (
            <div
              className={classNames(childCls, {
                [`${childCls}-active`]: i === tabIndex
              })}
              key={`${childCls}-${i}`}
            >
              <TestChild
                component={c}
                componentProps={componentProps ? componentProps[i] : undefined}
                componentTestProps={componentTestProps[i]}
              />
            </div>
          );
        })}
      </div>,
      <div className={getPrefixCls('tabs', baseCls)} key="tabs">
        {component.map((c, i) => {
          const tabCls = getPrefixCls('tab', baseCls);
          return (
            <div
              key={`${tabCls}-${i}`}
              onClick={() => {
                setTabIndex(i);
              }}
              className={classNames(tabCls, {
                [`${tabCls}-active`]: i === tabIndex
              })}
            >
              {componentName ? componentName[i] : undefined}
            </div>
          );
        })}
      </div>
    ];
  } else {
    testMain = (
      <TestChild
        component={component}
        componentProps={componentProps}
        componentTestProps={componentTestProps as IComponentTestProps}
      />
    );
  }

  return (
    <div className={classNames(baseCls)}>
      <div className={getPrefixCls('package', baseCls)}>
        <div className={getPrefixCls('title', baseCls)}>Package</div>
        <table>
          <tbody>
            <tr>
              <td>name:</td>
              <td>{componentPackageJson.name}</td>
            </tr>
            <tr>
              <td>description:</td>
              <td>{componentPackageJson.description}</td>
            </tr>
            <tr>
              <td>version:</td>
              <td>{componentPackageJson.version}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {testMain}

      {children && (
        <div className={getPrefixCls('custom', baseCls)}>
          <div className={getPrefixCls('title', baseCls)}>Custom</div>
          {children}
        </div>
      )}
    </div>
  );
};

export default Test;

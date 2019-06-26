import { injectReducer } from '@/store';
import hoistNonReactStatics from 'hoist-non-react-statics';
import React, { Component, ComponentType } from 'react';

/**
 * Dynamically injects a reducer
 *
 * @param {function} reducer A reducer that will be injected
 *
 */
export default function(reducer: any) {
  return (WrappedComponent: ComponentType) => {
    /**
     * ...
     */
    class ReducerInjector extends Component {
      static WrappedComponent = WrappedComponent;

      constructor(props: any) {
        super(props);
        injectReducer(reducer);
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    return hoistNonReactStatics(ReducerInjector, WrappedComponent);
  };
}

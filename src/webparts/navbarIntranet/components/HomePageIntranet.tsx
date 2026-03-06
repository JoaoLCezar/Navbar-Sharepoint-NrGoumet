import * as React from 'react';
import type { IHomePageIntranetProps } from './IHomePageIntranetProps';
import IntranetApp from './IntranetApp';

export default class HomePageIntranet extends React.Component<IHomePageIntranetProps> {
  public render(): React.ReactElement<IHomePageIntranetProps> {
    const { context } = this.props;

    return (
      <IntranetApp 
        context={context}
      />
    );
  }
}

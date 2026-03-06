import * as React from 'react';
import type { INavbarIntranetProps } from './INavbarIntranetProps';
import IntranetApp from './IntranetApp';

export default class NavbarIntranet extends React.Component<INavbarIntranetProps> {
  public render(): React.ReactElement<INavbarIntranetProps> {
    const { context } = this.props;

    return (
      <IntranetApp 
        context={context}
      />
    );
  }
}

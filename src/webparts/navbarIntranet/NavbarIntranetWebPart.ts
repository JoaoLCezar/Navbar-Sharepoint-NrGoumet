import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import NavbarIntranet from './components/NavbarIntranet';
import { INavbarIntranetProps } from './components/INavbarIntranetProps';

export default class NavbarIntranetWebPart extends BaseClientSideWebPart<Record<string, never>> {

  public render(): void {
    // Garantir que o domElement tenha altura minima e seja visivel.
    this.domElement.style.minHeight = '80px';
    this.domElement.style.display = 'block';

    const element: React.ReactElement<INavbarIntranetProps> = React.createElement(
      NavbarIntranet,
      {
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}

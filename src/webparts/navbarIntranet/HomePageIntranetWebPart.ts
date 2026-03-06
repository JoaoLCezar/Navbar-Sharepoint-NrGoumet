import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import HomePageIntranet from './components/HomePageIntranet';
import { IHomePageIntranetProps } from './components/IHomePageIntranetProps';

export default class HomePageIntranetWebPart extends BaseClientSideWebPart<Record<string, never>> {

  public render(): void {
    // Garantir que o domElement tenha altura minima e seja visivel.
    this.domElement.style.minHeight = '80px';
    this.domElement.style.display = 'block';

    const element: React.ReactElement<IHomePageIntranetProps> = React.createElement(
      HomePageIntranet,
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

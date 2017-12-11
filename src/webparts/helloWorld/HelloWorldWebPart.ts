import { Aurelia } from 'aurelia-framework';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import { PLATFORM } from "aurelia-pal";
import styles from './HelloWorldWebPart.module.scss';
import * as jQuery from "jquery";
import * as bootstrap from "bootstrap";
import { SPComponentLoader } from '@microsoft/sp-loader';
import * as Bluebird from 'bluebird';

export interface IHelloWorldWebPartProps {
  description: string;
}

export default class HelloWorldWebPartWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> 
{
  public constructor()
  {
    super();

    Bluebird.config({ warnings: { wForgottenReturn: false } });

    SPComponentLoader.loadCss('https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css');
    SPComponentLoader.loadCss('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');

  }

  public render(): void {
    console.log(this.instanceId);
    this.domElement.innerHTML = `
      <div id="${this.instanceId}" class="${this.instanceId}"  >Loading...</div>
      `;

      require(['aurelia-bootstrapper'],(au) =>
      {
        au.bootstrap(
          (aurelia: Aurelia) =>
          {
            aurelia.use
            .standardConfiguration()
            .developmentLogging();
            var el = document.getElementById(this.instanceId);
            aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('webparts/helloWorld/myapp'),el));
          }
        );

      });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "description"
          },
          groups: [
            {
              groupName: "BasicGroupName",
              groupFields: [
                PropertyPaneTextField('description', {
                  label: "DescriptionFieldLabel"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

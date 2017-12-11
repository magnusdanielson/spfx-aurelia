import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

export interface IUser {
  avatar_url: string;
  login: string;
  html_url: string;
}

@inject( HttpClient)
export class Users {
  public heading: string = 'Github Users';
  public users: Array<IUser> = [];
  public http: HttpClient;
  /**
   * ref element on the binding-context
   */
  public image: HTMLImageElement;

  constructor(httpClient:HttpClient) 
  {
    this.http = httpClient;
  }

  public async activate(): Promise<void> {
    this.http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://api.github.com/');
    });

    const response = await this.http.fetch('users');
    this.users = await response.json();
  }
}

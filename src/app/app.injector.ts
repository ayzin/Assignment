import {Injectable, Injector} from "@angular/core";
@Injectable()
export class AppInjector {
  private static injector :any;

  public static get(token: any) {
    if (AppInjector.injector) {
      return AppInjector.injector.get(token);
    }
  }

  constructor(public injector: Injector) {
    AppInjector.injector = injector;
  }
}

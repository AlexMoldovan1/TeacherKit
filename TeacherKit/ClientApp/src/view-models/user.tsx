import { observable } from "mobx";

export class UserViewModel {
  @observable
  public id: number;
  @observable
  public firstName: string;
  @observable
  public lastName: string;
  @observable
  public email: string;
  @observable
  public password: string;
  @observable
  public tokenGuid: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    tokenGuid: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.tokenGuid = tokenGuid;
  }
}

export class UserCommandViewModel {
  @observable
  public id: number;
  @observable
  public firstName: string;
  @observable
  public lastName: string;
  @observable
  public email: string;
  @observable
  public oldPassword: string;
  @observable
  public newPassword: string;
  @observable
  public repeatPassword: string;

  constructor(user: any) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.oldPassword = user.oldPassword;
    this.newPassword = user.newPassword;
    this.repeatPassword = user.repeatPassword;
  }
}

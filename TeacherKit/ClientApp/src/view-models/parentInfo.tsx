import { observable } from "mobx";

export class ParentInfoViewModel {
  @observable
  public id: number;
  @observable
  public firstName: string;
  @observable
  public lastName: string;
  @observable
  public phone: string;
  @observable
  public email: string;
  @observable
  public adress: string;
  constructor(parentInfo: any) {
    this.id = parentInfo.id;
    this.firstName = parentInfo.firstName;
    this.lastName = parentInfo.lastName;
    this.phone = parentInfo.phone;
    this.email = parentInfo.email;
    this.adress = parentInfo.adress;
  }
}

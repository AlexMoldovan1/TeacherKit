import { observable } from "mobx";

export class GroupsViewModel {
  @observable
  public content: string;

  constructor(content: any) {
    this.content = content;
  }
}

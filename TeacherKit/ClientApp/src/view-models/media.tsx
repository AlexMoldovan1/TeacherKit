import { observable } from "mobx";

export class StudentsMediaViewModel {
  @observable
  public imageName: string;

  constructor(imageName: string) {
    this.imageName = imageName;
  }
}

export class ClassMediaViewModel {
  @observable
  public imageName: string;

  constructor(imageName: string) {
    this.imageName = imageName;
  }
}

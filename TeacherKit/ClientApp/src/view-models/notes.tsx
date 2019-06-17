import { observable } from "mobx";

export class NotesViewModel {
  @observable
  public noteContent: string;

  constructor(noteContent: any) {
    this.noteContent = noteContent;
  }
}

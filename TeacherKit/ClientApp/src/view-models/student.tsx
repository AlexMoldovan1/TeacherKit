import { computed, observable } from "mobx";
import { ParentInfoViewModel } from "./parentInfo";
import { NotesViewModel } from "./notes";
import { StudentsMediaViewModel } from "./media";

export class StudentViewModel {
  @observable
  public id: number;
  @observable
  public firstName: string;
  @observable
  public lastName: string;
  @observable
  public code: number;
  @observable
  public age: number;
  @observable
  public gender: string;
  @observable
  public phone: string;
  @observable
  public email: string;
  @observable
  public adress: string;
  @observable
  public star: boolean;
  @observable
  public parentInfo: ParentInfoViewModel;
  @observable
  public notes: NotesViewModel[];
  @observable
  public studentsMediaFiles: StudentsMediaViewModel[];
  @observable
  public classModelId: number;
  @observable
  public userId: number;
  constructor(student: any) {
    this.id = student.id;
    this.firstName = student.firstName;
    this.lastName = student.lastName;
    this.code = student.code;
    this.age = student.age;
    this.gender = student.gender;
    this.phone = student.code;
    this.email = student.email;
    this.adress = student.adress;
    this.parentInfo = student.parentInfo;
    this.notes = student.notes;
    this.studentsMediaFiles = student.studentsMediaFiles;
    this.star = student.star;
    this.classModelId = student.classModelId;
    this.userId = student.userId;
  }
}

export class StudentQueryViewModel extends StudentViewModel {
  @observable
  public studentsMedia: StudentsMediaViewModel[] = [];

  constructor(student: any) {
    super(student);
    this.studentsMedia = student.studentsMedia;
  }

  @computed
  get iconName() {
    let src: string = "";
    for (let i = 0; i < this.studentsMedia.length; i++) {
      let extension = this.studentsMedia[i].imageName.split(".").pop();
      if (extension === "mp4") src = "";
      else {
        src = "/Images/" + this.studentsMedia[i].imageName;
        break;
      }
    }
    return src;
  }
}

export class StudentCommandViewModel extends StudentViewModel {
  @observable
  public studentsMedia: File[] = [];
}

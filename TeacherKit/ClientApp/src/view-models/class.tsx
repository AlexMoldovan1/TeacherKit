import { computed, observable } from "mobx";
import { NotesViewModel } from "./notes";
import { ClassMediaViewModel, StudentsMediaViewModel } from "./media";
import { GroupsViewModel } from "./groups";
import { StudentViewModel } from "./student";

export class ClassViewModel {
  @observable
  public id: number;
  @observable
  public title: string;
  @observable
  public code: number;
  @observable
  public courseStartDate: Date;
  @observable
  public courseEndDate: Date;
  @observable
  public groups: GroupsViewModel[];
  @observable
  public stars: boolean;
  @observable
  public notes: NotesViewModel[];
  @observable
  public classesMediaModel: ClassMediaViewModel[];
  @observable
  public classIconModel: ClassMediaViewModel;
  @observable
  public students: StudentViewModel[];
  @observable
  public userId: number;
  constructor(classModel: any) {
    this.id = classModel.id;
    this.title = classModel.title;
    this.code = classModel.code;
    this.courseStartDate = classModel.courseStartDate;
    this.courseEndDate = classModel.courseEndDate;
    this.groups = classModel.groups;
    this.notes = classModel.notes;
    this.classesMediaModel = classModel.classesMediaModel;
    this.stars = classModel.stars;
    this.students = classModel.students;
    this.classIconModel = classModel.classIconModel;
    this.userId = classModel.userId;
  }
}

export class ClassQueryViewModel extends ClassViewModel {
  @observable
  public classMediaQueryModel: ClassMediaViewModel[];
  @observable
  public classIconQueryModel: ClassMediaViewModel;

  constructor(classModel: any) {
    super(classModel);
    this.classMediaQueryModel = classModel.classMediaQueryModel;
    this.classIconQueryModel = classModel.classIconQueryModel;
  }

  @computed
  get iconName() {
    let src: string = "";
    return this.classIconQueryModel.imageName != null &&
      this.classIconQueryModel.imageName.length > 0
      ? "/Images/" + this.classIconQueryModel.imageName //.split(".").pop();
      : src;
  }
}

export class ClassCommandViewModel extends ClassViewModel {
  @observable
  public classMediaCommandModel: File[] = [];
  @observable
  public classIconCommandModel: File;
}

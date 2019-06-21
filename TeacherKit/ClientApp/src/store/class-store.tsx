import ClassesApiInstance, {
  ClassesApiService
} from "./api-services/class-api.service";
import { ClassQueryViewModel, ClassViewModel } from "../view-models/class";
import { observable, computed, action } from "mobx";
import { StudentViewModel } from "src/view-models/student";

export class ClassesStore {
  private classesApi: ClassesApiService;
  @observable
  classes: ClassQueryViewModel[] = [];
  @observable
  activeClass: ClassQueryViewModel;
  @observable
  statusCode: number;

  constructor(classesApi: ClassesApiService) {
    this.classesApi = classesApi;
    this.activeClass = {
      id: 0,
      title: "",
      code: 0,
      courseStartDate: new Date(),
      courseEndDate: new Date(),
      groups: [],
      stars: false,
      notes: [],
      classesMediaModel: [],
      classIconModel: { imageName: "" },
      classIconQueryModel: { imageName: "" },
      classMediaQueryModel: [],
      iconName: "",
      students: []
    };
  }

  @action
  loadClasses(callback?: Function) {
    this.classesApi
      .getClasses()
      .then(data => {
        this.classes = data.map(
          classModel => new ClassQueryViewModel(classModel)
        );
      })
      .then(() => {
        if (callback !== undefined) {
          callback();
        }
      });
  }

  @action
  loadActiveClass(id: number, loadedClassCallback?: Function) {
    this.classesApi.getClassById(id).then(data => {
      this.activeClass = data;
      if (loadedClassCallback != undefined) loadedClassCallback(data);
    });
  }

  @computed
  get getClasses(): ClassQueryViewModel[] {
    return this.classes;
  }

  @computed
  get getStars(): ClassQueryViewModel[] {
    return this.classes.filter(classModel => classModel.stars);
  }

  @action
  public AddStudentToClass(classModel: ClassViewModel, callback?: Function) {
    this.classesApi.addStudentToClass(classModel).then(() => {
      if (callback !== undefined) {
        callback();
      }
    });
  }

  @action.bound
  public AddClass(
    classModel: ClassViewModel,
    mediaList: any,
    mediaIcon: any,
    callback?: Function
  ) {
    let form = new FormData();
    for (let i = 0; i < mediaList.length; i++) {
      form.append("classMediaCommandModel", mediaList[i]);
    }
    form.append("classIconCommandModel", mediaIcon);
    var inputData = {
      ...classModel,
      classMediaCommandModel: null,
      classIconCommandModel: null
    };
    form.append("inputData", JSON.stringify(inputData));
    this.classesApi
      .addClass(form)
      .then(statusCode => (this.statusCode = statusCode))
      .then(() => {
        if (callback !== undefined) {
          callback();
        }
      });
  }
}
export default new ClassesStore(ClassesApiInstance);

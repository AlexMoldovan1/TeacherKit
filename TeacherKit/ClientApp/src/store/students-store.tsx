import { observable, computed, action } from "mobx";
import {
  StudentQueryViewModel,
  StudentViewModel
} from "../view-models/student";
import StudentsApiInstance, {
  StudentsApiService
} from "./api-services/students-api.service";

export class StudentsStore {
  private studentApi: StudentsApiService;
  @observable
  studentsByClassId: StudentQueryViewModel[] = [];
  @observable
  students: StudentQueryViewModel[] = [];
  @observable
  activeStudent: StudentQueryViewModel;
  @observable
  statusCode: number;

  constructor(studentsApi: StudentsApiService) {
    this.studentApi = studentsApi;
    this.activeStudent = {
      id: 0,
      firstName: "",
      lastName: "",
      code: 0,
      age: 0,
      gender: "F",
      phone: "",
      email: "",
      adress: "",
      star: false,
      classModelId: 0,
      parentInfo: {
        id: 0,
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        adress: ""
      },
      notes: [],
      studentsMedia: [],
      studentsMediaFiles: [],
      iconName: ""
    };
  }

  @action
  loadStudents(callback?: Function, callback2?: Function) {
    this.studentApi
      .getStudents()
      .then(
        data =>
          (this.students = data.map(
            student => new StudentQueryViewModel(student)
          ))
      )
      .then(() => {
        if (callback !== undefined) {
          callback();
        }
        if (callback2 !== undefined) {
          callback2();
        }
      });
  }

  @action
  loadActiveStudent(
    id: number,
    loadedStudentCallback: Function,
    callback2?: Function
  ) {
    this.studentApi.getStudentById(id).then(data => {
      this.activeStudent = data;
      if (loadedStudentCallback !== undefined) {
        loadedStudentCallback(data);
      }
      if (callback2 !== undefined) {
        callback2();
      }
    });
  }

  @action
  loadStudentsByClassId(classId: number, callback?: Function) {
    this.studentApi.getStudentsByClassId(classId).then(data => {
      this.studentsByClassId = data;
      if (callback !== undefined) {
        callback(data);
      }
    });
  }

  @computed
  get getStudents(): StudentQueryViewModel[] {
    return this.students;
  }

  @computed
  get getStars(): StudentQueryViewModel[] {
    return this.students.filter(student => student.star);
  }

  @action.bound
  public AddStudent(
    student: StudentViewModel,
    mediaList: any,
    callback?: Function
  ) {
    let form = new FormData();
    for (let i = 0; i < mediaList.length; i++) {
      form.append("studentsMedia", mediaList[i]);
    }
    var inputData = { ...student, studentsMedia: null };
    form.append("inputData", JSON.stringify(inputData));
    this.studentApi
      .addStudent(form)
      .then(statusCode => (this.statusCode = statusCode))
      .then(() => {
        if (callback !== undefined) {
          callback();
        }
      });
  }

  @action.bound
  public UpdateStudent(student: StudentViewModel, callback?: Function) {
    this.studentApi
      .updateStudent(student)
      .then(statusCode => (this.statusCode = statusCode))
      .then(() => {
        if (callback !== undefined) {
          callback();
        }
      });
  }

  @action.bound
  deleteStudent(studentId: number, callback?: Function) {
    this.studentApi
      .deleteStudent(studentId)
      .then(statusCode => (this.statusCode = statusCode))
      .then(() => {
        if (callback !== undefined) {
          callback();
        }
      });
  }
}

export default new StudentsStore(StudentsApiInstance);

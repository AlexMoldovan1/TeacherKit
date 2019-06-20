import { ClassQueryViewModel } from "../../view-models/class";
import AxiosInstance from "axios";

const HEADERS = {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json"
  }
};

export class ClassesApiService {
  async getClasses(): Promise<ClassQueryViewModel[]> {
    const url = "/api/Classes/All";
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  async getClassById(classId: number): Promise<ClassQueryViewModel> {
    const url = "/api/Classes/GetClassById/" + classId;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  addClass(classModel: any): any {
    const url = "/api/Classes/AddClass";
    return AxiosInstance.post(url, classModel).then(r => r.status);
  }
}
export default new ClassesApiService();
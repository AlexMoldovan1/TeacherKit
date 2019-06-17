import { StudentQueryViewModel } from "../../view-models/student";
import AxiosInstance from "axios";

const DELETE_HEADERS = {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json"
  }
};

export class StudentsApiService {
  async getStudents(): Promise<StudentQueryViewModel[]> {
    const url = "/api/Students/All";
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  async getStudentById(studentId: number): Promise<StudentQueryViewModel> {
    const url = "/api/Students/GetStudentById/" + studentId;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  addOrUpdateStudent(student: any): any {
    const url = "/api/Students/AddOrUpdateStudent";
    return AxiosInstance.post(url, student).then(r => r.status);
  }

  async deleteStudent(studentId: number): Promise<number> {
    const url = "/api/Students/Delete";
    let header: RequestInit = {
      ...DELETE_HEADERS,
      body: JSON.stringify(studentId)
    };
    const response = await fetch(url, header);
    return response.status;
  }
}

export default new StudentsApiService();

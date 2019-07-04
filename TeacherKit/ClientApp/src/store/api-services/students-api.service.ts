import { StudentQueryViewModel } from "../../view-models/student";
import AxiosInstance from "axios";
import { O_DSYNC } from "constants";

const DELETE_HEADERS = {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json"
  }
};

export class StudentsApiService {
  async getStudents(userId: number): Promise<StudentQueryViewModel[]> {
    const url = "/api/Students/All/" + userId;
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

  async getStudentsByClassId(
    classId: number
  ): Promise<StudentQueryViewModel[]> {
    const url = "/api/Students/getStudentsByClassId/" + classId;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  async updateStudent(student: any): Promise<number> {
    const url = "/api/Students/UpdateStudent";
    let header: RequestInit = {
      ...DELETE_HEADERS,
      body: JSON.stringify(student)
    };
    const response = await fetch(url, header);
    return response.status;
    // return AxiosInstance.post(url, student).then(r => r.status);
  }

  addStudent(student: any): any {
    const url = "/api/Students/AddStudent";
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

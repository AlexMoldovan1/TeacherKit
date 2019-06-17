import { StudentQueryViewModel } from "../view-models/student";

export const students: StudentQueryViewModel[] = [
  {
    id: 1,
    firstName: "Miriam",
    lastName: "Petrean",
    code: 1010,
    age: 22,
    phone: "0747367543",
    email: "miriam@gmail.com",
    studentsMedia: [],
    studentsMediaFiles: [],
    notes: [],
    iconName: "",
    adress: "",
    gender: "F",
    star: true,
    parentInfo: {
      id: 1,
      firstName: "Silviu",
      lastName: "Petrean",
      phone: "0755676432",
      email: "parent@gmail.com",
      adress: "Borhanci"
    }
  },
  {
    id: 2,
    firstName: "Bea",
    lastName: "Petrean",
    code: 1011,
    age: 20,
    phone: "0747367542",
    email: "bea@gmail.com",
    studentsMedia: [],
    studentsMediaFiles: [],
    notes: [],
    iconName: "",
    adress: "",
    star: false,
    gender: "F",
    parentInfo: {
      id: 1,
      firstName: "Silviu",
      lastName: "Petrean",
      phone: "0755676432",
      email: "parent@gmail.com",
      adress: "Borhanci"
    }
  },
  {
    id: 3,
    firstName: "Ruth",
    lastName: "Petrean",
    code: 1012,
    age: 18,
    star: false,
    gender: "F",
    phone: "0747367543",
    email: "ruth@gmail.com",
    studentsMedia: [],
    studentsMediaFiles: [],
    notes: [],
    iconName: "",
    adress: "",
    parentInfo: {
      id: 1,
      firstName: "Silviu",
      lastName: "Petrean",
      phone: "0755676432",
      email: "parent@gmail.com",
      adress: "Borhanci"
    }
  }
];

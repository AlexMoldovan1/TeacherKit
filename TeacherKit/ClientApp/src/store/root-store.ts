import ViewStoreIntance, { ViewStore } from "./view-store";
import StudentsStoreInstance, { StudentsStore } from "./students-store";
import UserStoreInstance, { UserStore } from "./user-store";
import FilteredListStoreInstance, { FilteredListStore } from "./filtered-store";
import ClassesStoreInstance, { ClassesStore } from "./class-store";

export class RootStore {
  studentsStore: StudentsStore;
  viewStore: ViewStore;
  userStore: UserStore;
  filteredStore: FilteredListStore;
  classesStore: ClassesStore;
  constructor() {
    this.studentsStore = StudentsStoreInstance;
    this.viewStore = ViewStoreIntance;
    this.userStore = UserStoreInstance;
    this.filteredStore = FilteredListStoreInstance;
    this.classesStore = ClassesStoreInstance;
  }
}

export default new RootStore();

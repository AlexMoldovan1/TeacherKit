import { observable, action, computed } from "mobx";
import { HeaderTabs } from "../view-models/header-tabs";
import { StudentsTabs } from "../view-models/students-tabs";
import { ClassesTabs } from "../view-models/classes-tabs";

export class ViewStore {
  @observable headerActivatedTab: HeaderTabs = HeaderTabs.home;
  @observable studentsActivatedTab: StudentsTabs;
  @observable classesActivatedTab: ClassesTabs;

  @computed get activeHeaderTab() {
    return this.headerActivatedTab;
  }

  @computed get activeStudentsTab() {
    return this.studentsActivatedTab;
  }

  @computed get activeClassesTab() {
    return this.classesActivatedTab;
  }

  @action.bound
  changeActiveHeaderTab(tab: HeaderTabs) {
    this.headerActivatedTab = tab;
  }

  @action.bound
  changeActiveStudentsTab(tab: StudentsTabs) {
    this.studentsActivatedTab = tab;
  }

  @action.bound
  changeActiveClassesTab(tab: ClassesTabs) {
    this.classesActivatedTab = tab;
  }
}

export default new ViewStore();

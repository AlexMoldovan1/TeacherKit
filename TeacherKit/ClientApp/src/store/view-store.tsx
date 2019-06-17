import { observable, action, computed } from "mobx";
import { HeaderTabs } from "../view-models/header-tabs";
import { StudentsTabs } from "../view-models/students-tabs";
// import { ShoppingListTabs } from "../view-models/shopping-list-tabs";

export class ViewStore {
  @observable headerActivatedTab: HeaderTabs = HeaderTabs.home;
  @observable studentsActivatedTab: StudentsTabs;
  // @observable shoppingListActivatedTab: ShoppingListTabs;

  @computed get activeHeaderTab() {
    return this.headerActivatedTab;
  }

  @computed get activeStudentsTab() {
    return this.studentsActivatedTab;
  }

  // @computed get activeShoppingListTab() {
  //   return this.shoppingListActivatedTab;
  // }

  @action.bound
  changeActiveHeaderTab(tab: HeaderTabs) {
    this.headerActivatedTab = tab;
  }

  @action.bound
  changeActiveStudentsTab(tab: StudentsTabs) {
    this.studentsActivatedTab = tab;
  }

  // @action.bound
  // changeActiveShoppingListTab(tab: ShoppingListTabs) {
  //   this.shoppingListActivatedTab = tab;
  // }
}

export default new ViewStore();

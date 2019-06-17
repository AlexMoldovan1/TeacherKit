import { computed, observable } from "mobx";
import { FilteredType } from "./filteredType";
import { StudentsMediaViewModel } from "./media";

export class FilteredViewModel {
  @observable
  public id: number;
  @observable
  public firstName: string;
  @observable
  public lastName: string;
  @observable
  public star: boolean;
  @observable
  public filteredListMedia: StudentsMediaViewModel;
  @observable
  public type: FilteredType;
  constructor(filteredModel: FilteredViewModel) {
    this.id = filteredModel.id;
    this.firstName = filteredModel.firstName;
    this.lastName = filteredModel.lastName;
    this.star = filteredModel.star;
    this.filteredListMedia = filteredModel.filteredListMedia;
    this.type = filteredModel.type;
  }

  @computed
  get iconName() {
    return this.filteredListMedia
      ? "/Images/" + this.filteredListMedia.imageName
      : undefined;
  }
}

import { observable, computed, action } from "mobx";
import { FilteredViewModel } from "../view-models/filteredModel";
import FilteredListApiInstance, {
  FilteredListApiService
} from "./api-services/filtered-list-api.service";

export class FilteredListStore {
  private filteredListApi: FilteredListApiService;
  @observable
  filteredListModels: FilteredViewModel[] = [];
  @observable
  dataWasReceived: boolean = true;
  constructor(filteredListApi: FilteredListApiService) {
    this.filteredListApi = filteredListApi;
  }

  @action
  loadFilteredList(keyword: string) {
    if (this.dataWasReceived) {
      this.dataWasReceived = false;
      this.filteredListApi.getFilteredList(keyword).then(data => {
        this.dataWasReceived = true;
        this.filteredListModels = data.map(
          filteredList => new FilteredViewModel(filteredList)
        );
      });
    }
  }
}

export default new FilteredListStore(FilteredListApiInstance);

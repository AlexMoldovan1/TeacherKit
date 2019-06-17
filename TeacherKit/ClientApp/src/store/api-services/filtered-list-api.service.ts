import { FilteredViewModel } from "../../view-models/filteredModel";

export class FilteredListApiService {
  getFilteredList(keyword: string): Promise<FilteredViewModel[]> {
    return fetch("/api/FilteredList/GetAllByKeyword/" + keyword)
      .then(response => {
        return response.json();
      })
      .catch(err => {
        alert("ERROR");
        return null;
      });
  }
}

export default new FilteredListApiService();

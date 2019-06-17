import { observable, action } from "mobx";
import UserApiInstance, {
  UserApiService
} from "./api-services/user-api.service";
import { UserCommandViewModel, UserViewModel } from "../view-models/user";

export class UserStore {
  private userApi: UserApiService;
  @observable
  user: UserViewModel;
  @observable
  logged: boolean;
  @observable
  statusCode: number;

  constructor(userApi: UserApiService) {
    this.userApi = userApi;
  }

  @action.bound
  public addUser(user: any) {
    this.userApi.addUser(user);
  }

  @action
  public logIn(user: any, loadedUserCallback: Function) {
    this.userApi.logIn(user).then(data => {
      this.user = data;
      loadedUserCallback(data);
    });
  }

  @action
  public logOut(user: any) {
    this.userApi.logOut(user);
  }

  @action
  public loadUserFromLocalStorage() {
    const userAsString = localStorage.getItem("user");
    if (userAsString != null) {
      this.user = JSON.parse(userAsString);
    }
  }

  @action.bound
  public updateUser(user: UserCommandViewModel, callback?: () => void) {
    this.userApi
      .update(user)
      .then(data => (this.statusCode = data))
      .then(() => {
        if (callback) {
          callback();
        }
      });
  }
}

export default new UserStore(UserApiInstance);

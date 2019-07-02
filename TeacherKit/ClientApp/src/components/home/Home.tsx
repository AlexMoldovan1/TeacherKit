import * as React from "react";
import { inject, observer } from "mobx-react";
import { ViewStore } from "../../store/view-store";
import { UserStore } from "../../store/user-store";
import Bg from "../../loginBackground.jpg";

interface Props {
  userStore: UserStore;
  viewStore: ViewStore;
}

@inject("viewStore")
@inject("userStore")
@observer
export class Home extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return <div />;
  }
}

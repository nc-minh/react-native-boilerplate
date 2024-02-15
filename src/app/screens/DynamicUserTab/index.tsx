import React from "react";

import User from "../User";
import Setting from "../Setting";
import {useShallow} from "zustand/react/shallow";
import {useAuthenStore} from "@/store/useAuthenStore";

function DynamicUserTab(): React.JSX.Element {
  const {accessToken} = useAuthenStore(
    useShallow(state => ({
      accessToken: state.accessToken,
    })),
  );

  if (accessToken) {
    return <User />;
  }
  return <Setting />;
}

export default DynamicUserTab;

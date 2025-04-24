import { createStore, Provider } from "jotai";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const atomStore = createStore();

  return <Provider store={atomStore}>{children}</Provider>;
};

export default Providers;

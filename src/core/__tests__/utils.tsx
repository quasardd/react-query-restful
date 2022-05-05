import React from "react";
import { getSimpleJwtAuth, RestClientProvider } from "../..";

export const wrapper = ({ children }: any) => (
  <RestClientProvider
    baseUrl="any"
    {...getSimpleJwtAuth({ key: "user", path: "data.user.accessToken" })}
  >
    {children}
  </RestClientProvider>
);

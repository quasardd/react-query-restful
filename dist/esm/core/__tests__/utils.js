import React from "react";
import { getSimpleJwtAuth, RestClientProvider } from "../..";
export const wrapper = ({ children }) => (React.createElement(RestClientProvider, Object.assign({ baseUrl: "any" }, getSimpleJwtAuth({ key: "user", path: "data.user.accessToken" })), children));
//# sourceMappingURL=utils.js.map
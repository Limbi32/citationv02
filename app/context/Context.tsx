import { createContext } from "react";

export const context = createContext({
  user: {
    id: "",
    email: "",
    password: "",
    exp: "",
  },
});

import { GreetResponse } from "../../common/type";


export const getGreeting = (): GreetResponse => {
  return {
    message: "Hello I am updated!",
  };
};

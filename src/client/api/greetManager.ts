import { GASClient } from "gas-client";

import * as server from "../../server/main";
import { GreetResponse } from "../../common/type";

const { serverFunctions } = new GASClient<typeof server>();

const getGreeting = async (): Promise<GreetResponse> => {
  const response = await serverFunctions.getGreeting();
  return response;
};

export { getGreeting };

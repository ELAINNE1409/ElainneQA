import { AxiosResponse } from "axios";
import { AEndpoint } from "./abstracts/AEndpoint";

export default class Members extends AEndpoint {
  constructor() {
    super("./modules/forum/infra/http/routes/member", "member");
  }

  // Method to get member by name
  public async getMemberByName(username: string): Promise<AxiosResponse> {
    console.log("Calling getMemberByName method"); 
    console.log("Username:", username); 
    return this.restClient.sendGet({
      route: "/" + username,

  }
  );
  }
}


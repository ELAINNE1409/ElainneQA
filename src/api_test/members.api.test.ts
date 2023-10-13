import { Logger } from "tslog";
import MemberConstants from "./config/memberConstants";
import ConfigHandler from "./config/configHandler";
import Users from "./endpoints/Users";
import Members from "./endpoints/Members";

const config = ConfigHandler.getInstance();
const log = new Logger({
    minLevel: config.environmnetConfig.log_level,
    dateTimeTimezone:
        config.environmnetConfig.time_zone ||
        Intl.DateTimeFormat().resolvedOptions().timeZone,
});

let members: Members;

describe("Members endpoint", (): void => {
    beforeAll(async (): Promise<void> => {
        members = new Members();

        log.debug("1. Members Base url: " + members.getBaseUrl())
        });

    it("Members Endpoint - Create a User with valid data", async (): Promise<void> => {
        const users = new Users();
        const response = await users.post(
            MemberConstants.USERNAME, 
            MemberConstants.EMAIL, 
            MemberConstants.PASSWORD
            );
        expect(response.status).toBe(200);
      });

    it("Get member by name", async (): Promise<void> => {
        members = new Members();
        const response = await members.getMemberByName(MemberConstants.USERNAME);
        expect(response.status).toBe(200);

    });
    
});


/*
describe("Get current member", (): void => {
    beforeAll(async (): Promise<void> => {
        members = new Member();
        const responseCurrentMember = await members.getCurrentMember(accessToken);
    });
    
    it("Get current member", async (): Promise<void> => {
        const response = await members.getCurrentMember(accessToken);
        expect(response.status).toBe(200);
    });

    
});
*/

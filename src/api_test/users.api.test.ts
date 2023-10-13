/**
 *
 * @remarks
 * This code is based on the project {@link https://github.com/jmfiola/jest-api-test-typescript-example}.
*/
import { Logger } from "tslog";
import ConfigHandler from "./config/configHandler";
import Users from "./endpoints/Users";
import UsersConstants from "./config/userconstants";

const config = ConfigHandler.getInstance();
const log = new Logger({
  minLevel: config.environmnetConfig.log_level,
  dateTimeTimezone:
    config.environmnetConfig.time_zone ||
    Intl.DateTimeFormat().resolvedOptions().timeZone,
});

let users: Users;
let accessToken: string;
let refreshToken: string;

describe("Users Endpoint", (): void => {
  beforeAll(async (): Promise<void> => {
    users = new Users();
  
    log.debug("1. Users Base url: " + users.getBaseUrl());
  });

  it("Users Endpoint - Create an user with valid data", async (): Promise<void> => {
    const response1 = await users.post(UsersConstants.VALIDUSERNAME, UsersConstants.VALIDEMAIL, UsersConstants.VALIDPASSWORD);
    expect(response1.status).toBe(200);
  });


  it("Users Endpoint - Create an user with a repeated username but a valid e-mail", async (): Promise<void> => {
    const response = await users.post(UsersConstants.VALIDUSERNAME, UsersConstants.VALIDEMAIL2, UsersConstants.VALIDPASSWORD);
    expect(response.status).toBe(409);
  });

  it("Users Endpoint - Create an User with a valid username but a repeated email", async (): Promise<void> => { //
    const response = await users.post(UsersConstants.VALIDUSERNAME2, UsersConstants.VALIDEMAIL, UsersConstants.VALIDPASSWORD);
    expect(response.status).toBe(409);
  });

  it("Users Endpoint - Create an user with valid username and email but an invalid password", async (): Promise<void> => {
    const response = await users.post(UsersConstants.VALIDUSERNAME2, UsersConstants.VALIDEMAIL2, UsersConstants.INVALIDPASSWORD);
    expect(response.status).toBe(500);
  });

  it("Users Endpoint - Create an user with an invalid username and a valid email e password", async (): Promise<void> => {
    const response = await users.post(UsersConstants.INVALIDUSERNAME, UsersConstants.VALIDEMAIL2, UsersConstants.VALIDPASSWORD);
    expect(response.status).toBe(500);
  });

  it("Users Endpoint - Create an user with an invalid email and a valid username e password", async (): Promise<void> => {
    const response = await users.post(UsersConstants.VALIDUSERNAME2, UsersConstants.INVALIDEMAIL, UsersConstants.VALIDPASSWORD);
    expect(response.status).toBe(500);
  });

  it("Users Endpoint - Create an user with an empty username but a valid email and password", async (): Promise<void> => {
    const response = await users.post(UsersConstants.EMPTYUSERNAME, UsersConstants.VALIDEMAIL2, UsersConstants.VALIDPASSWORD);
    expect(response.status).toBe(500);
  });

  it("Users Endpoint - Create an user with an empty email but a valid username and password", async (): Promise<void> => {
    const response = await users.post(UsersConstants.VALIDUSERNAME2, UsersConstants.EMPTYEMAIL, UsersConstants.VALIDPASSWORD);
    expect(response.status).toBe(500);
  });

  it("Users Endpoint - Create an user with an empty password but a valid username and email", async (): Promise<void> => {
    const response = await users.post(UsersConstants.VALIDUSERNAME2, UsersConstants.VALIDEMAIL2, UsersConstants.EMPTYPASSWORD);
    expect(response.status).toBe(500);
  });

  it("Users Endpoint - Create an user with an empty username, email and password", async (): Promise<void> => {
    const response = await users.post(UsersConstants.EMPTYUSERNAME, UsersConstants.EMPTYEMAIL, UsersConstants.EMPTYPASSWORD);
    expect(response.status).toBe(500);
  });

  it("Users Endpoint - Login with valid data", async (): Promise<void> => {
    
    const response = await users.postLogin(UsersConstants.VALIDUSERNAME, UsersConstants.VALIDPASSWORD);
    expect(response.status).toBe(200);


    expect(response.data.accessToken).toBeDefined();
    expect(response.data.refreshToken).toBeDefined();

    accessToken = response.data.accessToken;
    refreshToken = response.data.refreshToken;
  });

  it("Users Endpoint - Invalid password with less than 6 characters", async (): Promise<void> => {
    const response = await users.postLogin(UsersConstants.VALIDUSERNAME, UsersConstants.INVALIDPASSWORD);
    expect(response.status).toBe(500);

    log.debug("Response: " + response);
    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
  });

  it("Users Endpoint - Invalid password with more than 6 characters", async (): Promise<void> => {
    const response = await users.postLogin(UsersConstants.VALIDUSERNAME, UsersConstants.INVALIDPASSWORD2);
    expect(response.status).toBe(400);


    log.debug("Response: " + response);
    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("Password doesnt match error.");
  });

  it("Users Endpoint - Invalid username", async (): Promise<void> => {
    const response = await users.postLogin(UsersConstants.INVALIDUSERNAME, UsersConstants.VALIDPASSWORD);
    expect(response.status).toBe(500);


    log.debug("Response: " + response);
    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
  });


  it("Users Endpoint - Empty username", async (): Promise<void> => {
    const response = await users.postLogin(UsersConstants.EMPTYUSERNAME, UsersConstants.VALIDPASSWORD);
    expect(response.status).toBe(500);


    log.debug("Response: " + response);
    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
  });

  it("Users Endpoint - Empty password", async (): Promise<void> => {
    const response = await users.postLogin(UsersConstants.VALIDUSERNAME2, UsersConstants.EMPTYPASSWORD);
    expect(response.status).toBe(500);


    log.debug("Response: " + response);
    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
  });


  it("Users Endpoint - Empty username and password ", async (): Promise<void> => {
    const response = await users.postLogin(UsersConstants.EMPTYUSERNAME, UsersConstants.EMPTYPASSWORD);
    expect(response.status).toBe(500);


    log.debug("Response: " + response);
    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("TypeError: Cannot read property 'toString' of undefined");
  });

  it("Post Refresh Token - Valid token", async (): Promise<void> => {
    log.debug("refreshToken: " + refreshToken)
    const response = await users.postTokenRefresh(refreshToken);
    expect(response.status).toBe(200);

    expect(response.data.refreshToken).toBeDefined();
    expect(response.data.accessToken).toBeDefined();

    refreshToken = response.data.refreshToken;
    accessToken = response.data.accessToken;
  });


  it("Post Refresh Token - Invalid token", async (): Promise<void> => {
    log.debug("refreshToken: " + refreshToken)
    const response = await users.postTokenRefresh("invalidToken");
    expect(response.status).toBe(404);

    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("Refresh token doesn't exist");

  });

  it("Post Refresh Token - Without a token", async (): Promise<void> => {
    log.debug("refreshToken: " + refreshToken)
    const response = await users.postTokenRefresh("");
    expect(response.status).toBe(404);

    expect(response.data.message).toBeDefined();
  });

  it("Get Me - Valid token", async (): Promise<void> => {
    log.debug("Authorization: " + accessToken);
    //console.log("Access token: " + accessToken);

    const response = await users.getMe(accessToken);
    expect(response.status).toBe(200);

  });

  it("Get Me - Empty token", async (): Promise<void> => {
    log.debug("Access token: " + accessToken);

    const response = await users.getMe("");
    expect(response.status).toBe(403);

    
    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("No access token provided");
  });

  it("Get Me - Invalid token", async (): Promise<void> => {
    log.debug("Access token: " + accessToken);

    const response = await users.getMe("invalid token");
    expect(response.status).toBe(403);


    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("Token signature expired.");
  });

  it ("Get - Valid data", async (): Promise<void> => {
    const response = await users.getUserByUserName(UsersConstants.VALIDUSERNAME4, accessToken);
    expect(response.status).toBe(200);

  });

  it ("Get - Empty access token", async (): Promise<void> => {
    const response = await users.getUserByUserName(UsersConstants.VALIDUSERNAME4, "");
    expect(response.status).toBe(403);


    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("No access token provided");
  });

  it ("Get - Invalid access token", async (): Promise<void> => {
    const response = await users.getUserByUserName(UsersConstants.VALIDUSERNAME4, "invalid token");
    expect(response.status).toBe(403);


    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("Token signature expired.");
  });

  it ("Get - Invalid username", async (): Promise<void> => {
    const response = await users.getUserByUserName(UsersConstants.INVALIDUSERNAME, accessToken);
    expect(response.status).toBe(500);


    expect(response.data.message).toBeDefined();
    expect(response.data.message).toContain("Internal Server Error");
   });
});

//Logout
describe("Users endpoint", (): void => {
  beforeAll(async (): Promise<void> => {
      users = new Users(); // Initialize the users variable

      await users.post("Lane14", "elainnecristina.14@gmail.com", "Antony03*");
      const response = await users.postLogin("Lane14", "Antony03*");
      expect(response.data.accessToken).toBeDefined();
      expect(response.data.refreshToken).toBeDefined();
      accessToken = response.data.accessToken;
      refreshToken = response.data.refreshToken;

      log.debug("1. Users Base url: " + users.getBaseUrl());
  });

  it("Logout of the forum, correct access token", async (): Promise<void> => {
      const response = await users.postLogout(accessToken);
      expect(response.status).toBe(200);

  });
});


describe("Users endpoint", (): void => {
  beforeAll(async (): Promise<void> => {
      users = new Users(); // Initialize the users variable

      await users.post("Lane14", "elainnecristina.14@gmail.com", "Antony03*");
      const response = await users.postLogin("Lane14", "Antony03*");
      expect(response.data.accessToken).toBeDefined();
      expect(response.data.refreshToken).toBeDefined();
      accessToken = response.data.accessToken;
      refreshToken = response.data.refreshToken;

      log.debug("1. Users Base url: " + users.getBaseUrl());
  });

  it("Logout of the forum, with invalid access token", async (): Promise<void> => {
      const response = await users.postLogout("123");
      expect(response.status).toBe(403);
      expect(response.data.message).toBeDefined();
  });
});


describe("Users endpoint", (): void => {
  beforeAll(async (): Promise<void> => {
      users = new Users(); // Initialize the users variable

      await users.post("Lane14", "elainnecristina.14@gmail.com", "Antony03*");
      const response = await users.postLogin("Lane14", "Antony03*");
      expect(response.data.accessToken).toBeDefined();
      expect(response.data.refreshToken).toBeDefined();
      accessToken = response.data.accessToken;
      refreshToken = response.data.refreshToken;

      log.debug("1. Users Base url: " + users.getBaseUrl());
  });

  it("Logout of the forum, without access token", async (): Promise<void> => {
      const response = await users.postLogout("");
      expect(response.status).toBe(403);
      expect(response.data.message).toBeDefined();
  });
});






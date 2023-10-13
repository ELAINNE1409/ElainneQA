//Delete User - Base url: http://localhost:5001/api/v1/users/:userId

import { DeleteUserUseCase } from "../modules/users/useCases/deleteUser/DeleteUserUseCase";
import { DeleteUserDTO } from "../modules/users/useCases/deleteUser/DeleteUserDTO";
import { User } from "../modules/users/domain/user";
import { UserDeleted } from "../modules/users/domain/events/userDeleted";
import { DeleteUserErrors } from "../modules/users/useCases/deleteUser/DeleteUserErrors";
import { DeleteUserController } from "../modules/users/useCases/deleteUser/DeleteUserController";
import { Logger } from "tslog";
import ConfigHandler from "./config/configHandler";
import Users from "./endpoints/Users";
import { SequelizeUserRepo } from "../modules/users/repos/implementations/sequelizeUserRepo";
import models from "../shared/infra/database/sequelize/models";
import express from "express";
import { Sequelize } from "sequelize";
import { DataTypes, Model } from "sequelize";
import deleteConstants from "./config/constants";
import { UserName } from "../modules/users/domain/userName";
class BaseUser extends Model {
        public base_user_id!: string;
        public user_email!: string;
        public is_email_verified!: string;
        public username!: string;
        public user_password!: string;
        public is_admin_user!: string;
        public is_deleted!: string;
        public created_at!: Date;
        public updated_at!: Date;
}

const BaseUserModelAttributes = {
        base_user_id: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
        },
        user_email: {
                type: DataTypes.STRING,
                allowNull: false,
        },
        is_email_verified: {
                type: DataTypes.STRING,
                allowNull: false,
        },
        username: {
                type: DataTypes.STRING,
                allowNull: false,
        },
        user_password: {
                type: DataTypes.STRING,
                allowNull: false,
        },
        is_admin_user: {
                type: DataTypes.STRING,
                allowNull: false,
        },
        is_deleted: {
                type: DataTypes.STRING,
                allowNull: false,
        },
        created_at: {
                type: DataTypes.DATE,
                allowNull: false,
        },
        updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
        },
};


const sequelize = new Sequelize("data_dev", "tonysoprano", "12345678", {
        host: "localhost",
        dialect: "mysql",
});

const BaseUserModelOptions = {
        sequelize,
        modelName: "BaseUser",
        tableName: "base_user",
        timestamps: false,
};

BaseUser.init(BaseUserModelAttributes, BaseUserModelOptions);

export { BaseUser };


const deleteUserUseCase = new DeleteUserUseCase(new SequelizeUserRepo(models));
const deleteUserController = new DeleteUserController(deleteUserUseCase);

const config = ConfigHandler.getInstance();
const log = new Logger({
        minLevel: config.environmnetConfig.log_level,
        dateTimeTimezone:
                config.environmnetConfig.time_zone ||
                Intl.DateTimeFormat().resolvedOptions().timeZone,
});


const app = express();
app.use(express.json());

app.delete("/api/v1/users/:userId", (req, res) => { 
        deleteUserController.execute(req, res);
});

let users: Users;
let userRepo: SequelizeUserRepo;
let accessToken: string;
let userId: string;

describe("Flow for the delete endpoint", () => {
       
         beforeAll(async () => {

                users = new Users();
                userRepo = new SequelizeUserRepo(sequelize.models);

                log.debug("1. Posts Base url: " + users.getBaseUrl());

                // Create user
                await users.post(deleteConstants.USERNAME, deleteConstants.EMAIL, deleteConstants.PASSWORD);
                
                // Login
                const response = await users.postLogin(deleteConstants.USERNAME, deleteConstants.PASSWORD);

                // Get and save the access token
                accessToken = response.data.accessToken;

                // Get and save the user id
                
                log.debug("Access Token: " + accessToken);

        });  
       
        describe("Delete User", () => {
                
                it("Delete - User (everything Ok)", async (): Promise<void> => {
                
                         const response = await users.deleteUser(accessToken, userId);
                        expect(response.status).toBe(200);
                });   
                
                it("Delete - User (User not found)", async (): Promise<void> => {
                
                        const response = await users.deleteUser(accessToken, userId);
                        expect(response.status).toBe(404);
                });

                it
        });
});
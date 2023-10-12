import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  //Making a constructor and setting client properties
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  // creating new Account
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.client.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //calling login method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  // login method
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  // Checking logged in user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service ::getCurrentUser :: error ", error);
    }
    return null;
  }

  // Ending all sessions
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service ::logout :: error ", error);
    }
  }
}

//Making Object from AuthService Class and then exporting this object
const authService = new AuthService();
export default authService;

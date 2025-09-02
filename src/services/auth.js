import config from "../config/config";
import {Client, Account,ID} from "appwrite"


export class authservice{
   
 client = new Client();
 account;

 constructor(){
    this.client
    .setEndpoint(config.apiendpoints)
    .setProject(config.projectid)

    this.account = new Account(this.client)
 }

   async createAccount(data){
     try {
        console.log("Data in create account ::",data)
        const userAccount =  await this.account.create(ID.unique(),data.email,data.password)
         if(userAccount){
            return await this.loginService({email:data.email,password : data.password}) } 

        else{
                return userAccount
            }
     } catch (error) {
         console.log("Error in CreateAccount ::",error)
     }
   }

   async loginService({email,password}){
     try {
        return await this.account.createEmailPasswordSession(email,password)
     } catch (error) {
        console.log("error in login ::",error)
     }
   }
//    currently we are using log out from all devices which we will be changing in the future 
   async logout(){
    try {
        return await this.account.deleteSessions()
        
    } catch (error) {
        console.log("error in logout ::",error)
    }
   }

   async getUser(){
    try {
        return await this.account.get();
    } catch (error) {
        if(error.code===401){
            return null
        }
        console.log("error in getUser :: ",error);
        return null
    }

   }






}


const Authservice = new authservice()

export default Authservice
export class LoginInput {
  private username: string;
  private password: string;
  constructor(username: string, password: string){
    this.username = username;
    this.password = password;
  }
}
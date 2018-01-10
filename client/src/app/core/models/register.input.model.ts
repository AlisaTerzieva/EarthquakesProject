export class RegisterInput {
  private firstName: string;
  private lastName: string;
  private username: string;
  private password: string;
  private role: string;
  constructor(firstName: string, lastName: string, username: string, password: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.role = 'user';
  }
}
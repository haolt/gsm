export class User {

  public id: string;
  public name: string;
  public email: string;
  public password: string;
  public role: string;
  public avatar: string;
  public position: string;
  public division: string;

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    avatar: string,
    position: string,
    division: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.avatar = avatar;
    this.position = position;
    this.division = division;
  }
}

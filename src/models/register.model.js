// src/models/register.model.js
export class RegisterModel {
  constructor(username, email, password, roleId) {
    this.Username = username;
    this.Email = email;
    this.Password = password;
    this.RoleId = roleId;  // 2 = Customer, 3 = Employee, 1 = Admin
  }
}
class User {
    constructor(id, name, numbeId, phone, email, referidNumber = 0) {
      this.id = id;
      this.name = name;
      this.numbeId = numbeId;
      this.phone = phone;
      this.email = email;
      this.referidNumber = referidNumber;
    }
  }
  
  export default User;
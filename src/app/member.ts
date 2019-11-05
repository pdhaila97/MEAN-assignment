export class Member {
    name: string;
    email: string;
    address: string;
    phone: string;
    _id: string;
    constructor(name: string, email: string, address: string, phone: string){
        this.name = name;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this._id = null;
    }
}
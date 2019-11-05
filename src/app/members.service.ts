import { Injectable } from '@angular/core';
import { Member } from './member';
import {  HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  memberAdded = false;
  regPageDisplay = false;
  isGettingUpdated = false;
  inputVals = {email:"",name:"",address:"", phone:""}; 
  currentMember;
  currentKey;
  skips = 5;
  constructor(private http: HttpClient) { }
  add(member: Member){
    return this.http.post('/api/add-item', {member: JSON.stringify(member)}
    )
  }
  getAll(page):any{
    return this.http.get(`/api/get-all-items/?page=${page}&skips=${this.skips}`);  
  }

  populateInputs(key: string):void{
    this.http.get(`/api/get-item/${key}`).subscribe(
      (member: any) => {
        this.currentKey = member._id;
        this.inputVals.address = member.address;
        this.inputVals.email = member.email;
        this.inputVals.name = member.name;
        this.inputVals.phone = member.phone;
        this.isGettingUpdated = true;       
      }
    )
    // let member = JSON.parse(localStorage.getItem(key.toString()));
    
    
    // localStorage.setItem(key.toString(), JSON.stringify(member));
    // this.inputVals.idDisabled = true;
  }

  update(nameInput, emailInput, addressInput, phoneInput) {
    let member = {
      name : nameInput,
      email : emailInput,
      address : addressInput,
      phone : phoneInput
    }
    return this.http.put(`/api/update-item/${this.currentKey}`, {member: JSON.stringify(member)});
    
  }
  
  delete(id:number){
    return this.http.delete(`/api/delete-item/${id}`);
  }
  
  // polluteInputs(member: Member):Member{
  //   this.inputVals.email = member.email;
  //   this.inputVals.id = member.id;
  //   this.inputVals.name = member.name;
  //   let memberNew:Member = new Member(this.inputVals.email, this.inputVals.id, this.inputVals.name);
  //   return memberNew;
  // } 
}

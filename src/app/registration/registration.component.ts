import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MembersService } from '../members.service';
import { Member } from '../member';
import { RouterLink, Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  regInvalid = false;
  inputVals: { email: string; name: string; address: string, phone: string};
  constructor(private membersService: MembersService, private router: Router) { }
  @Output() addedMember = new EventEmitter<boolean>();
  ngOnInit() {
    this.inputVals = this.membersService.inputVals;
  }

  validateInputs(nameInput: string, emailInput: string, addressInput: string, phoneInput: string):boolean{
    if(nameInput && addressInput && emailInput && addressInput && phoneInput){
      // let id;
      // this.membersService.isGettingUpdated? id = this.inputVals.id: id = this.generateKey(); 
      let member: Member = new Member(nameInput, emailInput, addressInput, phoneInput);
      // console.log(`ID: ${id}`);
      if(this.membersService.isGettingUpdated){
        this.membersService.update(nameInput, emailInput, addressInput, phoneInput).subscribe(
          (res) => {
            console.log(res);
            this.membersService.isGettingUpdated = false;
            this.router.navigate(['/list']);
          }
        );
      }else{
        this.membersService.add(member).subscribe(
          (res) => {
            console.log(res);
            this.router.navigate(['/list']);
          }
        );;
      }
      this.membersService.inputVals.email = "";
      this.membersService.inputVals.address="";
      this.membersService.inputVals.name="";
      this.membersService.inputVals.phone="";
      this.regInvalid = false;
      this.addedMember.emit(true);
    }else{
      this.regInvalid = true;
    }
    return false;
  }

}

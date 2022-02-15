import { Component, OnInit } from '@angular/core';
import { OwnerEntity,CarEntity,ICarOwnersService } from '../shared/interfaces';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import { Owner } from './owner.model';
import { OwnersService } from '../shared/owners.service';



@Component({
  selector: 'app-owner-card',
  templateUrl: './owner-card.component.html',
  styleUrls: ['./owner-card.component.css']
})
export class OwnerCardComponent implements  OnInit {

  formValue!: FormGroup;
  ownerDetails: Owner = new Owner();

  constructor(private formbuilder:FormBuilder,
    private api: OwnersService ){

  }

  ngOnInit(): void {
    
    this.formValue =  this.formbuilder.group({
      "aLastName": [''],
      "aFirstName": [''],
      "aMiddleName": [''],
      "aCars": this.formbuilder.array([])
    })
    
  }

  postOwnerDetails(){
    this.ownerDetails.aLastName = this.formValue.value.aLastName;
    this.ownerDetails.aFirstName = this.formValue.value.aFirstName;
    this.ownerDetails.aMiddleName = this.formValue.value.aMiddleName;
    this.ownerDetails.aCars = this.formValue.value.aCars;

    this.api.createOwner(this.ownerDetails.aLastName, this.ownerDetails.aFirstName, this.ownerDetails.aMiddleName, this.ownerDetails.aCars).subscribe(
      res => console.log(res)
    )

  }

}


import { Component, OnInit } from '@angular/core';
import { OwnersService } from '../shared/owners.service';
import { OwnerEntity, CarEntity, ICarOwnersService } from '../shared/interfaces';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Owner } from './owner.model';
import { Car } from './car.model';

@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.css']
})
export class OwnerDashboardComponent implements OnInit {

  owners$: any;
  formValue!: FormGroup;
 
  ownerDetails: Owner = new Owner();
  selected: number = 2;
  selectedOwner: any;
  carForm: any;
  ownerCars: any;
  
  
  rowSelected(owner: any) {
    console.log(owner.id);
    this.selected = owner.id;
  }

  constructor(private formbuilder: FormBuilder,
    private api: OwnersService) {
  }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      aLastName: [''],
      aFirstName: [''],
      aMiddleName: [''],
      aCars: this.formbuilder.array([])
    })
    this.getAllOwners()
  }

  
  get aCars(){
    return this.formValue.get('aCars') as FormArray;
  }

  createCar(): FormGroup {
    return this.formbuilder.group({
      aCarName: [''],
      aCarBrand: [''],
      aCarModel: [''],
      aCarYear: ['']
    });
  }
  

  addCar(){
    this.carForm = this.formbuilder.group({
      aCarName: [''],
      aCarBrand: [''],
      aCarModel: [''],
      aCarYear: ['']
    });
    this.aCars.push(this.carForm);
  }
 



  postOwnerDetails() {
    this.ownerDetails.aLastName = this.formValue.value.aLastName;
    this.ownerDetails.aFirstName = this.formValue.value.aFirstName;
    this.ownerDetails.aMiddleName = this.formValue.value.aMiddleName;
    this.ownerDetails.aCars = this.formValue.value.aCars;

    this.api.createOwner(this.ownerDetails.aLastName, this.ownerDetails.aFirstName, this.ownerDetails.aMiddleName, this.ownerDetails.aCars)
      .subscribe(
        res => {
          console.log(res);
          this.getAllOwners();
          console.log(this.owners$);
          let ref = document.getElementById('cancel')
          ref?.click();
          this.formValue.reset();
        },
        err => {
          alert("Error")
        }
      )
  }

  getAllOwners() {
    this.api.getOwners()
      .subscribe(
        res => {
          this.owners$ = res;
        }
      )
  }

  onEdit(selected: number) {
    this.api.getOwnerById(selected).subscribe(res => (
      this.formValue.controls['aLastName'].setValue(res.aLastName),
      this.formValue.controls['aFirstName'].setValue(res.aFirstName),
      this.formValue.controls['aMiddleName'].setValue(res.aMiddleName),
      this.formValue.controls['aCars'].setValue(res.aCars)
    )
    )
  }

  editOwnerDetails() {
    this.api.getOwnerById(this.selected).subscribe(res => (
      this.selectedOwner = res,
      this.selectedOwner.aLastName = this.formValue.value.aLastName,
      this.selectedOwner.aFirstName = this.formValue.value.aFirstName,
      this.selectedOwner.aMiddleName = this.formValue.value.aMiddleName,
      this.selectedOwner.aCars = this.formValue.value.aCars.get(),
      this.api.editOwner(this.selectedOwner)
        .subscribe(
          res => {
            console.log(this.ownerDetails);
            this.getAllOwners();
            console.log(this.owners$);
            let ref = document.getElementById('cancel')
            ref?.click();
            this.formValue.reset();
          }
        )
    ))

  }

  deleteOwner(selected: number) {
    this.api.deleteOwner(selected)
      .subscribe(
        res => {
          this.getAllOwners();
        }
      )
  }
}
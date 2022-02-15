import { Injectable } from '@angular/core';
import { OwnerEntity,CarEntity,ICarOwnersService } from '../shared/interfaces';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OwnersService {

    apiURL = 'api/owners/'
    constructor(private http: HttpClient) { }

    getOwners(): Observable<OwnerEntity[]>{
      return this.http.get<OwnerEntity[]>(this.apiURL)
      .pipe(
        map( (owners:any)=>{
          console.log(owners)
          return owners
        })

      )
    };

    getOwnerById(aId: number): Observable<OwnerEntity>{
      return this.http.get<OwnerEntity>(this.apiURL + aId)
      .pipe(
        map( (res:any)=>{
          console.log(res)
          return res;
        })
      )
    };

    


    createOwner(
    aLastName: string,
    aFirstName: string,
    aMiddleName: string,
    aCars: CarEntity[]
    ): Observable<OwnerEntity>{
      return this.http.post<OwnerEntity[]>(this.apiURL, {aLastName, aFirstName, aMiddleName, aCars})
      .pipe(
        map( (owners:any)=>{
          return owners
        })
      )
    };


    editOwner(aOwner: OwnerEntity): Observable<OwnerEntity>{
      return this.http.put<OwnerEntity>(this.apiURL , aOwner)
      .pipe(
        map( (res:any)=>{
          console.log(res);
          return res
        })
      )
    }
    
    deleteOwner(aOwnerId: number): Observable<OwnerEntity[]>{
      return this.http.delete<OwnerEntity>(this.apiURL + aOwnerId)
      .pipe(
        map( (res:any)=>{
          return res
        })
      )
    };
    

  
}



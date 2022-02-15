import { Observable } from "rxjs/internal/Observable";

export interface OwnerEntity{
    aLastName: string,
    aFirstName: string,
    aMiddleName: string,
    aCars: CarEntity[]
}

export interface CarEntity{
    aNumber: string,
    aBrand: string,
    aModel: string,
    aYear: number
}

export interface ICarOwnersService {
    getOwners(): Observable<OwnerEntity[]>;
    getOwnerById(aId: number): Observable<OwnerEntity>;
    createOwner(
    aLastName: string,
    aFirstName: string,
    aMiddleName: string,
    aCars: CarEntity[]
    ): Observable<OwnerEntity>;
    editOwner(aOwner: OwnerEntity): Observable<OwnerEntity>;
    deleteOwner(aOwnerId: number): Observable<OwnerEntity[]>;
}
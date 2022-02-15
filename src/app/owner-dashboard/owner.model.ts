import { Injectable, Input } from "@angular/core";
import { OwnerEntity, CarEntity } from "../shared/interfaces";
import { Car } from "./car.model";

@Injectable()
export class Owner {

        @Input() owner!: OwnerEntity
        aLastName: string = "";
        aFirstName: string = "";
        aMiddleName: string = "";
        aCars: Car[] = [];
}

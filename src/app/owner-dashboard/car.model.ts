import { Injectable, Input } from "@angular/core";
import { CarEntity } from "../shared/interfaces";

@Injectable()
export class Car{
    
    @Input() car!: CarEntity;
    aNumber: string = "";
    aBrand: string = "";
    aModel: string = "";
    aYear: number = 0;
}
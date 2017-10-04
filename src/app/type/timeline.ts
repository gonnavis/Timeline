
import {Period}from'./period';

export class Timeline{
    name:string;
    periods:Period[];
    rows?:Period[][];
    min?:number;
    max?:number;
    span?:number;
    act?:boolean;
}
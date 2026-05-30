import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";


@Injectable({
    providedIn: 'root'
})
export class SnackBarService{

    constructor(
        private _matSnacBar : MatSnackBar
    ){}

    openSnackBar(msg : string){
        this._matSnacBar.open(msg, 'Close',{
            data: msg,
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
        })
    }
}
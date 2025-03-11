import { Injectable, inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class MessagesService {

    #snackBar = inject(MatSnackBar);

    openSnackBar(message: string, action?: string) {
        this.#snackBar.open(message, action, {
            duration: 3000
        });
    }

}
import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageType } from './models/message-type.enum';


@Injectable({ providedIn: 'root' })
export class AppService {
    constructor(
        private snackBar: MatSnackBar
    ) { }

    openSnackBar(message: string, type?: MessageType, indefinite?: boolean) {
        if (indefinite) {
            this.snackBar.open(message, "OK", {
                panelClass: ['mat-toolbar', type || '']
            });
        } else {
            this.snackBar.open(message, null, {
                duration: 2500,
                panelClass: ['mat-toolbar', type || '']
            });
        }
    }
}

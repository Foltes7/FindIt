import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable()
export class DialogService {

  constructor(public dialog: MatDialog) { }

  openDialog<T>(component: ComponentType<T>, config: MatDialogConfig): void {
    const dialogRef = this.dialog.open(component, config);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    dialogRef.disableClose = true;
  }

}

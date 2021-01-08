import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../models/DialogData';

@Component({
  selector: 'app-profile-editing',
  templateUrl: './profile-editing.component.html',
  styleUrls: ['./profile-editing.component.scss']
})
export class ProfileEditingComponent implements OnInit {

  constructor(    
    public dialogRef: MatDialogRef<ProfileEditingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  ngOnInit(): void {
  }

  
  close(): void
  {
    this.dialogRef.close();
  }

}

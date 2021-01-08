import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnumUtil } from '../../enum-util';
import { DialogData } from '../../models/DialogData';

export enum SidebarProfileEditing{
  Profile = 'Profile',
  Security = 'Security'
}

@Component({
  selector: 'app-profile-editing',
  templateUrl: './profile-editing.component.html',
  styleUrls: ['./profile-editing.component.scss']
})
export class ProfileEditingComponent implements OnInit {

  menu = EnumUtil.getEnumValues(SidebarProfileEditing);
  active = EnumUtil.getEnumValueByKey(SidebarProfileEditing, SidebarProfileEditing.Profile);

  constructor(    
    public dialogRef: MatDialogRef<ProfileEditingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  ngOnInit(): void {

  }

  
  close(): void
  {
    this.dialogRef.close();
  }

  setActive(point: string){
    this.active = point;
  }
}

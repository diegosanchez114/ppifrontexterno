import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export interface ButtonData {
  color: string;
  text: string;
}

export interface NotificationsInfo {  
  title: string;
  message: string;
  confirm: string;
  cancel: string;
  buttons: ButtonData[];
}

export interface NotificationsData {
  type: string;
  data: NotificationsInfo;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {

  readonly dialogRef = inject(MatDialogRef<NotificationsComponent>);
  readonly data = inject<NotificationsData>(MAT_DIALOG_DATA);

  public confirmResponse(item:any){
    this.dialogRef.close(item.value);
  }
}

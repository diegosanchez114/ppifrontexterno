import { inject, Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { NotificationsComponent } from '../components/notifications/notifications.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  readonly dialog = inject(MatDialog);

  showError(message: string, disableClose: boolean = true): MatDialogRef<NotificationsComponent> {
    let data = {
      title: 'Error',
      message: message
    };
    return this.generateAlert('error', { data: data, disableClose: disableClose });
  }

  showInformation(message: string, disableClose: boolean = true): MatDialogRef<NotificationsComponent> {
    let data = {
      title: 'Información',
      message: message
    };
    return this.generateAlert('info', { data: data, disableClose: disableClose });
  }

  showConfirmation(title?: string, message?: string, disableClose: boolean = true): MatDialogRef<NotificationsComponent> {
    let data = {
      title: title ? title : 'Confirmación',
      message: message ? message : 'Esta seguro?',
      buttons: [{
        text: 'Cancelar',
        value: false,
        color: 'primary'
      }, {
        text: 'Confirmar',
        value: true,
        color: 'accent'
      }]
    };
    return this.generateAlert('confirm', { data: data, disableClose: disableClose });
  }

  showPreloader(theme?: string): MatDialogRef<NotificationsComponent> {
    let data = {
      theme: theme ? theme : 'primary'
    };
    return this.generateAlert('preloader', { data: data, disableClose: true });
  }

  generateAlert(type: string,
    { data, disableClose }: { data: any, disableClose: boolean }): MatDialogRef<NotificationsComponent> {
    let configDialog = {
      data: {
        type: type,
        data: data
      },
      disableClose: disableClose
    };
    return this.dialog.open(NotificationsComponent, configDialog);
  }

}

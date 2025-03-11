import { Component, inject } from '@angular/core';
import { IntegrationModule } from '../../modules/integration.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-observation',
  standalone: true,
  imports: [IntegrationModule],
  templateUrl: './observation.component.html',
  styleUrl: './observation.component.scss'
})
export class ObservationComponent {

  readonly dialogRef = inject(MatDialogRef<ObservationComponent>);
  readonly data = inject<string>(MAT_DIALOG_DATA);

  #formBuilder = inject(FormBuilder);

  formGroup!: FormGroup;

  ngOnInit(): void {
    this.formGroup = this.#formBuilder.group({
      observacion: [this.data, Validators.required]      
    });
  } 

  onSubmit() {    
    this.dialogRef.close(this.formGroup.value.observacion);
  }

}

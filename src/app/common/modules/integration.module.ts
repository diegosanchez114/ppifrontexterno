import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEsCo from '@angular/common/locales/es-CO';

// Registra la localización de Colombia
registerLocaleData(localeEsCo, 'es-Co');

//UI
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from 'ngx-flexible-layout';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    //UI
    MaterialModule,
    //Third party
    FlexLayoutModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-Co',
    }, {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' }
    }
  ]
})
export class IntegrationModule { }

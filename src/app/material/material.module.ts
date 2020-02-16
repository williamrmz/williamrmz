import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
 

import {
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
  } from '@angular/material';
  
const MaterialComponents = 
[   
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule
]

@NgModule({  
  imports: [
    MaterialComponents,
    FormsModule
  ],
  exports:[
    MaterialComponents
  ]
})


export class MaterialModule { }

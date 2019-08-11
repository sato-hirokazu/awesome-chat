import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonHeaderComponent } from './common-header/common-header.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    CommonHeaderComponent,
    ],
    imports: [
    IonicModule.forRoot(),
    CommonModule,
    ],
    exports: [
        CommonHeaderComponent,
    ]
})

export class ComponentsModule { }

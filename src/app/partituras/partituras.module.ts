import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroComponent } from './cadastro/cadastro.component';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DadosApiService } from '../services/dados-api.service';
import { HttpClientModule } from '@angular/common/http';
import { DragDropDirective, DragDropDirectiveModule } from '../directives/drag-drop.directive';
import { ProgressDialogComponent } from './progress-dialog/progress-dialog.component';



@NgModule({
  declarations: [CadastroComponent, ProgressDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    DragDropDirectiveModule,
  ],
  providers: [DadosApiService]
})
export class PartiturasModule { }

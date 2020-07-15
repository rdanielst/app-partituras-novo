import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DadosApiService } from 'src/app/services/dados-api.service';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProgressDialogComponent } from '../progress-dialog/progress-dialog.component';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  partiturasList = [];
  progress = 0;
  testeProgress = 0;

  form: FormGroup = this.fb.group({
    titulo: '',
    artista: '',
    genero: '',
    instrumento: '',
    usuario_id: '1'
  });

  uploadForm: FormGroup = this.fb.group({
    file: ['']
  });

  file: File;

  pdfSrc: string;
  pages = 1;
  pdf: any;

  constructor(private ds: DadosApiService, private fb: FormBuilder, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  listarPartituras() {
    this.ds.getPartituras().subscribe(resp => {
      console.log(resp);
      this.partiturasList = resp;
    }, error => console.log(error));
  }

  enviarCadastro() {
    console.log(this.form.value);
    this.ds.upload(this.form.value).subscribe(resp => {
      console.log(resp);
      this.listarPartituras();
    });
  }


  onFileDrop($event) {
    console.log($event);
    this.file = $event[0];
    // this.uploadFile();
    console.log(this.file);

    this.renderLocalFile(this.file);
  }

  onFileSelect(event) {
    // console.log(event);
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;
      console.log(this.file);
      // this.uploadFile();
      this.renderLocalFile(this.file);
    }
  }

  /**
   * Renderiza o PDF local
   */
  renderLocalFile(file: File) {
    // let $img: any = document.querySelector('#fileDropRef');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
        // console.log(e.target.result);
      };

      // reader.readAsArrayBuffer($img.files[0]);
      reader.readAsArrayBuffer(file);
    } else {
      // $img.files = [];
      this.pdfSrc = null;
    }
  }

  afterLoadComplete(pdf: PDFDocumentProxy) {
    this.pdf = pdf;
    // console.log(this.pdf);
    // this.loadOutline();
  }

  incrementPage(amount: number) {
    this.pages += amount;
  }


  uploadFile() {
    // console.log(this.file);

    if (this.file) {
      this.showDialogProgress();
      this.ds.upload(this.file, this.form.value).subscribe((event: HttpEvent<any>) => {

        switch (event.type){
          case HttpEventType.UploadProgress :
            // tslint:disable-next-line:no-string-literal
            this.progress = Math.round(event['loaded'] / event['total'] * 100);
            this.ds.sendProgress(this.progress);
            break;
          case HttpEventType.Response :
            console.log('Upload feito com sucesso', event.body);
            this.dialog.closeAll();
            break;
        }

      });
    }

  }


  showDialogProgress() {
    this.dialog.open(ProgressDialogComponent, {
      width: '250px',
      disableClose: true,
      data: { name: 'Cadastrando' }
    });
  }


  excluirArquivo() {
    this.file = null;
    this.pdfSrc = null;
  }


  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }


}

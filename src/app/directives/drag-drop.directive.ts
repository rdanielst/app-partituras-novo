import { Directive, HostListener, HostBinding, Output, EventEmitter, NgModule } from '@angular/core';

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {

  @HostBinding('class.fileover') fileOver: boolean;
  @Output() arquivoDrop = new EventEmitter<any>();

  constructor() { }

  @HostListener('dragover', ['$event']) onDragOver(evt) {
    console.log('Drag Over');
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    console.log('Drag Leave');
  }


  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    this.fileOver = false;
    const files = evt.dataTransfer.files;

    if (files.length > 0 ) {
      console.log('Arquivos', files.length);
      this.arquivoDrop.emit(files);
    }
  }

}

@NgModule({
  declarations: [DragDropDirective],
  exports: [DragDropDirective]
})

export class DragDropDirectiveModule {}

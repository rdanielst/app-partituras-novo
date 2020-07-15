import { Component, OnInit, OnDestroy } from '@angular/core';
import { DadosApiService } from 'src/app/services/dados-api.service';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-progress-dialog',
  templateUrl: './progress-dialog.component.html',
  styleUrls: ['./progress-dialog.component.css']
})
export class ProgressDialogComponent implements OnDestroy {

  progress = 0;
  sub: Subscription;

  constructor(private ds: DadosApiService) {

    this.sub = this.ds.getProgress().subscribe( p => {
      this.progress = p;
    });

  }

  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe(); }
  }

}

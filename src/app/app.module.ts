import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';
import { RoutingModule } from './routing/routing.module';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { BuscaComponent } from './home-content/busca/busca.component';
import { PartiturasModule } from './partituras/partituras.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    HeaderComponent,
    SidenavListComponent,
    BuscaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    RoutingModule,
    PartiturasModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

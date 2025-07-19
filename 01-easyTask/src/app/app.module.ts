import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { UserComponent } from './user/user.component';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { TasksModule } from './tasks/tasks.module';

@NgModule({
  declarations: [HeaderComponent, AppComponent, UserComponent],
  bootstrap: [AppComponent],
  imports: [BrowserModule, FormsModule, DatePipe, SharedModule, TasksModule],
})
export class AppModule {}

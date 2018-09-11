import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { ViewTodosComponent } from './components/view-todos/view-todos.component';

import { TodoService } from './shared/services/todo.service';

import { HttpClientModule } from '@angular/common/http';
import { UiModule } from './modules/ui/ui.module';
import { MaterialModule } from './modules/material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    TodoFormComponent,
    ViewTodosComponent
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    UiModule,
    MaterialModule
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }

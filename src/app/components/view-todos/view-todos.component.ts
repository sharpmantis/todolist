import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TodoService } from '../../shared/services/todo.service';
import { Subscription } from 'rxjs';
import { TodoInterface } from '../../shared/interfaces/todo-interface';

@Component({
  selector: 'app-view-todos',
  templateUrl: './view-todos.component.html',
  styleUrls: ['./view-todos.component.css']
})


export class ViewTodosComponent implements OnInit {
  //Abonnement a un todo qui viens de nulle part (pour l'instant)
  private todoSubsctiption: Subscription;

  //tableau des todos a afficher
  public todos: TodoInterface[];

  public todoForm: FormGroup

  constructor(private todoService: TodoService) {
    //a Ctrl+C Ctrl+V
    this.todos = [];

    this.todoSubsctiption = this.todoService.getTodo()
      .subscribe((todo) => {
        console.log('obserbable todo: ' + JSON.stringify(todo))
        this.todos.push(todo);
      });
  }
/**
 * Après la construction de  l'objet, on charge la liste 
 * des todos existants dans la base
 */
 

  public saveTodo(): void{
    const _todo: TodoInterface=this.todoForm.value;
    _todo.isChecked = false;
    this.todoService.sendTodo(_todo);

  }

  ngOnInit(){
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
      console.log('il y a ' + this.todos.length + ' todos a afficher dans ma liste');
    });
  }

}

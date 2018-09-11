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
        console.log('obserbable todo: ' + JSON.stringify(todo));
        //ajoute le todo a la liste des todos
        //s'il n'existe pas déja
        //attention, s'il existe, je dois le remplacer pas les nouvelles valeurs
        const index = this.todos.findIndex((obj) => obj.id == todo.id);
        if (index === -1 && todo.hasOwnProperty('id')) {
          this.todos.push(todo);
        } else {
          this.todos[index] = todo;
        }

      }

      );
  }
  /**
   * Après la construction de  l'objet, on charge la liste 
   * des todos existants dans la base
   */


  public saveTodo(): void {
    const _todo: TodoInterface = this.todoForm.value;
    _todo.isChecked = false;
    this.todoService.sendTodo(_todo);

  }

  ngOnInit() {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
      console.log('il y a ' + this.todos.length + ' todos a afficher dans ma liste');
    });
  }

  public delete(index: number): void {
    const _todo = this.todos[index]; //recupere le todo
    this.todos.splice(index, 1); //dépile l'element du tableau
    this.todoService.deleteTodo(_todo); // j'appelle mon service
  }

  public checkedStatus: boolean = false;

  public toggle(index: number): void {
    this.todos[index].isChecked = !this.todos[index].isChecked;
    this.checkedStatus = this._allChecked()
  }

  private _allChecked(): boolean {
    let allChecked: boolean = true;
    for (const todo of this.todos) {
      if (!todo.isChecked) {
        allChecked = false
      }
    }
    return allChecked;
  }


  public hasNoneChecked(): Boolean {
    let status: Boolean = true;
    for (const todo of this.todos) {
      if (todo.isChecked) {
        status = false;
      }
    }
    return status;
  }

  /**
   * determine l'etat d'un todo checked ou pas
   */

  public isChecked(todo: TodoInterface): Boolean {
    return (todo.isChecked);
  }

  public checkUncheckall() {
    this.checkedStatus = !this.checkedStatus;

    this._check()

  }

  /**
   * change l'etat de tous les todos
   */

  private _check(): void {
    for (let index = 0; index < this.todos.length; index++) {

      this.todos[index].isChecked = this.checkedStatus;

    }
  }

  public deleteMultipleTwo() {
    const _todos: TodoInterface[] = [];

    for (let todo of this.todos) {
      if (!todo.isChecked) {
        _todos.push(todo);
      } else {
        this.todoService.deleteTodo(todo)
      }
    }
    this.todos = _todos;
  }

  public update(todo: TodoInterface): void {
    console.log("Modif du todo " + todo.id);
    this.todoService.sendTodo(todo);
  }
}

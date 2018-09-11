import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DateValidators } from './../../shared/validators/date-validators';
import { TodoService } from './../../shared/services/todo.service';
import { Subscription } from 'rxjs';
import { TodoInterface } from '../../shared/interfaces/todo-interface';
//Import du bidule qui permet de traiter les dates comme il faut!
import * as moment from 'moment';

@Component({
  selector: 'todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})

export class TodoFormComponent implements OnInit {

  //Abonnement a un todo qui vient du tableau des todos
  //et qui passe par l'intermediaire du service
  private todoSubscription: Subscription;

  /**
   * todoForm: FormGroup Prise en charge du formulaire
   * par ReactiveForms
   */

  public todoForm: FormGroup;


  /**
   * rendre dispo "title" dans le controle du formulaire
   */
  public get title() {
    return this.todoForm.controls.title;
  }



  private todoToUpdate: TodoInterface;

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService) {
    this.todoToUpdate = {
      title: '',
      debut: new Date(),
      fin: new Date()
    };

    //abonnement au todo

    this.todoSubscription = this.todoService.getTodo()
      .subscribe((unTodo) => {
        console.log('je viens de recevoir un todo : ' + JSON.stringify(unTodo));
        this.todoToUpdate = unTodo;
        this._loadForm();
      });
  }

  /**
   * Methode definie dans l'interface OnInit
   * est appelée immédiatement après le constructeur
   * de la classe courante
   * 
   * COnstruction du formulaire todoForm
   */


  ngOnInit() {
    //definit le formulaire, ce qu'il contient
    //ainsi que ses regles de validation

    this.todoForm = this.formBuilder.group(
      {
        title: [
          this.todoToUpdate.title,//Valeur par défaut du formulaire
          [Validators.required, Validators.minLength(5)] //Regles de validation que je veux appliquer
        ],
        debut: [
          moment(this.todoToUpdate.debut).format('YYYY-MM-DD'),
          [Validators.required]
        ],
        fin: [
          moment(this.todoToUpdate.fin).format('YYYY-MM-DD'),
          [Validators.required]
        ]
      },
      { validator: Validators.compose([DateValidators.dateLessThan('debut', 'fin', { 'debut': true })]) }
    );

  }



  public saveTodo(): void {
    let _todo = this.todoForm.value;
    _todo.isChecked = false;

   if(this.todoToUpdate.hasOwnProperty('id')){
    _todo.id=this.todoToUpdate.id;
    this.todoService.updateTodo(_todo);
  }else{
    this.todoService.addTodos(_todo);
  };

    console.log('todoupdate: '+JSON.stringify(this.todoToUpdate))
  };

  private _loadForm(): void {
    this.ngOnInit();
  }



}

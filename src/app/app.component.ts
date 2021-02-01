import {Component, OnInit} from '@angular/core'
import { Todo, TodosService } from './todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  todos: Todo[] = []
  title: string = ''
  loading: boolean = false
  error:string = ''

  constructor(private todosService: TodosService){}

  ngOnInit() {
    this.fetchTodo()
  }

  addTodo() {
    if(!this.title) return
    
    this.todosService.addTodo({
      title: this.title,
      completed: false
    }).subscribe(
      todo => this.todos.push(todo),
      error => this.error = error.message
    )
  }

  fetchTodo() {
    this.loading = true
    this.todosService.fetchTodos().subscribe(todos => {
        this.todos = todos
        this.loading = false
      }, error => this.error = error.message
    )
  }

  removeTodo(id: number = 0) {
    this.todosService.removeTodo(id).subscribe(
      () => this.todos = this.todos.filter(todo => todo.id !== id),
      error => this.error = error.message
    )
  }

  completeTodo(id: number = 0) {
    this.todosService.completeTodo(id).subscribe(
      todo => this.todos.find(t => t.id === todo.id).completed = true,
      error => this.error = error.message
    )
  }
}

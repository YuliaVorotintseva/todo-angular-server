import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core'
import {delay} from 'rxjs/operators'

export interface Todo {
  title: string,
  completed: boolean,
  id?: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  todos: Todo[] = []
  title: string = ''
  loading: boolean = false

  constructor(private client: HttpClient){}

  ngOnInit() {
    this.fetchTodo()
  }

  addTodo() {
    if(!this.title) return

    const todo: Todo = {
      title: this.title,
      completed: false
    }
    
    this.client.post<Todo>('https://jsonplaceholder.typicode.com/todos', todo)
      .subscribe(todo => this.todos.push(todo))
  }

  fetchTodo() {
    this.loading = true
    this.client.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .pipe(delay(2000))
      .subscribe(todos => {
        this.todos = todos
        this.loading = false
      })
  }

  removeTodo(id: number = 0) {
    this.client.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .subscribe(() => this.todos = this.todos.filter(todo => todo.id !== id))
  }
}

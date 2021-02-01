import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import {catchError, delay} from 'rxjs/operators'

export interface Todo {
  title: string,
  completed: boolean,
  id?: number
}

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  constructor(private client: HttpClient) {}

  addTodo(todo: Todo): Observable<Todo> {
    return this.client.post<Todo>('https://jsonplaceholder.typicode.com/todos', todo)
      .pipe(catchError(error => throwError(error)))
  }

  fetchTodos(): Observable<Todo[]> {
    return this.client.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .pipe(
        delay(1000),
        catchError(error => throwError(error))
      )
  }

  removeTodo(id: number): Observable<void> {
    return this.client.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .pipe(catchError(error => throwError(error)))
  }

  completeTodo(id: number): Observable<Todo> {
    return this.client.put<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      completed: true
    }).pipe(catchError(error => throwError(error)))
  }
}
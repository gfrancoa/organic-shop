import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getAll() {
    return [
      this.db.list('/categories').valueChanges() as Observable<any[]>,
      this.db.list('/categories').snapshotChanges() as Observable<any[]>,
    ];
  }
}

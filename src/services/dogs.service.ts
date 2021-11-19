
import { Injectable } from '@angular/core';
import { DOGS } from 'src/db/dogs.db';
import { Post } from 'src/interfaces/post.interfaces';


const LIST_DOGS: string = 'arrDogs'

@Injectable({
  providedIn: 'root'
})
export class DogsService {

  arrDogs = DOGS;


  constructor() {
    this.arrDogs = DOGS;

  }

  getAllDogs(): Post[] {
    return this.recoverLocalStorege();
  }

  createNewDog(dogs: Post): void {
    this.arrDogs.push(dogs);
    this.loadLocalStorage(this.arrDogs)
  }

  getByCategory(category: string): Post[] {
    let result: Post[] = [];
    for (let cat of DOGS) {
      if (cat.category === category) {
        result.push(cat)
      }
    }
    return result
  }
  getByCategoryV3(category: string): Post[] {
    return DOGS.filter(cat => cat.category === category);
  }
  getCategoriaV2() {
    return [...new Set(DOGS.map(cat => cat.category))];
  }


  recoverLocalStorege(): Post[] {
    if (localStorage.getItem(LIST_DOGS)) {
      return JSON.parse(localStorage.getItem(LIST_DOGS)!);
    } else {
      return DOGS
    }
  }


  loadLocalStorage(arrDogs: Post[]) {
    localStorage.setItem(LIST_DOGS, JSON.stringify(arrDogs))
  }


}



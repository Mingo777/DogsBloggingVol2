import { Component, OnInit } from '@angular/core';
import { Post } from 'src/interfaces/post.interfaces';
import { DogsService } from 'src/services/dogs.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  arrDogs: Post[];
  arrCategory: string[];

  constructor(private dogsService: DogsService) {
    this.arrDogs = [];
    this.arrCategory = [];
  }

  ngOnInit(): void {
    this.arrDogs = this.dogsService.getAllDogs();
    this.arrCategory = this.dogsService.getCategoriaV2();
  }


  onCategoryChange($event: any) {
    this.arrDogs = this.dogsService.getByCategoryV3(($event.target as HTMLInputElement).value
    );
  }

  deleteDogs(indice: number) {
    this.arrDogs.splice(indice, 1)
  }

}

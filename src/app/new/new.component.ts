import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DogsService } from 'src/services/dogs.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  formulario: FormGroup;

  constructor(private dogsService: DogsService, private router: Router) {
    this.formulario = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required]),
      Author: new FormControl('', [Validators.required]),
      image: new FormControl(''),
      date: new FormControl(new Date().toLocaleDateString('en-CA'), [Validators.required]),
      category: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.formulario.value);
    if (this.formulario.valid) {
      this.dogsService.createNewDog(this.formulario.value);
      Swal.fire({
        title: 'Has agregado con exito a un nuevo mejor amigo.',
        width: 600,
        padding: '3em',
        background: '#fff url(/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("/assets/nyan-dog-weird.gif")
          right top
          no-repeat
        `
      });
      this.router.navigate(['/blog']);
    }
  }

  checkError(controlName: string, error: string, touched: boolean): boolean | undefined {
    return touched ? this.formulario.get(controlName)?.hasError(error) && this.formulario.get(controlName)?.touched : this.formulario.get(controlName)?.hasError(error);
  }
}

import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

    private Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  constructor() { }

   

   toast(message: string, success:boolean = true)
   {

      if(success){
        this.Toast.fire({
          icon: "success",
          title: message
        })
      }
      else{
        this.Toast.fire({
          icon: "error",
          title: message
        })
      }
      
   }
}

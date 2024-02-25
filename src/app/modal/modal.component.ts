import { Component } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'modal',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  showEmail: boolean = false;

  toggle () {
    this.showEmail = !this.showEmail;
  }
}

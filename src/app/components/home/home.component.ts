import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatSuffix} from "@angular/material/form-field";
import {NgOptimizedImage} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardFooter} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatIcon,
    MatSuffix,
    NgOptimizedImage,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardFooter,
    RouterLink,
    MatTooltip
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

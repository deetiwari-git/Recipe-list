import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router){}
  loaded: string = 'recipe';
  // shoppingCalled: string = 'false';

  onNavigate(value: string) {
    this.loaded = value;
    if(value === 'shopping'){
      this.router.navigate(['/shopping']); 
    }else{
      this.router.navigate(['/recipes']); 
    }
     
}
}
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';


const routes: Routes = [
  { path: 'details/:cid', component: CharacterDetailsComponent },
  { path: '**', component: CharacterListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

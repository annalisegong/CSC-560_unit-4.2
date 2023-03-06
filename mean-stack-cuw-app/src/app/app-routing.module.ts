import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayerCreateComponent } from './components/player-create/player-create.component';
import { PlayerEditComponent } from './components/player-edit/player-edit.component';
import { PlayerListComponent } from './components/player-list/player-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'create-player'},
  { path: 'create-player', component: PlayerCreateComponent},
  { path: 'edit-player/:id', component: PlayerEditComponent},
  { path: 'players-list', component: PlayerListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Player } from 'src/app/model/player';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css'],
})

export class PlayerEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  playerData: Player[];
  PlayerProfile: any = ['Freshman', 'Sophomore', 'Junior', 'Senior'];
  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}
  ngOnInit() {
    this.updatePlayer();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getPlayer(id);
    this.editForm = this.fb.group({
      First_Name: ['', [Validators.required]],
      Last_Name: ['', [Validators.required]],
      Grade: ['', [Validators.required]],
      position: ['', [Validators.required]],
      jersey_number: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      goals_scored: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      assists: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      goals_saved: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }
  // Choose options with select-dropdown
  updateProfile(e) {
    this.editForm.get('designation').setValue(e, {
      onlySelf: true,
    });
  }
  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }
  getPlayer(id) {
    this.apiService.getPlayer(id).subscribe((data) => {
      this.editForm.setValue({
        First_Name: data['First_Name'],
        Last_Name: data['Last_Name'],
        Grade: data['Grade'],
        position: data['position'],
        jerseyNumber: data['jerseyNumber'],
        goalsScored: data['goalsScored'],
        assists: data['assists'],
        goalsSaved: data['goalsSaved']
      });
    });
  }
  updatePlayer() {
    this.editForm = this.fb.group({
      First_Name: ['', [Validators.required]],
      Last_Name: ['', [Validators.required]],
      Grade: ['', [Validators.required]],
      position: ['', [Validators.required]],
      jersey_number: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      goals_scored: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      assists: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      goals_saved: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }
  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updatePlayer(id, this.editForm.value).subscribe({
          complete: () => {
            this.router.navigateByUrl('/players-list');
            console.log('Content updated successfully!');
          },
          error: (e) => {
            console.log(e);
          },
        });
      }
    }
  }
}
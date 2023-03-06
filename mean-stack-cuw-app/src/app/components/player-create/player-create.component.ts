import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-player-create',
  templateUrl: './player-create.component.html',
  styleUrls: ['./player-create.component.css']
})

export class PlayerCreateComponent implements OnInit {
  submitted = false;
  playerForm: FormGroup;
  PlayerProfile: any = ['Freshman', 'Sophomore', 'Junior', 'Senior'];
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
  }
  ngOnInit() {}
  mainForm() {
    this.playerForm = this.fb.group({
      personal_Details: {
        First_Name: ['', [Validators.required]],
        Last_Name: ['', [Validators.required]],
        Grade: ['', [Validators.required]]},
      player_Details: {
        position: ['', [Validators.required]],
        jersey_number: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]},
      stats: {
        goals_scored: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        assists: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        goals_saved: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]}
    });
  }
  // Choose Grade with select dropdown
  updateProfile(e) {
    this.playerForm.get('Grade').setValue(e, {
      onlySelf: true,
    });
  }
  // Getter to access form control
  get myForm() {
    return this.playerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (!this.playerForm.valid) {
      return false;
    } else {
      return this.apiService.createPlayer(this.playerForm.value).subscribe({
        complete: () => {
          console.log('Player successfully created!'),
            this.ngZone.run(() => this.router.navigateByUrl('/players-list'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}

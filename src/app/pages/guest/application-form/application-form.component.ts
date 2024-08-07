import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patterns } from '../../../helper/validation-patterns';

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './application-form.component.html',
})
export class ApplicationFormComponent implements OnInit {
  router = inject(Router);
  private route = inject(ActivatedRoute);
  appForm: FormGroup;
  languages = ['English', 'Hindi', 'Gujarati'];
  languageDetails: any = {};
  technicalExperienceOptions = ['Beginner', 'Mediator', 'Expert'];
  locations = ['New York', 'Chicago', 'India'];
  activeTab: string = 'basicDetails';

  constructor(private fb: FormBuilder) {
    this.appForm = this.fb.group({
      basicDetails: this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(Patterns.email)]],
        address: [''],
        gender: [''],
        contact: ['', [Validators.required]]
      }),
      education: this.fb.array([]),
      workExperience: this.fb.array([]),
      languages: this.fb.group({}),
      technicalExperience: this.fb.array([]),
      preferences: this.fb.group({
        preferredLocation: [''],
        expectedCTC: [''],
        currentCTC: [''],
        noticePeriod: ['']
      })
    });

  }

  ngOnInit(): void {
    this.addEducation();
    this.addWorkExperience();
    this.addTechnicalExperience();
  }

  selectTab(tab: string) {
    this.activeTab = tab;
  }

  nextTab(nextTab: string) {
    this.activeTab = nextTab;
  }

  get education(): FormArray {
    return this.appForm.get('education') as FormArray;
  }

  get workExperience(): FormArray {
    return this.appForm.get('workExperience') as FormArray;
  }

  get languagesControl(): FormGroup {
    return this.appForm.get('languages') as FormGroup;
  }

  get technicalExperience(): FormArray {
    return this.appForm.get('technicalExperience') as FormArray;
  }

  get preferences(): FormGroup {
    return this.appForm.get('preferences') as FormGroup;
  }

  addEducation() {
    const educationGroup = this.fb.group({
      board: [''],
      year: [''],
      cgpa: ['']
    });
    this.education.push(educationGroup);
  }

  removeEducation(index: number) {
    this.education.removeAt(index);
  }

  addWorkExperience() {
    const workExpGroup = this.fb.group({
      company: [''],
      designation: [''],
      from: [''],
      to: ['']
    });
    this.workExperience.push(workExpGroup);
  }

  removeWorkExperience(index: number) {
    this.workExperience.removeAt(index);
  }

  onLanguageChange(language: string, field: string) {
    const control = this.languagesControl.get(language)?.get(field);
    if (control) {
      control.setValue(!control.value);
    }
  }

  addTechnicalExperience() {
    const techGroup = this.fb.group({
      technology: [''],
      proficiency: ['']
    });
    this.technicalExperience.push(techGroup);
  }

  removeTechnicalExperience(index: number) {
    this.technicalExperience.removeAt(index);
  }

  onTechnologyInput(index: number) {
    const techControl = this.technicalExperience.at(index).get('technology');
    if (techControl) {
      techControl.setValue(techControl.value.trim());
    }
  }

  onSubmit() {
    if (this.appForm.valid) {
      const formData = this.appForm.value;
      const existingData = localStorage.getItem('appFormsData');
      let formsArray = existingData ? JSON.parse(existingData) : [];

      formsArray.push(formData);

      localStorage.setItem('appFormsData', JSON.stringify(formsArray));

      alert("Forms submitted successfully");
      this.router.navigateByUrl("/");
    } else {
      alert("Somtheing went wrong! Please enter try again");
    }
  }


}

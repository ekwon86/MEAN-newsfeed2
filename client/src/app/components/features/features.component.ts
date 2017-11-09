import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FeatureService } from '../../services/feature.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {

  messageClass;
  message;
  newFeature = false;
  loadingFeatures = false;
  form;
  processing = false;
  username;
  featurePosts;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private featureService: FeatureService
  ) {
    this.createNewFeatureForm();
  }

  /** NEW Feature / CANCEL Feature BUTTONS **/
  newFeatureForm() {
    this.newFeature = true;
  }
  cancelFeatureForm() {
    this.newFeature = false;
  }

  createNewFeatureForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
        this.alphaNumericWithSpacesValidation
      ])],
      description: ['', Validators.compose([
        Validators.required
      ])],
      type: ['', Validators.compose([
         Validators.required
      ])]
    });
  }

  /** ENABLE/DISABLE FORM WHEN SUBMITTING **/
  enableFormNewFeatureForm() {
    this.form.get('name').enable();
    this.form.get('description').enable();
    this.form.get('type').enable();
  }

  disableFormNewFeatureForm() {
    this.form.get('name').disable();
    this.form.get('description').disable();
    this.form.get('type').disable();
  }

  /** FORM VALIDATION **/
  alphaNumericWithSpacesValidation(controls) {
    const regExp = new RegExp(/^[a-z\d\-_\s]+$/i);
    if(regExp.test(controls.value)) {
      return null;
    } else {
      return { 'alphaNumericWithSpacesValidation': true };
    }
  }

  getAllFeatures() {
    this.featureService.getAllFeatures().subscribe(data => {
      this.featurePosts = data.featuresl
      console.log('Features: ' + this.featurePosts);
    });
  }

  ngOnInit() {
    this.getAllFeatures();
  }

}

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
  currentFeature = {
    name: '',
    description: '',
    type: '',
    imgPath: '',
    _id: ''
  };

  imgPath = '';
  messageClass;
  message;
  imgMessageClass;
  imgMessage;
  newFeature = false;
  loadingFeatures = false;
  form;
  processing = false;
  username;
  featurePosts = [];
  isDevAdmin = false;
  isDevUser = false;
  isProdAdmin = false;
  isProdUser = false;
  isEnterprise = false;
  isAdmin = false;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private featureService: FeatureService
  ) {
    this.createNewFeatureForm();
  }

  createNewFeatureForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5)
      ])],
      description: ['', Validators.compose([
        Validators.required
      ])],
      type: ['', Validators.compose([
         Validators.required
      ])],
      imgPath: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  /** SUBMIT EVENT **/
  onFeatureSubmit() {
    this.processing = true;
    this.disableFormNewFeatureForm();

    const feature = {
      name: this.form.get('name').value,
      description: this.form.get('description').value,
      type: this.form.get('type').value
    };

    this.featureService.newFeature(feature).subscribe(data => {
      if(!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableFormNewFeatureForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.newFeature = false;
          this.processing = false;
          this.message = false;
          this.form.reset();
          this.enableFormNewFeatureForm();
          this.getAllFeatures();
          document.getElementById('cancelNewFeature').click();
        }, 2000);
      }
    });
  }

  /** UPDATE FEATURE **/
  updateFeatureSubmit() {
    this.processing = true;
    this.featureService.editFeature(this.currentFeature).subscribe(data => {
      if(!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.processing = false;
          this.message = false;
          this.getAllFeatures();
          document.getElementById('cancelEditFeature').click();
        }, 2000);
      }
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


  getAllFeatures() {
    this.featureService.getAllFeatures().subscribe(data => {
      if(!this.isDevAdmin && !this.isDevUser && !this.isProdAdmin && !this.isProdUser && !this.isEnterprise) {
        this.featurePosts = data.features;
      } else {
        for(let i = 0; i < data.features.length; i++) {
          if(this.isEnterprise && data.features[i].type === 1) {
            this.featurePosts.push(data.features[i]);
          } else if (!this.isEnterprise) {
            if(this.isProdAdmin && data.features[i].type === 3) {
              this.featurePosts.push(data.features[i]);
            } else if (this.isDevAdmin && data.features[i].type === 3) {
              this.featurePosts.push(data.features[i]);
            } else if (data.features[i].type === 2) {
              this.featurePosts.push(data.features[i]);
            }
          }
        }
      }
    });
  }

  /** DELETE FEATURE **/
  deleteFeature() {
    this.processing = true;
    this.featureService.deleteFeature(this.currentFeature._id).subscribe(data => {
      if(!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.processing = false;
          this.message = false;
          this.getAllFeatures();
          document.getElementById('cancelDeleteFeature').click();
        }, 2000);
      }
    });
  }

  getCurrentFeature(id) {
    this.featureService.getSingleFeature(id).subscribe(data => {
      if(!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = 'Feature not found'
      } else {
        this.currentFeature = data.feature;
      }
    });
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      let formData:FormData = new FormData();
      formData.append('img', file, file.name);
      this.featureService.newPicture(formData).subscribe(data => {
          if(!data.success) {
            this.imgMessageClass = 'alert alert-danger';
            this.imgMessage = 'There was an error';
          } else {
            this.imgMessageClass = 'alert alert-success';
            this.imgMessage = 'Image was successfully uploaded!';
            this.imgPath = data.url;
            setTimeout(() => {
              this.imgMessageClass = false;
              this.imgMessage = false;
            }, 2000);
          }
        }
      );
    }
  }

  initialize() {
    const str = window.location.href;
    const tmp = str.lastIndexOf("/");
    const result = str.substring(tmp + 1);

    if(result === "dev-admin") {
      this.isDevAdmin = true;
    } else if (result === "dev-user") {
      this.isDevUser = true;
    } else if (result === "prod-admin") {
      this.isProdAdmin = true;
    } else if (result === "prod-user") {
      this.isProdUser = true;
    } else if (result === "enterprise") {
      this.isEnterprise = true;
    } else if (result === "") {
      this.isAdmin = true;
    }
  }

  ngOnInit() {
    this.getAllFeatures();
    this.initialize();
  }

}

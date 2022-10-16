import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FileUploadService } from '../file-upload.service';

@Component({
  selector: 'app-file-update',
  templateUrl: './file-update.component.html',
  styleUrls: ['./file-update.component.scss']
})
export class FileUpdateComponent implements OnInit {
  
  responseData : any;
  enableUpdate: boolean = false;

  constructor(private formBuilder:FormBuilder, 
    private fileUploadService: FileUploadService) { }

  fileUpdateForm = this.formBuilder.group({
    searchText: new FormControl(null),
    address: new FormControl(null),
    dateofbirth: new FormControl(null),
    email: new FormControl(null),
    phonenumber: new FormControl(null),    
  });

  ngOnInit(): void {

    

  }


  searchPatientDetails(){
    console.log(this.fileUpdateForm.value.searchText);
    this.fileUploadService.getPatientDetailsBasedOnName(this.fileUpdateForm.value.searchText)
    .subscribe(res => {
      if(res != null){
        this.responseData = res;

        this.fileUpdateForm.controls["address"].setValue(this.responseData.patientAddress);
        this.fileUpdateForm.controls["dateofbirth"].setValue(this.responseData.patientDateOfBirth);
        this.fileUpdateForm.controls["email"].setValue(this.responseData.patientEmail);
        this.fileUpdateForm.controls["phonenumber"].setValue(this.responseData.patientContactNumber);


      }
    });
  }

  enableUpdateOption(){
    this.enableUpdate = true;
  }

  updatePatientDetails(){

   let postObj = {
    patientName: this.fileUpdateForm.value.searchText,    
    address : this.fileUpdateForm.value.address,
    emailId :this.fileUpdateForm.value.email,
    phoneNumber :this.fileUpdateForm.value.phonenumber,
    dateOfBirth :this.fileUpdateForm.value.dateofbirth
   }

    this.fileUploadService.updatePatientDetails(postObj).subscribe(res => {
      if(res != null){
        this.responseData = res;

        this.fileUpdateForm.controls["address"].setValue(this.responseData.patientAddress);
        this.fileUpdateForm.controls["dateofbirth"].setValue(this.responseData.patientDateOfBirth);
        this.fileUpdateForm.controls["email"].setValue(this.responseData.patientEmail);
        this.fileUpdateForm.controls["phonenumber"].setValue(this.responseData.patientContactNumber);


      }
    });
  }

}

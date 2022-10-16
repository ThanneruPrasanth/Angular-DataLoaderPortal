import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../file-upload.service';
import { AuthService } from '../auth-service';
import { authToken } from '../login';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {

 // Variable to store shortLink from api response
 shortLink: string = "";
 loading: boolean = false; // Flag variable
 //file: File = null; // Variable to store file

 fileName: any = '';
 fileData: any;

 tokenData: any ;

 // Inject service 
 constructor(private fileUploadService: FileUploadService,
  private authService: AuthService, private router: Router) { }

 ngOnInit(): void {

  this.authService.authValue.subscribe(res =>{
      this.tokenData = res.token;
  });

  console.log(this.tokenData);

 }


 // On file Select
//  onChange(event:any) {
//      this.file = event.target.files[0];
//  }

//  // OnClick of button Upload
//  onUpload() {
//      this.loading = !this.loading;
//      console.log(this.file);
//      this.fileUploadService.upload(this.file).subscribe(
//          (event: any) => {
//              if (typeof (event) === 'object') {

//                  // Short link via api response
//                  this.shortLink = event.link;

//                  this.loading = false; // Flag variable 
//              }
//          }
//      );
//  }


    
onSelectingFile(eve: any){
      const file:File = eve.target.files[0];

        if (file) {

            this.fileName = file.name;

            this.fileData = file;

            
        }
    }

    uploadSelectedFile(){
        console.log(this.fileData);
        this.fileUploadService.fileUploadToBackEnd(this.fileData).subscribe(
            (res) => {
                if(res.status == 202){
                    // console.log(res);
                    this.router.navigateByUrl('/file-update');
                }
            }
        );
    }

}

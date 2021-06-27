import { Component, OnInit } from '@angular/core';
import { ClassroomService} from 'src/app/service/classroom.service';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-classroom',
  templateUrl: './add-classroom.component.html',
  styleUrls: ['./add-classroom.component.css']
})

export class AddClassroomComponent implements OnInit {
  form!: FormGroup;
  submitted=false;
  data: any;
  constructor(private classroomService: ClassroomService, private formBuilder: FormBuilder,
    private toastr: ToastrService, private router: Router)
  { }

  createForm() {
    this.form = this.formBuilder.group({
      campus: ['', Validators.required],
      building: ['', Validators.required],
      room: ['', Validators.required],
      projectorCount: ['', Validators.required],
      projectorModel: ['', Validators.required],
      projectorIP: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  get f() {
    return this.form.controls;
  }
  insertData() {
    this.submitted=true;

    if(this.form.invalid) {
      return;
    }

    this.classroomService.insertData(this.form.value).subscribe(res => {
      this.data = res;
      console.log(this.form.value);
      this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message)
      , {
        timeOut: 1000,
        progressBar: true
      });
      this.router.navigateByUrl('/')
    });
  }

}

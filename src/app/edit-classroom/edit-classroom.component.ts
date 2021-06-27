import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClassroomService } from 'src/app/service/classroom.service';
import { Classroom } from '../model/classroom.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-classroom',
  templateUrl: './edit-classroom.component.html',
  styleUrls: ['./edit-classroom.component.css']
})
export class EditClassroomComponent implements OnInit {
  classroom = new Classroom();
  id:any;
  data:any;

  constructor(private classroomService: ClassroomService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  form = new FormGroup({
    campus: new FormControl(''),
    building: new FormControl(''),
    room: new FormControl(''),
    projectorCount: new FormControl(''),
    projectorModel: new FormControl(''),
    projectorIP: new FormControl('')
  })

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.getData();
  }

  getData() {
    this.classroomService.getDataById(this.id).subscribe(res => {
      this.data = res;
      this.classroom = this.data;
      this.form = new FormGroup({
        campus: new FormControl(this.classroom.campus),
        building: new FormControl(this.classroom.building),
        room: new FormControl(this.classroom.room),
        projectorCount: new FormControl(this.classroom.projectorCount),
        projectorModel: new FormControl(this.classroom.projectorModel),
        projectorIP: new FormControl(this.classroom.projectorIP)
      });
    });
  }

  updateData() {
    this.classroomService.updateData(this.id, this.form.value).subscribe(res =>{
      this.data = res;
      this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
        timeOut: 1000,
        progressBar: true
      })
    });
    this.router.navigateByUrl('/')
  }

}

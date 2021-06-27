import { Component, OnInit } from '@angular/core';
import { ClassroomService } from 'src/app/service/classroom.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})

export class ClassroomComponent implements OnInit {
  classroom:any;
  data:any;
  constructor(private classroomService:ClassroomService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getClassroomData();
  }
  getClassroomData() {
    this.classroomService.getData().subscribe(res => {
      console.log(res);
      this.classroom = res;
    })
  }
  deleteData(id) {
    this.classroomService.deleteData(id).subscribe(res => {
      this.data = res;
      this.toastr.error(JSON.stringify(this.data.code), JSON.stringify(this.data.message),
      {
        timeOut: 1000,
        progressBar: true
      });
      this.getClassroomData();
    });
  }
}

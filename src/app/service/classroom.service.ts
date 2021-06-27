import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(private httpClient:HttpClient) { }


 getData() {
   return this.httpClient.get('http://localhost:3000/api/classrooms')
 }



 insertData(data: any) {
  return this.httpClient.post('http://localhost:3000/api/classrooms/add', data);
 }

 getDataById(id) {
   return this.httpClient.get('http://localhost:3000/api/classrooms/'+id);
 }

 updateData(id, data) {
  return this.httpClient.put('http://localhost:3000/api/classrooms/update/'+id, data);
 }

 deleteData(id) {
  return this.httpClient.delete('http://localhost:3000/api/classrooms/'+id);
 }
}

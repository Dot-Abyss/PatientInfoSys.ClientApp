import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';
import { updatePatient } from '../patient/update-patient/update-patient.model';
import { addPatient } from '../patient/add-patient/add-patient.model';

const endpoint = 'https://localhost:44304/api/Patients';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  pager: any = null;
  headerProps : any;
  
  constructor(private http: HttpClient) { }

  getAllPatients(name: any = null, fileNo: any = null, phoneNumber: any = null, page = 1, pageSize = 5){
    let fullEndpoint = endpoint + '/AllPatients' + '?';
    if (name != null) {
      fullEndpoint += '&name=' + name;
    }
    if (fileNo != null) {
      fullEndpoint += '&fileNo=' + fileNo;
    }
    if (phoneNumber != null) {
      fullEndpoint += '&phoneNumber=' + phoneNumber;
    }

    fullEndpoint += '&page=' + page;
    fullEndpoint += '&itemsPP=' + pageSize;

    this.http
      .get<Patient[]>(fullEndpoint, { observe: 'response' })
      .subscribe((response) => {
        this.pager = JSON.parse(response.headers.get('X-Pagination') as string);
      });
      
      console.log(this.pager);
      
    return this.http.get<Patient[]>(fullEndpoint);
  }

  addPatient(p: addPatient) {
    let fullEndpoint = endpoint + '/AddPatient';
    return this.http.post(fullEndpoint, p);
  }

  updatePatient(p: updatePatient) {
    let fullEndpoint = endpoint + '/UpdatePatient';
    return this.http.put(fullEndpoint, p);
  }
  
  deletePatient(id: string) {
    let deleteurl = endpoint + '/' + id;

    return this.http.delete(deleteurl);
  }
}

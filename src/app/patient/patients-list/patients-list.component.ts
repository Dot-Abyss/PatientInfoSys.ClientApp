import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {

  FILTER_PAG_REGEX = /[^0-9]/g;
  public modalRef?: BsModalRef;
  patients!: Observable<Patient[]>;
  currentIndex = -1;
  name: any;
  fileNo: any;
  phone: any;
  page = 1;
  count = 0;
  itemsPP : number = 5;
  pageSizes = [3, 5, 7];

  constructor(private modalService: BsModalService, public patientService: PatientService) { }

  ngOnInit(): void {
    this.receivePatients();
  }

  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(this.FILTER_PAG_REGEX, '');
  }
  
  search() {
    this.page = 1;
    this.receivePatients();
  }

  clearSearch() {
    this.name = null;
    this.fileNo = null;
    this.phone = null;
    this.page = 1;
    this.receivePatients();
  }

  receivePatients() {
    this.patients = this.patientService.getAllPatients(
      this.name,
      this.fileNo,
      this.phone,
      this.page,
      this.itemsPP
    );
  }

  changePage(pageNo: number) {
    this.page = pageNo;
    this.receivePatients();
  }

}

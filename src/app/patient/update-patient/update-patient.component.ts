import { JsonPipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from 'src/app/services/patient.service';
import { updatePatient } from './update-patient.model';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class UpdatePatientComponent implements OnInit {

  error!: string;
  updatePatientModal!: NgbModalRef;

  constructor(Modalconfig: NgbModalConfig, private modalService: NgbModal, public patientService: PatientService, private toastr: ToastrService) {
    Modalconfig.backdrop = 'static';
    Modalconfig.keyboard = false;
  }

  @Input() patient!: updatePatient;
  @Output() refreshList = new EventEmitter();

  updatePatientFrom = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    gender: new FormControl(),
    fileNo: new FormControl(),
    firstVisitDate: new FormControl(),
    citizenId: new FormControl(),
    natinality: new FormControl(),
    birthDate: new FormControl(),
    phoneNumber: new FormControl(),
    email: new FormControl(),
    country: new FormControl(),
    city: new FormControl(),
    street: new FormControl(),
    address1: new FormControl(),
    address2: new FormControl(),
    contactPerson: new FormControl(),
    contactPhone: new FormControl(),
    contactRelation: new FormControl(),
    recordCreationDate: new FormControl(),
  });
  updatePatientFromsubmit() {
    this.patientService
      .updatePatient(this.updatePatientFrom.value as updatePatient)
      .subscribe({
        next: (v) => {},
        error: (e) => {
          this.error = 'Error in :\n';
          console.error(e.error.errors);

          for (let error in e.error.errors) {
            this.error += ' - ' + error + '\n';
          }
          this.toastr.error('', 'Error while editing patient', {
            timeOut: 3000,
          });
        },

        complete: () => {
          this.error = '';
          this.updatePatientModal.close();
          this.toastr.success('Patient was edited successfuly !');
          this.refreshList.emit();
        },
      });
  }
  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    let fullDate = year + '-';
    if (month < 10) {
      fullDate += '0' + month + '-';
    } else {
      fullDate += month + '-';
    }
    if (day < 10) {
      fullDate += '0' + day;
    } else {
      fullDate += day;
    }

    return fullDate;
  }
  open(content: any) {
    this.patient.birthDate = this.formatDate(new Date(this.patient.birthDate));
    this.patient.firstVisitDate = this.formatDate(
      new Date(this.patient.firstVisitDate)
    );
    this.updatePatientFrom.setValue(this.patient);

    this.updatePatientModal = this.modalService.open(content, {
      scrollable: true,
      size: 'lg',
    });
    this.updatePatientModal.result.then(
      (result) => {},
      (reason) => {
        this.error = '';
      }
    );
  }

  ngOnInit(): void {
  }

}

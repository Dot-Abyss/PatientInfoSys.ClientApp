import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-delete-patient',
  templateUrl: './delete-patient.component.html',
  styleUrls: ['./delete-patient.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class DeletePatientComponent implements OnInit {
  
  @Input() patient!: Patient;
  constructor(config: NgbModalConfig, private modalService: NgbModal,public service: PatientService, private toastr: ToastrService) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.centered = true;
  }
  @Output() refreshList = new EventEmitter();
  
  open(content: any) {
    this.modalService.open(content).result.then(
      (result) => {
        this.service
          .deletePatient(this.patient.id)

          .subscribe({
            next: (v) => {},
            error: (e) => {
              this.toastr.error('Error while Deleting process');
              this.refreshList.emit();
            },

            complete: () => {
              this.toastr.success('patient was Deleted successfuly !');
              this.refreshList.emit();
            },
          });
      },
      (reason) => {}
    );
  }
  ngOnInit(): void {
  }

}

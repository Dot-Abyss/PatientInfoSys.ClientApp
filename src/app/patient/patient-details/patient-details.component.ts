import { Component, Input, NgZone, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
  providers: [NgbActiveModal, NgbModal],
})
export class PatientDetailsComponent implements OnInit {

  @Input() patient: any;

  private animationItem!: AnimationItem;
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content: any) {
    this.modalService.open(content, { scrollable: true, size: 'md' });
  }

}

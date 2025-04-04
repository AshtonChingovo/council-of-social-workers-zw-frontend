import { Component, OnInit } from '@angular/core';
import { TrackingSheetComponent } from "./tracking-sheet/tracking-sheet.component";
import { CardproComponent } from "./cardpro/cardpro.component";
import { FilesService } from '../file-uploads-downloads/files.service';
import { CommonModule } from '@angular/common';
import { TrackingSheetService } from './tracking-sheet/tracking-sheet.service';
import { TrackingSheetClient } from './tracking-sheet/tracking-sheet.model';
import { CardProSheetService } from './cardpro/cardpro.service';
import { ImagesComponent } from "./images/images.component";
import { ImagesService } from './images/images.service';

@Component({
  selector: 'app-work-sheets',
  standalone: true,
  imports: [CommonModule, TrackingSheetComponent, CardproComponent, ImagesComponent ],
  templateUrl: './work-sheets.component.html',
  styleUrl: './work-sheets.component.css'
})
export class WorkSheetsComponent implements OnInit {

  isCardProTabActive: boolean = true;
  isImagesTabActive: boolean = false;
  isTrackingTabActive: boolean = false;
  
  constructor(private filesService: FilesService, private imagesService: ImagesService, private trackingSheetService: TrackingSheetService, private cardProSheetService: CardProSheetService) {}

  ngOnInit(): void {
    this.filesService.trackingSheetEventSubject.subscribe((response) => {
      this.isTrackingTabActive = response.isSuccessful;
      this.isImagesTabActive = false;
      this.isCardProTabActive = false;

      if(this.isTrackingTabActive){
        this.trackingSheetService.getTrackingSheetClients(
          { pageNumber: 0, pageSize: 20, sortBy: "registrationYear" }
        );
      }
    })

    this.filesService.imagesEventSubject.subscribe((response) => {
      this.isImagesTabActive = response.isSuccessful;
      this.isCardProTabActive = false;
      this.isTrackingTabActive = false;

      if(this.isImagesTabActive){
        this.imagesService.getImages(
          { pageNumber: 0, pageSize: 20, sortBy: "id" }
        );
      }
    })

    this.filesService.cardProSheetEventSubject.subscribe((response) => {
      this.isCardProTabActive = response.isSuccessful;
      this.isTrackingTabActive = false;
      this.isImagesTabActive = false;

      if(this.isCardProTabActive){
        this.cardProSheetService.getCardProSheetClients(
          { pageNumber: 0, pageSize: 20, sortBy: "id" }
        );
      }
    })
  }



}

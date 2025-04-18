import { Component, OnInit, ViewChild } from '@angular/core';
import { FilesService } from './files.service';
import { CommonModule } from '@angular/common';
import { APIResponse } from '../util/api-response.model';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-file-uploads-downloads',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './file-uploads-downloads.component.html',
  styleUrl: './file-uploads-downloads.component.css',
})
export class FileUploadsDownloadsComponent implements OnInit {

  @ViewChild('batchNumberForm') batchNumberForm: NgForm

  isUploading: boolean = false;
  isTrackingSheetUploaded: boolean = false;

  isExtractingImages: boolean = false;
  isImagesExtracted: boolean = false;

  isGeneratingCardProSheet: boolean = false;
  isCardProSheetGenerated: boolean = false;

  isDownloadingCardProSheet: boolean = false;
  isCardProSheetDownloaded: boolean = false;

  constructor(private filesService: FilesService) {}

  ngOnInit(): void {
    this.filesService.trackingSheetEventSubject.subscribe((response) => {
      this.isUploading = false;
      this.isTrackingSheetUploaded = response.isSuccessful;
    });

    this.filesService.imagesEventSubject.subscribe((response) => {
      this.isExtractingImages = false;
      this.isImagesExtracted = response.isSuccessful;
    });

    this.filesService.cardProSheetEventSubject.subscribe((response) => {
      this.isGeneratingCardProSheet = false;
      this.isCardProSheetGenerated = response.isSuccessful;
    });

    this.filesService.downloadCardProSheetEventSubject.subscribe((response) => {
      this.isDownloadingCardProSheet = false;
      this.isCardProSheetDownloaded = response.isSuccessful;
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    const formData = new FormData();

    formData.append('file', file);

    this.isUploading = true;
    this.isTrackingSheetUploaded = false;

    this.filesService.postTrackingSheet(formData);
  }

  onExtractImages() {
    this.isExtractingImages = true;
    this.isImagesExtracted = false;

    this.filesService.extractImages();
  }

  onGenerateCardProSheet() {
    this.isGeneratingCardProSheet = true;
    this.isCardProSheetGenerated = false;

    this.filesService.generateCardProSheet();
  }

  onDownloadCardProSheet() {
    this.isDownloadingCardProSheet = true;
    this.isCardProSheetDownloaded = false;

    this.filesService.downloadCardProSheet(this.batchNumberForm.value.batchNumber);
  }

  onSubmit() {

    if(this.batchNumberForm.invalid){
      return
    }

    this.filesService.downloadCardProSheet(this.batchNumberForm.value.batchNumber);
  }
}

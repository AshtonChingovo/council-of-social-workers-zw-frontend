import { Component } from '@angular/core';
import { TrackingSheetService } from '../tracking-sheet.service';

@Component({
  selector: 'app-file-uploads-downloads',
  standalone: true,
  imports: [],
  templateUrl: './file-uploads-downloads.component.html',
  styleUrl: './file-uploads-downloads.component.css'
})
export class FileUploadsDownloadsComponent {

  constructor(private trackingSheetService: TrackingSheetService) {}

  onFileSelected(event: any) {
    const file:File = event.target.files[0];

    const formData = new FormData();

    formData.append("file", file);

    this.trackingSheetService.postTrackingSheet(formData);
  }
  
}

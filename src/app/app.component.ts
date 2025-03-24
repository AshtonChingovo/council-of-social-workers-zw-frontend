import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardproComponent } from "./work-sheets/cardpro/cardpro.component";
import { TrackingSheetComponent } from "./work-sheets/tracking-sheet/tracking-sheet.component";
import { FilesService } from './file-uploads-downloads/files.service';
import { FileUploadsDownloadsComponent } from "./file-uploads-downloads/file-uploads-downloads.component";
import { WorkSheetsComponent } from "./work-sheets/work-sheets.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, CardproComponent, TrackingSheetComponent, FileUploadsDownloadsComponent, WorkSheetsComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'council-of-social-work-ang';

  constructor(private trackingSheetService: FilesService) {}

}

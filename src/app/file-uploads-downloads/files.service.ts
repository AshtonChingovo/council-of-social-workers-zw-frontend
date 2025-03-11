import { HttpClient, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { APIResponse } from "../util/api-response.model";
import { environment } from "../../environments/environment.development";

@Injectable({ providedIn: 'root' })
export class FilesService {

    trackingSheetEventSubject = new Subject<APIResponse>;
    cardProSheetEventSubject = new Subject<APIResponse>;
    downloadCardProSheetEventSubject = new Subject<APIResponse>;

    constructor(private httpClient: HttpClient){}

    getTrackingSheet() {
        return this.httpClient.get("http://192.168.100.134:8080/api/v1/tracking-sheet", { observe: "response" });
    }

    postTrackingSheet(file: FormData){
        this.httpClient.post("http://192.168.100.134:8080/api/v1/tracking-sheet/upload", file, { observe: "response" })
        .subscribe({
          next: (httpResponse) => {
            var apiResponse = new APIResponse();
          
            if(httpResponse.status == HttpStatusCode.Created){
              apiResponse.isSuccessful = true;
            }
            else{
              apiResponse.isSuccessful = false
              apiResponse.errorMessage = "Unknown error occured"
          }

          this.trackingSheetEventSubject.next(apiResponse);

          },
          error: (e) => {

            var apiResponse = new APIResponse();
          
            apiResponse.isSuccessful = false
            apiResponse.errorMessage = "Unknown error occured"

            this.trackingSheetEventSubject.next(apiResponse);

          }
      })
    }

    trackingSheetEventEmitterListener() {
        
        return new Observable((observer) => {
            const eventSource = new EventSource("http://192.168.100.134:8080/api/v1/tracking-sheet/upload");
      
            eventSource.onmessage = (event) => {
              observer.next(event.data);
              eventSource.close(); // Close connection after receiving response
              observer.complete();
            };
      
            eventSource.onerror = (error) => {
              observer.error(error);
              eventSource.close();
            };
          });
    }

    generateCardProSheet() {
      this.httpClient.get(
        environment.baseUrl + "/cardpro",
        { observe: "response" }
       )
      .subscribe({
        next: (httpResponse) => {
          var apiResponse = new APIResponse();
        
          if(httpResponse.status == HttpStatusCode.Created){
            apiResponse.isSuccessful = true
          }
          else{
              apiResponse.isSuccessful = false
              apiResponse.errorMessage = "Unknown error occured"
          }

          this.cardProSheetEventSubject.next(apiResponse);

        },
        error: (e) => {

          var apiResponse = new APIResponse();
        
          apiResponse.isSuccessful = false
          apiResponse.errorMessage = "Unknown error occured"

          this.cardProSheetEventSubject.next(apiResponse);

        }
      })
    }

    downloadCardProSheet() {
      this.httpClient.get(
        environment.baseUrl + "/cardpro/download",
        { observe: "response" }
       )
      .subscribe({
        next: (httpResponse) => {
          var apiResponse = new APIResponse();
        
          if(httpResponse.status == HttpStatusCode.Ok){
            apiResponse.isSuccessful = true
          }
          else{
              apiResponse.isSuccessful = false
              apiResponse.errorMessage = "Unknown error occured"
          }

          this.downloadCardProSheetEventSubject.next(apiResponse);

        },
        error: (e) => {

          var apiResponse = new APIResponse();
        
          apiResponse.isSuccessful = false
          apiResponse.errorMessage = "Unknown error occured"

          this.downloadCardProSheetEventSubject.next(apiResponse);

        }
      })
    }

}
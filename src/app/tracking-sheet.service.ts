import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class TrackingSheetService {

    constructor(private httpClient: HttpClient){}

    getTrackingSheet() {
        return this.httpClient.get("http://192.168.100.127:8080/api/v1/tracking-sheet", { observe: "response" });
    }

    postTrackingSheet(file: FormData){
        this.httpClient.post("http://192.168.100.127:8080/api/v1/tracking-sheet/upload", file, { observe: "response" })
        .subscribe()
    }

}
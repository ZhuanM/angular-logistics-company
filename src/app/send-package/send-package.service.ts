import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';


@Injectable({ providedIn: 'root' })
export class SendPackageService {
  constructor(
    private http: HttpClient,
  ) {}

  createPackage(
    senderUsername: string,
    recipient: string,
    registeredBy: string,
    status: string,
    recipientAddress: string,
    sentDate: string,
    eta: string,
    weight: string,
    price: string
    ) {
    return this.http.post<any>(
      apiUrls.createPackageUrl,
      {
        "name": "",
        "senderUsername": senderUsername,
        "recipient": recipient,
        "registeredBy": {
          "username": registeredBy
        },
        "company": {
          "id": 1,
          "name": "Ekont"
        },
        "status": status,
        "recipientAddress": recipientAddress,
        "sentDate": sentDate,
        "eta": eta,
        "weight": weight,
        "price": price,
      }
    )
  }
}

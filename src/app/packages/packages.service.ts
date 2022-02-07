import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';

@Injectable({ providedIn: 'root' })
export class PackagesService {
  constructor(
    private http: HttpClient,
  ) {}

  getAllPackages() {
    return this.http.get<any>(
      apiUrls.getAllPackagesUrl
    )
  }

  getUserPackages(username: string) {
    let params = new HttpParams();
    params = params.append('username', username);

    return this.http.get<any>(
      apiUrls.getUserPackagesUrl,
      {
        params: params
      }
    )
  }

  createPackage(_package: any) {
    return this.http.post<any>(
      apiUrls.createPackageUrl,
      {
        "companySymbol": _package.companySymbol,
        "eta": _package.eta,
        "id": _package.id,
        "name": _package.name,
        "price": "0",
        "recipient": _package.recipient,
        "recipientAddress": _package.recipientAddress,
        "registeredBy": _package.registeredBy,
        "senderUsername": _package.senderUsername,
        "sentDate": _package.sentDate,
        "status": _package.status,
        "weight": _package.weight
      }
    )
  }

  updatePackage(_package: any) {
    return this.http.post<any>(
      apiUrls.updatePackageUrl,
      {
        "companySymbol": _package.companySymbol,
        "eta": _package.eta,
        "id": _package.id,
        "name": _package.name,
        "price": _package.price,
        "recipient": _package.recipient,
        "recipientAddress": _package.recipientAddress,
        "registeredBy": _package.registeredBy,
        "senderUsername": _package.senderUsername,
        "sentDate": _package.sentDate,
        "status": _package.status,
        "weight": _package.weight
      }
    )
  }

  deletePackage(packageId: any) {
    let httpParams = new HttpParams().set('id', packageId);
    let options = { params: httpParams };

    return this.http.delete<any>(
      apiUrls.deletePackageUrl,
      options
    )
  }
}

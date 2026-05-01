import { BaseHttpRequest } from "../core/BaseHttpRequest";
import { CancelablePromise } from "../core/CancelablePromise";
import { Manufacturer } from "../models/Manufacturer";

export class ManufacturersService {
  constructor(public readonly httpRequest: BaseHttpRequest) { }

  public getManufacturers(): CancelablePromise<Manufacturer[]> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/manufacturers',
      mediaType: 'application/json',
    })
  }

  public getManufacturer(id: string): CancelablePromise<Manufacturer> {
    return this.httpRequest.request({
      method: 'GET',
      url: `/manufacturers/${id}`,
      mediaType: 'application/json',
    })
  }

  public createManufacturer(requestBody: Omit<Manufacturer, 'id'>): CancelablePromise<Manufacturer> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/manufacturers',
      body: requestBody,
      mediaType: 'application/json',
    })
  }

  public uploadManufacturerImage(id: number, file: File): CancelablePromise<Manufacturer> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpRequest.request({
      method: 'POST',
      url: `/manufacturers/${id}/upload-image`,
      body: formData,
      mediaType: 'multipart/form-data',
    })
  }

  public deleteManufacturerImage(id: number): CancelablePromise<Manufacturer> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: `/manufacturers/${id}/delete-image`,
      mediaType: 'application/json',
    })
  }
}

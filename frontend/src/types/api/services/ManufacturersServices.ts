import { BaseHttpRequest } from "../core/BaseHttpRequest";
import { CancelablePromise } from "../core/CancelablePromise";
import { Manufacturer } from "../models/Manufacturer";

export class ManufacturersService {
  constructor(public readonly httpRequest: BaseHttpRequest) { }
  //   /**
  //  * @param requestBody
  //  * @returns { message: string } | { error: string }
  //  * @throws ApiError
  //  */

  public getManufacturers(): CancelablePromise<Manufacturer[]> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/manufacturers',
      mediaType: 'application/json',
    })
  }
}
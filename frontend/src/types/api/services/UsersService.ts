import type { CancelablePromise } from '../core/CancelablePromise'
import type { BaseHttpRequest } from '../core/BaseHttpRequest'

export class UsersService {
  constructor(public readonly httpRequest: BaseHttpRequest) { }

  /**
   * @param requestBody
   * @returns { message: string } | { error: string }
   * @throws ApiError
   */
  public usersCreate(requestBody: {
    fullName: string;
    username: string;
    password: string;
  }): CancelablePromise<{ message?: string; error?: string }> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/auth/register',
      body: requestBody,
      mediaType: 'application/json',
    })
  }
}

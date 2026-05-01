import type { CancelablePromise } from '../core/CancelablePromise'
import type { BaseHttpRequest } from '../core/BaseHttpRequest'
import { CustomUser } from '../models/CustomUser';

type RegisterRequest = {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export class UsersService {
  constructor(public readonly httpRequest: BaseHttpRequest) { }

  public usersCreate(requestBody: RegisterRequest): CancelablePromise<{ message?: string; error?: string }> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/auth/register',
      body: requestBody,
      mediaType: 'application/json',
    })
  }

  public getUsers(): CancelablePromise<CustomUser[]> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/users',
      mediaType: 'application/json',
    })
  }

  public getUser(id: number): CancelablePromise<CustomUser> {
    return this.httpRequest.request({
      method: 'GET',
      url: `/users/${id}`,
      mediaType: 'application/json',
    })
  }

  public createManagerUser(requestBody: RegisterRequest): CancelablePromise<string> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/users/manager',
      body: requestBody,
      mediaType: 'application/json',
    })
  }

  public createAdminUser(requestBody: RegisterRequest): CancelablePromise<string> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/users/admin',
      body: requestBody,
      mediaType: 'application/json',
    })
  }

  public deleteUser(id: number): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: `/users/${id}`,
      mediaType: 'application/json',
    })
  }
}

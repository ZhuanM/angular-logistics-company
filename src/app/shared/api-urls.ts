import { environment } from 'src/environments/environment';

export const apiUrls = {
  // Authentication
  loginUrl: environment.apiBaseUrl + 'authenticate',
  registerUrl: environment.apiBaseUrl + 'api/users/register',
  // Users
  getUserUrl: environment.apiBaseUrl + 'api/users/user',
  getAllUsersUrl: environment.apiBaseUrl + 'api/users/all',
  updateUserUrl: environment.apiBaseUrl + 'api/users/update',
  deleteUserUrl: environment.apiBaseUrl + 'api/users/delete',
  // Packages
  getAllPackagesUrl: environment.apiBaseUrl + 'api/deliveries/all',
  getUserPackagesUrl: environment.apiBaseUrl + 'api/deliveries/all/user',
  createPackageUrl: environment.apiBaseUrl + 'api/deliveries/save',
  updatePackageUrl: environment.apiBaseUrl + 'api/deliveries/update',
  deletePackageUrl: environment.apiBaseUrl + 'api/deliveries/delete',
  // Offices
  getAllOfficesUrl: environment.apiBaseUrl + 'api/offices/all',
  createOfficeUrl: environment.apiBaseUrl + 'api/offices/save',
  updateOfficeUrl: environment.apiBaseUrl + 'api/offices/update',
  deleteOfficeUrl: environment.apiBaseUrl + 'api/offices/delete',
  // Employees
  getAllEmployeesUrl: environment.apiBaseUrl + 'api/users/employees',
  // Customers
  getAllCustomersUrl: environment.apiBaseUrl + 'api/users/customers',
  // Company
  getCompanyName: environment.apiBaseUrl + 'api/company/name',
  getCompanyProfit: environment.apiBaseUrl + 'api/company/profit',
}

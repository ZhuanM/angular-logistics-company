import { environment } from 'src/environments/environment';

// TODO MORE CALLS
export const apiUrls = {
  // Authentication
  loginUrl: environment.apiBaseUrl + 'authenticate', // DONE
  registerUrl: environment.apiBaseUrl + 'api/users/register', // DONE
  // Users
  getUserUrl: environment.apiBaseUrl + 'api/users/user', // DONE
  getAllUsersUrl: environment.apiBaseUrl + 'api/users/all',
  updateUserUrl: environment.apiBaseUrl + 'api/users/update',
  deleteUserUrl: environment.apiBaseUrl + 'api/users/delete',
  // Packages
  getAllPackagesUrl: environment.apiBaseUrl + 'api/deliveries/all',
  createPackageUrl: environment.apiBaseUrl + 'api/deliveries/save', // DONE
  updatePackageUrl: environment.apiBaseUrl + 'api/deliveries/update',
  deletePackageUrl: environment.apiBaseUrl + 'api/deliveries/delete',
  // Offices
  getAllOfficesUrl: environment.apiBaseUrl + 'api/offices/all', // DONE
  createOfficeUrl: environment.apiBaseUrl + 'api/offices/save', // DONE
  updateOfficeUrl: environment.apiBaseUrl + 'api/offices/update', // DONE
  deleteOfficeUrl: environment.apiBaseUrl + 'api/offices/delete', // DONE
  // TODO COMPANY
  
}

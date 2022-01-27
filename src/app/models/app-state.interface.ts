import * as fromAuth from '../auth/store/auth.reducer';
import * as fromLoader from '../loader/store/loader.reducer';
import * as fromHeader from '../header/store/header.reducer';
import * as fromHome from '../home/store/home.reducer';
import * as fromPackages from '../packages/store/packages.reducer';
import * as fromSendPackage from '../send-package/store/send-package.reducer';
import * as fromCompany from '../company/store/company.reducer';
import * as fromEmployees from '../employees/store/employees.reducer';
import * as fromCustomers from '../customers/store/customers.reducer';
import * as fromOffices from '../offices/store/offices.reducer';

export interface AppState {
    auth: fromAuth.State,
    loader: fromLoader.State
    header: fromHeader.State,
    home: fromHome.State,
    packages: fromPackages.State,
    sendPackage: fromSendPackage.State,
    company: fromCompany.State,
    employees: fromEmployees.State,
    customers: fromCustomers.State,
    offices: fromOffices.State,
};
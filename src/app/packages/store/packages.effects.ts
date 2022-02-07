import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { PackagesService } from '../packages.service';
import * as PackagesActions from './packages.actions';


@Injectable()
export class PackagesEffects {
    constructor(
        private actions$: Actions,
        private packagesService: PackagesService,
    ) { }

    getAllPackages$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PackagesActions.getAllPackages),
            switchMap(action => {
                return this.packagesService.getAllPackages()
                    .pipe(
                        map(response => {
                            return PackagesActions.getAllPackagesSuccess(
                                {
                                    packages: response,
                                }
                            )
                        }),
                    );
            })
        )
    );

    getUserPackages$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PackagesActions.getUserPackages),
            switchMap(action => {
                return this.packagesService.getUserPackages(action.username)
                    .pipe(
                        map(response => {
                            return PackagesActions.getUserPackagesSuccess(
                                {
                                    packages: response,
                                }
                            )
                        }),
                    );
            })
        )
    );

    createPackage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PackagesActions.createPackage),
            switchMap(action => {
                return this.packagesService.createPackage(action.package)
                    .pipe(
                        map(response => {
                            return PackagesActions.createPackageSuccess();
                        })
                    )
            })
        )
    );

    updatePackage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PackagesActions.updatePackage),
            switchMap(action => {
                return this.packagesService.updatePackage(action.package)
                    .pipe(
                        map(response => {
                            return PackagesActions.updatePackageSuccess();
                        })
                    )
            })
        )
    );

    deletePackage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PackagesActions.deletePackage),
            switchMap(action => {
                return this.packagesService.deletePackage(action.packageId)
                    .pipe(
                        map(response => {
                            return PackagesActions.deletePackageSuccess();
                        })
                    )
            })
        )
    );
}

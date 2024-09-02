import {APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideEffects} from "@ngrx/effects";
import {provideState, provideStore} from "@ngrx/store";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {localStorageSync} from "ngrx-store-localstorage";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {AuthEffects} from "./store/effects/auth.effect";
import {authReducer} from "./store/reducers/auth.reducer";
import {usersReducer} from "./store/reducers/users.reducer";
import {UsersEffects} from "./store/effects/users.effect";
import {AuthFacade} from "./facades/auth-facade.service";

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideEffects([
            AuthEffects,
            UsersEffects
        ]),
        provideStore([], {
            metaReducers: [
                localStorageSync({keys: ['auth', 'users'], rehydrate: true})
            ]
        }),
        provideState('auth', authReducer),
        provideState('users', usersReducer),
        provideStoreDevtools({maxAge: 25}),
        provideAnimationsAsync(),
        {
            provide: APP_INITIALIZER,
            useFactory: (facade: AuthFacade) => () => facade.seedUsers([
                {id: 1, username: 'admin', password: 'admin', role: 'admin'},
                {id: 2, username: 'user', password: 'user', role: 'user'},
            ]),
            deps: [AuthFacade],
            multi: true
        }
    ]
};

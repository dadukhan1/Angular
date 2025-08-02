import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';
import { ErrorService } from '../../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/places',
      'An error has been occured. Please try again later.'
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/user-places',
      'An error has been occured. Please try again later.'
    ).pipe(
      tap({
        next: (userPlaces) => this.userPlaces.set(userPlaces),
      })
    );
  }

  addPlaceToUserPlaces(place: Place) {
    let oldPlaces = this.userPlaces();

    if (!oldPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set([...oldPlaces, place]);
    }

    return this.httpClient
      .put('http://localhost:3000/user-places', {
        placeId: place.id,
      })
      .pipe(
        catchError((err) => {
          this.userPlaces.set(oldPlaces);
          this.errorService.showError('Faild to store selected one.');
          return throwError(() => new Error('Faild to store selected one.'));
        })
      );
  }

  removeUserPlace(place: Place) {
    let oldPlaces = this.userPlaces();

    if (oldPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set(
        oldPlaces.filter((currPlace) => currPlace.id !== place.id)
      );
    }
    return this.httpClient
      .delete('http://localhost:3000/user-places/' + place.id)
      .pipe(
        catchError((err) => {
          this.userPlaces.set(oldPlaces);
          this.errorService.showError('Faild to delete the selected one.');
          return throwError(
            () => new Error('Faild to delete the selected one.')
          );
        })
      );
  }

  private fetchPlaces(url: string, errMessage: string) {
    return this.httpClient.get<{ places: Place[] }>(url).pipe(
      map((resPlaces) => resPlaces.places),
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(errMessage));
      })
    );
  }
}

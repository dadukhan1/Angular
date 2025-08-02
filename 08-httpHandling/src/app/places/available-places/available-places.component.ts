import { Component, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { DestroyRef } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  error = signal('');
  isFetching = signal(false);
  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);
  places = signal<Place[] | undefined>(undefined);

  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.placesService.loadAvailablePlaces().subscribe({
      next: (data) => {
        console.log(data);
        this.places.set(data);
      },
      error: (error) => {
        console.log(error.message);
        this.error.set(error.message);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSelectPlaces(place: Place) {
    const subscription = this.placesService
      .addPlaceToUserPlaces(place)
      .subscribe({
        next: (resData) => console.log(resData),
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}

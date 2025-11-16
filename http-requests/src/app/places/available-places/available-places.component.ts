import { Component, inject, signal, OnInit, DestroyRef } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);

  private destroyRef = inject(DestroyRef);
  private placesService = inject(PlacesService);

  isFetching = signal(false);
  error = signal<string>('');

  ngOnInit() {
    // get creates a "blueprint" for the get request, and then the subscribe is required to trigger the request
    this.isFetching.set(true);

    const subscription = this.placesService.loadAvailablePlaces()
    .subscribe({
      next: (places: Place[]) => {
        console.log(places);
        this.places.set(places);
      },
      error: (error: Error) => {
        this.error.set(error.message);
      },
      complete: () => {
        this.isFetching.set(false);
      }
    });

    // const subscription = this.httpClient.get<{ places: Place[] }>('http://localhost:3000/places')
    // .subscribe({
    //   next: (response) => {
    //     console.log(response);
    //     this.places.set(response.places);
    //   },
    //   error: (error) => {
    //     this.error.set(error.message);
    //   },
    //   complete: () => {
    //     this.isFetching.set(false);
    //   }
    // });

    this.destroyRef.onDestroy(() => {
      console.log('destroy');
      subscription.unsubscribe();
    });
  }

  onSelectPlace(selectedPlace: Place) {
    const subscription = this.placesService.addPlaceToUserPlaces(selectedPlace)
    .subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}

import { TestBed, async } from '@angular/core/testing';
import { Injectable, inject } from '@angular/core';
import { EventService } from './event.service';
import { Event } from "../models/event";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InMemoryDataService } from './in-memory-data.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { concatMap, tap, map } from 'rxjs/operators';


describe('EventService', () => {

  let eventService: EventService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        EventService
      ],
      imports: [
        HttpClientTestingModule,
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService)
      ]
    }).compileComponents();

    eventService = TestBed.get(EventService);

  }));

  it('should be created', async(() => {
          expect(eventService).toBeTruthy();
  }));

  it('can get events', async(() => {
    eventService.get()
      .subscribe(
        events => {
          console.log(events);
          expect(events.length).toBeGreaterThan(0, 'should have events');
        },
          () => fail('event.service.get failed')
        );
  }));


});

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

  it('can get an event by id', async(() => {
    eventService.getId(1)
      .subscribe(
        event => {
          console.log(event);
          expect(event.id).toEqual(1, 'failed to get event by id');
        },
          () => fail('event.service.getId failed')
        );
  }));

  it('can save an event', async(() => {
    let event: Event = {
      id: 2345,
      start_date: "2018-12-04 18:00",
      end_date: "2018-12-04 19:00",
      text: "Test Event"};

    let dbId: number = 0;

    eventService.insert(event)
      .subscribe(eventDb => {
        console.log("returned from backend...");
        console.log(eventDb);
        dbId = eventDb.id;
        expect(eventDb.id).toBeGreaterThan(2, 'id not greater than seed data');
      },
      () => fail('event created response not as expected')
      );

    eventService.getId(dbId)
      .subscribe(eventDb => {
        console.log("returned from db:");
        console.log(eventDb);
        expect(eventDb.text).toEqual('Test Event', 'text does not match');
      },
        () => fail('event not retrieved')
      );

  }));


});

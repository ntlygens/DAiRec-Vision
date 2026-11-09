import { Injectable, WritableSignal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInterface, ServiceScreenInterface, CardItemInterface } from '../models/ui-x';

/**
 * Loads page content from the DaiRec API once, at app start, into signals.
 * Pages read these signals directly, so content appears as soon as it arrives.
 */
@Injectable({
  providedIn: 'root',
})
export class GuiDataService {
  /** Same-origin API path: proxied to the content server (see server.ts and proxy.conf.json). */
  private apiUrl = '/api';

  /** Home service buttons (ODM.userInterface) */
  readonly allUserData$ = signal<UserInterface[]>([]);
  /** Home / landing service panels (ODM.srvcscrnInterface) */
  readonly allSrvcScrnData$ = signal<ServiceScreenInterface[]>([]);
  /** CCTV page content (drvdata.protectPgData) */
  readonly allProtectedPrdctsData$ = signal<CardItemInterface[]>([]);
  /** Surveillance page content (drvdata.surveilPgData) */
  readonly allSurveilPrdctsData$ = signal<CardItemInterface[]>([]);
  /** Drone page content (drvdata.dronePgData); the page falls back to bundled content if empty */
  readonly allDronePrdctsData$ = signal<CardItemInterface[]>([]);

  constructor(private http: HttpClient) {
    this.load('userInterface', this.allUserData$);
    this.load('srvcscrnInterface', this.allSrvcScrnData$);
    this.load('protectPgData', this.allProtectedPrdctsData$);
    this.load('surveilPgData', this.allSurveilPrdctsData$);
    this.load('dronePgData', this.allDronePrdctsData$);
  }

  private load<T>(endpoint: string, target: WritableSignal<T[]>) {
    this.http.get<T[]>(`${this.apiUrl}/${endpoint}`).subscribe({
      next: (data) => target.set(data ?? []),
      error: () => target.set([]),
    });
  }
}

import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserInterface, ServiceScreenInterface, CardItemInterface, CompType } from '../models/ui-x';

@Injectable({
  providedIn: 'root',
})
export class GuiDataService {
  private apiUrl = 'http://localhost:5200';
  private disjointedData$ = new BehaviorSubject<string | null>(null);

  // Observable for disjointed data
  public currentDisjointedData$: Observable<string | null> = this.disjointedData$.asObservable();
  
  // Method to update disjointed data
  updateDisjointedData(newData: string | null) {
    this.disjointedData$.next(newData);

  }


  allUserData$ = signal<UserInterface[]>([]);
  allSrvcScrnData$ = signal<ServiceScreenInterface[]>([]);
  allProtectedSrvcsData$ = signal<CardItemInterface[]>([]);
  allProtectedPrdctsData$ = signal<CardItemInterface[]>([]);
  allSurveilSrvcsData$ = signal<CardItemInterface[]>([]);
  allSurveilPrdctsData$ = signal<CardItemInterface[]>([]);
  allAccessSrvcsData$ = signal<CardItemInterface[]>([]);
  allAccessPrdctsData$ = signal<CardItemInterface[]>([]);

  uiData$ = signal<UserInterface>({} as UserInterface);
  ssiData$ = signal<ServiceScreenInterface>({} as ServiceScreenInterface);
  prtctData$ = signal<CardItemInterface>({} as CardItemInterface);
  srvlData = signal<CardItemInterface>({} as CardItemInterface);
  accsData = signal<CardItemInterface>({} as CardItemInterface);

  constructor(private http: HttpClient) {
    this.getAllUserData();
    this.getAllSrvcScrnData();
    this.getAllProtectedSrvcsData();
    this.getAllProtectedPrdctsData();
    // this.getAllSurveilSrvcsData();
    this.getAllSurveilPrdctsData();
    // this.getAllAccessSrvcsData();
    this.getAllAccessPrdctsData();
  }

  private refreshAllUserData() {
    this.http.get<UserInterface[]>(`${this.apiUrl}/userInterface`)
      .subscribe((data) => {
        this.allUserData$.set(data);
    });
  }

  private refreshAllSrvcScrnData() {
    this.http.get<ServiceScreenInterface[]>(`${this.apiUrl}/srvcscrnInterface`)
      .subscribe((data) => {
        this.allSrvcScrnData$.set(data);
    });
  }

  private refreshAllProtectedSrvcsData() {
    this.http.get<CardItemInterface[]>(`${this.apiUrl}/protectPgData`)
      .subscribe((data) => {
        this.allProtectedSrvcsData$.set(data);
    });
  }

  private refreshAllProtectedPrdctsData() {
    this.http.get<CardItemInterface[]>(`${this.apiUrl}/protectPgData`)
      .subscribe((data) => {
        this.allProtectedPrdctsData$.set(data);
    });
  }

  private refreshAllSurveilSrvcsData() {
    this.http.get<CardItemInterface[]>(`${this.apiUrl}/surveilPgData}`)
      .subscribe((data) => {
        this.allSurveilSrvcsData$.set(data);
    });
  }

  private refreshAllSurveilPrdctsData() {
    this.http.get<CardItemInterface[]>(`${this.apiUrl}/surveilPgData`)
      .subscribe((data) => {
        this.allSurveilPrdctsData$.set(data);
    });
  }

  private refreshAllAccessSrvcsData() {
    this.http.get<CardItemInterface[]>(`${this.apiUrl}/accessPgData}`)
      .subscribe((data) => {
        this.allAccessSrvcsData$.set(data);
    });
  }

  private refreshAllAccessPrdctsData() {
    this.http.get<CardItemInterface[]>(`${this.apiUrl}/accessPgData`)
      .subscribe((data) => {
        this.allAccessPrdctsData$.set(data);
    });
  }

  getAllUserData() {
    this.refreshAllUserData();
    return this.allUserData$;
  }

  getAllSrvcScrnData() {
    this.refreshAllSrvcScrnData();
    return this.allSrvcScrnData$;
  }

  getAllProtectedSrvcsData() {
    this.refreshAllProtectedSrvcsData();
    return this.allProtectedSrvcsData$;
  }

  getAllProtectedPrdctsData() {
    this.refreshAllProtectedPrdctsData();
    return this.allProtectedPrdctsData$;
  }

  getAllSurveilSrvcsData() {
    this.refreshAllSurveilSrvcsData();
    return this.allSurveilSrvcsData$;
  }

  getAllSurveilPrdctsData() {
    this.refreshAllSurveilPrdctsData();
    return this.allSurveilPrdctsData$;
  }

  getAllAccessSrvcsData() {
    this.refreshAllAccessSrvcsData();
    return this.allAccessSrvcsData$;
  }

  getAllAccessPrdctsData() {
    this.refreshAllAccessPrdctsData();
    return this.allAccessPrdctsData$;
  }

  getUserFieldUIData(id: string) {
    this.http.get<UserInterface>(`${this.apiUrl}/userInterface/${id}`)
      .subscribe(data => {
        this.uiData$.set(data);
        return this.uiData$();
    });
  }

  getSrvcScrnFieldIData(id: string) {
    this.http.get<ServiceScreenInterface>(`${this.apiUrl}/srvcscrnInterface/${id}`)
      .subscribe(data => {
        this.ssiData$.set(data);
        return this.ssiData$();
    });
  }

  getProtectedSrvcsFieldIData(id: string) {
    this.http.get<CardItemInterface>(`${this.apiUrl}/protectPgData/${id}`)
      .subscribe(data => {
        this.prtctData$.set(data);
        return this.prtctData$();
    });
  }

  getProtectedPrdctsFieldIData(id: string) {
    this.http.get<CardItemInterface>(`${this.apiUrl}/protectPgData/${id}`)
      .subscribe(data => {
        this.prtctData$.set(data);
        return this.prtctData$();
    });
  }

  createUIData(newData: UserInterface) {
    return this.http.post<UserInterface>(
      `${this.apiUrl}/userInterface`, 
      newData,
      {responseType: 'text' as 'json'}
    );
  }

  createSSIData(newData: ServiceScreenInterface) {
    return this.http.post<ServiceScreenInterface>(
      `${this.apiUrl}/srvcscrnInterface`, 
      newData,
      {responseType: 'text' as 'json'}
    );
  }

  createPRTCTData(newData: CardItemInterface) {
    return this.http.post<CardItemInterface>(
      `${this.apiUrl}/protectPgData`, 
      newData,
      {responseType: 'text' as 'json'}
    );
  }

  updateUIData(id: string, updatedData: UserInterface) {
    return this.http.put<UserInterface>(
      `${this.apiUrl}/userInterface/${id}`, 
      updatedData,
      {responseType: 'text' as 'json' });
  }

  updateSSIData(id: string, updatedData: ServiceScreenInterface) {
    return this.http.put<ServiceScreenInterface>(
      `${this.apiUrl}/srvcscrnInterface/${id}`, 
      updatedData,
      {responseType: 'text' as 'json' });
  }

  updatePRTCTData(id: string, updatedData: CardItemInterface) {
    return this.http.put<CardItemInterface>(
      `${this.apiUrl}/protectPgData/${id}`, 
      updatedData,
      {responseType: 'text' as 'json' });
  }

  deleteUIData(id: string) {
    return this.http.delete<void>(
      `${this.apiUrl}/userInterface/${id}`,
      {responseType: 'text' as 'json' });
  }

  deleteSSIData(id: string) {
    return this.http.delete<void>(
      `${this.apiUrl}/srvcscrnInterface/${id}`,
      {responseType: 'text' as 'json' });
  }

  deletePRTCTData(id: string) {
    return this.http.delete<void>(
      `${this.apiUrl}/protectPgData/${id}`,
      {responseType: 'text' as 'json' });
  }
}

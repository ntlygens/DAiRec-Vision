import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInterface, ServiceScreenInterface } from '../models/ui-x';

@Injectable({
  providedIn: 'root',
})
export class GuiDataService {
  private apiUrl = 'http://localhost:5200';
  allUserData$ = signal<UserInterface[]>([]);
  allSrvcScrnData$ = signal<ServiceScreenInterface[]>([]);
  uiData$ = signal<UserInterface>({} as UserInterface);
  ssiData$ = signal<ServiceScreenInterface>({} as ServiceScreenInterface);
  
  constructor(private http: HttpClient) {}

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

  getAllUserData() {
    this.refreshAllUserData();
    return this.allUserData$;
  }

  getAllSrvcScrnData() {
    this.refreshAllSrvcScrnData();
    return this.allSrvcScrnData$;
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
}

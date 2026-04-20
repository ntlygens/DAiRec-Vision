import { Component, OnInit, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { CardItemInterface } from '../../models/ui-x';
import { GuiDataService } from '../../services/gui-data-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'drv-surveillance',
  standalone: false,
  template: `
    <div class="dTextData">
      <h2>Real-Time Protection, Real Results.</h2>
        <p>
            The world doesn’t stop when you leave, business continues, families move about their day 
            and valuable assets remain in place. Your security shouldn’t pause either. 
            DaiRec Vision Security delivers advanced 24/7 video surveillance and remote monitoring solutions 
            designed to keep you constantly connected to what matters most.
        </p>
        <p>
            Through cutting-edge camera systems, intelligent motion detection, and real-time alerts, 
            we transform passive security into active protection, giving you confidence 
            whether you're across town or across the globe. With DaiRec Vision Security, 
            complete situational awareness lives in the palm of your hand with our mobile integration, 
            allowing you to view live feeds, review recorded footage, receive instant notifications, 
            and respond to incidents the moment they occur, anytime, anywhere.

        </p>
    </div>
    <div class="whyUsData">
      @for (srvl of srvlPrdcts$; track srvl._id; let idx = $index; let e = $even){
        @if (srvl.compType?.toString() === "article") {
            <drv-custom-card
              [id]="srvl._id"
              class="article-card"
              [elevated]=false
              [cardData]=srvl>
            </drv-custom-card>
            
        }
      }
    </div>
    <div class="srvlSrvcs">
      <!-- <mat-grid-list cols="2"> -->
      @for(srvc of srvlPrdcts$; track srvc._id; let idx = $index; let e = $even) {
        @if (srvc.compType?.toString() === "product") {
          <!-- <mat-grid-tile> -->
            <drv-custom-card 
              class="srvlSrvcs-card"
              [id]=srvc._id
              [clickable]="true"
              [elevated]="true"
              [compSize]?=srvc.compSize
              [compType]?=srvc.compType
              [cardData]=srvc
              ></drv-custom-card>
          <!-- </mat-grid-tile> -->
        }
      }
    <!-- </mat-grid-list> -->
    </div>
    <div class="dTextData">
      <h1>For Every Property TYPE</h1>
    </div>
    <div class="srvlSrvcType">
      @for (srvcT of srvlPrdcts$; track srvcT._id; let idx = $index;) {
        @if (srvcT.compType?.toString() === "feature") {
          <drv-jumbotron-component
            class="srvlSrvcType-tron"
              [data]="{
                title: srvcT.title,
                subtitle: srvcT.subtitle,
                description: srvcT.desc,
                content: srvcT.content,
                img: srvcT.img,
                imageAlt: srvcT.name,
                imagePosition: 'right',
                compSize: 'small',
                compType: srvcT.compType,
                backgroundColor: srvcT.backgroundColor,
                overlay: false,
              }"
              (buttonClick)="handleJumbotronButtonClick($event)"
              (imageLoad)="handleJumbotronImageLoad()">
          </drv-jumbotron-component>
        }
      }
    </div>
    <div class="dTextData">
      <h1 style="border-left: 0; padding-left: 0; text-align: center;">Experience True Peace of Mind.</h1>
      <h2>Schedule your remote monitoring consultation NOW!!!</h2>
        <p>
            The world doesn’t stop when you leave, business continues, families move about their day 
            and valuable assets remain in place. Your security shouldn’t pause either. 
            DaiRec Vision Security delivers advanced 24/7 video surveillance and remote monitoring solutions 
            designed to keep you constantly connected to what matters most.
        </p>
    </div>
    <a routerLink="monitor">Go to Remote Monitoring</a>
  `,
  styles: `
      :host {
          width: 100%; 
          margin: 0 0 90px;
          display: flex;
          flex-direction: column;
          justify-content:  space-between;
          text-align: center;
          h1:first-child {
              margin: 0 0 10px;
              text-align: left;
          }
      }
      div {
          margin: 0 0 20px;
      }

      .dTextData {
        text-align: left;
        margin-bottom: 3rem;
        h1 { 
            color: #2c3e50;
            font-size: 4.5rem;
            margin: 4rem 0 1.5rem 0.5rem;
            border-left: 15px double #2ecc71;
            padding-left: 0.5rem;
            line-height: initial;
            
        }
        
        h2 { 
            color: #2c3e50;
            font-size: 2.5rem;
            margin: 0 0 1.5rem 0.5rem;
            border-left: 15px double #2ecc71;
            padding-left: 0.5rem;
            line-height: initial;
            
        }
        
        p {
            font-size: 1.2rem;
            margin:0 2rem 1rem;
            color: #1c1818;
            line-height: 1.75rem;            
        }
        p:not(:last-child ){ text-indent: 14px };
      }
      

      // .whyUsData windows for about and service display
      .whyUsData {
        display: flex;
        justify-content: space-between;
        .article-card:first-child {
            // background-color: green;
            text-align: left;
            font-size: 18px;
            flex: 2;
            line-height: 1rem;
        }
        .article-card:not(:first-child) {
            // background-color: orange;
            margin-left: 10px;
            text-align: right;
            flex: 1;
        }
      }

      .srvlSrvcs {
          display: flex;
          justify-content: space-between;
          .srvlSrvcs-card:not(:first-child) {
              // width: 23%;
              margin-left: 10px;
              // flex: 1;
          }
      }

      .srvlSrvcType {
        display: inline-flex;
        overflow-x: scroll;
        width: auto;
        justify-content: space-between;

        .srvlSrvcType-tron {
          min-width: 600px;

        }
        .srvlSrvcType-tron:not(:first-child) {
          margin-left: 20px;
        }
      }
  `,
})
export class Surveillance implements OnInit {
  private subscription: Subscription = new Subscription();
  data2bDsplyd$: string | null = null;
  srvlSrvcData$ = {} as WritableSignal<CardItemInterface[]>;
  srvlPrdctData$ = {} as WritableSignal<CardItemInterface[]>;

  srvlSrvcs$: CardItemInterface[] = [];
  srvlPrdcts$: CardItemInterface[] = [];

  constructor (
    private router: Router,
    private uis: GuiDataService,
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.uis.currentDisjointedData$.subscribe(data => {
      data = data ? data : 'data0';
      this.data2bDsplyd$ = data;

      console.log('prtct data: ', data);
    })

    this.getAllSrvlData();
  }

  private getAllSrvlData() {
    // this.srvlSrvcData$ = this.uis.allSurveilSrvcsData$;
    this.srvlPrdctData$ = this.uis.allSurveilPrdctsData$;

    // this.srvlSrvcs$ = this.srvlSrvcData$();
    this.srvlPrdcts$ = this.srvlPrdctData$();
  }

  
  handleJumbotronButtonClick(event: any) {
    console.log('Jumbotron button clicked:', event);
    // Implement your logic here, e.g., navigate to a different page or show a modal
  }

  handleJumbotronImageLoad() {
    console.log('Jumbotron image loaded successfully.');
    // You can perform additional actions here if needed, such as hiding a loading spinner
  } 



}

import { Component, OnInit, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { CardItemInterface } from '../../models/ui-x';
import { GuiDataService } from '../../services/gui-data-service';

@Component({
  selector: 'drv-protection',
  standalone: false,
  template: `
    <div class="dTextData">
        <h2>Why Choose Professional Camera Installation?</h2>
        <p>
            Your property deserves eyes that never blink. DaiRec Vision Security transforms blind spots into complete visibility 
            with state-of-the-art CCTV installation and IP camera systems engineered for crystal-clear surveillance, day or night.
        </p>
        <p>
            Our expertise spans IP-based camera systems, CCTV networks, biometric and card-based access control, intrusion 
            detection, and remote monitoring platforms. From single-location deployments to multi-site enterprise installations, 
            we engineer scalable security architectures that protect assets, personnel, and property.
        </p>
    </div>
    <mat-grid-list cols="2">
      @for(pPrdcts of protectedPrdcts$; track pPrdcts._id; let idx = $index; let e = $even) {
        @if (pPrdcts.compType?.toString() === "product") {
          <mat-grid-tile>
            <drv-custom-card 
              [id]=pPrdcts._id
              [clickable]="true"
              [elevated]="true"
              [compSize]?=pPrdcts.compSize
              [compType]?=pPrdcts.compType
              [cardData]=pPrdcts
              ></drv-custom-card>
          </mat-grid-tile>
        }
      }
    </mat-grid-list>
    <div #promoBnr id=promoBnr class=promoBanner>
        <drv-custom-card
            title="Ready to Secure Your Property?"
            subtitle="Get a free consultation and custom security assessment today"
            content="Get 20% off on all our services! Use code PROMO20 at checkout. Don't miss out on this exclusive deal to elevate your experience with us."
            imageAlt="Promotion Banner"
            compSize="small"
            compType="banner">
        </drv-custom-card>
    </div>
    <div class="whyUsData">
      @for(pArtcl of protectedPrdcts$; track pArtcl._id; let idx = $index; let e = $even; let last = $last){
        @if(pArtcl.compType?.toString() === "article"){
          @if(idx > 0) {
            <drv-custom-card
              [id]="pArtcl._id"
              class="article-card"
              [elevated]=false
              [cardData]=pArtcl>
            </drv-custom-card>
          }
        }
      }
    </div>
    <div class=promoBanner>
        <drv-custom-card
            title="Stop Wondering. Start Watching."
            subtitle=""
            content="Get a free security assessment today!!!"
            imageAlt="Promotion Banner"
            compSize="medium"
            compType="banner">
        </drv-custom-card>
    </div>
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
        p:not(:last-child ){ text-indent: 14px }
      }

      .whyUsData {
        display: flex;
        justify-content: space-between;
        .article-card:first-child {
            // background-color: green;
            text-align: left;
            flex: 2;
        }
        .article-card:not(:first-child) {
            // background-color: orange;
            margin-left: 10px;
            text-align: right;
            flex: 1;
        }
      }
  `,
})
export class Protection implements OnInit {
  protectSrvcsData$ = {} as WritableSignal<CardItemInterface[]>
  protectPrdctsData$ = {} as WritableSignal<CardItemInterface[]>
  protectedSrvcs$: CardItemInterface[] = [];
  protectedPrdcts$: CardItemInterface[] = [];

  constructor(
    private router: Router,
    private uis: GuiDataService
  ) {
    this.getAllSrvcsData();
  }

  ngOnInit(): void {
    
  }

  private getAllSrvcsData() {
    this.protectSrvcsData$ = this.uis.allProtectedSrvcsData$;
    this.protectPrdctsData$ = this.uis.allProtectedPrdctsData$;
    // this.protectedSrvcs$ = this.protectSrvcsData$();
    this.protectedPrdcts$ = this.protectPrdctsData$();
    // console.log('amt: ', this.protectedSrvcs$.length);
    console.log('amt: ', this.protectedPrdcts$.length);
  }
}

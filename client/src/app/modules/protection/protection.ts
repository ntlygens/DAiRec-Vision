import { Component, OnInit, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { CardItemInterface } from '../../models/ui-x';
import { GuiDataService } from '../../services/gui-data-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'drv-protection',
  standalone: false,
  template: `
    <div class="dTextData">
        <h2>Why Choose Professional Installation?</h2>
        <p>
            Your property deserves eyes that never blink. DaiRec Vision Security designs and installs 4K CCTV and
            IP camera systems that eliminate blind spots and deliver crystal-clear video, day or night.
        </p>
        <p>
            Every system is planned around your property's layout and risks, installed by certified technicians,
            and set up so you can watch live and review footage from any device.
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
    @if (showPromo) {
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
    }
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
            subtitle="Free on-site security assessment"
            content="A certified technician maps your coverage, entry points and blind spots, and you receive a written camera plan and quote within 3–5 business days."
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
            color: var(--drv-navy);
            font-size: 2.5rem;
            margin: 0 0 1.5rem 0.5rem;
            border-left: 15px double var(--drv-green);
            padding-left: 0.5rem;
            line-height: initial;
            
        }
        
        
        p {
            font-size: 1.2rem;
            margin:0 2rem 1rem;
            color: var(--drv-text);
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
  /** Promotional banners stay hidden until there is a real, dated offer. */
  showPromo = false;
  private subscription: Subscription = new Subscription();

  data2bDsplyd$: string | null = null;

  protectSrvcsData$ = {} as WritableSignal<CardItemInterface[]>
  protectPrdctsData$ = {} as WritableSignal<CardItemInterface[]>
  
  protectedSrvcs$: CardItemInterface[] = [];
  protectedPrdcts$: CardItemInterface[] = [];

  constructor(
    private router: Router,
    private uis: GuiDataService
  ) {
    
  }

  ngOnInit(): void {
    this.subscription = this.uis.currentDisjointedData$.subscribe(data => {
      data = data ? data : 'data0';
      this.data2bDsplyd$ = data;

      console.log('prtct data: ', data);
    })

    this.getAllSrvcsData();
  }

  private getAllSrvcsData() {
    this.protectSrvcsData$ = this.uis.allProtectedSrvcsData$;
    this.protectPrdctsData$ = this.uis.allProtectedPrdctsData$;
    // this.protectedSrvcs$ = this.protectSrvcsData$();
    this.protectedPrdcts$ = this.protectPrdctsData$();
    // console.log('amt: ', this.protectedSrvcs$.length);
    // console.log('amt: ', this.protectedPrdcts$.length);
  }
}

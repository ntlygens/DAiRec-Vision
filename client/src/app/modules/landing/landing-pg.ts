import { Component, OnInit, WritableSignal } from '@angular/core';
import { GuiDataService } from '../../services/gui-data-service';
import { Router } from '@angular/router';
import { ServiceScreenInterface, CompSize } from '../../models/ui-x';
import { CardItem } from '../../models/comp-faces';

@Component({
  selector: 'dvz-landing-pg',
  standalone: false,
  template: `
      <h1>Primary Services</h1>
      <div class="call2action-cards">
        @for (c2a_btn of c2a_btns$; track c2a_btn._id; let idx = $index, e = $even) {
            <drv-custom-card
                [id]="c2a_btn._id"
                class="c2a_btn"
                (click)="goHome('home')"
                [elevated]= false
                [cardData]= c2a_btn>
            </drv-custom-card>
        }
      </div>
      <div class="srvcDataDsply">
        <drv-jumbotron-component
            [data]="{
                title: 'My Title here',
                subtitle: 'Article Sub-Title here',
                description: 'Discover the various services we offer to help you achieve your goals. From AI-driven insights to personalized recommendations, our services are designed to empower you with the tools and knowledge you need to succeed.',
                imageUrl: '/assets/backgrounds/collage-image-1.jpg',
                imageAlt: 'Service Display Illustration',
                backgroundColor: '#f0f0f0',
                imagePosition: 'background',
                compSize: 'medium',
                compType: 'banner',
                buttons: [
                    { label: 'Get Started', action: 'start', icon: 'rocket_launch', style: 'raised', color: 'primary' },
                    { label: 'Learn More', action: 'learn', icon: 'info', style: 'stroked', color: 'accent' }
                    
                ],
                overlay: true,
            }"
        
        />
      </div>
      <div class=promoBanner>
        <drv-custom-card
            title="Special Promotion"
            subtitle="Limited Time Offer"
            content="Get 20% off on all our services! Use code PROMO20 at checkout. Don't miss out on this exclusive deal to elevate your experience with us."
            imageAlt="Promotion Banner"
            compSize="small"
            compType="banner">
        </drv-custom-card>
      </div>
      <div class="whyUsData">
        @for (dsply of srvcDsplys$; track dsply._id; let idx = $index, e = $even, last = $last, first = $first) {
            @if ( idx < 2 ) {
                <drv-custom-card
                    [id]="dsply._id"
                    class="article-card"
                    [elevated]= false
                    [compType]="dsply.compType?.toString() || 'article'"
                    compSize="medium"
                    [srvcData]= dsply>
                </drv-custom-card>
            }
        }
      </div>
      <div class="testimonialsData">
        @for (i of generateArray(8); track i; let idx = $index, e = $even, last = $last, first = $first) {
            @if (i < virtualLimit) {
                <drv-custom-card
                    class="testimonial-card"
                    title="title.idx"
                    subtitle="subtitle.idx"
                    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    [elevated]= false
                    [isPlaceholder]="false"
                    compSize="small"
                    [compType]="'testimonial'">
                </drv-custom-card>
            }
        }
      </div>
      <button id="button" (click)="goHome('home')" mat-button>Go to Home</button>
  `,
  styles: [`
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

    // .call2action-cards as buttons
    .call2action-cards {
        display: inherit;
        max-height: 100px;
        height: 100px;
        width: inherit;
        margin: 20px 0;
    }
    .c2a_btn:not(:last-child):not(:first-child) {
        // background-color: purple;
        margin: 0 10px;
    }

    // .srvcDataDsply windows for cta and service display
    .srvcDataDsply {
        display: unset;
    }

    .promoBanner {
        display: flex;
        justify-content: center;
        .promo-banner {
            width: 100%;
        }
    }

    // .whyUsData windows for about and service display
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
    .testimonialsData {
        display: flex;
        justify-content: space-between;
        .testimonial-card:not(:first-child) {
            // width: 23%;
            margin-left: 10px;
            // flex: 1;
        }
    }
    

  `],
})
export class LandingPg implements OnInit {
    virtualLimit = 4;
    call2ActionBtns$ = {} as WritableSignal<CardItem[]>
    srvcDataDsplys$ = {} as WritableSignal<ServiceScreenInterface[]>
    // slctdSrvcCards$ = {} as WritableSignal<ServiceScreenInterface[]>;

    c2a_btns$: CardItem[] = [];
    srvcDsplys$: ServiceScreenInterface[] = [];

    constructor(
        private router: Router,
        private uis: GuiDataService,
    ) {
        // this.getAllSrvcScrnData();
        // this.cards$ = this.call2ActionCards$();
    }


    ngOnInit(): void {
        // this.getCall2ActionData();
        this.getAllSrvcScrnData();
    }

    generateArray(n: number): number[] {
        return [...Array(n).keys()];
    }

    goHome(data?: any) {
        // Navigate to the home page
        // window.location.href = 'home';
        this.router.navigate([`${data}`]);
    }
    
    private getAllSrvcScrnData() {
        // this.srvcScrnInterface$ = this.uis.allSrvcScrnData$;
        this.call2ActionBtns$ = this.uis.allUserData$;
        this.srvcDataDsplys$ = this.uis.allSrvcScrnData$;
        this.uis.getAllSrvcScrnData();
        this.uis.getAllUserData();
        // this.tiles$ = this.srvcScrnInterface$();
        this.c2a_btns$ = this.call2ActionBtns$();
        this.srvcDsplys$ = this.srvcDataDsplys$();

        // this.sntzeBackgroundImgs(this.srvcScrnInterface$());
    } 

}

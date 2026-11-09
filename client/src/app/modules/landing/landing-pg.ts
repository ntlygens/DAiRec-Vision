import { Component, OnInit, WritableSignal } from '@angular/core';
import { Subscription } from 'rxjs';
import { GuiDataService } from '../../services/gui-data-service';
import { Router } from '@angular/router';
import { ServiceScreenInterface, CompSize } from '../../models/ui-x';
import { CardItem } from '../../models/comp-faces';

@Component({
  selector: 'dvz-landing-pg',
  standalone: false,
  template: `
      <!-- <h1>Primary Services</h1>
      <div class="call2action-cards">
        @for (c2a_btn of c2a_btns$; track c2a_btn._id; let idx = $index, e = $even) {
            <drv-custom-card
                [id]="c2a_btn._id"
                class="c2a_btn"
                (click)="showDisjointedData('data' + idx)"
                [elevated]= false
                [cardData]= c2a_btn>
            </drv-custom-card>
        }
      </div> -->
      <section class="whyUsData" aria-label="Our services">
        @for (dsply of srvcDsplys$; track dsply._id; let idx = $index) {
            @if (idx < 2) {
                <article class="svc-card" [class.svc-card--dark]="idx === 1">
                    <h3>{{ dsply.title }}</h3>
                    @if (dsply.subtitle) {
                        <p class="svc-sub">{{ dsply.subtitle }}</p>
                    }
                    @if (dsply.content) {
                        <p class="svc-body">{{ dsply.content }}</p>
                    }
                    @if (dsply.rte) {
                        <a class="svc-link" [routerLink]="dsply.rte">Learn more <span aria-hidden="true">→</span></a>
                    }
                </article>
            }
        }
    </section>
      <div class="srvcDataDsply">
        @for (dsjntData of srvcDsplys$; track dsjntData._id; let idx = $index, e = $even, last = $last, first = $first) {
            @if (idx < 5) {
                @if (data2bDsplyd$ === 'data' + idx) {
                    <drv-jumbotron-component
                        [data]="{
                            title: dsjntData.title,
                            subtitle: dsjntData.subtitle,
                            description: dsjntData.desc,
                            content: dsjntData.content || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                            img: dsjntData.img || '/assets/backgrounds/collage-image-11.jpg',
                            imageAlt: dsjntData.name || 'Service Display Illustration',
                            backgroundColor: '#424040',
                            imagePosition: 'background',
                            compSize: 'large',
                            compType: 'banner',
                            buttons: [
                                { label: 'Get Started', url: '/', action: 'start', icon: 'rocket_launch', style: 'raised', color: 'primary' },
                                { label: 'Learn More', url: 'home', action: 'learn', icon: 'info', style: 'stroked', color: 'accent' }
                                
                            ],
                            overlay: true,
                        }"
                    
                    />
                }
                
            }
        }
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
      <div class=promoBanner>
        <drv-custom-card
            title="Special Promotion"
            subtitle="Limited Time Offer"
            content="Get 20% off on all our services! Use code PROMO20 at checkout. Don't miss out on this exclusive deal to elevate your experience with us."
            imageAlt="Promotion Banner"
            compSize="medium"
            compType="banner">
        </drv-custom-card>
      </div>
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

    .whyUsData {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 1.25rem;
        margin: 0 0 2.5rem;
        text-align: left;
      }
      .svc-card {
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 2rem 2.25rem;
        border-radius: 14px;
        background: linear-gradient(135deg, #ffffff 0%, #f1faf4 100%);
        border-left: 5px solid #2ecc71;
        box-shadow: 0 4px 14px rgba(26, 35, 50, 0.08);
        h3 {
          margin: 0 0 0.6rem;
          color: #2c3e50;
          font-size: 1.6rem;
          font-weight: 700;
          line-height: 1.25;
        }
        .svc-sub {
          margin: 0 0 1rem;
          color: #6b7785;
          font-size: 1rem;
          font-style: italic;
          line-height: 1.5;
        }
        .svc-body {
          margin: 0 0 1.25rem;
          color: #444;
          font-size: 1.05rem;
          line-height: 1.7;
          white-space: pre-line;   /* keep the paragraph breaks from the content */
          text-indent: 0;
        }
        .svc-link {
          margin-top: auto;
          align-self: flex-start;
          color: #27ae60;
          font-weight: 600;
          text-decoration: none;
          span { display: inline-block; transition: transform 0.2s; }
          &:hover span { transform: translateX(4px); }
        }
      }
      .svc-card--dark {
        background: linear-gradient(135deg, #1a2332 0%, #2c3e50 100%);
        border-left-color: #2ecc71;
        h3 { color: #ffffff; font-size: 1.35rem; }
        .svc-sub { color: #9fffc9; font-style: normal; }
        .svc-body { color: rgba(255, 255, 255, 0.82); font-size: 1rem; }
        .svc-link { color: #2ecc71; }
      }
      @media (max-width: 900px) {
        .whyUsData { grid-template-columns: 1fr; }
        .svc-card { padding: 1.5rem; }
        .svc-card h3 { font-size: 1.35rem; }
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
    private subscription: Subscription = new Subscription();
    // data2bDsplyd$ = {} as WritableSignal<string | null>;
    data2bDsplyd$: string | null = null;
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
        this.subscription = this.uis.currentDisjointedData$.subscribe(data => {
           data = data ? data : 'data0'; // Default to 'data0' if null
           this.data2bDsplyd$ = data;
       
           console.log('Received disjointed data in LandingPg:', data);
        });

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

    showDisjointedData(dataName: string) {
        console.log('Button clicked, showing disjointed data:', dataName);
        this.uis.updateDisjointedData(dataName);
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

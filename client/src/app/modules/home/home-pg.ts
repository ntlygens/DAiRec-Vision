import { Component, OnInit, WritableSignal } from '@angular/core';
import { Subscription } from 'rxjs';
import { GuiDataService } from '../../services/gui-data-service';
import { Router } from '@angular/router';
import { ServiceScreenInterface, CompSize } from '../../models/ui-x';
import { CardItem } from '../../models/comp-faces';

@Component({
  selector: 'dvz-home-pg',
  standalone: false,
  template: `


    <div class="dTextData">
        <h2>DAiRec Vision Security</h2>
        <p>
            Dairec Vision Security delivers comprehensive security system integration for residential and commercial 
            properties. Specializing in advanced surveillance infrastructure, access control solutions, and 24/7 alarm 
            monitoring, we provide end-to-end installation and maintenance services tailored to each client's risk profile.
        </p>
        <p>
            Our expertise spans IP-based camera systems, CCTV networks, biometric and card-based access control, intrusion 
            detection, and remote monitoring platforms. From single-location deployments to multi-site enterprise installations, 
                we engineer scalable security architectures that protect assets, personnel, and property.
        </p>
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

    <div class="call2action-cards">
        @for (c2a_btn of c2a_btns$; track c2a_btn._id; let idx = $index, e = $even) {
            <drv-custom-card
                [id]="c2a_btn._id"
                class="c2a_btn"
                (click)="showDisjointedData('data' + idx)"
                [elevated]= false
                [compType]="c2a_btn.compType?.toString() || 'button'"
                [cardData]= c2a_btn>
            </drv-custom-card>
        }
      </div>
      <div class="srvcDataDsply">
        <!-- div class="feature-icon">📹 🖥️ 🔐</div -->
        @for (dsjntData of srvcDsplys$; track dsjntData._id; let idx = $index, e = $even, last = $last, first = $first) {
            @if (idx < 5) {
                @if (data2bDsplyd$ === 'data' + idx) {
                    <drv-jumbotron-component
                        [data]="{
                            title: dsjntData.title,
                            subtitle: dsjntData.subtitle,
                            description: dsjntData.desc,
                            content: dsjntData.content || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                            img: dsjntData.img || '/assets/backgrounds/collage-image-1.jpg',
                            imageAlt: dsjntData.name || 'Service Display Illustration',
                            backgroundColor: '#66f2ee',
                            imagePosition: 'background',
                            compSize: 'medium',
                            compType: 'banner',
                            buttons: [
                                { label: 'Get Started', url: '/', action: 'start', icon: 'rocket_launch', style: 'raised', color: 'primary' },
                                { label: 'Learn More', url: dsjntData.rte, action: 'learn', icon: 'info', style: 'stroked', color: 'accent' }
                                
                            ],
                            overlay: true,
                        }"
                    
                    />
                }
                
            }
        }
      </div>

      
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
    <button mat-button (click)="onButtonClick()">Go to Landing</button>
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
          margin: 0 15px;
      }

      // .srvcDataDsply windows for cta and service display
      .srvcDataDsply {
          display: unset;
      }

      .feature-icon {
          font-size: 2.5rem;
          color: #2ecc71;
          margin: 2.5rem 0 1rem;

          position: absolute;
          left: 3.5rem;
          
          z-index: 5;

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
              font-size: 18px;
              flex: 2;
              line-height: 1rem;


          }
          .article-card:not(:first-child) {
              // background-color: orange;
              margin-left: 10px;
              text-align: right;
              color: #000;
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

export class HomePg implements OnInit {
    private subscription: Subscription = new Subscription();
  
    data2bDsplyd$: string | null = null;
    virtualLimit = 4;
    call2ActionBtns$ = {} as WritableSignal<CardItem[]>
    srvcDataDsplys$ = {} as WritableSignal<ServiceScreenInterface[]>
      // slctdSrvcCards$ = {} as WritableSignal<ServiceScreenInterface[]>;

    c2a_btns$: CardItem[] = [];
    srvcDsplys$: ServiceScreenInterface[] = [];

    constructor(
      private router: Router,
      private uis: GuiDataService
    ) { 
      this.getAllSrvcScrnData();
      this.getDisjointedData();
    }

    ngOnInit() {
    //   this.subscription = this.uis.currentDisjointedData$.subscribe(data => {
    //     data = data ? data : 'data0'; // Default to 'data0' if null
    //     this.data2bDsplyd$ = data;
    //   });

        // this.uis.getAllSrvcScrnData().subscribe(data => {
        //     this.srvcDataDsplys$.set(data);
        //     this.srvcDsplys$ = data;
        // });
        // this.uis.getAllUserData().subscribe(data => {
        //     this.call2ActionBtns$.set(data);
        //     this.c2a_btns$ = data;
        // });
    }

    getDisjointedData() {
        this.subscription = this.uis.currentDisjointedData$.subscribe(data => {
            data = data ? data : 'data0'; // Default to 'data0' if null
            this.data2bDsplyd$ = data;
        });
    }

    showDisjointedData(dataId: string) {
        this.data2bDsplyd$ = dataId;
    }

    generateArray(n: number): number[] {
        return [...Array(n).keys()];
    }

    onButtonClick() {
      this.router.navigate(['/']);
      console.log('Button clicked!');
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

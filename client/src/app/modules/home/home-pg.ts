import { Component } from '@angular/core';
import { GuiDataService } from '../../services/gui-data-service';
import { ServiceScreenInterface } from '../../models/ui-x';
import { CardItem } from '../../models/comp-faces';

@Component({
  selector: 'dvz-home-pg',
  standalone: false,
  template: `


    <div class="dTextData">
        <h2>DaiRec Vision Security</h2>
        <p>
            DaiRec Vision Security delivers comprehensive security system integration for residential and commercial 
            properties. Specializing in advanced surveillance infrastructure, access control solutions, and 24/7 alarm 
            monitoring, we provide end-to-end installation and maintenance services tailored to each client's risk profile.
        </p>
        <p>
            Our expertise spans IP-based camera systems, CCTV networks, biometric and card-based access control, intrusion 
            detection, and remote monitoring platforms. From single-location deployments to multi-site enterprise installations, 
            we engineer scalable security architectures that protect assets, personnel, and property.
        </p>
    </div>
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
                            content: dsjntData.content || 'Professional security design, installation and monitoring for homes and businesses across the Tri-State area.',
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
    
      @if (showTestimonials) {
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
      }

      <section class="whyUs" aria-labelledby="whyUsTitle">
        <h2 id="whyUsTitle">Why DaiRec Vision</h2>
        <div class="whyUs-grid">
          @for (f of trustFacts; track f.title) {
            <div class="whyUs-item">
              <mat-icon>{{ f.icon }}</mat-icon>
              <div>
                <h3>{{ f.title }}</h3>
                <p>{{ f.text }}</p>
              </div>
            </div>
          }
        </div>
      </section>
      @if (showPromo) {
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
      }
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
          color: var(--drv-green);
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

      /* .whyUsData / .svc-card panels: shared styles in styles.scss */
      .testimonialsData {
          display: flex;
          justify-content: space-between;
          .testimonial-card:not(:first-child) {
              // width: 23%;
              margin-left: 10px;
              // flex: 1;
          }
      }
    
  
      .whyUs {
        text-align: left;
        margin: 3rem 0 2rem;
        h2 {
          color: var(--drv-navy);
          font-size: 2.5rem;
          margin: 0 0 1.5rem 0.5rem;
          border-left: 15px double var(--drv-green);
          padding-left: 0.5rem;
          line-height: initial;
        }
      }
      .whyUs-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.25rem;
        margin: 0;
      }
      .whyUs-item {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
        margin: 0;
        padding: 1.4rem 1.5rem;
        background: #fff;
        border-radius: 12px;
        border-top: 3px solid var(--drv-green);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
        mat-icon { flex: none; color: var(--drv-green); font-size: 32px; width: 32px; height: 32px; }
        h3 { margin: 0 0 0.3rem; color: var(--drv-navy); font-size: 1.1rem; }
        p { margin: 0; color: var(--drv-text); line-height: 1.45; font-size: 0.95rem; }
      }
      @media (max-width: 960px) { .whyUs-grid { grid-template-columns: repeat(2, 1fr); } }
      @media (max-width: 600px) {
        .whyUs-grid { grid-template-columns: 1fr; }
        .whyUs h2 { font-size: 1.8rem; }
      }
`],
})

export class HomePg {
    /** Which service panel is shown under the service buttons. */
    data2bDsplyd$ = 'data0';
    virtualLimit = 4;
    /** Promotional banners are hidden until there is a real, dated offer. Set true to show. */
    showPromo = false;
    /** Placeholder testimonials stay hidden until there are real client reviews. */
    showTestimonials = false;
    /** Verified with the owner on 2026-11-08. Only list claims the business can back up. */
    trustFacts = [
      { icon: 'verified_user', title: 'Licensed & Insured', text: 'Fully licensed and insured for residential, commercial and enterprise work.' },
      { icon: 'engineering', title: 'Certified Technicians', text: 'Professional design and installation by certified technicians.' },
      { icon: 'security', title: '10 Years in Systems Security', text: 'A decade of IT and Microsoft 365 security experience behind every system.' },
      { icon: 'location_on', title: 'Locally Owned', text: 'Proudly serving homes and businesses across the Tri-State area.' },
      { icon: 'support_agent', title: '24/7 Professional Monitoring', text: 'Round-the-clock monitoring and dispatch with a monitoring plan.' },
      { icon: 'flight', title: 'FAA-Certified Drone Pilots', text: 'Aerial patrols managed by FAA Part 107 certified remote pilots.' },
    ];

    constructor(private uis: GuiDataService) {}

    /** Service buttons and panels, read live from the data service. */
    get c2a_btns$(): CardItem[] {
        return this.uis.allUserData$() as unknown as CardItem[];
    }
    get srvcDsplys$(): ServiceScreenInterface[] {
        return this.uis.allSrvcScrnData$();
    }

    showDisjointedData(dataId: string) {
        this.data2bDsplyd$ = dataId;
    }

    generateArray(n: number): number[] {
        return [...Array(n).keys()];
    }
}

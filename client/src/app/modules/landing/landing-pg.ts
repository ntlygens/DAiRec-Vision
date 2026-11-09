import { Component } from '@angular/core';
import { GuiDataService } from '../../services/gui-data-service';
import { ServiceScreenInterface } from '../../models/ui-x';

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
                            content: dsjntData.content || 'Professional security design, installation and monitoring for homes and businesses across the Tri-State area.',
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
      @if (showPromo) {
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
    

  `],
})
export class LandingPg {
    /** Which service panel is shown (the landing page shows the first). */
    data2bDsplyd$ = 'data0';
    virtualLimit = 4;
    /** Hidden until there is a real, dated offer / real client reviews. */
    showPromo = false;
    showTestimonials = false;

    constructor(private uis: GuiDataService) {}

    /** Service panels, read live from the data service. */
    get srvcDsplys$(): ServiceScreenInterface[] {
        return this.uis.allSrvcScrnData$();
    }

    generateArray(n: number): number[] {
        return [...Array(n).keys()];
    }
}

import { Component, OnInit, WritableSignal } from '@angular/core';
import { GuiDataService } from '../../services/gui-data-service';
import { Router } from '@angular/router';
import { UserInterface, ServiceScreenInterface } from '../../models/ui-x';
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
                compType: 'feature',
                buttons: [
                    { label: 'Get Started', action: 'start', icon: 'rocket_launch', style: 'raised', color: 'primary' },
                    { label: 'Learn More', action: 'learn', icon: 'info', style: 'stroked', color: 'accent' }
                    
                ],
                overlay: true,
            }"
        
        />
      </div>
      <div class="whyUsData">
        @for (dsply of srvcDsplys$; track dsply._id; let idx = $index, e = $even, last = $last, first = $first) {
            @if ( idx === 1 || idx === 0 ) {
                <drv-custom-card
                    [id]="dsply._id"
                    class="article-card"
                    [elevated]= false
                    [compType]="dsply.compType?.toString() || 'article'"
                    [srvcData]= dsply>
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

    // .whyUsData windows for about and service display
    .whyUsData {
        display: flex;
        justify-content: space-between;
        .article-card:first-child {
            // background-color: green;
            flex: 2;
        }
        .article-card:not(:first-child) {
            // background-color: orange;
            margin-left: 10px;
            flex: 1;
        }
    }
    

  `],
})
export class LandingPg implements OnInit {
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

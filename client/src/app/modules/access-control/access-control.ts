import { Component } from '@angular/core';

@Component({
  selector: 'drv-access-control',
  standalone: false,
  template: `
   <div class="dTextData">
        <h2>Smarter Access, Total Control.</h2>
        <p>
            Keys get copied, lost and never returned. DaiRec Vision Security replaces them with keycards, mobile
            credentials, PINs and biometric readers that you manage from one simple dashboard.
        </p>
        <p>
            Grant or revoke access instantly, schedule entry by person, door and time, and see every entry in a
            real-time audit log. Paired with your cameras, every door event comes with video verification.
        </p>
        <p>
            From a single front door to gates, elevators and multi-site campuses, we design, install and maintain
            access systems that grow with your property.
        </p>
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
        h1 { 
            color: var(--drv-navy);
            font-size: 4.5rem;
            margin: 4rem 0 1.5rem 0.5rem;
            border-left: 15px double var(--drv-green);
            padding-left: 0.5rem;
            line-height: initial;
            
        }
        
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
        p:not(:last-child ){ text-indent: 14px };
      }
      

      .accsSrvcs {
          display: flex;
          justify-content: space-between;
          .accsSrvcs-card:not(:first-child) {
              // width: 23%;
              margin-left: 10px;
              // flex: 1;
          }
      }

      .accsSrvcType {
        display: inline-flex;
        overflow-x: scroll;
        width: auto;
        justify-content: space-between;

        .accsSrvcType-tron {
          min-width: 600px;

        }
        .accsSrvcType-tron:not(:first-child) {
          margin-left: 20px;
        }
      }
  `,
})
export class AccessControl {}

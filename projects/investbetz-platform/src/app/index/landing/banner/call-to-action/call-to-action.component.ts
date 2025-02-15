import { Component } from '@angular/core';

@Component({
    selector: 'app-call-to-action',
    template: `
    <a class="banner__info__call-to-action waves-effect waves-red modal-trigger" href="#auth">Start Playing Now</a>
    `,
    styles:`
        .banner__info__call-to-action {
        color: #ffffff;
        text-transform: capitalize;
        background: #212121;
        padding: 20px;
        border-radius: 50px;
        display: inline-block;
        border: none;
        font-size: 1.5em;
    }

    .banner__info__call-to-action:hover {
        text-shadow: 0px 0px 6px rgba(255, 255, 255, 1);
        -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
        -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
        transition: all 0.4s ease 0s;
        text-decoration: none;
    }

    /* Extra small devices (phones, up to 480px) */
    @media screen and (max-width: 767px) {
        .banner__info__call-to-action {
            margin-bottom: 2em;
        }
    }
    `
})
export class CallToActionComponent {}

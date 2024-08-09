import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import PROPERTYSELECTEDMC from '@salesforce/messageChannel/PropertySelected__c';

const fields = [
    'Hutte__Property__c.Name',
    'Hutte__Property__c.Hutte__Address__c',
    'Hutte__Property__c.Hutte__City__c',
    'Hutte__Property__c.Hutte__Location__Latitude__s',
    'Hutte__Property__c.Hutte__Location__Longitude__s'
];

export default class PropertyMap extends LightningElement {
    address;
    error;
    markers;
    propertyId;
    subscription = null;
    zoomLevel = 14;

    @wire(MessageContext)
    messageContext;

    @wire(getRecord, { recordId: '$propertyId', fields })
    wiredRecord({ error, data }) {
        if (data) {
            this.error = undefined;
            const property = data.fields;
            this.address = `${property.Hutte__Address__c.value}, ${property.Hutte__City__c.value}`;
            this.markers = [
                {
                    location: {
                        Latitude: property.Hutte__Location__Latitude__s.value,
                        Longitude: property.Hutte__Location__Longitude__s.value
                    },
                    title: `${property.Name.value}`,
                    description: `<b>Address</b>: ${property.Hutte__Address__c.value}`,
                    mapIcon: {
                        path: 'M1472 992v480q0 26-19 45t-45 19h-384v-384h-256v384h-384q-26 0-45-19t-19-45v-480q0-1 .5-3t.5-3l575-474 575 474q1 2 1 6zm223-69l-62 74q-8 9-21 11h-3q-13 0-21-7l-692-577-692 577q-12 8-24 7-13-2-21-11l-62-74q-8-10-7-23.5t11-21.5l719-599q32-26 76-26t76 26l244 204v-195q0-14 9-23t23-9h192q14 0 23 9t9 23v408l219 182q10 8 11 21.5t-7 23.5z',
                        fillColor: '#f28b00',
                        fillOpacity: 1,
                        strokeWeight: 1,
                        scale: 0.02
                    }
                }
            ];
        } else if (error) {
            this.error = error;
            this.address = undefined;
            this.markers = [];
        }
    }

    @api
    get recordId() {
        return this.propertyId;
    }

    set recordId(propertyId) {
        this.propertyId = propertyId;
    }

    connectedCallback() {
        this.subscription = subscribe(this.messageContext, PROPERTYSELECTEDMC, (message) => {
            this.handlePropertySelected(message);
        });
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    handlePropertySelected(message) {
        this.propertyId = message.propertyId;
    }
}
import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-methods-settings',
  templateUrl: './payment-methods-settings.component.html',
  styleUrl: './payment-methods-settings.component.less'
})
export class PaymentMethodsSettingsComponent {
  paymentMethods = [
    {
      name: 'Credit Card',
      description: 'Allow customers to pay using Visa, MasterCard, etc.',
      enabled: true
    },
    {
      name: 'PayPal',
      description: 'Enable PayPal transactions through secure gateway.',
      enabled: false
    },
    {
      name: 'Apple Pay',
      description: 'Accept payments through Apple Pay on supported devices.',
      enabled: true
    },
    {
      name: 'Bank Transfer',
      description: 'Allow manual transfers through bank accounts.',
      enabled: false
    }
  ];
}

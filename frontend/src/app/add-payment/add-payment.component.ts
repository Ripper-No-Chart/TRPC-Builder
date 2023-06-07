import { Component } from '@angular/core';
import { PaymentsService } from '../services/payments.service';
import { Payments } from '../../../../backend/src/api/payment/interfaces';
import { NgForm } from '@angular/forms';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Router } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { Navigation } from '../interfaces/navigation';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss'],
})
export class AddPaymentComponent {
  constructor(
    private api: PaymentsService,
    private router: Router,
    private navigationService: NavigationService
  ) {
    this.navigationService.getData().subscribe({
      next: ({ budget_id, budget_name, statistics }: Navigation) => {
        this.navigation = {
          budget_id,
          budget_name,
          statistics,
        };
      },
    });
  }

  public navigation: Navigation = {
    budget_id: '',
    budget_name: '',
    statistics: undefined,
  };

  public payment: Payments = {
    budget_id: '',
    ammount: 0,
    description: '',
  };

  private async errorModal(title: string): Promise<SweetAlertResult<any>> {
    return await Swal.fire({
      title,
      icon: 'error',
      allowOutsideClick: false,
    });
  }

  async createPayment(paymentForm: NgForm): Promise<void> {
    if (!paymentForm.valid) {
      await this.errorModal('Format error');
      return;
    }

    const { description, ammount }: Payments = paymentForm.value;
    const { budget_id } = this.navigation;

    return await Swal.fire({
      title: 'Payment income',
      html: `<pre style="font-family: Roboto">Description: ${description}<br />Ammount: ${ammount}<br />Continue?</pre>`,
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      allowOutsideClick: false,
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          const payment: Payments = {
            budget_id,
            description,
            ammount,
          };
          await this.api.create(payment);
          Swal.fire('Payment generated successfully!', '', 'success').then(
            async () => {
              await this.router.navigate(['/payments']);
            }
          );
          return;
        }
      })
      .catch(async (e: unknown) => {
        await this.errorModal((e as Error).message);
      });
  }
  async backButton(): Promise<boolean> {
    this.navigationService.setData(this.navigation);
    return await this.router.navigate(['/payments']);
  }
}

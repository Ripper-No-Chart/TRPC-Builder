import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  Statistics,
  Payments,
} from '../../../../backend/src/api/payment/interfaces';
import { PaymentsService } from '../services/payments.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Router } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { Navigation } from '../interfaces/navigation';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent {
  constructor(
    private api: PaymentsService,
    private router: Router,
    private navigationService: NavigationService
  ) {
    this.navigationService.getData().subscribe({
      next: ({ budget_id, budget_name }: Navigation) => {
        this.navigation = {
          budget_id,
          budget_name,
        };
      },
    });
  }

  public navigation: Navigation = {
    budget_id: '',
    budget_name: '',
  };

  public statistics: Statistics = {
    budget: {
      description: '',
      ammount: 0,
    },
    ammount: 0,
    payments: 0,
    records: [],
  };

  public displayedColumns: string[] = [
    'position',
    'description',
    'ammount',
    'created_at',
    'actions',
  ];

  public dataSource: MatTableDataSource<Payments> =
    new MatTableDataSource<Payments>();

  async ngOnInit(): Promise<void> {
    await this.getPayments();
  }

  async getPayments(): Promise<Statistics> {
    this.statistics = await this.api.get(this.navigation.budget_id);
    this.dataSource = new MatTableDataSource(this.statistics.records);
    this.navigation.statistics = this.statistics;
    return this.statistics;
  }

  private async errorModal(title: string): Promise<SweetAlertResult<any>> {
    return await Swal.fire({
      title,
      icon: 'error',
      allowOutsideClick: false,
    });
  }

  async removePayment(_id: string, ammount: number): Promise<void> {
    return await Swal.fire({
      title: 'Remove payment?',
      html: `<pre style="font-family: Roboto">You are about to remove a payment with the amount ${ammount}.<br /> You want to continue?</pre>`,
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      allowOutsideClick: false,
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          await this.api.remove(_id);
          Swal.fire('Payment removed!', '', 'success').then(async () => {
            await this.getPayments();
          });
          return;
        }
      })
      .catch(async (e: unknown) => {
        await this.errorModal((e as Error).message);
      });
  }

  async addPayment(): Promise<boolean> {
    this.navigationService.setData(this.navigation);
    return await this.router.navigate(['/add_payment']);
  }
}

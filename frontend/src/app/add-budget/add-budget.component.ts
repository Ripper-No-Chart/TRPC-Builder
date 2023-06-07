import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Router } from '@angular/router';
import { Budget } from '../../../../backend/src/api/budget/interfaces';
import { BudgetsService } from '../services/budgets.service';

@Component({
  selector: 'app-add-budget',
  templateUrl: './add-budget.component.html',
  styleUrls: ['./add-budget.component.scss'],
})
export class AddBudgetComponent {
  constructor(private api: BudgetsService, private router: Router) {}

  public budget: Budget = {
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

  async createBudget(budgetForm: NgForm): Promise<void> {
    if (!budgetForm.valid) {
      await this.errorModal('Format error');
      return;
    }

    const { description, ammount }: Budget = budgetForm.value;

    return await Swal.fire({
      title: 'Budget income',
      html: `<pre style="font-family: Roboto">Description: ${description}<br />Ammount: ${ammount}<br />Continue?</pre>`,
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      allowOutsideClick: false,
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          const budget: Budget = {
            description,
            ammount,
          };
          await this.api.create(budget);
          Swal.fire('Buget generated successfully!', '', 'success').then(
            async () => {
              await this.router.navigate(['/']);
            }
          );
          return;
        }
      })
      .catch(async (e: unknown) => {
        await this.errorModal((e as Error).message);
      });
  }
}

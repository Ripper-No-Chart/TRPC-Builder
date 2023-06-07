import { Component } from '@angular/core';
import { BudgetsService } from '../services/budgets.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Budget } from '../../../../backend/src/api/budget/interfaces';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss'],
})
export class BudgetsComponent {
  constructor(
    private apiBudgets: BudgetsService,
    private router: Router,
    private navigationService: NavigationService
  ) {}

  public budgets: Budget[] = new Array<Budget>();

  public displayedColumns: string[] = [
    'position',
    'description',
    'ammount',
    'created_at',
    'payments',
  ];

  public dataSource: MatTableDataSource<Budget> =
    new MatTableDataSource<Budget>();

  async ngOnInit(): Promise<void> {
    await this.getBudgets();
  }

  async getBudgets(): Promise<Array<Budget>> {
    this.budgets = await this.apiBudgets.get();
    this.dataSource = new MatTableDataSource(this.budgets);
    return this.budgets;
  }

  async newBudget(): Promise<boolean> {
    return await this.router.navigate(['/add_budget']);
  }

  async listPayments(budget_id: string, budget_name: string): Promise<boolean> {
    this.navigationService.setData({ budget_id, budget_name });
    return await this.router.navigate(['/payments']);
  }
}

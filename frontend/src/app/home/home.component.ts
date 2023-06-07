import { Component } from '@angular/core';
import { BudgetsService } from '../services/budgets.service';
import { Budget } from '../../../../backend/src/api/budget/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public budgets: Budget[] = new Array<Budget>();

  constructor(private api: BudgetsService) {}

  async ngOnInit() {
    await this.getBudgets();
  }

  async getBudgets(): Promise<Array<Budget>> {
    return (this.budgets = await this.api.get());
  }
}

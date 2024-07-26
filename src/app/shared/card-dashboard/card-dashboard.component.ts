import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { Account } from 'src/app/core/types/account';
import { AvailableProducts } from 'src/app/core/types/available-products';

@Component({
  selector: 'app-card-dashboard',
  templateUrl: './card-dashboard.component.html',
  styleUrls: ['./card-dashboard.component.scss'],
})
export class CardDashboardComponent implements OnInit {
  accounts: Account[] = [];
  availableProducts: AvailableProducts[] = [];
  selected = '';
  selectedAccount: Account | undefined;
  errorMessage: string = ''; // Property to hold error messages

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAccounts().subscribe({
      next: (data) => {
        console.log('Accounts:', data);
        this.accounts = data
      },
      error: (error) => {
        console.error('Error fetching accounts:', error);
      },
      complete: () => {
        console.log('Fetch accounts complete');
      }
    });
  }
  onAccountChange(): void {
    this.errorMessage = ''
    // this.availableProducts = []; // Clear available products
    // this.selected = ''
    if (this.selectedAccount) {
      var selectedAccountNumber: string = this.selectedAccount.accountNumber
      this.apiService.getAvailableProducts(selectedAccountNumber).subscribe({
        next: data => {
          this.availableProducts = data;
          console.log('Available Products:', this.availableProducts);
        },
        error: error => {
          console.error('Error fetching available products:', error);
          if (error.status === 422) {
            this.availableProducts = []; // Clear available products
            this.selected = ''; // Or any value indicating 'None'
            this.errorMessage = 'Esta conta não possui antenas cadastradas.';
            console.log('422 error: Setting selected antenna to None');
          } else {
            this.errorMessage = 'Um erro ocorreu ao consultar produtos.'; // Handle other errors
          }
        },
        complete: () => {
          console.log('Fetch available products complete');
        }
      });
    }
  }
}


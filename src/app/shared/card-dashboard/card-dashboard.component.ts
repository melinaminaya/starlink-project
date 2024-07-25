import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { AvailableProducts } from 'src/app/core/types/available-products';

@Component({
  selector: 'app-card-dashboard',
  templateUrl: './card-dashboard.component.html',
  styleUrls: ['./card-dashboard.component.scss']
})
export class CardDashboardComponent implements OnInit{
  accounts: any[] = [];
  availableProducts: AvailableProducts[] = [];
  selected = '';
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAccounts().subscribe({
      next: (data) => {
        console.log('Accounts:', data);
      },
      error: (error) => {
        console.error('Error fetching accounts:', error);
      },
      complete: () => {
        console.log('Fetch accounts complete');
      }
    });
    this.apiService.getAvailableProducts().subscribe({
      next: (data) => {
        console.log('Available Products:', data);
        this.availableProducts = data;
      },
      error: (error) => {
        console.error('Error fetching available products:', error);
      },
      complete: () => {
        console.log('Fetch available products complete');
      }
    });
  }
}

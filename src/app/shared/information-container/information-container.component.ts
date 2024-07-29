import { Component, OnInit } from '@angular/core';
const DummyData = {
  totalNominalGDP: [
    { name: 'Country A', value: 21.4 },
    { name: 'Country B', value: 14.3 },
    { name: 'Country C', value: 5.5 }
  ],
  chart1: [
    { name: 'A', value: 30 },
    { name: 'B', value: 70 }
  ],
  chart2: [
    { name: 'C', value: 40 },
    { name: 'D', value: 60 }
  ],
  chart3: [
    { name: 'E', value: 50 },
    { name: 'F', value: 50 }
  ]
};

@Component({
  selector: 'app-information-container',
  templateUrl: './information-container.component.html',
  styleUrl: './information-container.component.scss'
})
export class InformationContainerComponent  implements OnInit {
  charts = [
    { title: 'Chart 1', data: DummyData.chart1 },
    { title: 'Chart 2', data: DummyData.chart2 },
    { title: 'Chart 3', data: DummyData.chart3 },
    { title: 'Total Nominal GDP', data: DummyData.totalNominalGDP }
  ];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  

  view: [number, number] = [400, 300];
  animations = false;
  legend = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  yAxisLabel = "Amount in Trillions ($)";


  dataLabelFormatter(tooltipText: any) {
    return "$" + tooltipText + " trillion";
  }
  constructor() { }

  ngOnInit(): void {
  }
}
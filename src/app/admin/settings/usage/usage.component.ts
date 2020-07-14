import { Component, OnInit } from '@angular/core';
import { SingleDataSet, Label } from 'ng2-charts';
import { ChartType, ChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { UtilsService } from '../../../services/utils.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.css']
})
export class UsageComponent implements OnInit {

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [['Used Space'], ['Remaining Space']];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)'],
    },
  ];
  licenceCount: number;
  // Doughnut
  public doughnutChartLabels: Label[] = ['Used Licences', 'Remaining Licences'];
  public doughnutChartData: SingleDataSet = [this.utilsService.organizationObj.allowedUser, this.utilsService.organizationObj.total_user - this.utilsService.organizationObj.allowedUser];
  public doughnutChartType: ChartType = 'doughnut';
  constructor(public utilsService: UtilsService) {
    localStorage.removeItem('isSearched');
    localStorage.removeItem('breadCrumbs');
    localStorage.removeItem('folderKey');
    localStorage.removeItem('search-param');
    localStorage.removeItem('search-tags-param');
    localStorage.removeItem('assetView');
    localStorage.removeItem('orderBy');
    localStorage.removeItem('sortBy');
    this.utilsService.flagForHideShowSearchInput = false;
  }

  ngOnInit() {
    this.licenceCount =  +this.utilsService.organizationObj.total_user;

    this.getUsageAPI();
    setTimeout(() => {
      this.loadScript('/assets/js/dore.script.js');
    }, 300);
  }

  public loadScript(url) {
    console.log('preparing to load...')
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  formatFileSize(bytes,decimalPoint) {
   if(bytes == 0) return '0 Bytes';
   var k = 1000,
       dm = decimalPoint || 2,
       sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
       i = Math.floor(Math.log(bytes) / Math.log(k));
   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

  getUsageAPI() {
    const param = {};
    this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.getUsagesAPI, param, (response) => {
      if (!this.utilsService.isNullUndefinedOrBlank(response)) {
        this.pieChartData = [response.total_usages, response.max_usages];
      }
    });
  }

}

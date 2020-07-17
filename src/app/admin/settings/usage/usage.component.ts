import { Component, OnInit } from '@angular/core';
import { SingleDataSet, Label } from 'ng2-charts';
import { ChartType, ChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { UtilsService } from '../../../services/utils.service';
import { isNullOrUndefined } from 'util';
import * as Highcharts from 'highcharts';
import StockModule from 'highcharts/modules/stock';
StockModule(Highcharts);



@Component({
    selector: 'app-usage',
    templateUrl: './usage.component.html',
    styleUrls: ['./usage.component.css']
})

export class UsageComponent implements OnInit {

    Highcharts: typeof Highcharts = Highcharts;
    public pieChartData: number[] = [];


    // // Pie
    // public pieChartOptions: ChartOptions = {
    //     responsive: true,
    //     legend: {
    //         position: 'top',
    //     },
    //     plugins: {
    //         datalabels: {
    //             formatter: (value, ctx) => {
    //                 const label = ctx.chart.data.labels[ctx.dataIndex];
    //                 return label;
    //             },
    //         },
    //     }
    // };
    // public pieChartLabels: Label[] = [['Used Space'], ['Remaining Space']];
    // public pieChartData: number[] = [];
    // public pieChartType: ChartType = 'pie';
    // public pieChartLegend = true;
    // public pieChartPlugins = [pluginDataLabels];
    // public pieChartColors = [
    //     {
    //         backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)'],
    //     },
    // ];

    // // Doughnut
    // public doughnutChartLabels: Label[] = ['Used Licences', 'Remaining Licences'];
    // public doughnutChartData: SingleDataSet = [this.utilsService.organizationObj.allowedUser, this.utilsService.organizationObj.total_user - this.utilsService.organizationObj.allowedUser];
    // public doughnutChartType: ChartType = 'doughnut';

    licenceCount: number;

    // Pie chart
    chartPie;
    pieupdateFlag = false;
    piechartCallback;
    pieChartOptions = {
        title: {
            text: null
        },
        series: [],
        exporting: {
            enabled: true
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                size: '80%',
                cursor: 'pointer',
                dataLabels: {
                    enabled: true
                }
            }
        },
        tooltip: {},
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
        },
        credits: false,
        colors: [
            '#c62828', '#ad1457', '#6a1b9a', '#4527A0', '#283593', '#1565c0', '#0277bd', '#00838f',
            '#00695c', '#2e7d32', '#558b2f', '#9e9d24', '#f9a825', '#ff8f00', '#ef6c00', '#37474F',
            '#D84315', '#4E342E', '#424242'
        ]
    };
    chartConstructor = 'chart';

    // Donut chart
    chartDonut;
    doughnutupdateFlag = false;
    doughnutchartCallback;
    donutchartoptions = {
        title: {
            text: null
        },
        series: [],
        exporting: {
            enabled: true
        },
        tooltip: {},
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                innerSize: '70%',
                dataLabels: {
                    enabled: true
                },
                showInLegend: false,
                size: '80%',
            }
        },
        credits: false,
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        colors: [
            '#c62828', '#ad1457', '#6a1b9a', '#4527A0', '#283593', '#1565c0', '#0277bd', '#00838f',
            '#00695c', '#2e7d32', '#558b2f', '#9e9d24', '#f9a825', '#ff8f00', '#ef6c00', '#37474F',
            '#D84315', '#4E342E', '#424242'
        ]
    };

    constructor(
        public utilsService: UtilsService
    ) {
        localStorage.removeItem('isSearched');
        localStorage.removeItem('breadCrumbs');
        localStorage.removeItem('folderKey');
        localStorage.removeItem('search-param');
        localStorage.removeItem('search-tags-param');
        localStorage.removeItem('assetView');
        localStorage.removeItem('orderBy');
        localStorage.removeItem('sortBy');
        this.utilsService.flagForHideShowSearchInput = false;
        this.piechartCallback = chart => {
            this.chartPie = chart;
        };
    }

    ngOnInit() {
        this.licenceCount = +this.utilsService.organizationObj.total_user;
        this.getUsageAPI();
        setTimeout(() => {
            this.loadScript('/assets/js/dore.script.js');
        }, 300);
    }

    public loadScript(url) {
        console.log('preparing to load...');
        const node = document.createElement('script');
        node.src = url;
        node.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(node);
    }

    formatFileSize(bytes, decimalPoint) {
        if (bytes === 0) {
            return '0 Bytes';
        }
        const k = 1000,
            dm = decimalPoint || 2,
            sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    getUsageAPI() {
        const param = {};
        const pieData = [];
        this.pieChartOptions.series = [];
        const chart = this.chartPie;
        this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.getUsagesAPI, param, (response: any) => {
            for (const key in response) {
                if (Object.prototype.hasOwnProperty.call(response, key)) {
                    pieData.push({
                        name: key,
                        y: response[key],
                    });
                    this.pieChartData.push(response[key]);
                }
            }
        });
        setTimeout(() => {
            const series = [{
                type: 'pie',
                colorByPoint: true,
                data: pieData
            }];
            this.pieChartOptions.series = series;
            this.pieupdateFlag = true;
        }, 2000);
    }

}

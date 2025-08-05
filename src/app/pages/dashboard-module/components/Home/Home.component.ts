import { Component, OnInit } from '@angular/core';
import { Line } from '@antv/g2plot'; 
@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent  {


    mainStats = [
      { title: 'العملاء', value: 1260, suffix: '', change: 5 },
      { title: 'طلبات اليوم', value: 89, suffix: '', change: 3 },
      { title: 'إجمالي التأمينات', value: 52400, suffix: 'USD', change: -1 },
      { title: 'نسبة النمو', value: 12.5, suffix: '%', change: 1.2 }
    ];
  
    insuranceTypes = [
      { name: 'سيارات', percent: 60, color: '#1890ff' },
      { name: 'صحي', percent: 30, color: '#52c41a' },
      { name: 'سفر', percent: 10, color: '#faad14' }
    ];
  
    recentOrders = [
      { customer: 'محمد العلي', type: 'سيارات', company: 'شركة أمان', amount: 1500, status: 'مكتمل', date: new Date() },
      { customer: 'سارة ناصر', type: 'صحي', company: 'تأمين الخليج', amount: 1200, status: 'قيد الانتظار', date: new Date() },
      { customer: 'علي فهد', type: 'سفر', company: 'العربية للتأمين', amount: 850, status: 'مكتمل', date: new Date() }
    ];
    insuranceCompanies = [
      {
        name: 'الشرق للتأمين',
        type: 'صحي',
        location: 'الرياض',
        rating: 4,
        status: 'نشطة'
      },
      {
        name: 'تعاونية المتحدة',
        type: 'سيارات',
        location: 'جدة',
        rating: 5,
        status: 'نشطة'
      },
      {
        name: 'أمان للتأمين',
        type: 'سفر',
        location: 'الدمام',
        rating: 3,
        status: 'معلقة'
      }
    ];
    

    ngAfterViewInit(): void {
      const data = [
        { date: '2025-01', value: 1200 },
        { date: '2025-02', value: 1500 },
        { date: '2025-03', value: 900 },
        { date: '2025-04', value: 1700 },
        { date: '2025-05', value: 1600 },
        { date: '2025-06', value: 2000 },
      ];
    
      const line = new Line('tradingChartContainer', {
        data,
        xField: 'date',
        yField: 'value',
        smooth: true,
        animation: {
          appear: {
            animation: 'path-in',
            duration: 1500,
          },
        },
        point: {
          size: 5,
          shape: 'diamond',
          style: {
            fill: 'white',
            stroke: '#5B8FF9',
            lineWidth: 2,
          },
        },
        tooltip: {
          showMarkers: true,
        },
        interactions: [{ type: 'marker-active' }],
        
        
        padding: 'auto',
        xAxis: {
          grid: {
            line: {
              style: {
                stroke: '#e0e0e0',  
              },
            },
          },
          line: {
            style: {
              stroke: '#999',     
            },
          },
        },
        yAxis: {
          grid: {
            line: {
              style: {
                stroke: '#e0e0e0',
                lineDash: [4, 4],
              },
            },
          },
          line: {
            style: {
              stroke: '#999',     
            },
          },
        },
        
        
        color: (datum) => {
         
          if (datum['value'] > 1600) return '#52c41a';
          else if (datum['value'] > 1300) return '#faad14';
          else return '#f5222d';
                                 
        },
      });
    
      line.render();
    }
    
  }
  



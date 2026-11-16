import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Sort } from '@angular/material/sort';
import { UserService } from '../user.service';
import { BestSellingComponent } from '../elements/dashboard/best-selling/best-selling.component';

export interface Dessert {
  ticketid: string;
  date: string;
  screenid: string;
  storename: string;
  location: string;
  assignedto: string;
  ticketstatus: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
    @ViewChild(BestSellingComponent) bestSellingComponent!:BestSellingComponent;

    contantHead = {
        title: 'Dashboard',
        desc: ''
    }

    page:any = 1;
    totalRows:number = 4;
    totalPage:any = 0;
    allData:any = [];
    boxActive:Boolean = false;

    desserts: Dessert[] = [];
	  customerData: Dessert[] = [];
  
    //orderData: Dessert[];
    role:string = "";

    networkManagerCount: number = 0;
    retailGroupCount: number = 0;
    storeCount: number = 0;
    ticketCount: number = 0;

    numOpenTickets:number = 0;
    numInProgressTickets:number = 0;
    numResolvedTickets:number = 0;
    numClosedTickets:number = 0;

    constructor(private http: HttpClient, private userService: UserService) {
	  }

	  ngOnInit(): void {
        this.role = this.userService.getRole();
        this.totalPage =this.allData.total_pages;
        this.refreshData();

	  }

    ngAfterViewInit() {
      this.http.get<any>('/api/getAdminDashboardData?role=' + this.role + "&&firstName=" + this.userService.firstName).subscribe(data => {
        this.networkManagerCount = data.networkManagerCount;
        this.retailGroupCount = data.retailGroupCount;
        this.storeCount = data.storeCount;
        this.ticketCount = data.ticketCount;
        this.numOpenTickets = data.openTicketCount;
        this.numInProgressTickets = data.inProgressTicketCount;
        this.numResolvedTickets = data.resolvedTicketCount;
        this.numClosedTickets = data.closedTicketCount;
        this.bestSellingComponent.updateData(this.numOpenTickets, this.numInProgressTickets, this.numResolvedTickets, this.numClosedTickets);
      });
    }

    formatDate(date:Date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      var m = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + m + ' ' + ampm;
      return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
    }
    
    refreshData() {
      var firstName = this.userService.getFirstName();
      var queryStr = "";
      if(this.role == 'engineer')
            queryStr = "?role=engineer&&firstName=" + firstName;
      this.http.get<any>('/api/ticket' + queryStr).subscribe(data => {
        this.desserts = data as any[];
        console.log(this.desserts);
        
        this.customerData = this.desserts.slice();
        this.allData = this.customerData; //this.paginator(this.customerData, this.page, this.totalRows);
        for(var i = 0; i < this.desserts.length; i++) {
          this.allData[i].createdOn = this.formatDate(new Date(this.allData[i].createdOn));
        }
        this.totalPage = this.allData.total_pages;
        this.pageChange(0);
        console.log(this.allData);
        console.log(this.totalPage);
      });
    }

    sortData(sort: Sort) {
      /*
      const data = this.desserts.slice();
      if (!sort.active || sort.direction === '') {
        this.orderData = data;
        return;
      }
  
      this.orderData = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'ticketid': return compare(a.ticketid, b.ticketid, isAsc);
          case 'storename': return compare(a.storename, b.storename, isAsc);
          case 'location': return compare(a.location, b.location, isAsc);
          case 'assignedto': return compare(a.assignedto, b.assignedto, isAsc);
          case 'ticketstatus': return compare(a.ticketstatus, b.ticketstatus, isAsc);
          default: return 0;
        }
      });
      this.allData = this.paginator(this.orderData, this.page, this.totalRows);
      */
    }
  
    pageChange(e:any){    //  Page Change funcation   ---------
      this.page = e ;
      this.allData = this.paginator(this.customerData, this.page, this.totalRows);
      this.totalPage = this.allData.total_pages;
     }
  
    paginator(items:any, current_page:any, per_page_items:any) {
      let page = current_page || 1,
      per_page = per_page_items || 10,
      offset = (page - 1) * per_page,
    
      paginatedItems = items.slice(offset).slice(0, per_page_items),
      total_pages = Math.ceil(items.length / per_page);
      
      return {
        page: page,
        per_page: per_page,
        pre_page: page - 1 ? page - 1 : null,
        next_page: (total_pages > page) ? page + 1 : null,
        total: items.length,
        total_pages: total_pages,
        data: paginatedItems
      };
    }
  
    checkUncheckAll(){
      if(this.boxActive){
        this.boxActive = false;
      } else {
        this.boxActive = true;
      }
    }
};

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

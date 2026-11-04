import { Component, TemplateRef } from '@angular/core';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Sort } from '@angular/material/sort';

export interface Dessert {
	cust_id: string;
	date: string;
	customer_name: string;
	ticket_ordered: string;
	location: string;
	last_order: string;
	total_spent: string;
}

@Component({
	selector: 'app-customers',
	templateUrl: './customers.component.html',
	styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
	model: NgbDateStruct | undefined;
	navigation = 'arrows';
	outsideDays = 'visible';
	boxActive: Boolean = false;
	page: any = 1;
	totalRows: number = 4;
	totalPage: any = 0;
	allData: any = [];

	contantHead = {
		title: 'Customer List',
		desc: 'Lorem ipsum dolor sit amet',
		title_path: 'Dashboard'
	}
	constructor(private modalService: NgbModal) {
		this.customerData = this.desserts.slice();
	}
	ngOnInit(): void {
		this.allData = this.paginator(this.customerData, this.page, this.totalRows);
		this.totalPage = this.allData.total_pages;
	}


	openCenter(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
	}

	desserts: Dessert[] = [
		{
			cust_id: '#0012451',
			date: '21/11/2023',
			customer_name: 'Cive Slauw',
			ticket_ordered: 'The Story Of Danaou Taba (Musical Drama)',
			location: 'Medan Indonesia',
			last_order: '04/08/2023 12:34 AM',
			total_spent: '$1,300'
		},
		{
			cust_id: "#0012451",
			date: '21/11/2017',
			customer_name: "Cive Saluve",
			ticket_ordered: "The Story Of Danaou Taba (Musical Drama)",
			location: "Medan Indonesia",
			last_order: "04/08/2023 12:34 AM",
			total_spent: "$1,300"
		},
		{
			cust_id: "#0012451",
			date: '21/11/2017',
			customer_name: "Bella Simatupang",
			ticket_ordered: "The Powerfull Concert Festival London 2023",
			location: "Medan Indonesia",
			last_order: "04/08/2023 12:34 AM",
			total_spent: "$623,55"
		},
		{
			cust_id: "#0012451",
			date: '21/11/2017',
			customer_name: "Andrew Stevano",
			ticket_ordered: "The Story Of Danaou Taba (Musical Drama)",
			location: "Medan Indonesia",
			last_order: "04/08/2023 12:34 AM",
			total_spent: "$1,300"
		},
		{
			cust_id: "#0012451",
			date: '21/11/2017',
			customer_name: "Olivia Brownlee",
			ticket_ordered: "The Story Of Danaou Taba (Musical Drama)",
			location: "Medan Indonesia",
			last_order: "04/08/2023 12:34 AM",
			total_spent: "$246,45"
		},
		{
			cust_id: "#0012451",
			date: '21/11/2017',
			customer_name: "James Roberto",
			ticket_ordered: "Danaou Taba (Musical Drama)",
			location: "Medan Indonesia",
			last_order: "04/08/2023 12:34 AM",
			total_spent: "$1,300"
		},
		{
			cust_id: "#0012451",
			date: '21/11/2017',
			customer_name: "Kevin Hurt",
			ticket_ordered: "The Story Of Danaou Taba (Musical Drama)",
			location: "Medan Indonesia",
			last_order: "04/08/2023 12:34 AM",
			total_spent: "$623,66"
		},
		{
			cust_id: "#0012451",
			date: '21/11/2017',
			customer_name: "Sanuel Jakson",
			ticket_ordered: "The Story Of Danaou Taba (Musical Drama)",
			location: "Medan Indonesia",
			last_order: "04/08/2023 12:34 AM",
			total_spent: "$56,125"
		},
		{
			cust_id: "#0012451",
			date: '21/11/2017',
			customer_name: "Cive Saluve",
			ticket_ordered: "The Story Of Danaou Taba (Musical Drama)",
			location: "Medan Indonesia",
			last_order: "04/08/2023 12:34 AM",
			total_spent: "$100"
		},
		{
			cust_id: "#0012451",
			date: '21/11/2017',
			customer_name: "Sanuel Jakson",
			ticket_ordered: "The Story Of Danaou Taba (Musical Drama)",
			location: "Medan Indonesia",
			last_order: "04/08/2023 12:34 AM",
			total_spent: "$1,300"
		},
		{
			cust_id: "#0012451",
			date: '21/11/2017',
			customer_name: "Cive Slauw",
			ticket_ordered: "The Story Of Danaou Taba (Musical Drama)",
			location: "Medan Indonesia",
			last_order: "04/08/2023 12:34 AM",
			total_spent: "$1,300",
		},
	];

	customerData: Dessert[];

	sortData(sort: Sort) {
		const data = this.desserts.slice();
		if (!sort.active || sort.direction === '') {
			this.customerData = data;
			return;
		}

		this.customerData = data.sort((a, b) => {
			const isAsc = sort.direction === 'asc';
			switch (sort.active) {
				case 'customer_name': return compare(a.customer_name, b.customer_name, isAsc);
				case 'total_spent': return compare(a.total_spent, b.total_spent, isAsc);
				default: return 0;
			}
		});
		this.allData = this.paginator(this.customerData, this.page, this.totalRows);
	}
	pageChange(e: any) {    //  Page Change funcation   ---------
		this.page = e;
		this.allData = this.paginator(this.customerData, this.page, this.totalRows);
		this.totalPage = this.allData.total_pages;
	}

	paginator(items: any, current_page: any, per_page_items: any) {
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

	checkUncheckAll() {
		if (this.boxActive) {
			this.boxActive = false;
		} else {
			this.boxActive = true;
		}
	}
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
	return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
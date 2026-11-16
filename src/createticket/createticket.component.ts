import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Sort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import Konva from 'konva';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

declare var $:any;

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
	selector: 'app-createticket',
	templateUrl: './createticket.component.html',
	styleUrls: ['./createticket.component.css']
})
export class CreateTicketComponent {
	@ViewChild('messageModal') 
	private messageModal!: TemplateRef<any>;
	@ViewChild('imageModal') 
	private imageModal!: TemplateRef<any>;
	
	model: NgbDateStruct | undefined;
	navigation = 'arrows';
	outsideDays = 'visible';
	boxActive: Boolean = false;
	page: any = 1;
	totalRows: number = 4;
	totalPage: any = 0;
	allData: any = [];
	
	contantHead = {
		title: 'Create Ticket',
		desc: '',
		title_path: 'Admin'
	}

  	desserts: Dessert[] = [];
	customerData: Dessert[] = [];
	screens:any[] = [];
	screenTypes:string[] = [];
	storeNames:string[] = [];
	selectedScreen:string = "";
	selectedStoreScreenId:string = "";
	file: File | null = null;

	role:string = "";
	name:string = "";
	storeName:string = "";

	screenType:string = "";
  	screenId:string = "";
  	title:string = "";
  	description:string = "";
	images:string = "";
	screenImageSrc:string = "";
	screenCanvasInitialized:boolean = false;

	imageFolderPath = "/media/screens/";
	imageNames:string[] = [];
	screenIds:string[] = [];
	storeScreenIds:string[] = [];
	screenPresent:boolean[] = [];
  	
	currentPage:number = 0;
	currentId: number = 0;
	messageHeader:string = "";
	message:string = "";
	imageModalTitle:string = "";
    imageModalSrc:string = "";

  	constructor(private modalService: NgbModal, private http: HttpClient, 
		        private userService:UserService, private router: Router) {
	}

	ngOnInit(): void {
		this.role = this.userService.getRole();
		this.name = this.userService.getFirstName();
		this.storeName = "";
		this.imageNames = ["", "", "", "", ""];
		this.screenIds = ["", "", "", "", ""];
		this.storeScreenIds = ["", "", "", "", ""];
    this.clearFields();
    this.refreshData();
		this.initScreenLayout();

		this.screens = [];
		this.screenTypes = [];
		this.selectedScreen = "";
		this.selectedStoreScreenId = "";
		this.screenImageSrc = "";
		for(var i = 0; i < 5; i++) {
			this.screenIds[i] = "";
			this.imageNames[i] = "";
			this.screenPresent[i] = false;
		}

    this.storeNames = [];
    this.http.get<any>('/api/store').subscribe(data => {
      var stores = data as any[];
      for(var i = 0; i < stores.length; i++) {
          this.storeNames.push(stores[i].name);
      }
    });

    this.screens = [];
    this.screenTypes = [];
	}

  initScreenLayout(): void {
	if(this.screenType != "BWS" && this.screenType != "EPU 1" && this.screenType != "EPU 2")
	  return;

	//if(this.screenCanvasInitialized)
	//  return;

	//this.screenCanvasInitialized = true;
    
	// first we need to create a stage
    var stage = new Konva.Stage({
      container: 'screenLayout',   // id of container <div>
      width: 500,
      height: 500
    });

    // then create layer
    var layer = new Konva.Layer();

    var startX = 8;
    var startY = 60;
    var fillColor = 'CadetBlue';

    // create our shape
    var sidePanel1 = new Konva.Rect({
      x: startX + 110,
      y: startY + 60,
      width: 50,
      height: 300,
      fill: fillColor,
      stroke: "black",
      strokeWidth: 1,
    });

	/*
	var labelSidePanel1 = new Konva.Label({
        x: startX + 110,
        y: startY + 160,
        opacity: 0.75,
		rotation: -90
    });

	

   // Side panel1 label
	labelSidePanel1.add(
        new Konva.Text({
          text: 'Panel 1',
          fontFamily: 'Calibri',
          fontSize: 18,
          padding: 5,
          fill: 'white',
        })
      );

	  /*
	  var labelSidePanel1 = new Konva.Label({
        x: startX + 110,
        y: startY + 160,
        opacity: 0.75,
		rotation: -55
    });

	var labelSidePanel2 = new Konva.Label({
        x: startX + 300,
        y: startY + 160,
        opacity: 0.75,
		rotation: -55
    });

	var labelSideHeader1 = new Konva.Label({
        x: startX + 10,
        y: startY + 20,
        opacity: 0.75,
		rotation: 0
    });

	var labelSideHeader2 = new Konva.Label({
        x: startX + 350,
        y: startY + 20,
        opacity: 0.75,
		rotation: 0
    });

	var labelmainPanel = new Konva.Label({
        x: startX + 200,
        y: startY + 70,
        opacity: 0.75,
		rotation: 0
    });
	*/

	var labelSidePanel1 = new Konva.Label({
        x: startX + 85,
        y: startY + 230,
        opacity: 0.75,
		rotation: -90
    });

	var labelSidePanel2 = new Konva.Label({
        x: startX + 350,
        y: startY + 230,
        opacity: 0.75,
		rotation: -90
    });

	var labelSideHeader1 = new Konva.Label({
        x: startX + 10,
        y: startY - 20,
        opacity: 0.75,
		rotation: 0
    });

	var labelSideHeader2 = new Konva.Label({
        x: startX + 350,
        y: startY - 20,
        opacity: 0.75,
		rotation: 0
    });

	var labelmainPanel = new Konva.Label({
        x: startX + 200,
        y: startY + 30,
        opacity: 0.75,
		rotation: 0
    });

	// Side panel1 label
	labelSidePanel1.add(
        new Konva.Text({
		  text: 'Panel 1',
          fontFamily: 'Calibri',
          fontSize: 16,
          padding: 5,
          fill: 'black'
        })
    );
  
	var sidePanel2 = new Konva.Rect({
      x: startX + 300,
      y: startY + 60,
      width: 50,
      height: 300,
      fill: fillColor,
      stroke: "black",
      strokeWidth: 1,
    });

	// Side panel2 label
	labelSidePanel2.add(
        new Konva.Text({
			color: "black",
          text: 'Panel 2',
          fontFamily: 'Calibri',
          fontSize: 16,
          padding: 5,
          fill: 'black',
        })
    );

    var sideHeader1 = new Konva.Rect({
      x: startX + 10,
      y: startY + 10,
      width: 100,
      height: 50,
      fill: fillColor,
      stroke: "black",
      strokeWidth: 1,
    });

	// Side panel2 label
	labelSideHeader1.add(
        new Konva.Text({
		  text: 'Side Header 1',
          fontFamily: 'Calibri',
          fontSize: 16,
          padding: 5,
          fill: 'black',
        })
      );

    var sideHeader2 = new Konva.Rect({
      x: startX + 350,
      y: startY + 10,
      width: 100,
      height: 50,
      fill: fillColor,
      stroke: "black",
      strokeWidth: 1,
    });

	labelSideHeader2.add(
        new Konva.Text({
          text: 'Side Header 2',
          fontFamily: 'Calibri',
          fontSize: 16,
          padding: 5,
          fill: 'black',
        })
    );

	labelmainPanel.add(
        new Konva.Text({
          text: 'Header 1',
          fontFamily: 'Calibri',
          fontSize: 16,
          padding: 5,
          fill: 'black',
        })
    );

    var mainPanel = new Konva.Rect({
      x: startX + 160,
      y: startY + 60,
      width: 140,
      height: 50,
      fill: fillColor,
      stroke: "black",
      strokeWidth: 1,
    });

	/*
	labelSidePanel1.on('mousedown', function (e) {
		e.cancelBubble = false;
		console.log("labelSidePanel1 mouseDown");
	});

	labelSidePanel2.on('mousedown', function (e) {
		e.cancelBubble = false;
		console.log("labelSidePanel2 mouseDown");
	});

	labelSideHeader1.on('mousedown', function (e) {
		e.cancelBubble = false;
		console.log("labelSideHeader1 mouseDown");
	});

	labelSideHeader2.on('mousedown', function (e) {
		e.cancelBubble = false;
		console.log("labelSideHeader2 mouseDown");
	});

	labelmainPanel.on('mousedown', function (e) {
		e.cancelBubble = false;
		console.log("labelmainPanel mouseDown");
	});
	*/

	// add the shape to the layer
	if(this.screenPresent[0]) {
		layer.add(sidePanel1);
	  	layer.add(labelSidePanel1);
	}

	if(this.screenPresent[1]){
		layer.add(sidePanel2);
		layer.add(labelSidePanel2);
	}	

	if(this.screenPresent[2]){
		layer.add(sideHeader1);
		layer.add(labelSideHeader1);
	}

    if(this.screenPresent[3]){
		layer.add(sideHeader2);
		layer.add(labelSideHeader2);
	}  

	if(this.screenPresent[4]){
		layer.add(mainPanel);
		layer.add(labelmainPanel);
	}	
    // add the layer to the stage
    stage.add(layer);

    // draw the image
    layer.draw();

	var panels:Konva.Rect[] = [sidePanel1, sidePanel2, sideHeader1, sideHeader2, mainPanel];
	for(let i = 0; i < 5; i++) {
		let panel = panels[i];
		if(this.screenPresent[i]) {
			panels[i].on('mousedown', (e) =>  { 
				for(var j = 0; j < 5; j++) {
					panels[j].stroke("black");
				}
				for(var j = 0; j < 5; j++) {
					panels[j].fill(fillColor);
				}
				panel.stroke("red");
				panel.fill("lightgreen");
				this.selectedScreen = this.screenIds[i];
				this.selectedStoreScreenId = this.storeScreenIds[i];
				this.screenImageSrc = this.imageFolderPath + this.imageNames[i];
				layer.draw();
			});

			panels[i].on('touchstart', (e) =>  { 
				for(var j = 0; j < 5; j++) {
					panels[j].stroke("black");
				}
				panels[i].stroke("red");
				this.selectedScreen = this.screenIds[i];
				this.selectedStoreScreenId = this.storeScreenIds[i];
				this.screenImageSrc = this.imageFolderPath + this.imageNames[i];
				layer.draw();
			});
		}
	}

	for(let i = 0; i < 5; i++) {
		let panel = panels[i];
		if(this.screenPresent[i]) {
			if(this.selectedScreen == this.screenIds[i]) {
				panel.stroke("red");
				panel.fill("lightgreen");
				this.selectedScreen = this.screenIds[i];
				this.selectedStoreScreenId = this.storeScreenIds[i];
				this.screenImageSrc = this.imageFolderPath + this.imageNames[i];
			}
		}
	}
  }

	refreshData() {
		this.http.get<any>('/api/ticket').subscribe(data => {
			this.desserts = data as any[];
			
			this.customerData = this.desserts.slice();
			this.allData = this.customerData; //this.paginator(this.customerData, this.page, this.totalRows);
			this.totalPage = this.allData.total_pages;
			this.pageChange(0);
		});
	}

	clearFields() {
		this.screenId = "";
    	this.title = "";
    	this.description = "";
		this.images = "";
	}

	openCenter(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
	}

  	sortData(sort: Sort) {
		/*
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
    	*/
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

  	onScreenSelected() {
    	this.currentPage = 1;
  	}

	onBack() {
		this.currentPage = 0;
		setTimeout(()=> {
			this.initScreenLayout();
		}, 200);
	}

  	onCreate() {
		if(this.selectedScreen == "")
		  return;

		//if(!this.isValid(this.productGroupName))
    	//  return;

		console.log(this.storeName);
		var formData = new FormData();
		formData.append("serialNo", this.selectedScreen);
		formData.append("storeName", this.storeName);
		formData.append("title", this.title);
		formData.append("description", this.description);
    formData.append("isAdmin", "true");
		if(this.file != null) {
		    formData.append("file", this.file, this.file?.name);
	    }

		this.http.post<any>('/api/createticket', formData).subscribe(data => {
			this.messageHeader = "Create Ticket";
			this.message = "Ticket has been created succesfully.";
			this.openCenter(this.messageModal);
		});
  	}

	onEdit(i:any) {
		var item = this.allData.data[i];
		this.currentId = item.id;
		this.screenId = item.screenId;
    	this.title = item.title;
    	this.description = item.description;
		this.images = item.images;
	}

	onView(i:any) {
		var item = this.allData.data[i];
		this.screenId = item.screenId;
    	this.title = item.title;
    	this.description = item.description;
		this.images = item.images;
	}

  	onDelete(id: any) {
		this.currentId = id;
  	}

  	onConfirmYes() {
		this.http.get<any>('/api/deleteticket?id=' + this.currentId).subscribe(data => {
			this.refreshData();
			this.messageHeader = "Delete Ticket";
			this.message = "Deleted successfully";
			this.openCenter(this.messageModal);
		});
	}

	onScreenTypeChanged() {
		console.log("onScreenTypeChanged");
		if(this.screenType=='BWS' || this.screenType=='EPU 1' || this.screenType=='EPU 2') {
			var screen = null;
			for(var i = 0; i < 5; i++) {
				this.screenIds[i] = "";
				this.storeScreenIds[i] = "";
				this.imageNames[i] = "";
				this.screenPresent[i] = false;
			}
			for(var i = 0; i < this.screens.length; i++) {
				if(this.screens[i].screenType == this.screenType) {
					screen = this.screens[i];
					console.log("ScreenIdentificationId = " + this.screens[i].screenIdentificationId);
					if(this.screens[i].screenIdentificationId.endsWith("SP1")) {
						this.screenIds[0] = this.screens[i].serialNo;
						this.storeScreenIds[0] = this.screens[i].storeScreenId;
						this.imageNames[0] = this.screens[i].imageName;
						this.screenPresent[0] = true;
					}
					else if(this.screens[i].screenIdentificationId.endsWith("SP2")) {
						this.screenIds[1] = this.screens[i].serialNo;
						this.storeScreenIds[1] = this.screens[i].storeScreenId;
						this.imageNames[1] = this.screens[i].imageName;
						this.screenPresent[1] = true;
					}
					else if(this.screens[i].screenIdentificationId.endsWith("SH1")) {
						this.screenIds[2] = this.screens[i].serialNo;
						this.storeScreenIds[2] = this.screens[i].storeScreenId;
						this.imageNames[2] = this.screens[i].imageName;
						this.screenPresent[2] = true;
					}
					else if(this.screens[i].screenIdentificationId.endsWith("SH2")) {
						this.screenIds[3] = this.screens[i].serialNo;
						this.storeScreenIds[3] = this.screens[i].storeScreenId;
						this.imageNames[3] = this.screens[i].imageName;
						this.screenPresent[3] = true;
					}
					else if(this.screens[i].screenIdentificationId.endsWith("MH")) {
						this.screenIds[4] = this.screens[i].serialNo;
						this.storeScreenIds[4] = this.screens[i].storeScreenId;
						this.imageNames[4] = this.screens[i].imageName;
						this.screenPresent[4] = true;
					}
				}
			}
			this.selectedScreen = "";
			this.screenImageSrc = "";
			
			setTimeout(()=> {
				this.initScreenLayout();
			}, 500);
		}
		else {
			var screen = null;
			for(var i = 0; i < this.screens.length; i++) {
				if(this.screens[i].screenType == this.screenType) {
					screen = this.screens[i];
					this.selectedScreen = screen.serialNo;
					this.screenImageSrc = this.imageFolderPath + screen.imageName;
				}
			}
		}
	}

	onOk(modal:any) {
		modal.dismiss();
		this.router.navigate(["../admin/ticket"]);
	}
	
	handleFileInput(e : Event) {
		var files = null;
		if(e.target != undefined) {
		  files = (e.target as HTMLInputElement).files;
		}
	
		if(files != null) {
		  this.file = files.item(0);
		}
	}

	onStoreSelected() {
    this.screens = [];
    console.log(this.storeName);
    this.http.get<any>('/api/getScreensOfStore?storeName=' + this.storeName).subscribe(data => {
        this.screens = data as any[];
		
        this.screenTypes = [];
      for(var i = 0; i < this.screens.length; i++) {
        var found = false;
        for(var j = 0; j < this.screenTypes.length; j++) {
          if(this.screens[i].screenType == this.screenTypes[j]) {
            found = true;
          }
        }
        if(!found) {
          if(this.screens[i].storeName == this.storeName)
            this.screenTypes.push(this.screens[i].screenType);
        }
      }
      if(this.screenTypes.length > 0) {
        this.selectedScreen = "";
        this.screenImageSrc = "";
        this.screenType = "";
        //this.screenType = this.screenTypes[0];
        //this.onScreenTypeChanged();
      }
      else {
        this.selectedScreen = "";
        this.screenImageSrc = "";
      }
    });
	}

	openScreenImage() {
		this.imageModalTitle = "Screen Image";
		this.imageModalSrc = this.screenImageSrc;
		this.modalService.open(this.imageModal, { centered: true, size: 'xl'});
	}

  onStoreChanged() {
      this.http.get<any>('/api/getScreensOfStor?storeName=' + this.storeName).subscribe(data => {
          this.screens = data as any[];
          console.log(this.screens);
          for(var i = 0; i < this.screens.length; i++) {
              var found = false;
              for(var j = 0; j < this.screenTypes.length; j++) {
                if(this.screens[i].screenType == this.screenTypes[j]) {
                  found = true;
                }
              }
              if(!found) {
                this.screenTypes.push(this.screens[i].screenType);
              }
          }
      });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
	return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
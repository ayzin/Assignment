import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NxDialogService, NxModalRef } from '@aposin/ng-aquila/modal';
import { DomSanitizer } from '@angular/platform-browser';
import { ArtworkService } from './entities/services/artworkService';
import { ArtworkList, ArtworkListData, FilterStyleTitle, sortOptions } from './entities/interfaces/artwork.interface';
import { HttpEvent } from '@angular/common/http';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    @ViewChild('consentTemplate') consentTemplateRef!: TemplateRef<any>;
    @ViewChild('submitTemplate') submitTemplateRef!: TemplateRef<any>;
    dialogRef!: NxModalRef<any, any>;

    constructor(
        public artworkService: ArtworkService
    ) {
    }

    

    artworkList : ArtworkList[] =[];
    image : string = 'https://upload.wikimedia.org/wikipedia/commons/3/32/Art_Institute_of_Chicago_logo.svg';
    count: number = 0;
    page: number = 1;
    perPage: number = 8;
    options: string[] = ['Apple', 'Orange', 'Plum', 'Cherry'];
    showSpinner: boolean = false;
    showSelectOption : boolean = true;
    setSortBy: boolean = false;

    filter: FilterStyleTitle[] = [];
    filterOptions : FilterStyleTitle[] = [];
    id: any[] = [];
    filterId: any ;
    sortType: any;
    sortOptions: sortOptions[] = [
        {
            id: 1,
            sortType: "Name"
        },
        {
            id: 2,
            sortType: "Artist"
        },
        {
            id: 3,
            sortType: "Date"
        },
    ];
    ngOnInit(){
        this.GetArtWorkList();
        // this.GetSearch();
    }

    selectLabel(option: FilterStyleTitle): string {
        return option.style_title;
    }

    selectValue(option: FilterStyleTitle): string {
        return option.id;
    }

    selectedFilter(){
        if(this.filterId.length == 0 && this.setSortBy){
            this.GetSearch()
        }else{
            this.GetArtWorkListbyId();
        }
        
    }

    selectedSortType(){
        this.count = 0;
        this.page = 1;
        this.perPage= 8;
        if(this.sortType){
            this.GetSearch();
        }else{
            this.GetArtWorkList();
        }
        
    }

    prevPage() {
        this.page--;
        window.scrollTo(0,0);
        if(this.sortType){
            this.GetSearch();
        }else{
            this.GetArtWorkList();
        }
        
    }

    nextPage() {
        this.page++;
        window.scrollTo(0,0);
        if(this.sortType){
            this.GetSearch();
        }else{
            this.GetArtWorkList();
        }
    }

    goToPage(n: number) {
        this.page = n;
        window.scrollTo(0,0);
        if(this.sortType){
            this.GetSearch();
        }else{
            this.GetArtWorkList();
        }
    }

    GetArtWorkListbyId() {
        this.artworkList =[];
        this.showSpinner = true;
        const query = {
            limit: this.perPage,
            page: this.page,
            ids: this.filterId ? this.filterId.toString() : ""
        };

        this.artworkService.getArtworkList(query).subscribe(
            (res : ArtworkListData) => {
                this.artworkList = res.data;
                this.showSpinner = false;
            }
        );
    }

    GetArtWorkList() {
        this.artworkList =[];
        this.filter = [];
        this.filterOptions = [];
        this.filterId = [];
        this.showSpinner = true;
        this.showSelectOption = false;
        this.setSortBy = false;
        const query = {
            limit: this.perPage,
            page: this.page
        };

        this.artworkService.getArtworkList(query).subscribe(
            (res : ArtworkListData) => {
                console.log("get artwork data work!");
                this.artworkList = res.data;
                this.count = res.pagination.total;
                this.page = res.pagination.current_page;
                this.perPage = res.pagination.limit;
                this.showSelectOption = true;
                this.showSpinner = false;

                for(let i=0; i< this.artworkList.length; i++){
                    if(this.artworkList[i].date_start?.toString().includes('-')){
                        let startDate = this.artworkList[i].date_start;
                        let changeStartDateFormat = new Date(startDate ? startDate : "").toLocaleDateString();
                        this.artworkList[i].date_start = this.getYear(changeStartDateFormat);
                    }
                    if(this.artworkList[i].date_end?.toString().includes('-')){
                        let endDate = this.artworkList[i].date_end;
                        let changeEndDateFormat = new Date(endDate ? endDate : "").toLocaleDateString();
                        this.artworkList[i].date_end = this.getYear(changeEndDateFormat);
    
                    }
                    
                    
                    this.filter.push({
                        id: this.artworkList[i].id,
                        style_title: this.artworkList[i].style_title
                    });
                }
                this.GetFilter(this.filter);
            }
        );
    }

    GetSearch() {
        this.setSortBy = true;
        this.filterId = [];
        this.filter =[];
        this.filterOptions = [];
        this.artworkList =[];
        this.showSpinner = true;
        this.showSelectOption = true;

        let query = {};
        if(this.sortType == 'Artist'){
            query = {
                'fields': 'id,title,image_id,artist_title,date_start,date_end,material_titles,place_of_origin,style_title',
                'limit': this.perPage,
                'page': this.page,
                'sort[artist_id]' : 'asc'
            };
        }else if(this.sortType == 'Name'){
            query = {
                'fields': 'id,title,image_id,artist_title,date_start,date_end,material_titles,place_of_origin,style_title',
                'limit': this.perPage,
                'page': this.page,
                'sort[id]' : 'asc'
            };
        }else{
            query = {
                'fields': 'id,title,image_id,artist_title,date_start,date_end,material_titles,place_of_origin,style_title',
                'limit': this.perPage,
                'page': this.page,
                'sort[date_start]' : 'asc'
            };
        }
        

        this.artworkService.searchArtWorkByDate(query).subscribe(
            (res : ArtworkListData) => {
                this.artworkList =[];
                this.artworkList = res.data;
                this.count = res.pagination.total;
                this.page = res.pagination.current_page;
                this.perPage = res.pagination.limit;
                this.showSelectOption = true;
                this.showSpinner = false;
                this.filterId = [];
                this.filter =[];
                this.filterOptions = [];
                for(let i=0; i< this.artworkList.length; i++){
                    let startDate = this.artworkList[i].date_start;
                    let changeStartDateFormat = new Date(startDate ? startDate : "").toLocaleDateString();
                    this.artworkList[i].date_start = this.getYear(changeStartDateFormat);
                    let endDate = this.artworkList[i].date_end;
                    let changeEndDateFormat = new Date(endDate ? endDate : "").toLocaleDateString();
                    this.artworkList[i].date_end = this.getYear(changeEndDateFormat);
                    this.filter.push({
                        id: this.artworkList[i].id,
                        style_title: this.artworkList[i].style_title
                    });
                }
                this.GetFilter(this.filter);
            },
            (error: any) =>{
                this.showSelectOption = true;
                this.showSpinner = false;
                console.log("error happened while calling api:", error);
            }
        );
    }

    GetFilter(filter:any){
            let counter = 0;
            let newArraySize = 0;
            
            filter.sort((a: any,b :any)  => (a.style_title > b.style_title) ? 1 : ((b.style_title > a.style_title) ? -1 : 0));
            for(let i = 0; i< filter.length; i++){
                if(filter[i].style_title  == null){
                  console.log("do nothing");
              }
              else if(counter == newArraySize ){
                  this.filterOptions[counter] = filter[i];
                    counter = counter + 1;
              }
              else if(filter[i].style_title == this.filterOptions[counter-1].style_title){
                    this.filterOptions[counter-1].id = this.filterOptions[counter-1].id.toString() + "," + filter[i].id.toString();
                  
              }
              else{
                    
                    newArraySize = newArraySize + 1;
                    i--;
              }
            }
           
            for	(let i = 0; i< this.filterOptions.length; i++){
                    var wordcount = (this.filterOptions[i].id.toString().match(/,/g) || []).length + 1;
                    this.filterOptions[i].style_title = this.filterOptions[i].style_title + "(" + wordcount+")";  
                                
            }  
    }

    
    
    handleMissingImage(event: Event) {
        (event.target as HTMLImageElement).src = "https://upload.wikimedia.org/wikipedia/commons/3/32/Art_Institute_of_Chicago_logo.svg";
    }

    getYear(year : any){
        if(!year){
            return "";
        }else{
            let splitYear;
            let result;
            if(year?.includes('/')){
                splitYear = year.split('/');
                result = splitYear[2];
            }
            return result;
        }
    }
}

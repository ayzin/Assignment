import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxCheckboxModule } from '@aposin/ng-aquila/checkbox';
import { NxDocumentationIconModule } from '@aposin/ng-aquila/documentation-icons';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxFooterModule } from '@aposin/ng-aquila/footer';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxGridModule } from '@aposin/ng-aquila/grid';
import { NxHeadlineModule } from '@aposin/ng-aquila/headline';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxLinkModule } from '@aposin/ng-aquila/link';
import { NxMessageModule } from '@aposin/ng-aquila/message';
import { NxModalModule } from '@aposin/ng-aquila/modal';
import { NxOverlayModule } from '@aposin/ng-aquila/overlay';
import { NxPopoverModule } from '@aposin/ng-aquila/popover';
import { NxPaginationModule } from '@aposin/ng-aquila/pagination';
import { NxCardModule } from '@aposin/ng-aquila/card';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';

import { AppComponent } from './app.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ArtworkService } from './entities/services/artworkService';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [
                BrowserModule,
                BrowserAnimationsModule,
                FormsModule,
                HttpClientJsonpModule,
                HttpClientModule,
                HttpClientTestingModule,
                ReactiveFormsModule,
                NxButtonModule,
                NxCheckboxModule,
                NxDocumentationIconModule,
                NxDropdownModule,
                NxFooterModule,
                NxFormfieldModule,
                NxGridModule,
                NxHeadlineModule,
                NxIconModule,
                NxInputModule,
                NxLinkModule,
                NxMessageModule,
                NxModalModule,
                NxOverlayModule,
                NxPopoverModule,
                NxCardModule,
                NxPaginationModule,
                NgSelectModule
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.debugElement.componentInstance;
        spyOn(console, 'log');
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    

    it("should use the artworkList from the service", () => {
        const artworkService = fixture.debugElement.injector.get(ArtworkService);
        const query = {
            limit: 0,
            page: 1
        };
        const listData = {
            data: [],
            pagination: {}
        }
        artworkService.getArtworkList(query).subscribe(res =>
            {
                expect(res).toEqual(listData)
            })
      });

      


    
});

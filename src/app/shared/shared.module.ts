import { UtilsService } from '../services/utils.service';
import { ValidationsService } from '../services/validations.service';
import { ServerVariableService } from '../services/server-variable.service';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SideNavbarComponent } from './layout/side-navbar/side-navbar.component';
import { DashboardComponent } from '../admin/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgSelectFormFieldControlDirective } from './directives/ng-select.directive';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {
  DeleteButtonRendererComponent
} from '../admin/buttonRender/delete-button-renderer.component';
import {
  ShareCollectionButtonRendererComponent
} from '../admin/buttonRender/share-collection-button-renderer.component';
import {
  ShareCopyLinkButtonRendererComponent
} from '../admin/buttonRender/share-copy-link-button-renderer.component';
import { ButtonRendererComponent } from '../admin/buttonRender/button-renderer.component';
import { CheckboxRenderComponent } from '../admin/checkboxRender/checkboxRender.component';
import { DatePipe } from '@angular/common';
import {
  MatButtonModule, MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatDatepickerModule,
  MatSelectModule,
  MatStepperModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatExpansionModule,
  MatRadioModule
} from '@angular/material';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ProgressBarModule } from 'angular-progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgxFilesizeModule } from 'ngx-filesize';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CheckAuthorizationComponent } from '../check-authorization/check-authorization.component';
import { CanAccessDirective } from './directives/appCanAcces/CanAccess.directive';
import { OtherShareButtonRendererComponent } from '../admin/buttonRender/other-share-button-renderer.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    Ng2SearchPipeModule,
    ChartsModule,
    OrderModule,
    NgxPaginationModule,
    NgSelectModule,
    ColorPickerModule,
    FlexLayoutModule,
    MatButtonModule, MatCheckboxModule, MatButtonToggleModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatDatepickerModule, MatSelectModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatExpansionModule,
    MatRadioModule,
    NgxFileDropModule,
    ProgressBarModule,
    NgxFilesizeModule,
    InfiniteScrollModule,
  ],
  exports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatRadioModule,
    MatTooltipModule,
    FlexLayoutModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    FormsModule,
    Ng2SearchPipeModule,
    ChartsModule,
    OrderModule,
    NgxPaginationModule,
    NgSelectModule,
    ColorPickerModule,
    RouterModule, HeaderComponent,
    FooterComponent,
    NgxFileDropModule,
    ProgressBarModule,
    NgxFilesizeModule,
    InfiniteScrollModule,
    CanAccessDirective,

    SideNavbarComponent, NgSelectFormFieldControlDirective, DeleteButtonRendererComponent, ShareCollectionButtonRendererComponent, ShareCopyLinkButtonRendererComponent, ButtonRendererComponent, CheckboxRenderComponent],
  declarations: [HeaderComponent,
    FooterComponent, CanAccessDirective,
    CheckAuthorizationComponent,
    SideNavbarComponent, DashboardComponent, NgSelectFormFieldControlDirective, DeleteButtonRendererComponent, ShareCollectionButtonRendererComponent, OtherShareButtonRendererComponent, ShareCopyLinkButtonRendererComponent, ButtonRendererComponent, CheckboxRenderComponent],
  entryComponents: [DeleteButtonRendererComponent, ShareCollectionButtonRendererComponent, ShareCopyLinkButtonRendererComponent, ButtonRendererComponent, OtherShareButtonRendererComponent, CheckboxRenderComponent]
})
export class SharedModule {
  /**
* This static forRoot block (provides and configures services) is
* used in case of when we want use some services in one or more components.
*/
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [UtilsService, DatePipe, ValidationsService, ServerVariableService, NgSelectFormFieldControlDirective, CheckAuthorizationComponent]
    };
  }
}

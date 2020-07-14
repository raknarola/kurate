import { Directive, OnInit, OnDestroy, TemplateRef, ViewContainerRef, ElementRef } from '@angular/core';
import { Input } from '@angular/core';
import { CheckAuthorizationComponent } from '../../../check-authorization/check-authorization.component';
import { UtilsService } from '../../../services/utils.service';

@Directive({
  selector: '[appCanAccess]',
})
export class CanAccessDirective implements OnInit, OnDestroy {

  @Input('appCanAccess') AppCanAccess: string | string[];
  private permission$: any;

  constructor( private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private checkAuthoRization: CheckAuthorizationComponent, public utilsService: UtilsService) {
  }

  ngOnInit(): void {
    this.applyPermission();
  }

  public applyPermission() {
    this.permission$ = this.checkAuthoRization
      .checkAuthorization(this.AppCanAccess)
      .subscribe(authorized => {
        if (authorized) {
          // console.log('authorized');

          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          // console.log('not authorized');

          this.viewContainer.clear();
          // this.utilsService.redirectTo('/home/work_area/dashboard');
        }
      });
  }

  ngOnDestroy(): void {
    // this.permission$.unsubscribe();
  }
}

import { UtilsService } from '../../../services/utils.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet, ActivationStart } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {

  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  constructor(public utilsService: UtilsService,
    private router: Router) { }

  ngOnInit() {

    // $("body *").not(".sub-menu && .opensubmenu").click(function() {
    //   $('#app-container').removeClass('menu-sub-hidden');
    // });
    // $('.main-menu a.opensubmenu').click(function(){
    //   $('#app-container').toggleClass('menu-sub-hidden');
    // });



    $(function () {
      $(".main-menu a.opensubmenu").on("click", function (e) {
        $("#app-container").toggleClass("menu-sub-hidden");
        e.stopPropagation()
      });

      $(document).on("click", function (e) {
        if ($(e.target).is(".sub-menu") === false) {
          $("#app-container").addClass("menu-sub-hidden");
        }
      });




      $(".main-menu ul li.kishan a").on("click", function (e) {
        e.preventDefault();
        // alert();

        $('.main-menu ul li.kishan a.active').removeClass('active');
        $(this).addClass('active');
        $('.main-menu ul li.active').removeClass('active');
        // $('.main-menu ul li.active').addClass('active').siblings().removeClass('active');


        // $('.main-menu ul li.kishan.active').removeClass('active');
        //  $(this).parent().addClass('active');
        // $(this).addClass('active').siblings().removeClass('active');
      });

      $(".main-menu ul li").on("click", function (e) {
        e.preventDefault();
        $('.main-menu ul li.kishan a.active').removeClass('active');
      });

      $(".main-menu ul li.dashboardactive").on("click", function (e) {
        e.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
      });

    });




  }


  newfuntion() {
    this.router.events.subscribe(e => {
      console.log('e => ', e);

      if (e instanceof ActivationStart && e.snapshot.outlet === "/admin/work_area/assets/all-assets") {
        this.outlet.deactivate();
      }
    });
    this.router.navigate(['/admin/work_area/assets/all-assets']);
  }

}

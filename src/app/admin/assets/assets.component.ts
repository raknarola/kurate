import { AssetsService } from './Assets.service';
import { Assets } from '../../models/Assets';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { Deserialize } from 'cerialize';
declare var $: any;


@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent extends AssetsService implements OnInit, OnDestroy, AfterViewInit {


  ngOnInit() {

    this.applyCollectionValidations();
    this.applyValidation();
    this.getAllCollections();

    // $(window).scroll(() => {
    //   console.log($(window).scrollTop());
    //   console.log(($(document).height() - $(window).height()));

    //   if ($(window).scrollTop() === ($(window).height())) {
    //     // ajax call get data from server and append to the div
    //     console.log('Workkkkkkkkkkkkkk');
    //     this.getAllAssets(0, '50');
    //   }
    // });
    this.utilsService.scroll = 950;
    // const hieght = $(window).scroll(() => {
    //   const scroll = $('#test');
    //   // scroll.height($(document).height());
    //   console.log(scroll);
    //   // if (scroll == ) {
    //   //   this.clickMe(scroll);
    //   // }

    // });


    // this.scroll = $(document).scroll(() => {
    //   console.log($(document).height());
    //   const documentHieght = $(document).height();
    //   const myFloat = $(window).scrollTop() + $(window).height();
    //   const myTrunc = Math.trunc(myFloat);
    //   console.log(myTrunc);

    //   if (documentHieght === myTrunc ) {
    //     this.utilsService.offsetCount += 50;
    //     this.getAllAssets(this.utilsService.assetIdForGetFolderAssetsOnDelete ? this.utilsService.assetIdForGetFolderAssetsOnDelete : 0, this.utilsService.offsetCount);
    //   }
    // });
    if (!this.utilsService.isNullUndefinedOrBlank(localStorage.getItem('assetView'))) {
      this.flagForHideShowListView = JSON.parse(localStorage.getItem('assetView'));
    }


    if (this.utilsService.isNullUndefinedOrBlank(this.utilsService.allPermissions) && !this.utilsService.isNullUndefinedOrBlank(localStorage.getItem('permission'))) {
      this.utilsService.allPermissions = localStorage.getItem('permission');

    }


    this.route.params.subscribe(params => {
      console.log('params => ', params);

      if (params['search']) {

        this.statusOfAction = params['search'];
        this.utilsService.flagForHideShowAssestLabel = true;
        // console.log(this.utilsService.searchNgModel);
        if (!this.utilsService.isEmptyObjectOrNullUndefiend(localStorage.getItem('breadCrumbs'))) {

          // if (!this.utilsService.isNullUndefinedOrBlank(localStorage.getItem('isSearched'))) {
          //   this.utilsService.flagForHideShowAssestLabel = true;

          // } else {

          //   this.utilsService.flagForHideShowAssestLabel = false;
          // }
          this.utilsService.flagForHideShowAssestLabel = true;
          this.utilsService.arrayOfBreadCrumb = JSON.parse(localStorage.getItem('breadCrumbs'));
          // console.log(JSON.parse(localStorage.getItem('breadCrumbs')));

          this.utilsService.keyForFolderName = JSON.parse(localStorage.getItem('folderKey'));
          this.utilsService.flagForHideShowBackButton = true;
          this.utilsService.isBreadCrumb = true;
          const breadcrumbActiveID = this.utilsService.arrayOfBreadCrumb.filter(val => val.isActive === true).map(val => val.asset_id);
          this.utilsService.assetIdForGetFolderAssetsOnDelete = Number(breadcrumbActiveID);
          this.utilsService.getAllAssets(breadcrumbActiveID, 0, (this.orderByForGridView + (this.reverseFlagForListView ? '.desc' : '.asc')));
          this.utilsService.offsetCount += 50;

        } else {

          if (this.utilsService.isEmptyObjectOrNullUndefiend(this.utilsService.mainSearchNgModel) && !this.utilsService.isNullUndefinedOrBlank(localStorage.getItem('search-param'))) {
            const searchparams = localStorage.getItem('search-param');
            this.utilsService.mainSearchNgModel = searchparams;
            // console.log(searchparams);
            this.utilsService.flagForHideShowSearchInput = false;
            this.utilsService.searchAssets(searchparams, null);
          } else if (this.utilsService.isEmptyObjectOrNullUndefiend(this.utilsService.searchNgModel) && !this.utilsService.isNullUndefinedOrBlank(localStorage.getItem('search-tags-param'))) {
            const searchTagsparams = JSON.parse(localStorage.getItem('search-tags-param'));
            this.utilsService.searchNgModel = searchTagsparams;
            this.utilsService.flagForHideShowSearchInput = true;
            this.utilsService.searchAssets(null, searchTagsparams);
          } else {
            // console.log('callinnnnnggg');
            if (!this.utilsService.isNullUndefinedOrBlank(this.utilsService.mainSearchNgModel) || !this.utilsService.isEmptyObjectOrNullUndefiend(this.utilsService.searchNgModel)) {

              this.utilsService.searchAssets(this.utilsService.mainSearchNgModel, this.utilsService.searchNgModel);
            }
          }
        }

      } else {
        if (!this.utilsService.isEmptyObjectOrNullUndefiend(localStorage.getItem('breadCrumbs'))) {

          if (!this.utilsService.isNullUndefinedOrBlank(localStorage.getItem('isSearched'))) {
            this.utilsService.flagForHideShowAssestLabel = true;

          } else {

            this.utilsService.flagForHideShowAssestLabel = false;
          }
          this.utilsService.flagForHideShowAssestLabel = false;
          this.utilsService.flagforHideUploadingPlusButton = true;
          this.utilsService.arrayOfBreadCrumb = JSON.parse(localStorage.getItem('breadCrumbs'));
          // console.log(JSON.parse(localStorage.getItem('breadCrumbs')));

          this.utilsService.keyForFolderName = JSON.parse(localStorage.getItem('folderKey'));
          this.utilsService.flagForHideShowBackButton = true;
          this.utilsService.isBreadCrumb = true;
          const breadcrumbActiveID = this.utilsService.arrayOfBreadCrumb.filter(val => val.isActive === true).map(val => val.asset_id);
          this.utilsService.assetIdForGetFolderAssetsOnDelete = Number(breadcrumbActiveID);

          this.utilsService.getAllAssets(breadcrumbActiveID, 0, (this.orderByForGridView + (this.reverseFlagForListView ? '.desc' : '.asc')));
          this.utilsService.offsetCount += 50;

        } else {
          localStorage.removeItem('isSearched');
          localStorage.removeItem('breadCrumbs');
          localStorage.removeItem('folderKey');
          localStorage.setItem('assetView', JSON.stringify(this.flagForHideShowListView));
          this.utilsService.flagforHideUploadingPlusButton = true;
          this.utilsService.getAllAssets(0, 0, (this.orderByForGridView + (this.reverseFlagForListView ? '.desc' : '.asc')));
          const index = this.utilsService.arrayOfPermissionForAssets.findIndex(val1 => val1.name === '/');
          if (index !== -1) {
            this.utilsService.allPermissions = '/';
            localStorage.setItem('permission', this.utilsService.allPermissions);
          } else {
            this.utilsService.allPermissions = undefined;
            localStorage.removeItem('permission');

          }
          this.utilsService.offsetCount += 50;
        }
      }
    });
    this.arrayForSortingKeys = [{ key: 'name', value: 'File Name' }, { key: 'created_at', value: 'Created Date' }, { key: 'updated_at', value: 'Modified Date' }];
    // this.scroll = $(window).height();
    setTimeout(() => {
      if (this.utilsService.allAssets.length > 4) {

        this.clickMe();
      }

    }, 4000);
    // $(function () {

    // $(".maingragdropgrid").on("dragover", function(e) {
    // e.preventDefault();
    //     //e.stopPropagation();
    //     // $(this).addClass('dragging');
    // $(this).addClass('dragging').siblings().removeClass('dragging');
    //   });

    // });
  }
  ngAfterViewInit() {
  }
  ngOnDestroy() {
    this.utilsService.flagforHideUploadingPlusButton = false;
    this.utilsService.flagForHideShowAssestLabel = false;
    this.utilsService.searchNgModel = [];
    this.utilsService.arrayOfSearchedTags = [];
    this.utilsService.mainSearchNgModel = undefined;
    this.utilsService.flagForHideShowBackButton = false;
    this.utilsService.isBreadCrumb = false;
    this.utilsService.offsetCount = 0;
    this.utilsService.previousOffset = 0;
    // this.utilsService.arrayOfBreadCrumb = new Array<{ 'asset_id': number, 'folder_name': string, 'isActive': boolean }>();
    // console.log(this.utilsService.arrayOfBreadCrumb);
    // console.log('call');
    if (!this.utilsService.isEmptyObjectOrNullUndefiend(this.utilsService.arrayOfBreadCrumb)) {
      localStorage.setItem('breadCrumbs', JSON.stringify(this.utilsService.arrayOfBreadCrumb));
      localStorage.setItem('folderKey', JSON.stringify(this.utilsService.keyForFolderName));
      if (!this.utilsService.isNullUndefinedOrBlank(this.statusOfAction)) {
        localStorage.setItem('isSearched', JSON.stringify(true));
      }
    }
    if (this.utilsService.isNullUndefinedOrBlank(this.statusOfAction)) {
      localStorage.removeItem('isSearched');
    }
    if (!this.utilsService.isNullUndefinedOrBlank(this.statusOfAction)) {
      localStorage.setItem('isSearched', JSON.stringify(true));
    }
    this.utilsService.assetIdForGetFolderAssetsOnDelete = 0;
    this.utilsService.keyForFolderName = undefined;
    this.utilsService.fromDate = undefined;
    this.utilsService.toDate = undefined;
    this.utilsService.seletedFilType = undefined;

    this.utilsService.headersearchNgModel = undefined;
    this.utilsService.headermainSearchNgModel = undefined;
    // this.utilsService.allPermissions = undefined;
    // localStorage.removeItem('search-param');
    // localStorage.removeItem('search-tags-param');
    this.utilsService.scroll = undefined;
    $(window).off('scroll');
  }

}

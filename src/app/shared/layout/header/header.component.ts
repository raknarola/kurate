import { UtilsService } from '../../../services/utils.service';
import { StorageListnerService } from '../../../services/storage-listner.service';
import { Deserialize } from 'cerialize';
import { Tags } from '../../../models/Tags';
import { Component, OnInit } from '@angular/core';
import { HeaderService } from './header.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends HeaderService implements OnInit {



  ngOnInit() {
    this.selectedVal = 'MainSearch';
    if (!this.utilsService.isNullUndefinedOrBlank(this.utilsService.getLoginUsers())) {

      this.getList();
    }

    this.flagForHideShowSearchInput = false;

    setTimeout(function () {
      $(function () {
        $('.navbar .menu-button').on('click', function (e) {
          $('#app-container').toggleClass('main-hidden');
          $('#app-container').toggleClass('sub-hidden');
          e.stopPropagation();
        });

        // $(document).on("click", function(e) {
        //   if ($(e.target).is(".sub-menu") === false) {
        //     $("#app-container").addClass("menu-sub-hidden");
        //   }
        // });
      });

    }, 3000);


  }

  getList() {
    const param = {};
    this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.listTagsAPI, param, (response) => {
      if (!this.utilsService.isNullUndefinedOrBlank(response)) {
        this.arrayOfTags = Deserialize(response, Tags);
      }
    });
  }

  onOpen(elem) {
    if (elem.filterInput.nativeElement.value === '') {
      elem.close();
    }
  }

  changeSearchBoxByToogle(event) {
    this.selectedVal = event.value;
    console.log(event);
  }


  openCreateNewFolderModal() {
    this.utilsService.folderNameForCreateNewFolderAPI = null;
    this.utilsService.applyCreateFolderValidations();
    this.utilsService.openModal('createFolderModal');
  }
}

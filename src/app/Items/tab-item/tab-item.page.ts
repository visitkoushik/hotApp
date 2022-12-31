import { Component, OnInit } from '@angular/core';
import { AppStorageService } from 'src/app/app-storage/app-storage.service';
import { CartService } from 'src/app/providers/cart-service.service';
import { UtilService } from 'src/app/providers/utilservice.service';
import { I_Category } from 'src/model/category';
import { StoreName } from 'src/model/util';

@Component({
  selector: 'app-tab-item',
  templateUrl: './tab-item.page.html',
  styleUrls: ['./tab-item.page.scss'],
})
export class TabItemPage implements OnInit {
  public ITEM_ADD: boolean = false;
  public ITEM_UPDATE: boolean = false;
  public ITEM_READ: boolean = false;
  public CATEGORY_READ: boolean = false;
  constructor(
    private cartServc: CartService,
    private util: UtilService,
    private storage: AppStorageService
  ) {}

  async ngOnInit() {
    this.ITEM_ADD =
      this.util.metaData.accessRight.findIndex((e) => e === 'ITEM_ADD') > -1;
    this.ITEM_UPDATE =
      this.util.metaData.accessRight.findIndex((e) => e === 'ITEM_UPDATE') > -1;
    this.ITEM_READ =
      this.util.metaData.accessRight.findIndex((e) => e === 'ITEM_READ') > -1;
    this.CATEGORY_READ =
      this.util.metaData.accessRight.findIndex((e) => e === 'CATEGORY_READ') >
      -1;


  }
}

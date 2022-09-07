import { Component, OnInit } from '@angular/core';
import { AppStorageService } from 'src/app/app-storage/app-storage.service';
import { CartService } from 'src/app/providers/cart-service.service';

@Component({
  selector: 'app-tab-item',
  templateUrl: './tab-item.page.html',
  styleUrls: ['./tab-item.page.scss'],
})
export class TabItemPage implements OnInit {
  constructor(private storage: AppStorageService,
    private cartsrvc: CartService) {}

  ngOnInit() {
  }
}

import { Component } from '@angular/core';
import { NavController, Alert, Loading } from 'ionic-angular';

import {PromotionService} from '../../providers/promotion-service/promotion-service';

@Component({
  templateUrl: 'build/pages/promotion/promotion.html',
  providers: [PromotionService]
})
export class Promotion {

  public termo: string;
  public produtos: any[];
  public pagina: number;

  constructor(private nav: NavController, private promotionService: PromotionService) {
    this.produtos = [];
    this.termo = "";
    this.pagina = 1;
  }

  buscarMaisProdutos(infiniteScroll) {

    this.pagina++;

    this.promotionService.load(this.termo, this.pagina).then(data => {
      console.log(data);

      data.result.products.forEach(element => {
        this.produtos.push(element);        
      });

      infiniteScroll.complete();
    });

  }

  searchPromotions(evento) {


    if(evento.target.value.trim() == "")
      return;

    this.termo = evento.target.value;
    this.pagina = 1;

    this.promotionService.load(this.termo, this.pagina).then(data => {
      this.produtos = data.result.products;

    });

  }

  doAlert() {
    let alert = Alert.create({
      title: 'Atenção!',
      subTitle: 'Informe ao menos um termo para pesquisar!',
      buttons: ['OK']
    });
    this.nav.present(alert);

  }


}

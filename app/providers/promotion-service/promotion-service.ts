import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PromotionService {
  static get parameters(){
    return [[Http]]
  }  

  http: any;
  data: any;
  ultimoTermo: string;

  constructor(http) {
    this.http = http;
    this.data = null;
    this.ultimoTermo = "";
  }

  load(termo: string, pagina: number) {
    if (this.ultimoTermo === termo && pagina === 1) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {

      var url = 'http://gw.api.alibaba.com/openapi/param2/2/portals.open/api.listPromotionProduct/65767?fields=productId,productTitle,imageUrl,productUrl,salePrice,discount,originalPrice&localCurrency=BRL&keywords='+termo+'&language=pt&sort=orignalPriceUp&pageNo=' + pagina;

      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference          
          this.data = data;          
          this.ultimoTermo = termo;
          resolve(this.data);
        });
    });
  }
}


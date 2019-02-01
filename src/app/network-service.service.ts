import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface Product {
  name: string;
  brand: string;
  price: string;
  barcode: string;
  description: string;
  quantity: string;

}

@Injectable({
  providedIn: 'root'
})
export class NetworkServiceService {

  constructor(private http: HttpClient) {
  }

  public postProduct(product: Product) {
    return this.http.post('http://localhost:3000/postProduct', product, { responseType: 'json' });
  }

  public getAllProducts() {
    return this.http.get('http://localhost:3000/getAllProducts',{responseType: 'json'});
  }
}

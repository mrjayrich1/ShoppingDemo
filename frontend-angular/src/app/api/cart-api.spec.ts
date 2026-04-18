import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { CartApi } from '../api/cart-api';
import { environment } from '../../environments/environment.development';

describe('CartApi', () => {
  let service: CartApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartApi,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(CartApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should fetch cart contents via GET', () => {
    const mockItems = [{ productId: 1, quantity: 2 }];
    const endpoint = 'items';
    const expectedUrl = `${environment.apiUrl}/${endpoint}`;

    service.GetCartContents(endpoint).subscribe((data) => {
      expect(data).toEqual(mockItems);
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockItems);
  });

  it('should add an item via POST', () => {
    const mockResponse = { success: true };
    const payload = { productId: 123, quantity: 1 };
    const endpoint = '/add';
    const expectedUrl = `${environment.apiUrl}${endpoint}`;

    service.AddItemToCart(endpoint, payload).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(mockResponse);
  });

});
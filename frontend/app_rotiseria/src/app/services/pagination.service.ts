import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  page: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  constructor() { }

  setPagination(page: number, itemsPerPage: number, totalItems: number) {
    this.page = page;
    this.itemsPerPage = itemsPerPage;
    this.totalItems = totalItems;
  }

  getPage(): number {
    return this.page;
  }

  setPage(page: number) {
    this.page = page;
  }

  getItemsPerPage(): number {
    return this.itemsPerPage;
  }

  getTotalItems(): number {
    return this.totalItems;
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  productId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: [''],
      price: ['']
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.productService.getProducts().subscribe(products => {
        const product = products.find(p => p._id === this.productId);
        if (product) this.productForm.patchValue(product);
      });
    }
  }

  saveProduct(): void {
    if (this.productId) {
      this.productService.updateProduct(this.productId, this.productForm.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.productService.addProduct(this.productForm.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}

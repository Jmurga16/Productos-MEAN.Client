import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {

  listProductos: Producto[] = []

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.obtenerProductos2();
  }

  obtenerProductos() {
    this.productoService.getProductos().subscribe(
      data => {
        //console.log(data)
        this.listProductos = data;
      });
  }

  obtenerProductos2() {
    this.productoService.getProductos().subscribe({
      next: (v) => this.listProductos = v,//console.log(v),
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  eliminarProducto(id: any) {
    this.productoService.eliminarProducto(id).subscribe(
      data => {
        //console.log(data)
        this.toastr.error('El producto fue eliminado con exito')
        this.obtenerProductos();
      });
  }



}

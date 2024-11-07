import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Denomination } from '../model/denominacion.model';
import { AtmService } from '../services/retiroService.service';

@Component({
  selector: 'app-cajero',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './cajero.component.html',
  styleUrl: './cajero.component.scss'
})
export class CajeroComponent {
  monto: number = 0;
  alerta: string = '';
  resultado: Denomination[] = [];

  atmService = inject(AtmService)

  constructor() { }

  // funcion de retiro
  onRetiro() {
    // validacion en caso de que la cantidad sea menor al importe mas pequeño
    if (this.monto == 0 || this.monto < 100) {
      this.alerta = 'Cantidad no valida';
      this.resultado = [];
      setTimeout(() => {
        this.alerta = ''
      }, 1000);
      return
    }
    // simulacion de consumo de servicio
    const result = this.atmService.retiro(this.monto);
    if (result.success) {
      this.alerta = 'Retiro exitoso';
      this.resultado = result.denominations!;
    } else {
      this.alerta = result.message!;
      this.resultado = [];
    }
    setTimeout(() => {
      this.alerta = ''
    }, 1000);
  }


}

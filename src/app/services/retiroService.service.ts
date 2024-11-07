// src/app/services/atm.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Denomination } from '../model/denominacion.model';

@Injectable({
  providedIn: 'root'
})
export class AtmService {

  private efectivo: Denomination[] = [
    { tipo: 'Billete', denominacion: 1000, cantidad: 2 },
    { tipo: 'Billete', denominacion: 500, cantidad: 5 },
    { tipo: 'Billete', denominacion: 200, cantidad: 10 },
    { tipo: 'Billete', denominacion: 100, cantidad: 20 },
    { tipo: 'Billete', denominacion: 50, cantidad: 30 },
    { tipo: 'Billete', denominacion: 20, cantidad: 40 },
    { tipo: 'Moneda', denominacion: 10, cantidad: 50 },
    { tipo: 'Moneda', denominacion: 5, cantidad: 100 },
    { tipo: 'Moneda', denominacion: 2, cantidad: 200 },
    { tipo: 'Moneda', denominacion: 1, cantidad: 300 },
    { tipo: 'Moneda', denominacion: 0.5, cantidad: 100 },
  ];

  getTotalEfectivo(): number {
    return this.efectivo.reduce((total, item) => total + item.denominacion * item.cantidad, 0);
  }

  retiro(amount: number): { success: boolean; denominations?: Denomination[]; message?: string } {
    if (amount > this.getTotalEfectivo()) {
      return { success: false, message: 'Fondos insuficientes en el cajero.' };
    }

    let retiroTotal: Denomination[] = [];
    for (const item of this.efectivo) {
      if (amount === 0) break;

      const count = Math.min(Math.floor(amount / item.denominacion), item.cantidad);
      if (count > 0) {
        retiroTotal.push({ ...item, cantidad: count });
        amount -= count * item.denominacion;
      }
    }

    if (amount > 0) {
      return { success: false, message: 'No es posible dispensar la cantidad exacta con las denominaciones disponibles.' };
    }

    retiroTotal.forEach(retItem => {
      const cashItem = this.efectivo.find(item => item.denominacion === retItem.denominacion);
      if (cashItem) {
        cashItem.cantidad -= retItem.cantidad;
      }
    });

    return { success: true, denominations: retiroTotal };
  }

}

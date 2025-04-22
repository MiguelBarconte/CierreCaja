class Pagos {
    nombre;
    destino;
    monto;
    medio;
    constructor(
        nombre,
        destino,
        monto,
        medio
    ) {
        this.nombre = nombre;
        this.destino = destino;
        this.monto = monto;
        this.medio = medio;
    };

    verPago() {
        switch (this.medio) {
            case "dolar":
                return this.nombre + " $" + this.monto + "USD";
            case "efectivo":
                return this.nombre + " $" + this.monto + "E";
            case "transferencia":
                return this.nombre + " $" + this.monto + "T";
        }
    };

}
class Destino {
    lugar;
    pagos = [];
    transferencia;
    efectivo;
    dolar;
    constructor(lugar) {
        this.lugar = lugar;
        this.transferencia = 0;
        this.efectivo = 0;
        this.dolar = 0;
    }

    datosPaga(pago) {
        this.pagos.push(pago);
        switch (pago.medio) {
            case "dolar":
                this.dolar += Number(pago.monto);
                break;
            case "transferencia":
                this.transferencia += Number(pago.monto);
                break;
            case "efectivo":
                this.efectivo += Number(pago.monto);
                break;
        }
    }

    resumen() {
        if (this.dolar == 0) {
            return `
                *DESTINO: ${this.lugar}* \n
            Ingreso en efectivo: $${this.efectivo}
            Quedo en el estudio: $${this.efectivo}
            Ingreso por transferencia: $${this.transferencia}
            
            `
        } else {
            return `
                *DESTINO: ${this.lugar}* \n
            Ingreso en efectivo: ${this.dolar}USD 
            Quedo en el estudio: $${this.dolar}USD

            `
        }
    }

    listarPagos(){
        let listaPagos;
        this.pagos.forEach(p =>{
            listaPagos += `- ${p.verPago()} \n`;
        });
        return listaPagos;
    }
}

export interface Carrito {
    datos:    Datos;
}

export interface Datos {
    carrito: number,
    historial: Historial[]
}

export  interface Historial{
    id: Number,
    cantidad: Number
}
let nombre_variable: string = 'Nombre';
let edad: number = 30;
let lista: number[] = [1,2,3];
let lista2: Array<number> = [1,2,3];
let listaStrings: string[] = ['a','b','c'];

let tupla: [string, number];
tupla = ['Alicia', 30];

enum Animales {Perro, Gato, Elefante};
let animal: Animales = Animales.Elefante;

/** el tipo any es parecido al object, te deja guardar cualquier tipo de objeto */
let cualquiera: any = true;

/** El tipo void solo permite guardar dos datos, o undefined o null */
let nada: void = undefined;
let nada2: void = null;

/** Se pueden añadir clases */
class NombreClase {
    private _propiedadPrivada: string;
    constructor(propiedadPrivada: string){
        this._propiedadPrivada = propiedadPrivada;
    }

    get propiedadPrivada(): string {
        return this._propiedadPrivada;
    }

    set propiedadPrivada(propiedadPrivada: string) {
        this._propiedadPrivada = propiedadPrivada;
    }
    printMsg(): string {
        return "Esta clase tiene: " + this._propiedadPrivada;
    }
}

/* Interfaces */
interface LogInterface {
    msg: string;
    date?: number;
}

function Logger(log: LogInterface){
    console.log(log.msg);

}

import {Validator} from './path';

export class Validator {
    validate(n: number): boolean {
        return n > 5;
    }
}

/* Genéricos */
function compare<T>(arg1: T, arg2: T){
    if(arg1 > arg2){
        return arg2;
    }
    return arg1;
}

function compareAny(arg1: any; arg2: any){
    if(arg1 > arg2){
        return arg2;
    }
    return arg1;
}

/* La diferencia entre los dos métodos anteriores es que en el primero (compare) 
puedes sacar información del tipo de dato que viene en la función, pero en la
función compareAny no hay manera de saber el tipo de dato. Es decir, que si en la
función compare los argumentos números, se puede saber que son números, pero en 
la función compareAny no al ser de tipo any */
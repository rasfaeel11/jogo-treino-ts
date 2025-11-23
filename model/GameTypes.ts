export type AcaoCombate = 'ATACAR' | 'CURAR' | 'MAGIA' | 'FUGIR';

export interface ResultadoTurno {
    jogoContinua: boolean;
    logs: string[];
}
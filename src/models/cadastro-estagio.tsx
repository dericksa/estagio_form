export interface ICadastroEstagio {
    matricula?: number,
    nome?: string,
    telefone?: string,
    celular?: string,
    email?: string,
    ano?: number,
    periodo?: number,
    nomeEmpresa?: string,
    tipoEstagio?: tipo_estagio,
    supervisorEmpresa?: string,
    cargoSupervisor?: string,
    telefoneSupervisor?: string,
    celularSupervisor?: string,
    emailSupervisor?: string,
    emailRH?: string,
    horarioEstagio?: horario[],
    dataInicioEstagio?: Date,
    dataTerminoEstagio?: Date,
    nomeOrientador?: string,
    telefoneOrientador?: string,
    celularOrientador?: string,
    emailOrientador?: string,
    cargoOrientador?: string,
    atividadesEstagio?: string,
}

export interface horario {
    diaSemana?: string
    horarioInicio?: string
    horarioFim?: string
}

export enum tipo_estagio {
    NOBG = 'NÃO OBRIGATÓRIO',
    OBG_1 = 'OBRIGATÓRIO 1',
    OBG_2 = 'OBRIGATÓRIO 2',
    OBG_1_2 ='OBRIGATÓRIO 1 e 2'
}
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
    emailSupervisor?: string,
    emailRH?: string,
    horarios?: horario[],
    dataInicioEstagio?: Date,
    dataTerminoEstagio?: Date,
    nomeOrientador?: string,
    telefoneOrientador?: string
    emailOrientador?: string,
    cargoOrientador?: string,
    atividadesEstagio?: string,
    observacoes?: string
}

export interface horario {
    diaSemana?: dia_semana
    horarioInicio?: string
    horarioFim?: string
    tipo?: tipo_horario
}

export enum tipo_horario {
    ESTAGIO = 'Estagio',
    AULA = 'Aula'
}

export enum dia_semana {
    SEGUNDA_FEIRA = 'Segunda-Feira',
    TERCA_FEIRA = 'Terça-Feira',
    QUARTA_FEIRA = 'Quarta-Feira',
    QUINTA_FEIRA = 'Quinta-Feira',
    SEXTA_FEIRA = 'Sexta-Feira',
    SABADO = 'Sábado'
}

export enum tipo_estagio {
    NOBG = 'NÃO OBRIGATÓRIO',
    OBG_1 = 'OBRIGATÓRIO 1',
    OBG_2 = 'OBRIGATÓRIO 2',
    OBG_1_2 ='OBRIGATÓRIO 1 e 2',
    IC ='INICIAÇÃO CIENTÍFICA'
}
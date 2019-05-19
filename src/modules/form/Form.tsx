import React, { Component } from 'react';
import "./form.scss"
import InputField from '../../components/InputField/InputField';
import Select from '../../components/Select/select';
import Header from './header/header'
import GroupHeader from './groupheader/groupheader'
import { tipo_estagio, ICadastroEstagio } from '../../models/cadastro-estagio';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";


export interface IFormProps extends DispatchProps {
}

export interface IFormState {
    newCadastro?: ICadastroEstagio,
    errors?: { [key: string]: boolean | undefined };
    valids?: { [key: string]: boolean | undefined };
    estagioOptions?: string[];
    name?: string;
}


export class Form extends React.Component<IFormProps, IFormState> {

    constructor(props) {
        super(props);

        this.state = {
            newCadastro: {
                matricula: undefined,
                nome: undefined,
                telefone: undefined,
                celular: undefined,
                email: undefined,
                ano: undefined,
                periodo: undefined,
                nomeEmpresa: undefined,
                tipoEstagio: undefined,
                supervisorEmpresa: undefined,
                cargoSupervisor: undefined,
                telefoneSupervisor: undefined,
                celularSupervisor: undefined,
                emailSupervisor: undefined,
                emailRH: undefined,
                horarioEstagio: undefined,
                dataInicioEstagio: undefined,
                nomeOrientador: undefined,
                telefoneOrientador: undefined,
                celularOrientador: undefined,
                emailOrientador: undefined,
                cargoOrientador: undefined,
                atividadesEstagio: undefined
            },
            errors: {},
            valids: {},
            estagioOptions: [tipo_estagio.NOBG, tipo_estagio.OBG_1, tipo_estagio.OBG_2, tipo_estagio.OBG_1_2],
        };
    }

    handleTextChanged = (text: string, propertyToChange: string, fieldKey?: string) => {
        this.setState(prevState => ({
            newCadastro: { ...prevState.newCadastro, [propertyToChange]: text },
            errors: { ...this.state.errors, [fieldKey]: false },
            valids: { ...this.state.valids, [fieldKey]: false }
        }));
        return;
    };

    validateForm = (): boolean => {
        let result = true;
        let isNameError = false;

        if (this.state.newCadastro.nome == undefined) {
            result = false;
            isNameError = true;
        }

        console.log(isNameError)

        this.setState({
            errors: { ...this.state.errors, ['nome']: isNameError },
        });


        return result
    }

    handleSave = () => {
        if (!this.validateForm()) {
            return;
        }
    }

    handleInput(e) {
        var tipo = tipo_estagio.NOBG
        switch (e.target.value) {
            case tipo_estagio.NOBG:
                tipo = tipo_estagio.NOBG
                break
            case tipo_estagio.OBG_1:
                tipo = tipo_estagio.OBG_1
                break
            case tipo_estagio.OBG_2:
                tipo = tipo_estagio.OBG_2
                break
            case tipo_estagio.OBG_1_2:
                tipo = tipo_estagio.OBG_1
                break
        }

        this.setState(prevState => ({ newCadastro: { ...prevState.newCadastro, tipoEstagio: tipo } }));
    }

    handleOnInitDateChange = (value, e) => {
        this.setState(prevState => ({
            newCadastro: { ...prevState.newCadastro, dataInicioEstagio: value}}));
    }

    handleOnEndDateChange = (value, e) => {
        this.setState(prevState => ({
            newCadastro: { ...prevState.newCadastro, dataTerminoEstagio: value}}));
    }

    render() {
        return (
            <div className={'form-page-container'}>
                <div className={'shadow-8dp'}>
                    <Header />
                    <div className={'form-container'}>
                        <div className={'form-group-container'}>
                            <GroupHeader
                                title='Informações do aluno'
                            />
                            <div className={'form-input-divisor'}>
                                <InputField
                                    title={"Número de matrícula"}
                                    onChange={event => this.handleTextChanged(event.target.value, 'matricula')}
                                    error={this.state.errors['matricula']}
                                    valid={this.state.valids['matricula']}
                                    inputClassName={'form-input'}
                                    value={this.state.newCadastro.matricula ? this.state.newCadastro.matricula : ''}
                                    placeholder={'Número de matrícula'}
                                />
                            </div>

                            <div className={'form-input-divisor'}>
                                <InputField
                                    title={"Nome Completo"}
                                    onChange={event => this.handleTextChanged(event.target.value, 'nome')}
                                    error={this.state.errors['nome']}
                                    valid={this.state.valids['nome']}
                                    inputClassName={'form-input'}
                                    value={this.state.newCadastro.nome ? this.state.newCadastro.nome : ''}
                                    placeholder={'Nome Completo'}
                                />
                            </div>

                            <div className={'form-input-divisor'}>
                                <InputField
                                    title={"Telefone"}
                                    onChange={event => this.handleTextChanged(event.target.value, 'telefone')}
                                    error={this.state.errors['telefone']}
                                    valid={this.state.valids['telefone']}
                                    inputClassName={'form-input'}
                                    value={this.state.newCadastro.telefone ? this.state.newCadastro.telefone : ''}
                                    placeholder={'Telefone'}
                                />
                            </div>

                            <div className={'form-input-divisor'}>
                                <InputField
                                    title={"Celular"}
                                    onChange={event => this.handleTextChanged(event.target.value, 'celular')}
                                    error={this.state.errors['celular']}
                                    valid={this.state.valids['celular']}
                                    inputClassName={'form-input'}
                                    value={this.state.newCadastro.celular ? this.state.newCadastro.celular : ''}
                                    placeholder={'Celular'}
                                />
                            </div>

                            <div className={'form-input-divisor'}>
                                <InputField
                                    title={"E-mail"}
                                    onChange={event => this.handleTextChanged(event.target.value, 'email')}
                                    error={this.state.errors['email']}
                                    valid={this.state.valids['email']}
                                    inputClassName={'form-input'}
                                    value={this.state.newCadastro.email ? this.state.newCadastro.email : ''}
                                    placeholder={'E-mail'}
                                />
                            </div>

                            <div className={'form-input-divisor'}>
                                <InputField
                                    title={"Ano"}
                                    onChange={event => this.handleTextChanged(event.target.value, 'ano')}
                                    error={this.state.errors['ano']}
                                    valid={this.state.valids['ano']}
                                    inputClassName={'form-input'}
                                    value={this.state.newCadastro.ano ? this.state.newCadastro.ano : ''}
                                    placeholder={'Ano'}
                                />
                            </div>

                            <div className={'form-input-divisor'}>
                                <InputField
                                    title={"Período"}
                                    onChange={event => this.handleTextChanged(event.target.value, 'periodo')}
                                    error={this.state.errors['periodo']}
                                    valid={this.state.valids['periodo']}
                                    inputClassName={'form-input'}
                                    value={this.state.newCadastro.periodo ? this.state.newCadastro.periodo : ''}
                                    placeholder={'Período'}
                                />
                            </div>

                        </div>

                        <div className={'form-group-container'}>
                            <GroupHeader
                                title='Informações do estágio'
                            />

                            <div className={'form-input-divisor'}>
                                <InputField
                                    title={"Nome da Empresa"}
                                    onChange={event => this.handleTextChanged(event.target.value, 'nomeEmpresa')}
                                    error={this.state.errors['nomeEmpresa']}
                                    valid={this.state.valids['nomeEmpresa']}
                                    inputClassName={'form-input'}
                                    value={this.state.newCadastro.nomeEmpresa ? this.state.newCadastro.nomeEmpresa : ''}
                                    placeholder={'Nome da Empresa'}
                                />
                            </div>

                            <div className={'form-input-divisor'}>
                                <Select
                                    title={"Tipo de estágio"}
                                    name={"tipo"}
                                    options={this.state.estagioOptions}
                                    value={this.state.newCadastro.tipoEstagio ? this.state.newCadastro.tipoEstagio : ''}
                                    placeholder={"Escolha o tipo de Estágio"}
                                    onChange={this.handleInput}
                                />
                            </div>

                            <div className={'form-input-divisor'}>
                                <InputField
                                    title={"Supervisor de Estágio na Empresa"}
                                    onChange={event => this.handleTextChanged(event.target.value, 'supervisorEmpresa')}
                                    error={this.state.errors['supervisorEmpresa']}
                                    valid={this.state.valids['supervisorEmpresa']}
                                    inputClassName={'form-input'}
                                    value={this.state.newCadastro.supervisorEmpresa ? this.state.newCadastro.supervisorEmpresa : ''}
                                    placeholder={'Supervisor de Estágio na Empresa'}
                                />
                            </div>

                            <div className={'form-input-divisor'}>
                                <InputField
                                    title={"Cargo do Supervisor"}
                                    onChange={event => this.handleTextChanged(event.target.value, 'cargoSupervisor')}
                                    error={this.state.errors['cargoSupervisor']}
                                    valid={this.state.valids['cargoSupervisor']}
                                    inputClassName={'form-input'}
                                    value={this.state.newCadastro.cargoSupervisor ? this.state.newCadastro.cargoSupervisor : ''}
                                    placeholder={'Cargo do Supervisor'}
                                />
                            </div>


                            <div className={'form-input-divisor'}>
                                <InputField
                                    title={"Telefone do Supervisor"}
                                    onChange={event => this.handleTextChanged(event.target.value, 'telefoneSupervisor')}
                                    error={this.state.errors['telefoneSupervisor']}
                                    valid={this.state.valids['telefoneSupervisor']}
                                    inputClassName={'form-input'}
                                    value={this.state.newCadastro.telefoneSupervisor ? this.state.newCadastro.telefoneSupervisor : ''}
                                    placeholder={'Telefone do Supervisor'}
                                />
                            </div>


                            <div className={'form-input-divisor'}>
                                <InputField
                                    title={"Celular do Supervisor"}
                                    onChange={event => this.handleTextChanged(event.target.value, 'celularSupervisor')}
                                    error={this.state.errors['celularSupervisor']}
                                    valid={this.state.valids['celularSupervisor']}
                                    inputClassName={'form-input'}
                                    value={this.state.newCadastro.celularSupervisor ? this.state.newCadastro.celularSupervisor : ''}
                                    placeholder={'Celular do Supervisor'}
                                />
                            </div>


                            <div className={'form-input-divisor'}>
                                <InputField
                                    title={"E-mail Supervisor"}
                                    onChange={event => this.handleTextChanged(event.target.value, 'emailSupervisor')}
                                    error={this.state.errors['emailSupervisor']}
                                    valid={this.state.valids['emailSupervisor']}
                                    inputClassName={'form-input'}
                                    value={this.state.newCadastro.emailSupervisor ? this.state.newCadastro.emailSupervisor : ''}
                                    placeholder={'E-mail Supervisor'}
                                />
                            </div>


                            <div className={'form-input-divisor'}>
                                <InputField
                                    title={"E-mail RH"}
                                    onChange={event => this.handleTextChanged(event.target.value, 'emailRH')}
                                    error={this.state.errors['emailRH']}
                                    valid={this.state.valids['emailRH']}
                                    inputClassName={'form-input'}
                                    value={this.state.newCadastro.emailRH ? this.state.newCadastro.emailRH : ''}
                                    placeholder={'E-mail RH'}
                                />
                            </div>


                            <div className={'form-input-divisor'}>
                                <div className="form-group">
                                    <label> {"Data de início do Estágio"} </label>
                                    <DatePicker
                                        dateFormat="dd/MM/yyyy"
                                        selected={this.state.newCadastro.dataInicioEstagio}
                                        onChange={(value, e) => this.handleOnInitDateChange(value, e)} />
                                </div>
                            </div>

                            <div className={'form-input-divisor'}>
                                <div className="form-group">
                                    <label> {"Data de término do Estágio"} </label>
                                    <DatePicker
                                        dateFormat="dd/MM/yyyy"
                                        selected={this.state.newCadastro.dataTerminoEstagio}
                                        onChange={(value, e) => this.handleOnEndDateChange(value, e)} />
                                </div>
                            </div>


                            <div className={'form-input-divisor'}>
                                <InputField
                                    title={"Atividades de Estágio"}
                                    onChange={event => this.handleTextChanged(event.target.value, 'atividadesEstagio')}
                                    error={this.state.errors['atividadesEstagio']}
                                    valid={this.state.valids['atividadesEstagio']}
                                    inputClassName={'form-input'}
                                    value={this.state.newCadastro.atividadesEstagio ? this.state.newCadastro.atividadesEstagio : ''}
                                    placeholder={'Atividades de Estágio'}
                                    hasInfo
                                    info={'Descreva as atividades desempenhadas no estágio'}
                                    isTextArea
                                />
                            </div>


                        </div>

                        <div className={'form-group-container'}>
                            <GroupHeader
                                title='Informações sobre o Orientador'
                            />

                            <div className={'form-input-divisor'}>
                                <InputField
                                    title={"Nome Orientador"}
                                    onChange={event => this.handleTextChanged(event.target.value, 'nomeOrientador')}
                                    error={this.state.errors['nomeOrientador']}
                                    valid={this.state.valids['nomeOrientador']}
                                    inputClassName={'form-input'}
                                    value={this.state.newCadastro.nomeOrientador ? this.state.newCadastro.nomeOrientador : ''}
                                    placeholder={'Nome Orientador'}
                                />
                            </div>

                            <div className={'form-input-divisor'}>
                                <InputField
                                    title={"Telefone do Orientador"}
                                    onChange={event => this.handleTextChanged(event.target.value, 'telefoneOrientador')}
                                    error={this.state.errors['telefoneOrientador']}
                                    valid={this.state.valids['telefoneOrientador']}
                                    inputClassName={'form-input'}
                                    value={this.state.newCadastro.telefoneOrientador ? this.state.newCadastro.telefoneOrientador : ''}
                                    placeholder={'Telefone do Orientador'}
                                />
                            </div>


                            <div className={'form-input-divisor'}>
                                <InputField
                                    title={"Celular do Orientador"}
                                    onChange={event => this.handleTextChanged(event.target.value, 'celularOrientador')}
                                    error={this.state.errors['celularOrientador']}
                                    valid={this.state.valids['celularOrientador']}
                                    inputClassName={'form-input'}
                                    value={this.state.newCadastro.celularOrientador ? this.state.newCadastro.celularOrientador : ''}
                                    placeholder={'Celular do Orientador'}
                                />
                            </div>


                            <div className={'form-input-divisor'}>
                                <InputField
                                    title={"E-mail do Orientador"}
                                    onChange={event => this.handleTextChanged(event.target.value, 'emailOrientador')}
                                    error={this.state.errors['emailOrientador']}
                                    valid={this.state.valids['emailOrientador']}
                                    inputClassName={'form-input'}
                                    value={this.state.newCadastro.emailOrientador ? this.state.newCadastro.emailOrientador : ''}
                                    placeholder={'E-mail do Orientador'}
                                />
                            </div>

                            <div className={'form-input-divisor'}>
                                <InputField
                                    title={"Cargo do Orientador"}
                                    onChange={event => this.handleTextChanged(event.target.value, 'cargoOrientador')}
                                    error={this.state.errors['cargoOrientador']}
                                    valid={this.state.valids['cargoOrientador']}
                                    inputClassName={'form-input'}
                                    value={this.state.newCadastro.cargoOrientador ? this.state.newCadastro.cargoOrientador : ''}
                                    placeholder={'Cargo do Orientador'}
                                />
                            </div>
                        </div>

                        <button
                            onClick={this.handleSave}>Enviar</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {}

type DispatchProps = typeof mapDispatchToProps;

export default Form;
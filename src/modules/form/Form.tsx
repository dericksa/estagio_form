import React, { Component } from 'react';
import "./form.scss"
import InputField from '../../components/InputField/InputField';
import Select from '../../components/Select/select';
import Header from './header/header'
import GroupHeader from './groupheader/groupheader'
import { dia_semana, tipo_estagio, ICadastroEstagio } from '../../models/cadastro-estagio';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css';
import TimePickerStyle from '../../components/TimePicker/TimePicker';
import { MDBBtn } from "mdbreact";
import { connect } from 'react-redux';
import { IRootState } from '../../reducers/';
import { HttpRequestStatus } from '../../models/HttpRequestStatus';
import {
    fetchId,
    reset
  } from '../../reducers/formReducer/formReducer';
import ValidationUtils from '../../utils/validationUtils'
import { throwStatement } from '@babel/types';


export interface IFormProps extends StateProps, DispatchProps {
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
                emailSupervisor: undefined,
                emailRH: undefined,
                horarioEstagio: undefined,
                dataInicioEstagio: undefined,
                nomeOrientador: undefined,
                telefoneOrientador: undefined,
                emailOrientador: undefined,
                cargoOrientador: undefined,
                atividadesEstagio: undefined,
                observacoes: undefined
            },
            errors: {},
            valids: {},
            estagioOptions: [tipo_estagio.NOBG, tipo_estagio.OBG_1, tipo_estagio.OBG_2, tipo_estagio.OBG_1_2],
        };
    }


    componentWillReceiveProps(newProps) {
        if(newProps.saveForm === HttpRequestStatus.SUCCESS){
            console.log("success")
        }
        if(newProps.saveForm === HttpRequestStatus.ERROR){
            console.log("error")
        }
        if(newProps.saveForm === HttpRequestStatus.ONGOING){
            console.log("ongoing")
        }
    
    }

    handleTextChanged = (text: string, propertyToChange: string, fieldKey?: string) => {
        this.setState(prevState => ({
            newCadastro: { ...prevState.newCadastro, [propertyToChange]: text },
            errors: { ...this.state.errors, [fieldKey]: false },
            valids: { ...this.state.valids, [fieldKey]: false }
        }));
        return;
    };


    validateStudentInformation = (): boolean =>  {
        let result = true;
        let isNameError = false;
        let isRegisterError = false;
        let isCellPhoneError = false;
        let isPhoneError = false;
        let isEmailError = false;
        let isYearError = false;
        let isPeriodError = false;
        let isCompanyNameError = false;
        let isTypeError = false;
        let isSupervisorNameError = false;
        let isSupervisorRoleError = false;
        let isSupervisorPhoneError = false;
        let isSupervisorEmailError = false;
        let isHREmailError = false;
        let isInternShipActivitiesValid = false;
        let isInitialDateError = false;
        let isEndDateError = false;
        let isAdvisorNameError = false;
        let isAdvisorPhoneError = false;
        let isAdvisorEmailError = false;
        let isAdvisorRoleError = false;


        if (!ValidationUtils.isValidString(this.state.newCadastro.nome)) {
            result = false;
            isNameError = true;
        }

        if(!ValidationUtils.isValidNumber(this.state.newCadastro.matricula)) {
            result = false;
            isRegisterError = true;
        }

        if(!ValidationUtils.isValidPhoneNumber(this.state.newCadastro.celular)) {
            result = false;
            isCellPhoneError = true;
        }

        if(!ValidationUtils.isValidPhoneNumber(this.state.newCadastro.telefone)) {
            result = false;
            isPhoneError = true;
        }

        if(!ValidationUtils.isEmailValid(this.state.newCadastro.email)) {
            result = false;
            isEmailError = true;
        }

        if(!ValidationUtils.isValidNumber(this.state.newCadastro.ano)) {
            result = false;
            isYearError = true;
        }

        if(!ValidationUtils.isValidNumber(this.state.newCadastro.periodo)) {
            result = false;
            isPeriodError = true;
        }

        if (!ValidationUtils.isValidString(this.state.newCadastro.nomeEmpresa)) {
            result = false;
            isCompanyNameError = true;
        }
        
        if(this.state.newCadastro.tipoEstagio == undefined) {
            result = false;
            isTypeError = true;
        }

        if (!ValidationUtils.isValidString(this.state.newCadastro.supervisorEmpresa)) {
            result = false;
            isSupervisorNameError = true;
        }

        if (!ValidationUtils.isValidString(this.state.newCadastro.cargoSupervisor)) {
            result = false;
            isSupervisorRoleError = true;
        }

        if (!ValidationUtils.isValidPhoneNumber(this.state.newCadastro.telefoneSupervisor)) {
            result = false;
            isSupervisorPhoneError = true;
        }

        if (!ValidationUtils.isEmailValid(this.state.newCadastro.emailSupervisor)) {
            result = false;
            isSupervisorEmailError = true;
        }

        if (!ValidationUtils.isEmailValid(this.state.newCadastro.emailRH)) {
            result = false;
            isHREmailError = true;
        }

        if (!ValidationUtils.isValidString(this.state.newCadastro.atividadesEstagio)) {
            result = false;
            isInternShipActivitiesValid = true;
        }

        if(this.state.newCadastro.dataInicioEstagio == undefined) {
            result = false;
            isInitialDateError = true;
        }

        if(this.state.newCadastro.dataTerminoEstagio == undefined) {
            result = false;
            isEndDateError = true;
        }

        if (!ValidationUtils.isValidString(this.state.newCadastro.nomeOrientador)) {
            result = false;
            isAdvisorNameError = true;
        }

        if (!ValidationUtils.isValidPhoneNumber(this.state.newCadastro.telefoneOrientador)) {
            result = false;
            isAdvisorPhoneError = true;
        }

        if(!ValidationUtils.isEmailValid(this.state.newCadastro.emailOrientador)) {
            result = false;
            isAdvisorEmailError = true;
        }

        if (!ValidationUtils.isValidString(this.state.newCadastro.cargoOrientador)) {
            result = false;
            isAdvisorRoleError = true;
        }

    
        this.setState({
            errors: { ...this.state.errors, ['nome']: isNameError, ['matricula']: isRegisterError, ['celular']: isCellPhoneError, ['telefone']: isPhoneError,
        ['email']: isEmailError, ['ano']: isYearError, ['periodo']: isPeriodError, ['nomeEmpresa']: isCompanyNameError, ['tipoEstagio']: isTypeError, ['supervisorEmpresa']: isSupervisorNameError, ['cargoSupervisor']: isSupervisorRoleError,
        ['telefoneSupervisor']: isSupervisorPhoneError, ['emailSupervisor']: isSupervisorEmailError, ['emailRH']: isHREmailError, ['atividadesEstagio']: isInternShipActivitiesValid,
        ['dataInicioEstagio']: isInitialDateError, ['dataTerminoEstagio']: isEndDateError, ['nomeOrientador']: isAdvisorNameError, ['telefoneOrientador']: isAdvisorPhoneError, ['emailOrientador']: isAdvisorEmailError, 
        ['cargoOrientador']: isAdvisorRoleError }
        });

        return result
    }

    validateForm = (): boolean => {
        return this.validateStudentInformation()
    }

    handleSave = () => {
        this.props.fetchId(1)
        if (!this.validateForm()) {
            return;
        }
    }

    handleInput = (e) => {
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
            newCadastro: { ...prevState.newCadastro, dataInicioEstagio: value }
        }));
    }

    handleOnEndDateChange = (value, e) => {
        this.setState(prevState => ({
            newCadastro: { ...prevState.newCadastro, dataTerminoEstagio: value }
        }));
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
                                    isMaskRequired
                                    maskFormat={'(99)9999-9999'}
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
                                    isMaskRequired
                                    maskFormat={'(99)99999-9999'}
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
                                    title={"Ano de entrada"}
                                    onChange={event => this.handleTextChanged(event.target.value, 'ano')}
                                    error={this.state.errors['ano']}
                                    valid={this.state.valids['ano']}
                                    inputClassName={'form-input'}
                                    value={this.state.newCadastro.ano ? this.state.newCadastro.ano : ''}
                                    placeholder={'Ano'}
                                    isMaskRequired
                                    maskFormat={'2099'}
                                />
                            </div>

                            <div className={'form-input-divisor'}>
                                <InputField
                                    title={"Período atual"}
                                    onChange={event => this.handleTextChanged(event.target.value, 'periodo')}
                                    error={this.state.errors['periodo']}
                                    valid={this.state.valids['periodo']}
                                    inputClassName={'form-input'}
                                    value={this.state.newCadastro.periodo ? this.state.newCadastro.periodo : ''}
                                    placeholder={'Período'}
                                    isMaskRequired
                                    maskFormat={'9'}
                                />
                            </div>

                        </div>

                        <div className={'form-group-container'}>
                            <GroupHeader
                                title='Horários de Aula'
                            />

                            <div className={'form-time-divisor'}>
                                <TimePickerStyle
                                    day={dia_semana.SEGUNDA_FEIRA}
                                    maxSlots={17}
                                    startHour='7:00'
                                    endHour='23:00'
                                    step={15}
                                    unit='minute'
                                />
                            </div>

                            <div className={'form-time-divisor'}>
                                <TimePickerStyle
                                    day={dia_semana.TERCA_FEIRA}
                                    maxSlots={17}
                                    startHour='6:00'
                                    endHour='23:00'
                                    step={15}
                                    unit='minute'
                                />
                            </div>

                            <div className={'form-time-divisor'}>
                                <TimePickerStyle
                                    day={dia_semana.QUARTA_FEIRA}
                                    maxSlots={17}
                                    startHour='6:00'
                                    endHour='23:00'
                                    step={15}
                                    unit='minute'
                                />
                            </div>

                            <div className={'form-time-divisor'}>
                                <TimePickerStyle
                                    day={dia_semana.QUINTA_FEIRA}
                                    maxSlots={17}
                                    startHour='6:00'
                                    endHour='23:00'
                                    step={15}
                                    unit='minute'
                                />
                            </div>


                            <div className={'form-time-divisor'}>
                                <TimePickerStyle
                                    day={dia_semana.SEXTA_FEIRA}
                                    maxSlots={17}
                                    startHour='6:00'
                                    endHour='23:00'
                                    step={15}
                                    unit='minute'
                                />
                            </div>

                            <div className={'form-time-divisor'}>
                                <TimePickerStyle
                                    day={dia_semana.SABADO}
                                    maxSlots={17}
                                    startHour='6:00'
                                    endHour='23:00'
                                    step={15}
                                    unit='minute'
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
                                    error={this.state.errors['tipoEstagio']}
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
                                    title={"Telefone de contato do Supervisor"}
                                    onChange={event => this.handleTextChanged(event.target.value, 'telefoneSupervisor')}
                                    error={this.state.errors['telefoneSupervisor']}
                                    valid={this.state.valids['telefoneSupervisor']}
                                    inputClassName={'form-input'}
                                    value={this.state.newCadastro.telefoneSupervisor ? this.state.newCadastro.telefoneSupervisor : ''}
                                    placeholder={'Telefone/Celular'}
                                    isMaskRequired
                                    maskFormat={'(99)99999-9999'}
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
                                    title={"E-mail RH/Responsável"}
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
                                    
                                    {this.state.errors['dataInicioEstagio'] ? <label className={'label-error-date'}> {"Preencher data de início"} </label> : ''}  
                                    <DatePicker
                                        dateFormat="dd/MM/yyyy"
                                        selected={this.state.newCadastro.dataInicioEstagio}
                                        onChange={(value, e) => this.handleOnInitDateChange(value, e)} />
                                </div>
                            </div>

                            <div className={'form-input-divisor'}>
                                <div className="form-group">
                                    <label> {"Data de término do Estágio"} </label>
                                    {this.state.errors['dataTerminoEstagio'] ? <label className={'label-error-date'}> {"Preencher data de término"} </label> : ''} 
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
                                title='Horários de Estágio'
                            />

                            <div className={'form-time-divisor'}>
                                <TimePickerStyle
                                    day={dia_semana.SEGUNDA_FEIRA}
                                    maxSlots={2}
                                    startHour='6:00'
                                    endHour='23:00'
                                    step={10}
                                    unit='minute'
                                />
                            </div>

                            <div className={'form-time-divisor'}>
                                <TimePickerStyle
                                    day={dia_semana.TERCA_FEIRA}
                                    maxSlots={2}
                                    startHour='6:00'
                                    endHour='23:00'
                                    step={10}
                                    unit='minute'
                                />
                            </div>

                            <div className={'form-time-divisor'}>
                                <TimePickerStyle
                                    day={dia_semana.QUARTA_FEIRA}
                                    maxSlots={2}
                                    startHour='6:00'
                                    endHour='23:00'
                                    step={10}
                                    unit='minute'
                                />
                            </div>

                            <div className={'form-time-divisor'}>
                                <TimePickerStyle
                                    day={dia_semana.QUINTA_FEIRA}
                                    maxSlots={2}
                                    startHour='6:00'
                                    endHour='23:00'
                                    step={10}
                                    unit='minute'
                                />
                            </div>


                            <div className={'form-time-divisor'}>
                                <TimePickerStyle
                                    day={dia_semana.SEXTA_FEIRA}
                                    maxSlots={2}
                                    startHour='6:00'
                                    endHour='23:00'
                                    step={10}
                                    unit='minute'
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
                                    title={"Telefone de contato do Orientador"}
                                    onChange={event => this.handleTextChanged(event.target.value, 'telefoneOrientador')}
                                    error={this.state.errors['telefoneOrientador']}
                                    valid={this.state.valids['telefoneOrientador']}
                                    inputClassName={'form-input'}
                                    value={this.state.newCadastro.telefoneOrientador ? this.state.newCadastro.telefoneOrientador : ''}
                                    placeholder={'Celular ou telefone'}
                                    isMaskRequired
                                    maskFormat={'(99)99999-9999'}
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

                        <div className={'form-input-divisor'}>
                                <InputField
                                    title={"Observações"}
                                    onChange={event => this.handleTextChanged(event.target.value, 'observacoes')}
                                    error={this.state.errors['observacoes']}
                                    valid={this.state.valids['observacoes']}
                                    inputClassName={'form-input'}
                                    value={this.state.newCadastro.atividadesEstagio ? this.state.newCadastro.atividadesEstagio : ''}
                                    placeholder={'Observações'}
                                    hasInfo
                                    info={'Fato relevante a ser mencionado sobre o seu estágio caso necessário.'}
                                    isTextArea
                                />
                            </div>

                        <div className='form-send-button'>
                        <MDBBtn rounded outline color="danger" onClick={this.handleSave}>Enviar</MDBBtn>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {fetchId, reset}

const mapStateToProps = (storeState: IRootState) => ({
    saveForm: storeState.form.saveForm,
    data: storeState.form.data
  });

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Form);
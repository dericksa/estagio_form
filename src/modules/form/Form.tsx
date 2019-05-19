import React, { Component } from 'react';
import "./form.scss"
import InputField from '../../components/InputField/InputField';
import Header from './header'
import GroupHeader from './groupheader'


export interface IFormProps extends DispatchProps {
}

export interface IFormState {
    errors?: { [key: string]: boolean | undefined };
    valids?: { [key: string]: boolean | undefined };
    name?: string;
}


export class Form extends React.Component<IFormProps, IFormState> {

    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            valids: {}
        };
    }

    handleTextChanged = (text: string, propertyToChange: string, fieldKey?: string) => {
        this.setState({
            [propertyToChange]: text,
            errors: { ...this.state.errors, [fieldKey]: false },
            valids: { ...this.state.valids, [fieldKey]: false }
        });
        return;
    };

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
                                    value={this.state.name ? this.state.name : ''}
                                    placeholder={'Número de matrícula'}
                                />
                            </div>

                            <div className={'form-input-divisor'}>
                                <InputField
                                    title={"Nome Completo"}
                                    onChange={event => this.handleTextChanged(event.target.value, 'name')}
                                    error={this.state.errors['name']}
                                    valid={this.state.valids['name']}
                                    inputClassName={'form-input'}
                                    value={this.state.name ? this.state.name : ''}
                                    placeholder={'Nome Completo'}
                                />
                            </div>
                        </div>


                        <button>Enviar</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {}

type DispatchProps = typeof mapDispatchToProps;

export default Form;
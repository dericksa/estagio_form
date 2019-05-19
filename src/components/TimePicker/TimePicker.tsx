import React, { ChangeEvent } from 'react';
import { translate } from 'react-jhipster';
import classnames from 'classnames';
import InputMask from 'react-input-mask';
import _ from 'lodash';
import TimePicker from 'react-times';
import './timepicker.scss'

// use material theme
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css'

/*
  Ideias:
  Adicionar -> Maxnumber ++, se atingiu 3, desativa botão de adicionar
  OnTimeChange (i (sendo o segundo (i*2)-1), caso seja o segundo e /maxNumber*2 == 0, validar todos)
  18:00-19:00 = Guardar em uma lista de strings concatenada

  validate = Verifica se não tem nenhuma cagada de horário (ex, -30min) ou horarios ao contrario
  chama OnDateFinish que vai até o form, e lá valida se tem cagada de conflito de horários
*/

export interface ITimePickerProps {
  day?: string;
  error?: boolean
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export interface ITimePickerState {
  formBorderClassName?: string
}


export class TimePickerStyle extends React.Component<ITimePickerProps, ITimePickerState> {

  constructor(props) {
    super(props);

    this.state = {
      formBorderClassName: 'form-field'
    };

  }

  componentDidMount() {
  }

  componentWillReceiveProps(newProps) {

    if (!!newProps.error) {
      this.setState({
      });
    }

    if (!!newProps.valid) {
      this.setState({
      });
    }
  }

  onTimeChange(options) {
    console.log(options)
  }

  onAddTime() {

  }

  render() {
    return (
      <div className="time-picker-container">
        <div className='time-picker-header'>
          <label className='time-picker-day-style'>{this.props.day}</label>
          <button onClick={this.onAddTime}>Adicionar</button>
        </div>
        <div className ='time-picker-day-style'>
          <TimePicker
            theme='classic'
            className={'time_picker_container'}
            onTimeChange={this.onTimeChange.bind(this)}
          />
          <label className={'time-picker-time-divisor-style'}>às</label>
          <TimePicker
            theme='classic'
            className={'time_picker_container'}
            onTimeChange={this.onTimeChange.bind(this)}
          />
        </div>
      </div>
    );
  }

}

export default TimePickerStyle;

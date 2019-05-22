import React, { ChangeEvent } from 'react';
import { translate } from 'react-jhipster';
import classnames from 'classnames';
import InputMask from 'react-input-mask';
import { dia_semana, horario} from '../../models/cadastro-estagio';
import _ from 'lodash';
import TimePicker from 'react-times';
import './timepicker.scss'
import plus_signal from '../../layout/images/plus-img.png'
import minus_signal from '../../layout/images/minus-signal.png'

// use material theme
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css'
import { listenerCount } from 'cluster';

/*
  Ideias:
  Adicionar -> Maxnumber ++, se atingiu 3, desativa botão de adicionar
  OnTimeChange (i (sendo o segundo (i*2)-1), caso seja o segundo e /maxNumber*2 == 0, validar todos)
  18:00-19:00 = Guardar em uma lista de strings concatenada

  validate = Verifica se não tem nenhuma cagada de horário (ex, -30min) ou horarios ao contrario
  chama OnDateFinish que vai até o form, e lá valida se tem cagada de conflito de horários
*/

export interface ITimePickerProps {
  day?: dia_semana;
  error?: boolean;
  maxSlots?: number;
  startHour?: string;
  endHour?: string;
  step?: number;
  unit?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export interface ITimePickerState {
  formBorderClassName?: string;
  listOfHours?: horario[];
}


export class TimePickerStyle extends React.Component<ITimePickerProps, ITimePickerState> {

  constructor(props) {
    super(props);

    this.state = {
      formBorderClassName: 'form-field',
      listOfHours: []
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

  onTimeChange(some, index: number, type: hour_type, time) {
    const timeSlots = this.state.listOfHours

    switch(type) {
      case hour_type.FIRST:
          timeSlots[index].horarioInicio = time.hour +':'+time.minute
        break
      case hour_type.SECOND:
          timeSlots[index].horarioFim = time.hour +':'+time.minute
        break
    }

    this.setState({listOfHours: timeSlots})
  }

  onDeleteTime = (index: number) => {
    const timeSlots = this.state.listOfHours

    timeSlots.splice(index, 1)

    this.setState({listOfHours: timeSlots})
  }

  onAddTime = () => {
    if(this.state.listOfHours.length >= this.props.maxSlots) {
      return;
    }
    const defaultTimeInit = '8:00'
    const defaultTimeFinish = '14:00'

    console.log(this.state.listOfHours)

    const timeSlots = this.state.listOfHours

    const horarioDefault = {
        diaSemana: this.props.day,
        horarioInicio: defaultTimeInit,
        horarioFim: defaultTimeFinish
    } as horario

    timeSlots.push(horarioDefault)

    this.setState({listOfHours: timeSlots})
  }

  mapTimeToSlots = (item: horario, index: number) => {
    return (
      <div className ='time-picker-day-style'>
          <TimePicker
            theme='classic'
            time={item.horarioInicio}
            timeConfig={{
              from: this.props.startHour,
              to: this.props.endHour,
              step: this.props.step,
              unit: this.props.unit
            }}
            className={'time_picker_container'}
            onTimeChange={this.onTimeChange.bind(this, this, index, hour_type.FIRST)}
          />
          <label className={'time-picker-time-divisor-style'}>às</label>
          <TimePicker
            theme='classic'
            time={item.horarioFim}
            timeConfig={{
              from: this.props.startHour,
              to: this.props.endHour,
              step: this.props.step,
              unit: this.props.unit
            }}
            className={'time_picker_container'}
            onTimeChange={this.onTimeChange.bind(this, null, index, hour_type.SECOND)}
          />

          <img src={minus_signal} onClick={() => this.onDeleteTime(index)} className='img-minus-signal'/>
        </div>
    )
  };

  render() {
    return (
      <div className="time-picker-container">
        <div className='time-picker-header'>
          <label className='time-picker-day-style'>{this.props.day}</label>
          <img onClick={this.onAddTime} className='img-plus-signal' src= {plus_signal}></img>
        </div>
        {this.state.listOfHours.map((item, index) => (
          this.mapTimeToSlots(item, index)
        ))}
      </div>
    );
  }

}

export enum hour_type {
  FIRST = 'First',
  SECOND = 'Second'
}

export default TimePickerStyle;

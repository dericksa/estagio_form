import React from "react";
import './header.css'

const Header = props => {
  return (
      <div>
      <div className={'top-header-container-title'}>
          <label className={'text-header-style'}>Cadastramento Estágio - BSI</label>
          <img className={'img-header-style'} src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Utfpr.gif/200px-Utfpr.gif'/>
        </div>
        <div className={'container-info-header'}>
        <label className={'info-header-style'}> <p>Informações sobre o estágio <br/><br/> Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum culpa nemo sit accusantium amet illo! Optio, nobis blanditiis! Temporibus consectetur qui magni accusantium porro praesentium corrupti! Velit, quam! Qui, mollitia. </p>
        </label>
        </div>
    </div>
    );
};

export default Header;
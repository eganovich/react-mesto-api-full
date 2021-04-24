import React from "react";
import { Link, Route} from 'react-router-dom';

function Header({onSignOut, userEmail}) {
  return (
    <header className="header">
      <div className="logo"></div>
      <div className="header__info">
      <h3 className="header__user-email">{userEmail}</h3>
      <Route exact path="/">
      <Link className="page__link header__link" to="/signin" onClick={onSignOut}>Выйти</Link>
      </Route>
      <Route path="/signin">
      <Link className="page__link header__link" to="/signup">Регистрация</Link>
      </Route>
      <Route path="/signup">
      <Link className="page__link header__link" to="/signin">Войти</Link>
      </Route>
      </div>
    </header>
  );
}
export default Header;

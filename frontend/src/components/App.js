import React from "react";
import { Route, useHistory, Redirect } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import Footer from "./Footer";
import InfoTooltip from "./InfoTooltip";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import * as auth from "../utils/auth";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [tooltipMessage, setTooltipMessage] = React.useState("");
  const history = useHistory();
  const [userEmail, setUserEmail] = React.useState("");


  React.useEffect(() => {
    // Получаем данные из localStorage по ключу 'jwt'
    const jwt = localStorage.getItem("jwt");

    // Проверяем хранится ли токен в localStorage
    if (jwt) {
      debugger;
      // Получаем данные пользователя
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.email);
            history.push("/");
          }
        })
        // Если возникла ошибка запроса, то перенаправляем пользователя на страницу логина
        .catch((err) => {
          history.push("/signin")
          console.log(err);
        } );
    }
    debugger;
  }, [history, currentUser]);

  
 

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);
    if (!isLiked) {
      // Отправляем запрос в API и получаем обновлённые данные карточки
      api
        .setLike(card._id, localStorage.getItem("jwt"))
        .then((newCard) => {
          // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((err) => console.log(err));
    } else {
      api
        .deleteLike(card._id, localStorage.getItem("jwt"))
        .then((newCard) => {
          // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id, localStorage.getItem("jwt"))
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(
    false
  );

  const [selectedCard, setSelectedCard] = React.useState({});
  const [isCardSelected, setIsCardSelected] = React.useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsCardSelected(false);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleUpdateUser(userInfo) {
    api
      .patchInfoAboutUser(userInfo, localStorage.getItem("jwt"))
      .then((infoAboutUser) => {
        setCurrentUser(infoAboutUser);
        closeAllPopups();
      })
      .catch((err) => {
        // попадаем сюда если один из промисов завершится ошибкой
        console.log(err);
      });
  }
  function handleUpdateAvatar(userInfo) {
    api
      .patchAvatar(userInfo, localStorage.getItem("jwt"))
      .then((infoAboutUser) => {
        setCurrentUser(infoAboutUser);
        closeAllPopups();
      })
      .catch((err) => {
        // попадаем сюда если один из промисов завершится ошибкой
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .postNewCard(card, localStorage.getItem("jwt"))
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        // попадаем сюда если один из промисов завершится ошибкой
        console.log(err);
      });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsCardSelected(true);
  }

  const [tooltipPicType, setTooltipPicType] = React.useState(false);

  function handleRegister({ password, email }) {
    auth
      .register(password, email)
      .then((res) => {
        setIsInfoTooltipPopupOpen(true);
        setTooltipMessage("Вы успешно зарегистировались!");
        setTooltipPicType(true);
        history.push("/signin");
      })
      .catch((err) => {
        console.log(err);
        if (err === "Ошибка 409" || err === "Ошибка 400") {
          setIsInfoTooltipPopupOpen(true);
          setTooltipMessage("Что-то пошло не так! Попробуйте еще раз.");
          setTooltipPicType(false);
        }
      });
  }

  function handleLogin({ email, password }) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setCurrentUser({
            _id: res._id,
            name: res.name,
            about: res.about,
            avatar: res.avatar,
            email: res.email,
          });
          console.log("currentuser", currentUser);  
        }
        history.push("/");
      })
      .catch((err) => {
        if (err === "Ошибка 401" || err === "Ошибка 400") {
          setIsInfoTooltipPopupOpen(true);
          setTooltipMessage("Что-то пошло не так! Попробуйте еще раз.");
          setTooltipPicType(false);
        }
      });
  }

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUserEmail("");
    history.push("/signin");
  };


const [cards, setCards] = React.useState([]);

React.useEffect(() => {
  if (loggedIn){
    api.getInfoAboutUser(localStorage.getItem("jwt"))
    .then((data) => {
      console.log(data);
      setCurrentUser(data);
    })
    .catch((err) => {
      // попадаем сюда если один из промисов завершится ошибкой
      console.log(err);
    });  
  };
}, [loggedIn]);

React.useEffect(() => {
  if (loggedIn){
    api.getCards(localStorage.getItem("jwt"))
    .then((initialCards) => {
      console.log(initialCards);
      setCards(initialCards);
    })
    .catch((err) => {
      // попадаем сюда если один из промисов завершится ошибкой
      console.log(err);
    });  
  };
}, [loggedIn]);

const mainProps = {
  isEditProfilePopupOpen,
  isAddPlacePopupOpen,
  isEditAvatarPopupOpen,
  isCardSelected,
  closeAllPopups,
  handleAddPlaceSubmit,
  handleUpdateUser,
  handleUpdateAvatar,
  selectedCard,
};

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header onSignOut={handleSignOut} userEmail={userEmail} />
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onAddPlace={handleAddPlaceClick}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
            props={mainProps}
          />

          <Route path="/signin">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/signup">
            <Register onRegister={handleRegister} />
          </Route>
          <Footer />
        </div>
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          message={tooltipMessage}
          tooltipPic={tooltipPicType}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

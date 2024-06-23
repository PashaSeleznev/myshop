import AgreeToDelete from "./AgreeToDelete"
import { useState, useEffect, useRef, FC, ChangeEvent } from "react";
import store from "store";
import { ContactsProps } from "./Contacts";

type AccountProps = ContactsProps & {toLogin: (status: boolean) => void}

type Geo = {
  lat: string;
  lng: string;
};

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

type User = {
  id: number;
  name: string;
  username?: string;
  email: string;
  address?: Address;
  phone?: string;
  website: string;
  company?: Company;
};

type Users = User[]

const Account: FC<AccountProps> = ({showDeleteModal, handleCancel, handleDelete, toLogin}) => {
  const [isEntered, setIsEntered] = useState<boolean>(store.get('isEntered') || false)
  const [isRegistered, setIsRegistered] = useState<boolean>(true)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [hasEnterError, setHasEnterError] = useState<boolean>(false)
  const [hasRegError, setHasRegError] = useState<boolean>(false)
  const [users, setUsers] = useState<Users | []>(store.get('users') || [])
  const email = useRef<HTMLInputElement>(null)
  const pass = useRef<HTMLInputElement>(null)
  const username = useRef<HTMLInputElement>(null)
  const [result, setResult] = useState<User>(store.get('result') || {})
  const [newName, setNewName] = useState<User['name']>(result.name)

  const fetchUsers = async () => {
    const storedUsers = store.get('users');
    if (storedUsers && storedUsers.length > 0) {
      setUsers(storedUsers);
    } else {
      try {
        const resp = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await resp.json();
        setUsers(data);
        store.set('users', data); // Сохраняем данные из API в store
      } catch (err) {
        console.error("Ошибка при загрузке данных:", err);
      }
    }
    // console.log(users)
  };

  useEffect(() => {
    fetchUsers()
  }, []);

  useEffect(() => {
    setNewName(result.name)
    store.set('result', result)
  }, [result])

  useEffect(() => {
    store.set('isEntered', isEntered)
    toLogin(isEntered)
  }, [isEntered, toLogin])

  function toEnter () {
    if (email.current && pass.current) {
      const res = {
        email: email.current.value,
        password: pass.current.value
      }
      const foundUser = users.find(user => user.email === res.email && user.website === res.password);
  
      if (foundUser) {
        setIsEntered(true);
        setResult(foundUser);
      } else {
        setHasEnterError(true);
      }
      email.current.value = '';
      pass.current.value = '';
    }
      
  }

  function toCreate () {
    if (email.current && pass.current && username.current) {
      const res = {
        email: email.current.value,
        website: pass.current.value,
        name: username.current.value,
        id: users.length + 1,
      }
      const emailCheck = users.find(user => user.email === res.email);
      if (!emailCheck) {
        setUsers(prevUsers => {
          const newUsers = [...prevUsers, res]
          console.log(newUsers)
          console.log(users)
          store.set('users', newUsers)
          return newUsers
        });
        setIsRegistered(true)
        setHasEnterError(false)
      } else {
          setHasRegError(true)
          email.current.value = '';
          pass.current.value = '';
          username.current.value = '';
      }
    }
  }

  function update (id: User['id'], updatedName: string) {
    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        return {...user, name: updatedName}
      }
      return user 
    })
    setUsers(updatedUsers)
    store.set('users', updatedUsers)
    const updatedUser = updatedUsers.find(user => user.id === id);
    if (updatedUser) {
      setResult(updatedUser);
    } 
    console.log(updatedUsers)
  }

  function toggleFrom () {
    setIsEditing(!isEditing)
  }

  function handleUpdate (event: React.FormEvent) {
    event.preventDefault()
    update(result.id, newName)
    toggleFrom()
  }

  function handleChange (event: ChangeEvent<HTMLInputElement>) {
    setNewName(event.target.value)
  }


  return (
    <div>
    {(!isEntered && isRegistered) && 
      (
        <div className="enter">
          <div className="login-form">
          <h2>Вход в аккаунт</h2>
          <section className="em-pass-section">
            <p>Адрес электронной почты:</p>
            <input 
              type="email"
              placeholder="Введите e-mail"
              className="email-form" 
              ref={email}
            />
            <p>Пароль:</p>
            <input
              type="text"
              placeholder="Введите пароль"
              className="password-form"
              ref={pass}
            />
          </section>
          <section className="button-section">
            <button onClick={toEnter}>Войти</button>
            {hasEnterError && (<p style={{color: 'red'}} >Неверный адрес электронной почты или пароль!</p>)}
            <p onClick={() => setIsRegistered(false)}>Нет аккаунта? Пройдите регистрацию</p>
          </section>
          </div>
          <img src="/src/images/account-img.jpg" alt="" />
        </div>
      )}
      
    {isEntered && isRegistered && isEditing && (
        <div className="editing">
          <div className="user-edit">
          <h2>Вы редактируете свое имя!</h2>
          <form className="user-edit-form" onSubmit={handleUpdate}>
            <input className="user-text" type="text" onInput={handleChange} value = {newName}/>
            <button>Сохранить</button>
            <ul>
              <li>Адрес электронной почты: {result.email}</li>
              <li>Пароль: {result.website}</li>
            </ul>
          </form>
          </div>
          <img src="/src/images/editing-img.jpg" alt="" />
        </div>
      )
    }

    {isEntered && isRegistered && !isEditing && (
      <div className="data">
        <div className="account">
        <h2>Добро пожаловать в личный кабинет, {result.name}!</h2>
        <ul className="person">
          <li>
            <p className="name">Имя пользователя: {result.name}</p>
            <button className="edit-btn" onClick = {toggleFrom}>Редактировать</button>
          </li>          
          <li>Адрес электронной почты: {result.email}</li>
          <li>Пароль: {result.website}</li>
        </ul>
        <button onClick={() => {
          setIsEntered(false)
          setHasEnterError(false)
        }}>Выйти</button>
        </div>
        <img src="/src/images/person-img.jpg" alt="" />
      </div>
    )}

    {!isRegistered && (
      <div className="register">
        <div className="login-form">
        <h2>Регистрация</h2>
        <section className="em-pass-section">
        <p>Ваше имя:</p>
        <input 
          type="text"
          placeholder="Введите имя"
          className="name-form" 
          ref={username}
        />
        <p>Адрес электронной почты:</p>
        <input 
          type="email"
          placeholder="Введите e-mail"
          className="email-form" 
          ref={email}
        />
        <p>Пароль:</p>
        <input
          type="text"
          placeholder="Введите пароль"
          className="password-form"
          ref={pass}
        />
      </section>
      <section className="button-section">
        <button onClick={toCreate}>Создать аккаунт</button>
        {hasRegError && <p style={{color: 'red'}}>К этой почте уже привязан аккаунт!</p>}
        <p onClick={() => setIsRegistered(true)}>У меня уже есть аккаунт.</p>
      </section>
      </div>
      <img src="/src/images/register-img.jpg" alt="" />
    </div>
    )}

    {showDeleteModal && 
      <AgreeToDelete 
        handleCancel={handleCancel}
        handleDelete={handleDelete}
      />
    }
  </div>
  )
}

export default Account

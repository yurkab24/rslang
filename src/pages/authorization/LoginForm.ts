import './style.scss';

class LoginForm {
  form = document.createElement('form');

  inputEmail = document.createElement('input');

  inputPassword = document.createElement('input');

  inputName = document.createElement('input');

  buttonLogin = document.createElement('button');

  errorBlock = document.createElement('div');

  buttonRegistration = document.createElement('button');

  createForm(isLogin = true): void {
    this.form.classList.add('login__form');

    this.errorBlock.classList.add('login__error');

    this.inputEmail.placeholder = 'Email';
    this.inputEmail.type = 'email';
    this.inputEmail.name = 'email';
    this.inputEmail.required = true;
    this.inputEmail.classList.add('login__input');

    this.inputPassword.placeholder = 'Пароль';
    this.inputPassword.type = 'password';
    this.inputPassword.name = 'password';
    this.inputPassword.required = true;
    this.inputPassword.classList.add('login__input');

    this.inputName.placeholder = 'Имя';
    this.inputName.type = 'text';
    this.inputName.name = 'name';
    this.inputName.required = true;
    this.inputName.classList.add('login__input');

    this.buttonRegistration.textContent = 'Зарегистрироваться';
    this.buttonRegistration.classList.add('login__button');

    this.buttonLogin.textContent = 'Войти';
    this.buttonLogin.classList.add('login__button');

    this.form.innerHTML = '';

    if (isLogin) {
      this.form.append(this.inputEmail, this.inputPassword, this.errorBlock, this.buttonLogin);
    } else {
      this.form.append(this.inputName, this.inputEmail, this.inputPassword, this.errorBlock, this.buttonRegistration);
    }
  }
}

export default LoginForm;

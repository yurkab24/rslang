import Page from '../../core/templates/page';
import LoginForm from './LoginForm';
import { createUser, loginUser } from '../../request';
import {
  BUTTON_TEXT,
  ERROR_MESSAGE,
  EStatus,
  FORM_TEXT,
  LOCAL_STORAGE_DATA,
  MIN_PASSWORD_LENGTH,
} from '../../constants/authorization';
import { PageIds } from '../../constants/route';

class Authorization extends Page {
  regWrapper = document.createElement('div');

  subTitle = document.createElement('div');

  entranceButton = document.createElement('button');

  registrationButton = document.createElement('button');

  exit = document.createElement('button');

  isError = false;

  loginForm = new LoginForm();

  render(): HTMLElement {
    this.regWrapper.classList.add('login');
    this.subTitle.classList.add('login__subtitle');
    this.entranceButton.classList.add('login__toggle-button', 'login__toggle-button--active');
    this.registrationButton.classList.add('login__toggle-button');

    if (localStorage.getItem('access_token')) {
      this.onExit();

      this.exit.innerHTML = BUTTON_TEXT.EXIT;
      this.exit.classList.add('login__toggle-button', 'exit');
      this.regWrapper.append(this.exit);
      this.container.append(this.regWrapper);
      return this.container;
    }

    this.onEntrance();
    this.onRegistration();
    this.login();
    this.registration();

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('login__buttons');
    this.entranceButton.textContent = BUTTON_TEXT.ENTER;
    this.registrationButton.textContent = BUTTON_TEXT.REGISTRATION;
    buttonContainer.append(this.entranceButton, this.registrationButton);

    this.subTitle.innerHTML = FORM_TEXT.ENTER;
    this.loginForm.createForm();

    this.regWrapper.append(buttonContainer, this.subTitle, this.loginForm.form);
    this.container.append(this.regWrapper);
    return this.container;
  }

  onEntrance(): void {
    this.entranceButton.onclick = () => {
      this.entryForm();
      this.loginForm.createForm();
    };
  }

  onRegistration(): void {
    this.registrationButton.onclick = () => {
      this.registerForm();
      this.loginForm.createForm(false);
    };
  }

  login(): void {
    this.loginForm.buttonLogin.onclick = async (e) => {
      e.preventDefault();
      this.isError = false;

      const email = this.loginForm.inputEmail.value;
      const password = this.loginForm.inputPassword.value;

      const userData = {
        email: email,
        password: password,
      };

      try {
        const rawResponse = await loginUser(userData);

        if (rawResponse.status == EStatus.NotFound || rawResponse.status == EStatus.Forbidden) {
          throw new Error(ERROR_MESSAGE.LOGIN);
        }
        const content = await rawResponse.json();

        localStorage.setItem(LOCAL_STORAGE_DATA.TOKEN, content.token);
        localStorage.setItem(LOCAL_STORAGE_DATA.REFRESH_TOKEN, content.refreshToken);
        localStorage.setItem(LOCAL_STORAGE_DATA.ID, content.userId);

        if (!this.isError) {
          this.loginForm.errorBlock.innerHTML = '';
          window.location.href = `#${PageIds.Main}`;
          this.clearForm();
        }
      } catch (err: any) {
        this.isError = true;
        this.loginForm.errorBlock.innerHTML = err.message;
        this.hideError();
      }
    };
  }

  registration(): void {
    this.loginForm.buttonRegistration.onclick = async (e) => {
      e.preventDefault();

      const name = this.loginForm.inputName.value;
      const email = this.loginForm.inputEmail.value;
      const password = this.loginForm.inputPassword.value;

      if (password.length < MIN_PASSWORD_LENGTH) {
        this.loginForm.errorBlock.innerHTML = ERROR_MESSAGE.LENGTH;
        this.hideError();
        return;
      }

      const userData = {
        name: name,
        email: email,
        password: password,
      };

      try {
        const rawResponse = await createUser(userData);

        if (rawResponse.status == EStatus.ExpectationFailed) {
          throw new Error(ERROR_MESSAGE.USER);
        }

        if (rawResponse.status == EStatus.UnprocessableEntity) {
          throw new Error(ERROR_MESSAGE.INPUTS);
        }

        await rawResponse.json();
      } catch (err: any) {
        this.isError = true;
        this.loginForm.errorBlock.innerHTML = err.message;
        this.hideError();
      }

      if (!this.isError) {
        this.isError = !this.isError;
        this.loginForm.errorBlock.innerHTML = '';
        this.clearForm();
        this.entryForm();
        this.loginForm.createForm();
      }
    };
  }

  clearForm(): void {
    this.loginForm.inputName.value = '';
    this.loginForm.inputEmail.value = '';
    this.loginForm.inputPassword.value = '';
  }

  onExit(): void {
    this.exit.onclick = () => {
      localStorage.clear();
      window.location.href = `#${PageIds.Main}`;
    };
  }

  hideError(): void {
    setTimeout(() => {
      this.loginForm.errorBlock.innerHTML = '';
      this.isError = !this.isError;
    }, 3000);
  }

  entryForm(): void {
    this.entranceButton.classList.add('login__toggle-button--active');
    this.registrationButton.classList.remove('login__toggle-button--active');
    this.subTitle.innerHTML = FORM_TEXT.ENTER;
  }

  registerForm(): void {
    this.registrationButton.classList.add('login__toggle-button--active');
    this.entranceButton.classList.remove('login__toggle-button--active');
    this.subTitle.innerHTML = FORM_TEXT.REGISTRATION;
  }

  public init(): void { }
}

export default Authorization;

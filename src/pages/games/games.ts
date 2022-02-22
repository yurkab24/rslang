import Page from '../../core/templates/page';

class GamesPage extends Page {
  static TextObject = {
    MainTitle: 'МИНИ-ИГРЫ',
  };

  private game: { title: string; photo: string; target: string; btn: string; kind: string; hint: string }[];

  private gameEn: { title: string; photo: string; target: string; btn: string; kind: string; hint: string }[];

  langFromStorage = localStorage.getItem('language');

  constructor(id: string) {
    super(id);


    this.game = [
      {
        kind: 'sprint',
        title: 'СПРИНТ',
        target: 'Учит быстро переводить на русский язык',
        photo: './assets/png/sprint1.png',
        btn: 'Играть',
        hint: 'Скоростная тренировка.\nВ течение минуты нужно угадывать, \nверный перевод предложен к английскому слову или нет.',
      },
      {
        kind: 'challenge',
        title: 'АУДИОВЫЗОВ',
        target: 'Улучшает восприятие речи на слух',
        photo: './assets/png/sound.png',
        btn: 'Играть',
        hint: 'Прослушиваете английское слово и \nвыбираете один из пяти вариантов ответа.',
      },
    ];

    this.gameEn = [
      {
        kind: 'sprint',
        title: 'SPRINT',
        target: 'Learns to quickly translate into Russian',
        photo: './assets/png/sprint1.png',
        btn: 'Play',
        hint: 'Speed ​​training.\nFor a minute, you need to guess whether the correct translation is offered to the English word or not.',
      },
      {
        kind: 'challenge',
        title: 'AUDIOCHALLENGE',
        target: 'Improves listening comprehension',
        photo: './assets/png/sound.png',
        btn: 'Play',
        hint: 'Listen to the English word and \nchoose one of five possible answers.',
      },
    ];
  }

  renderGameCard(): void {
    const gamesDiv = this.createDiv('games-block', '');
    if (this.langFromStorage) {
      for (let i = 0; i < this.gameEn.length; i++) {
        const gameBlock = this.createDiv(`block game-${this.gameEn[i].kind}`, '');
        const gameImgDiv = this.createDiv('game-img', '');

        const gameImg = document.createElement('img');
        gameImg.src = this.gameEn[i].photo;
        gameImg.alt = `${this.gameEn[i].title}`;
        gameImg.title = `${this.gameEn[i].hint}`;
        gameImg.className = `game-img-${this.gameEn[i].kind}`;
        gameImgDiv.insertAdjacentElement('afterbegin', gameImg);

        const gameName = this.createDiv('game-name', `${this.gameEn[i].title.toUpperCase()}`);
        const gameTarget = this.createDiv('game-target', `${this.gameEn[i].target}`);
        const playBtn = this.createDiv(`btn-play play-game-${this.gameEn[i].kind}`, '');
        playBtn.insertAdjacentHTML('afterbegin', `<a href="#game-${this.gameEn[i].kind}">${this.gameEn[i].btn}</a>`);
        gameBlock.append(gameName, gameTarget, gameImgDiv, playBtn);

        gamesDiv.append(gameBlock);
      }
    } else {
      for (let i = 0; i < this.game.length; i++) {
        const gameBlock = this.createDiv(`block game-${this.game[i].kind}`, '');
        const gameImgDiv = this.createDiv('game-img', '');

        const gameImg = document.createElement('img');
        gameImg.src = this.game[i].photo;
        gameImg.alt = `${this.game[i].title}`;
        gameImg.title = `${this.game[i].hint}`;
        gameImg.className = `game-img-${this.game[i].kind}`;
        gameImgDiv.insertAdjacentElement('afterbegin', gameImg);

        const gameName = this.createDiv('game-name', `${this.game[i].title.toUpperCase()}`);
        const gameTarget = this.createDiv('game-target', `${this.game[i].target}`);
        const playBtn = this.createDiv(`btn-play play-game-${this.game[i].kind}`, '');
        playBtn.insertAdjacentHTML('afterbegin', `<a href="#game-${this.game[i].kind}">${this.game[i].btn}</a>`);
        gameBlock.append(gameName, gameTarget, gameImgDiv, playBtn);

        gamesDiv.append(gameBlock);
      }
    }

    this.container.append(gamesDiv);
  }

  render(): HTMLElement {
    const title = this.createHeaderTitle(GamesPage.TextObject.MainTitle);
    title.className = 'block games-title';
    if (this.langFromStorage) {
      title.textContent = 'MINI-GAMES';
    } else {
      title.textContent = 'МИНИ-ИГРЫ';
    }

    this.container.append(title);
    this.renderGameCard();
    return this.container;
  }

  public init(): void {}
}

export default GamesPage;

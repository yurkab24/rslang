import Page from '../../core/templates/page';

class GamesPage extends Page {
  static TextObject = {
    MainTitle: 'МИНИ-ИГРЫ',
  };

  private game: { title: string; photo: string; target: string; btn: string; kind: string; hint: string }[];

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
  }

  renderGameCard(): void {
    const gamesDiv = this.createDiv('games-block', '');

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
    this.container.append(gamesDiv);
  }

  render(): HTMLElement {
    const title = this.createHeaderTitle(GamesPage.TextObject.MainTitle);
    title.className = 'block games-title';

    this.container.append(title);
    this.renderGameCard();
    return this.container;
  }

  public init(): void {}
}

export default GamesPage;

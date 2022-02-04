export function addElementWrapper(): void {
  const newDiv = document.createElement('div');
  newDiv.classList.add('wrapper');
  document.body.appendChild(newDiv);
}

export function addElementSection(): void {
  const wrapper = document.querySelector('.wrapper');
  const sectionBlock = document.createElement('div');
  sectionBlock.classList.add('container-sections');
  wrapper?.appendChild(sectionBlock);
}

export function addButtonsOfSection(): void {
  const button = document.createElement('button');
  button.classList.add('button-of-section');
  for (let i = 0; i < 6; i++) {
    document.getElementsByClassName('container-sections')[0].appendChild(button.cloneNode(true));
  }
}

export function changeLanguage() {
  const langBtn = document.querySelector('.lang') as HTMLButtonElement;
  langBtn.addEventListener('click', () => {
    langBtn.textContent = 'RU';
  });
}

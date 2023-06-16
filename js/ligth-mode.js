const html = document.querySelector('html');

export const toggleLightMode = () => {
  html.classList.toggle('light-mode');
}
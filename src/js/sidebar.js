export const toggleSidebar = () => {
  const sidebar = document.getElementsByClassName('sidebar')[0];
  const overlay = document.getElementsByClassName('sidebar__overlay')[0];
  const content = document.getElementsByTagName('body')[0];

  sidebar.classList.toggle('sidebar--open');
  overlay.classList.toggle('sidebar__overlay--open');

  return !content.getAttribute('style') ?
    content.setAttribute('style', 'overflow: hidden') :
    content.removeAttribute('style');
};

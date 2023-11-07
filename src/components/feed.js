import { signOutFunction } from '../lib/auth';
import {
  paintRealTime, postReferenceLike, deletePostFunction, editPostFunction,
} from '../lib/database';
import LogoPeque from '../images/LogoPeque.png';

export const renderPostContainer = (renderTextPost, renderDisplayName, postId, dataLikes = [], renderPhoto) => {
  const postContainer = document.createElement('section');
  postContainer.classList.add('post-square');
  const postContainerPage = `
    <div class = "post"> 
      <div class = "header-post"> 
        <h5>${renderDisplayName}</h5>
        <div>
          <button id="edit">🖋</button>
          <button id="delete">🗑</button>
          <div id='pop-up' class='overlay' style='display:none;'>
            <div id='body-pop-up'>
              <p class='confirm-message-delete'>¿Segurx que quieres eliminar este post?</p>
              <div class='buttons'>
                <button class='accept-button'>Sí</button>
                <button class='reject-button'>No</button>
              </div>
            </div>
          </div>
          <div id='edit-pop-up' class='overlay' style='display:none;'>
            <div id='body-edit-pop-up'>
              <textarea class='edit-input'>${renderTextPost}</textarea>
              <div class='edit-buttons'>
                <button class='edit-accept-button'>Publicar</button>
                <button class='edit-reject-button'>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-text-post">
        <p class="render-text-post">${renderTextPost}</p>
      </div>
      <picture class = "image">
        <img src=${renderPhoto} alt="foto-post" class="foto-post" />
      </picture>
      <div class = "interactions">
        <div class= "reactions">
          <button id="like">✈️</button>
          <span id="like-counter">${dataLikes.length}</span>
        </div>
      </div>          
  </div>
            `;
  postContainer.innerHTML = postContainerPage;
  const posts = document.querySelector('.posts');
  const like = postContainer.querySelector('#like');
  const spanCounter = postContainer.querySelector('#like-counter');
  const deletePostButton = postContainer.querySelector('#delete');
  const acceptButton = postContainer.querySelector('.accept-button');
  const rejectButton = postContainer.querySelector('.reject-button');
  const popupContainer = postContainer.querySelector('#pop-up');
  const editPostButton = postContainer.querySelector('#edit');
  const popupEditContainer = postContainer.querySelector('#edit-pop-up');
  const acceptEditButton = postContainer.querySelector('.edit-accept-button');
  const rejectEditButton = postContainer.querySelector('.edit-reject-button');
  const textEdit = postContainer.querySelector('.edit-input');

  like.addEventListener('click', async () => {
    await postReferenceLike(postId, dataLikes);
    spanCounter.textContent = dataLikes.length;
  });
  deletePostButton.addEventListener('click', () => {
    popupContainer.style.display = 'block';
    acceptButton.addEventListener('click', async () => {
      await deletePostFunction(postId);
    });
    rejectButton.addEventListener('click', () => {
      popupContainer.style.display = 'none';
    });
  });
  editPostButton.addEventListener('click', () => {
    popupEditContainer.style.display = 'block';
    acceptEditButton.addEventListener('click', async () => {
      const textEditValue = textEdit.value;
      await editPostFunction(postId, textEditValue, renderTextPost);
      popupEditContainer.style.display = 'none';
    });
    rejectEditButton.addEventListener('click', async () => {
      popupEditContainer.style.display = 'none';
    });
  });
  return posts.appendChild(postContainer);
};

export const renderFeed = (navigateTo) => {
  const containerFeed = document.createElement('div');
  containerFeed.classList.add('feed');
  const currentUser = sessionStorage.getItem('usuarioLogeado');
  const feedPage = `
  <header>
    <img src=${LogoPeque} class="little-logo" />
    <h3>Mochileirxs</h3>
    <div class="user-info">
      <h4 class="user">${currentUser}</h4>
      <button id="signout">Salir</button>
    </div>
  </header>
  <button class="share-experience">Comparte tu experiencia</button>
  <section class="posts"></section>
  `;
  containerFeed.innerHTML = feedPage;

  // -----------------llamar al dom-------------------
  const sharePost = containerFeed.querySelector('.share-experience');

  // -----------------navigate to renderPost-----------

  sharePost.addEventListener('click', () => {
    navigateTo('/post');
  });

  // ----------------------Botón salir------------------------

  const exitButton = containerFeed.querySelector('#signout');

  exitButton.addEventListener('click', () => {
    signOutFunction();
    navigateTo('/');
  });

  paintRealTime((querySnapshot) => {
    const sectionPosts = containerFeed.querySelector('.posts');
    sectionPosts.textContent = '';
    querySnapshot.forEach((doc) => {
      const renderTextPost = doc.data().post;
      const renderDisplayName = doc.data().displayName;
      const dataLikes = doc.data().likes;
      const postId = doc.id;
      const renderPhoto = doc.data().photoUrl;
      renderPostContainer(renderTextPost, renderDisplayName, postId, dataLikes, renderPhoto);
    });
  });
  return containerFeed;
};

/**
* @jest-environment jsdom
*/

import { renderFeed, renderPostContainer } from '../../src/components/feed';

jest.mock('../../src/lib/auth', () => ({
  signOutFunction: jest.fn(() => Promise.resolve()),
}));
jest.mock('../../src/lib/database', () => ({
  createPost: jest.fn(),
  postReferenceLike: async () => jest.fn(),
  editPostFunction: async () => jest.fn(),
  paintRealTime: jest.fn(),
  deletePostFunction: async () => jest.fn(),
  length: 'dataLikes',
}));

describe('renderFeed', () => {
  it('debería ser una función', () => {
    expect(typeof renderFeed).toBe('function');
  });
  it('tiene un botón para desloggearse', () => {
    const DOM = document.createElement('div');
    DOM.append(renderFeed());
    const haveSignOutButton = DOM.querySelector('#signout');
    expect(haveSignOutButton).not.toBe(undefined);
  });
  it('cuando se hace click en el botón de Comparte tu experiencia nos lleva a la url de post', () => {
    const DOM = document.createElement('div');
    const navigateToMock = jest.fn();
    DOM.append(renderFeed(navigateToMock));
    const postButton = DOM.querySelector('.share-experience');
    postButton.click();
    expect(navigateToMock).toHaveBeenLastCalledWith('/post');
  });
  it('cuando se hace click en el botón de signout nos lleva a la url de login', () => {
    const DOM = document.createElement('div');
    const navigateToMock = jest.fn();
    DOM.append(renderFeed(navigateToMock));
    const signOutButton = DOM.querySelector('#signout');
    signOutButton.click();
    expect(navigateToMock).toHaveBeenLastCalledWith('/');
  });
});

describe('renderPostContainer', () => {
  it('debería ser una función', () => {
    expect(typeof renderPostContainer).toBe('function');
  });
  it('tiene un botón para editar', () => {
    const DOM = document.createElement('div');
    const posts = DOM.querySelector('.posts');
    DOM.append(renderFeed().append(renderPostContainer(posts)));
    const haveEditButton = DOM.querySelector('#edit');
    expect(haveEditButton).not.toBe(undefined);
  });
  it('tiene un botón para eliminar', () => {
    const DOM = document.createElement('div');
    const posts = DOM.querySelector('.posts');
    DOM.append(renderFeed().append(renderPostContainer(posts)));
    const haveDeleteButton = DOM.querySelector('#delete');
    expect(haveDeleteButton).not.toBe(undefined);
  });
  it('tiene un botón para dar like', () => {
    const DOM = document.createElement('div');
    const posts = DOM.querySelector('.posts');
    DOM.append(renderFeed().append(renderPostContainer(posts)));
    const haveLikeButton = DOM.querySelector('#like');
    expect(haveLikeButton).not.toBe(undefined);
  });
});

import {
  expect
} from 'chai';

import Vue from 'vue';
import Welcome from '../../src/components/Welcome.vue';

describe('Welcome', () => {

  it('has a mounted hook', () => {

    expect(typeof Welcome.mounted).to.be.eql('function');

  });

  const WelcomeConstructor = Vue.extend(Welcome);


  it('ready should change to true after mounted', () => {

    const welcome = new WelcomeConstructor();

    expect(welcome.ready).to.be.eql(false);

    welcome.$mount();

    expect(welcome.ready).to.be.eql(true);
  });

  it('text should change to "Hello World!"', () => {

    const welcome = new WelcomeConstructor({
      propsData: {
        text: 'Hello World!'
      }
    });

    expect(welcome.text).to.be.eql('Hello World!');


  });

});
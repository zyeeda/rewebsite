import React from 'react';
import $ from 'jquery'
import HelloWorld from './hello-world'

console.log('---client running...');

React.render(
  <HelloWorld />,  document.getElementById('container')
);
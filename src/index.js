import React from 'react';
import HelloWorld from './hello-world'

console.log('---client running...');

React.render(
  <HelloWorld />,  document.getElementById('container')
);
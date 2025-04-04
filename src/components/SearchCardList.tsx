'use client';
import { useState } from 'react';
import styles from './SearchCardList.module.css';

type Post = {
  title: string;
  link: string;
  author: string;
  img: string;
};

const initialPosts: Post[] = [
  {
    title: 'Vue.js',
    link: 'https://vuejs.org/',
    author: 'Chris',
    img: 'https://vuejs.org//images/logo.png',
  },
  {
    title: 'React.js',
    link: 'https://facebook.github.io/react/',
    author: 'Tim',
    img: 'https://daynin.github.io/clojurescript-presentation/img/react-logo.png',
  },
  {
    title: 'Angular.js',
    link: 'https://angularjs.org/',
    author: 'Sam',
    img: 'https://angularjs.org/img/ng-logo.png',
  },
  {
    title: 'Ember.js',
    link: 'http://emberjs.com/',
    author: 'Rachel',
    img: 'http://www.gravatar.com/avatar/0cf15665a9146ba852bf042b0652780a?s=200',
  },
  {
    title: 'Meteor.js',
    link: 'https://www.meteor.com/',
    author: 'Chris',
    img: 'http://hacktivist.in/introduction-to-nodejs-mongodb-meteor/img/meteor.png',
  },
  {
    title: 'Aurelia',
    link: 'http://aurelia.io/',
    author: 'Tim',
    img: 'https://cdn.auth0.com/blog/aurelia-logo.png',
  },
  {
    title: 'Node.js',
    link: 'https://nodejs.org/en/',
    author: 'A. A. Ron',
    img: 'https://code-maven.com/img/node.png',
  },
  {
    title: 'Pusher',
    link: 'https://pusher.com/',
    author: 'Alex',
    img: 'https://avatars1.githubusercontent.com/u/739550?v=3&s=400',
  },
  {
    title: 'Feathers.js',
    link: 'http://feathersjs.com/',
    author: 'Chuck',
    img: 'https://cdn.worldvectorlogo.com/logos/feathersjs.svg',
  },
];

export default function SearchCardList() {
  const [search, setSearch] = useState('');

  const filteredList = initialPosts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div id="app" className={styles.app}>
      <div className={styles.searchWrapper}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search title.."
        />
        <label>Search title:</label>
      </div>
      <div className={styles.wrapper}>
        {filteredList.map((post, index) => (
          <div key={index} className={styles.card}>
            <a href={post.link} target="_blank" rel="noopener noreferrer">
              <img src={post.img} alt={post.title} />
              <small>posted by: {post.author}</small>
              {post.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

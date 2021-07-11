# Cacheu(Cache you)
***
Cache your data in browser memory.

When you use SPA mode to run website, if you don't want to save data in store(redux or vuex) or window object, you can use this.

![NPM](https://img.shields.io/npm/l/cacheu)
![build](https://img.shields.io/badge/build-passing-success.svg)
![npm](https://img.shields.io/npm/v/cacheu)

## Install
```
npm install cacheu --save
```

## Usage
***
```
import Cacheu from 'cacheu';
```

## Interface
***
### 1. Cacheu.create(Object)

| Property name | Type | Default | Description | 
| :---- | :----: | :----: | :---- |
| ttl  | Integer | 600(s) | The time the data is kept |
| cleanup  | Integer | 3600(s) | Time to automatically clean up expired data |

### 2. Cacheu.set(key, value, expire)

| Property name | Type | Default | Description | 
| :---- | :----: | :----: | :---- |
| key | String | N/A | Recognizable and unique name in the cache |
| value | Any | N/A | Stored value |
| expire | Integer | 600(s) | Expiration time set for a single data, set to 0 for permanent existence |

### 3. Cacheu.get(key)

| Property name | Type | Default | Description | 
| :---- | :----: | :----: | :---- |
| key | String | N/A | Recognizable and unique name in the cache |

### 4. Cacheu.has(key)

| Property name | Type | Default | Description | 
| :---- | :----: | :----: | :---- |
| key | String | N/A | Recognizable and unique name in the cache |

### 5. Cacheu.remove(key)

| Property name | Type | Default | Description | 
| :---- | :----: | :----: | :---- |
| key | String | N/A | Recognizable and unique name in the cache |

### 6. Cacheu.removeAll()

### 7. Cacheu.isExpired(time)

| Property name | Type | Default | Description | 
| :---- | :----: | :----: | :---- |
| time | Integer | N/A | Timestamp |

### 8. Cacheu.cleanup()

## Getting Started
***

#### index.js
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app';
import Cacheu from 'cacheu';

Cacheu.create({
  ttl: 600,
  cleanup: 3600
});

// Set value
Cacheu.set('name', 'James');

ReactDOM.render(<App />, document.getElementById('app'));
```

#### App.js
```
import React from 'react';
import Cacheu from 'cacheu';

const App = () => {
  // Get value
  const name = Cacheu.get('name');
  
  return (
    <div>My name is {name}</div>
  );
};

export default App;
```

## License
***
MIT

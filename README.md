# simple-frontend-cache
***
Cache data in browser memory.

When you use SPA mode to run website, if you don't want to save data in store(redux or vuex) or window object, you can use this.

![NPM](https://img.shields.io/npm/l/simple-frontend-cache)
![build](https://img.shields.io/badge/build-passing-success.svg)
![npm](https://img.shields.io/npm/v/simple-frontend-cache)

## Install
```
npm install simple-frontend-cache --save
```

## Usage
***
### Create cache
```
import Cache from 'simple-frontend-cache';
```

## Interface
***
### 1. Cache.create(Object)

| Property name | Type | Default | Description | 
| :---- | :----: | :----: | :---- |
| ttl  | Integer | 600(s) | The time the data is kept |
| cleanup  | Integer | 3600(s) | Time to automatically clean up expired data |

### 2. Cache.set(key, value, expire)

| Property name | Type | Default | Description | 
| :---- | :----: | :----: | :---- |
| key | String | N/A | Recognizable and unique name in the cache |
| value | Any | N/A | Stored value |
| expire | Integer | 600(s) | Expiration time set for a single data, set to 0 for permanent existence |

### 3. Cache.get(key)

| Property name | Type | Default | Description | 
| :---- | :----: | :----: | :---- |
| key | String | N/A | Recognizable and unique name in the cache |

### 4. Cache.has(key)

| Property name | Type | Default | Description | 
| :---- | :----: | :----: | :---- |
| key | String | N/A | Recognizable and unique name in the cache |

### 5. Cache.remove(key)

| Property name | Type | Default | Description | 
| :---- | :----: | :----: | :---- |
| key | String | N/A | Recognizable and unique name in the cache |

### 6. Cache.removeAll()

### 7. Cache.isExpired(time)

| Property name | Type | Default | Description | 
| :---- | :----: | :----: | :---- |
| time | Integer | N/A | Timestamp |

### 8. Cache.cleanup()

## Getting Started
***

#### index.js
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app';
import Cache from 'simple-frontend-cache';

Cache.create({
  ttl: 600,
  cleanup: 3600
});

// Set value
Cache.set('name', 'James');

ReactDOM.render(<App />, document.getElementById('app'));
```

#### App.js
```
import React from 'react';
import Cache from 'simple-frontend-cache';

const App = () => {
  // Get value
  const name = Cache.get('name');
  
  return (
    <div>My name is {name}</div>
  );
};

export default App;
```

## License
***
MIT

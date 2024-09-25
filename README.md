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
### 1. Cache.create(Object): void
| Property name |  Type  | Default | Description                                 | 
|:--------------|:------:|:-------:|:--------------------------------------------|
| ttl           | number | 600(s)  | The time the data is kept                   |
| cleanup       | number | 3600(s) | Time to automatically clean up expired data |
| persistPrefixKey | string |    CACHE     | prefix key stored in localStorage                                            |

### 2. Cache.set(key, value, expires, persist): void
| Property name |  Type   |         Default         | Description                                                             | 
|:--------------|:-------:|:-----------------------:|:------------------------------------------------------------------------|
| key           | string  |           N/A           | Recognizable and unique name in the cache                               |
| value         |   any   |           N/A           | Stored value                                                            |
| expires       | number  | 600(s) <br/>same as ttl | Expiration time set for a single data, set to 0 for permanent existence |
| persist       | boolean |          false          | Whether to persist data                                                                        |

### 3. Cache.get(key, defaultValue): any
| Property name |    Type     | Default | Description                               | 
|:--------------|:-----------:|:-----:|:------------------------------------------|
| key           |   string    |   N/A | Recognizable and unique name in the cache |
| defaultValue  | string/null |  null   | default value                             |

### 4. Cache.has(key): boolean

| Property name |  Type  | Default | Description | 
| :---- |:------:| :----: | :---- |
| key | string | N/A | Recognizable and unique name in the cache |

### 5. Cache.remove(key): void
| Property name |  Type  | Default | Description | 
| :---- |:------:| :----: | :---- |
| key | string | N/A | Recognizable and unique name in the cache |

### 6. Cache.removeAll(): void
- remove all cache data

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
  cleanup: 3600,
  persistPrefixKey: 'CACHE',
});

// Set value
Cacheu.set('name', 'James', Cache.config.ttl, true);

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

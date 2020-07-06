# React Components

**1. Init primary npm registry server (Optional)**

```shell
> docker pull verdaccio/verdaccio
> docker run --name verdaccio_service -p 4873:4873 -d verdaccio/verdaccio
```

**2. Set npm configuration (Optional)**

```shell
> npm set registry http://127.0.0.1:4873/
> npm adduser
```

**3. Ready (Just Do It!)**

```
> yarn

# have fun!
```

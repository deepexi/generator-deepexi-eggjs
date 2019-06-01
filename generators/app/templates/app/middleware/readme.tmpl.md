

#### 中间件能用 Generator形式和 a/a 形式，如果用了 Generator 形式，就不能传递 ctx，只能用this；反之用 a/a 形式，只能用ctx，不能用this。



## Generator style

```js

const isJSON = require( 'koa-is-json' );
const zlib = require( 'zlib' );

module.exports = (options, app) => {

	return function* gzip( next ) {

		// ######## request phase ########

		yield next;

		// ######## response phase ########

		// 后续中间件执行完成后将响应体转换成 gzip
		let body = this.body;
		if ( !body ) return;

		// 支持 options.threshold
		if ( options.threshold && this.length < options.threshold ) return;
		if ( isJSON( body ) ) body = JSON.stringify( body );

		// 设置 gzip body，修正响应头
		const stream = zlib.createGzip();
		stream.end( body );
		this.body = stream;
		this.set( 'Content-Encoding', 'gzip' );
	};
};

```

## a/a style

```js

const isJSON = require( 'koa-is-json' );
const zlib = require( 'zlib' );

module.exports = (options, app) => {

	return async function gzip( ctx, next ) {

		// ######## request phase ########

		await next;

		// ######## response phase ########

		// 后续中间件执行完成后将响应体转换成 gzip
		let body = ctx.body;
		if ( !body ) return;

		// 支持 options.threshold
		if ( options.threshold && ctx.length < options.threshold ) return;
		if ( isJSON( body ) ) body = JSON.stringify( body );

		// 设置 gzip body，修正响应头
		const stream = zlib.createGzip();
		stream.end( body );
		ctx.body = stream;
		ctx.set( 'Content-Encoding', 'gzip' );
	};
};

```

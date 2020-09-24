module.exports = RED => {
	RED.nodes.registerType( 'clock-generator', function( config ) {
		RED.nodes.createNode( this, config );

		let timeout;
		let timestamp;

		const getPayload = value => config.output == 1 ? !value ? false : true : !value ? 0 : 1;

		const setStatus = ( value, flash ) => {
			if( timestamp === 0 ) {
				this.status( { fill: 'grey', shape: 'dot', text: 'inactive' } );
			} else if( flash ) {
				this.status( { fill: 'green', shape: 'dot', text: `active: ${ getPayload( value ) } / ${ getPayload( !value ) }` } );
				setTimeout( setStatus, 250, value, false );
			} else {
				this.status( { fill: 'grey', shape: 'dot', text: `active: ${ getPayload( value ) } / ${ getPayload( !value ) }` } );
			}
		};

		const start = () => {
			if( timestamp === 0 ) {
				timestamp = new Date().getTime();
				update( true );
			}
		};

		const stop = () => {
			if( timestamp !== 0 ) {
				timestamp = 0;
				update( false );
			}
		};

		const update = value => {
			msg = {
				name: config.name,
				topic: config.topic,
				payload: getPayload( value ),
				timestamp: new Date().getTime()
			};

			setStatus( value, true );
			this.send( [ msg, { ...msg, payload: getPayload( !value ) } ] );

			if( timestamp !== 0 ) {
				while( timestamp <= msg.timestamp ) timestamp += config.period * 500;
				timeout = setTimeout( update, timestamp - msg.timestamp, !value );
			} else {
				clearTimeout( timeout );
			}
		};

		timestamp = !config.init ? 0 : 1;
		!config.init ? setStatus() : this.emit( 'input', { payload: false } );

		this.on( 'input', msg => msg.payload ? start() : stop() );
		this.on( 'close', stop );
	} );
};
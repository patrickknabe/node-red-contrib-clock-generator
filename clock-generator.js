module.exports = RED => {
	RED.nodes.registerType( 'clock-generator', function ClockGenerator( config ) {
		RED.nodes.createNode( this, config );

		let timeout;
		let timestamp = 0;

		const getPayload = status => config.output === '1' ? !status ? false : true : !status ? 0 : 1;

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

		const update = status => {
			msg = {
				name:		config.name,
				topic:		config.topic,
				timestamp:	new Date().getTime(),
				payload:	getPayload( status )
			};

			this.send( [ msg, { ...msg, payload: getPayload( !status ) } ] );

			if( timestamp !== 0 ) {
				while( timestamp <= msg.timestamp ) timestamp += config.period * 500;
				timeout = setTimeout( update, timestamp - msg.timestamp, !status );

				this.status( { fill: 'green', shape: 'dot', text: `active: ${ msg.payload } / ${ getPayload( !status ) }` } );
			} else {
				clearTimeout( timeout );
				this.status( { fill: 'grey', shape: 'dot', text: 'inactive' } );
			}
		};

		this.status( { fill: 'grey', shape: 'dot', text: 'inactive' } );

		this.on( 'input', msg => msg.payload ? start() : stop() );
		this.on( 'close', stop );
	} );
};
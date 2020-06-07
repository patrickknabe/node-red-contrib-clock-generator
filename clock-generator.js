module.exports = function( RED ) {

	function ClockGenerator( config ) {
		RED.nodes.createNode( this, config );
		const node = this;

		let timeout;
		let timestamp = 0;

		function start() {
			if( timestamp === 0 ) {
				timestamp = new Date().getTime();
				update( true );
			}
		}

		function stop() {
			if( timestamp !== 0 ) {
				timestamp = 0;
				update( false );
			}
		}

		function update( status ) {
			msg = {
				name: config.name,
				topic: config.topic,
				timestamp: new Date().getTime()
			};

			switch( config.output ) {

				case '1':
					msg.payload = !status ? false : true;
					break;

				case '2':
					msg.payload = !status ? 0 : 1;
					break;

			}

			node.send( msg );

			if( timestamp !== 0 ) {
				timestamp += config.period * 500;
				timeout = setTimeout( () => {
					update( !status );
				}, timestamp - msg.timestamp );

				node.status( { fill: 'green', shape: 'dot', text: 'active: ' + msg.payload } );
			} else {
				clearTimeout( timeout );
				node.status( { fill: 'grey', shape: 'dot', text: 'inactive' } );
			}
		}

		node.status( { fill: 'grey', shape: 'dot', text: 'inactive' } );

		node.on( 'input', msg => {
			if( msg.payload ) {
				start();
			} else {
				stop();
			}
		} );

		node.on( 'close', stop );
	}

	RED.nodes.registerType( 'clock-generator', ClockGenerator );
}
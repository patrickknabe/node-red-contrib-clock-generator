module.exports = function( RED ) {

	function ClockGenerator( config ) {
		RED.nodes.createNode( this, config );
console.log( config );
		const node = this;
		let interval = null;
		let status;

		if( !config.controlled ) {
			start();
		} else {
			node.on( 'input', function( msg ) {
				if( ( msg.payload === true || msg.payload === 1 ) && interval === null ) {
					start();
				} else if( ( msg.payload === false || msg.payload === 0 ) && interval !== null ) {
					stop();
				}
			} );

			node.status( { fill: 'grey', shape: 'dot', text: 'status: ---' } );
		}

		function start() {
			status = true;
			send();

			interval = setInterval( function() {
				status = !status;
				send();
			}, config.frequency * 500 );
		}

		function stop() {
			clearInterval( interval );
			interval = null;

			node.status( { fill: 'grey', shape: 'dot', text: 'status: ---' } );
		}

		function send() {
			let payload;

			switch( config.output ) {

				case 1:
					payload = !status ? false : true;
					break;

				case 2:
					payload = !status ? 0 : 1;
					break;

			}

			node.send( {
				name: config.name,
				topic: config.topic,
				payload: payload,
				timestamp: new Date().getTime()
			} );

			node.status( { fill: 'green', shape: 'dot', text: 'status: ' + payload } );
		}
	}

	RED.nodes.registerType( 'clock-generator', ClockGenerator );
}
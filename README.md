# node-red-contrib-clock-generator

A controllable clock generator for Node-RED that runs through the individual clock cycles with the set period duration.

Features:

- Controllable by incoming messages
- Period duration adjustable
- Format of outgoing messages configurable
- Second output with inverted signal

## Installation

Open Node-RED and select `Manage palette` from the menu to open the Palette Manager. Go to the `Install` tab, search for `node-red-contrib-clock-generator` and click `install`.

Alternatively, you can run the following command in your Node-RED user directory (typically `~/.node-red`):

```
npm i node-red-contrib-clock-generator
```

## Example

![](example.png)

```
[{"id":"9a4bf51a.487868","type":"tab","label":"Flow 1","disabled":false,"info":""},{"id":"b3dadd62.3cac8","type":"clock-generator","z":"9a4bf51a.487868","name":"","topic":"","period":"1","output":"1","x":500,"y":300,"wires":[["1b0aa96a.7bb347"],["f51b8080.60a75"]]},{"id":"1b0aa96a.7bb347","type":"debug","z":"9a4bf51a.487868","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":690,"y":240,"wires":[]},{"id":"f51b8080.60a75","type":"debug","z":"9a4bf51a.487868","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":690,"y":360,"wires":[]},{"id":"e8bed9a3.fbe7e8","type":"inject","z":"9a4bf51a.487868","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":true,"onceDelay":0.1,"topic":"","payload":"true","payloadType":"bool","x":310,"y":240,"wires":[["b3dadd62.3cac8"]]},{"id":"e635fbab.621658","type":"inject","z":"9a4bf51a.487868","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"false","payloadType":"bool","x":310,"y":360,"wires":[["b3dadd62.3cac8"]]}]
```

## License

[MIT](LICENSE)
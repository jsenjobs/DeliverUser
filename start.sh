docker build -t jsenht/deliveruser:1.0.0 .

docker run -it -p 7084:7084 --network=deliver --link dbredis:dbredis --link dbmongo:dbmongo jsenht/deliveruser:1.0.0
docker run -d -p 7084:7084 --name deliveruser --network=deliver --link dbredis:dbredis jsenht/deliveruser:1.0.0

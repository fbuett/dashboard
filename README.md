# iot-dashboard
My IoT dashboard. Built with Meteor. Connected to IBM Watson IoT.


checkout mqtt-collection submodule
git submodule init
git submodule update


configure IBM Watson IoT
run meteor run --settings=private/settings.json


Settings in private/settings.json
{
    "public": {},
    "url": "mqtt://your-ibm-watson-iot-endpoint-url.com:port",
    "clientId": "your-cliient-id",
    "username": "your-app-username",
    "password": "your-app-password"
}



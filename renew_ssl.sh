#!/bin/sh

certbot certonly --nginx --deploy-hook "nginx -s reload"


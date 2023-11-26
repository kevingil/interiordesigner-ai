#!/bin/sh

certbot certonly --nginx --deploy-hook "nginx -s reload"
ls -l /etc/letsencrypt/live/147.182.233.135/

#!/bin/sh

certbot certonly --nginx
nginx -s reload

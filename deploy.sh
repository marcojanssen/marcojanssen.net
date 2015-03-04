#!/bin/bash

rm -rf deploy/

git clone git@github.com:marcojanssen/marcojanssen.net deploy --branch gh-pages

hugo --baseUrl=http://marcojanssen.net --destination=deploy

cd deploy

git add --all
git commit -m "$1"
git push origin gh-pages

cd ../
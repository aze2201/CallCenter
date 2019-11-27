#!/bin/bash


username=$1
cat /var/www/html/voip/newvoip/bodyheader.html | sed "s/407fefd3833138100041ba17baddb71ba09d35f8/"$username"/"

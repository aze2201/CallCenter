#!/bin/bash

echo "Content-type: text/html"
echo ""
echo "<HTML>"
echo "<HEAD>  </HEAD>"
echo "<BODY>"

cat  /var/www/cgi-bin/incuda.html

echo "This is by Shell scripting ,<br>hello world, <br>Today's date is :    $(date)"
echo "</BODY>"
echo "</HEAD>"

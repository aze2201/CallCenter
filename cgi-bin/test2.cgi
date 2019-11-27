#!/bin/bash 



echo "Content-type: text/html"
echo
echo $REMOTE_USER > /root/remote_user.pipe
export REMOTE_USER=${REMOTE_USER}
cat << EOD
<html>
<head>
<script language="Javascript" type="text/javascript">
   window.location.href="http://django.3bash.com:81/"      
 </script>

</head>
<body>

EOD

echo "userler : $REMOTE_USER"
echo "</body></html>"

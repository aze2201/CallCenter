#!/bin/bash

# remove calling state


curr=$(pwd)
cdrdb=${curr}/data/cdr.database
database=${curr}/data/project.db
cacheFolder=${curr}/cache
tunelFile=${curr}/communicate_pipe

TIMER=10

echo "update session set call_status='MISSED' where round(abs (julianday('now') - julianday(start_date) ) * 24 * 60 * 60 ) >= $TIMER and end_date is null and start_date is not null and call_status='S' ;"| sqlite3  $cdrdb


while true; do
    date
    ListMissingCalls=$(echo "select caller_token,called_token from session where Datetime('now','localtime', '-1 minutes') > datetime(start_date) and end_date is null and start_date is not null and call_status='S' ; " | sqlite3  $cdrdb )
    echo "select round(abs (julianday(datetime('now')) - julianday(start_date) ) * 24 * 60 * 60 ),t.* from session t where round(abs (julianday('now') - julianday(start_date) ) * 24 * 60 * 60 ) >= 20 and end_date is null and start_date is not null and call_status='S' ; "|sqlite3  $cdrdb
    echo "netice $ListMissingCalls"
    if [ ${#ListMissingCalls} -gt  3  ]; then
    echo "list block will work"
        for i in $ListMissingCalls ;  do
           callerToken=$(echo ${i} | awk -v FS='|' '{print $1 }')
           callerSocket=$(cat ${cacheFolder}/${callerToken}_peer | awk -v FS='|' '{print $2}')
           echo "caller Socket  $callerToken : $callerSocket gedecek"
           context=$(cat ${cacheFolder}/${callerToken}.calling | awk -v FS='|' '{print $2}')
           userlist=$(echo "select username from auth_user where id in ( select user_id from auth_user_groups where group_id=(select id from auth_group where name='${context}'));"| sqlite3 ${database})
           for user in $userlist ; do
              userToken=$(cat ${cacheFolder}/${user}_token)
              getStatusUser=$(cat ${cacheFolder}/${userToken}_status | awk -v FS='|' '{print $2}' )
              getCallerPeer=$(cat ${cacheFolder}/${userToken}_status | awk -v FS='|' '{print $1}' )
              # eger dogru peerden callingdedise
              if [ "$getStatusUser" == "calling" ] ; then
                    getSocket=$(cat ${cacheFolder}/${userToken}_peer | awk -v FS='|' '{print $2}' )
                    echo "{\"command\":\"stopCalling\",\"status\":\"ok\",\"destinationSocket\":\"$getSocket\"}" >  $tunelFile
                    echo "{\"command\":\"getStatus\",\"destinationSocket\":\"$getSocket\",\"status\":\"ok\",\"userStatus\":\"free\"}" > $tunelFile
                    echo "|free" > ${cacheFolder}/${userToken}_status
              fi
           done  
           echo "{\"command\":\"reject\",\"status\":\"ok\",\"destinationSocket\":\"$callerSocket\"}"  > $tunelFile
           echo "bu line ishlemeldir"
           echo "update session set call_status='MISSED' where call_status='S' and end_date is null and start_date is not null and  caller_token='$callerToken' ;"| sqlite3  $cdrdb
        done
    fi
    sleep 5s
done
